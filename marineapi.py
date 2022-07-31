# chamadas a api marinetraffic
from marinetrafficapi import MarineTrafficApi
import requests

# conexão ao firebase
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# datas, horarios e pausas
import datetime
from datetime import datetime
from time import sleep
# coleta de shipid
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

# scraping terminal
from bs4 import BeautifulSoup

#api = MarineTrafficApi(api_key='{chaveapi}')
#url = 'https://services.marinetraffic.com/api/shipsearch/{api_key}?protocol=json&shipid={ship_id}'.format('{chavedaapi}, {iddonavio}')

caminho_driver = r"chromedriver.exe"
opcoes_chrome = webdriver.ChromeOptions()
opcoes_chrome.add_argument('--headless')
opcoes_chrome.binary_location = r"C:\Program Files\Google\Chrome Beta\Application\chrome.exe"
navegador = webdriver.Chrome(caminho_driver, options=opcoes_chrome)
app_firebase = credentials.Certificate(r"movim-navios-firebase-adminsdk-d5d4r-e2ebd8f787.json")
firebase_admin.initialize_app(app_firebase)
firebase_db = firestore.client()

# funcao para obtencao do shipid (marinetraffic)
def obter_ship_id(nome):

    print(nome)
    navio = nome.replace(' ','%20')
    url = 'https://www.marinetraffic.com/en/data/?asset_type=vessels&columns=flag,shipname,photo,recognized_next_port,reported_eta,reported_destination,current_port,imo,ship_type,show_on_live_map,time_of_latest_position,lat_of_latest_position,lon_of_latest_position,notes&quicksearch|begins|quicksearch={}'.format(navio)
    navegador.get(url)
    sleep(5)
    try:
        botoes = navegador.find_elements(By.CLASS_NAME, 'css-1hy2vtq')
        botoes[1].click()
    except:
        pass
    sleep(7)
    try:
        link = navegador.find_element(By.CLASS_NAME, 'ag-cell-content-link').get_attribute('href')
    except:
        navegador.get(url)
        sleep(12)
        link = navegador.find_element(By.CLASS_NAME, 'ag-cell-content-link').get_attribute('href')
    sleep(3)
    a,b,c = link.partition('shipid:')
    ship_id,e,f = c.partition('/')
    return(ship_id)

# funcao para obter dados dos navios via marinetraffic
def obter_dados_navio(ship_id):

    url1 = 'https://www.marinetraffic.com/en/vesselDetails/vesselInfo/shipid:{}'.format(ship_id)
    url2 = 'https://www.marinetraffic.com/en/vesselDetails/latestPosition/shipid:{}'.format(ship_id)

    # headers para possibilitar acesso do script ao marinetraffic
    headers = {
        "accept" : "application/json",
        "accept-encoding" : "gzip, deflate",
        "user-agent" : "Mozilla/5.0",
        "x-requested-with" : "XMLHttpRequest"
    }

    query1 = requests.get(url1, headers=headers)
    query2 = requests.get(url2, headers=headers)
    resultado = {}
    resultado.update(query1.json())
    resultado.update(query2.json())
    return resultado

# funcao para inserir registros no firebase
def registrar_firebase(dados, estimado_terminal, chegada_terminal, berco):
    estimado_terminal = str(estimado_terminal).replace('\n','').replace('/n','')
    estimado_terminal = datetime.strptime(estimado_terminal, '%d/%m/%Y%H:%M')
    estimado_terminal = estimado_terminal.strftime('%Y-%m-%d %H:%M:%S')
    try:
        chegada_terminal = str(chegada_terminal).replace('\n','').replace('/n','')
        chegada_terminal = datetime.strptime(chegada_terminal, '%d/%m/%Y%H:%M')
        chegada_terminal = chegada_terminal.strftime('%Y-%m-%d %H:%M:%S')
    except:
        pass

    if berco == "1":
        comprimento_maximo=245
    elif berco == "2":
        comprimento_maximo=383
    elif berco =="3":
        comprimento_maximo=350
    # fonte: https://www.portodesantos.com.br/informacoes-operacionais/operacoes-portuarias/calados-operacionais-dos-bercos-de-atracacao/
    
    mmsi = (str({dados["mmsi"]}))
    mmsi2 = "".join(str(mmsi))
    mmsi2 = mmsi2.replace('{','')
    mmsi2 = mmsi2.replace('}','')
    timestamp = datetime.fromtimestamp(dados["lastPos"])
    comprimento = dados["length"]
    imo = dados["imo"]
    nome = dados["name"]
    calado = dados["draughtReported"]
    timestamp = datetime.strftime(timestamp, '%Y-%m-%d %H:%M:%S')
    print(timestamp)
    print(dados)
    if dados["arrivalPort"]["timestampLabel"] == "ETA":
        estimado_marine = datetime.fromtimestamp(dados["arrivalPort"]["timestamp"])
        estimado_marine = datetime.strftime(estimado_marine, '%Y-%m-%d %H:%M:%S')
        ships = firebase_db.collection("comparacao_estimacao_navios")
        ships.document(mmsi2).set({
        "mmsi": mmsi2,
        "ultima_atualizacao":timestamp,
        "estimado_marinetraffic":estimado_marine,
        "estimado_terminal":estimado_terminal,
        "berco":berco,
        "comprimento":comprimento,
        "comprimento_maximo":comprimento_maximo,
        "imo":imo,
        "nome":nome,
        "calado":calado,
        "conteudo":dados
    })
    elif dados["arrivalPort"]["timestampLabel"] == "ATA":
        chegada_marine = datetime.fromtimestamp(dados["arrivalPort"]["timestamp"])
        chegada_marine = datetime.strftime(chegada_marine, '%Y-%m-%d %H:%M:%S')
        ships = firebase_db.collection("comparacao_chegada_navios")
        ships.document(mmsi2).set({
        "mmsi": mmsi2,
        "ultima_atualizacao":timestamp,
        "chegada_marinetraffic":chegada_marine,
        "chegada_terminal":chegada_terminal,
        "berco":berco,
        "comprimento":comprimento,
        "comprimento_maximo":comprimento_maximo,
        "imo":imo,
        "nome":nome,
        "calado":calado,
        "conteudo":dados
        })
        
while('true'):
    now = datetime.today()
    date_time_str = now.strftime("%Y-%m-%d")
    navegador.get(f'https://www.santosbrasil.com.br/v2021/lista-de-atracacao?titulo=Tecon+Santos&unidade=tecon-santos&lista=lista-de-atracacao&atracadouro=TECON&dataInicial={date_time_str}')
    page_content = navegador.page_source
    soup = BeautifulSoup(page_content, 'html.parser')
    try:
        navios = soup.find('table', attrs={'id': 'tableListaDeAtracacao'}).findAll('tr', attrs={'id': 'tableRow'})
    except:
        print('Não encontrado')
    else:
        for navio in navios:
            elements = navio.findAll('td')
            berco_sb = elements[1].text
            nome = navio.find('td', attrs={'id': 'laTdNavio'}).find('p', attrs={'class': 'p-preto'}).text
            servico_armador_sb = elements[3].text
            remocoes_sb = elements[4].text
            eta_sb = elements[5].text
            ata_sb = elements[6].text
            etb_sb = elements[7].text
            atb_sb = elements[8].text
            ets_sb = elements[9].text
            ats_sb = elements[10].text
            status_sb = navio.get('class')  
            ship_id = obter_ship_id(nome)
            dados = obter_dados_navio(ship_id)
            registrar_firebase(dados, eta_sb , ata_sb, berco_sb)
    sleep(300)
            