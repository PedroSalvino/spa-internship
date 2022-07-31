from bs4 import BeautifulSoup
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium import webdriver
from time import sleep
from datetime import datetime, timedelta
import requests, sqlite3

conn = sqlite3.connect('dados_scrape.sqlite3')
c = conn.cursor()

def criartabela_fundeio():
    c.execute(""" CREATE TABLE IF NOT EXISTS output_fundeio (nome TEXT NOT NULL PRIMARY KEY, chegada_fundeio TEXT NOT NULL) """)

def criartabela_praticagem():
    c.execute(
        """ 
    CREATE TABLE IF NOT EXISTS output_praticagem (
	nome TEXT NOT NULL PRIMARY KEY,
	tempo_estimado TEXT NOT NULL
    ) """)

def criartabela_santosbrasil():
    c.execute(
        """ 
    CREATE TABLE IF NOT EXISTS output_santosbrasil (
    nome TEXT PRIMARY KEY,
	mmsi TEXT NOT NULL,
	ultima_atualizacao TEXT,
    estimado_marinetraffic TEXT,
    estimado_terminal TEXT,
    berco TEXT,
    comprimento TEXT,
    comprimento_maximo TEXT,
    imo TEXT,
    calado TEXT,
    lat TEXT,
    lon TEXT,
    armador TEXT,
    movimentacao_embarque TEXT,
    movimentacao_descarga TEXT,
    movimentacao_total TEXT,
    estimado_saida TEXT,
    atrasado TEXT
    ) """)
    conn.commit()
    c.execute(
        """ 
    CREATE TABLE IF NOT EXISTS output_santosbrasil_chegada (
    nome TEXT PRIMARY KEY,
	mmsi TEXT NOT NULL,
	ultima_atualizacao TEXT,
    chegada_marinetraffic TEXT,
    chegada_terminal TEXT,
    berco TEXT,
    comprimento TEXT,
    comprimento_maximo TEXT,
    imo TEXT,
    calado TEXT,
    lat TEXT,
    lon TEXT,
    armador TEXT,
    movimentacao_embarque TEXT,
    movimentacao_descarga TEXT,
    movimentacao_total TEXT,
    chegada_saida TEXT,
    atrasado TEXT
    ) """)
    conn.commit()

caminho_driver = r"chromedriver.exe"
opcoes_chrome = webdriver.ChromeOptions()
# opcoes_chrome.add_argument('--headless')
opcoes_chrome.binary_location = r"C:\Program Files\Google\Chrome Beta\Application\chrome.exe"
navegador = webdriver.Chrome(caminho_driver, options=opcoes_chrome)

def obter_ship_id(nome):
    navio = nome.replace(' ', '%20')
    navio = nome.replace('-', '%20')
    url = f'https://www.marinetraffic.com/en/data/?asset_type=vessels&columns=flag,shipname,photo,recognized_next_port,reported_eta,reported_destination,current_port,imo,ship_type,show_on_live_map,time_of_latest_position,lat_of_latest_position,lon_of_latest_position,notes&quicksearch|begins|quicksearch={navio}'
    navegador.get(url)
    sleep(5)
    try:
        navegador.find_elements(By.CLASS_NAME, 'css-1hy2vtq')[1].click()
    except:
        pass
    sleep(7)
    try:
        link = navegador.find_element(By.CLASS_NAME, 'ag-cell-content-link').get_attribute('href')
    except:
        navegador.get(url)
        sleep(15)
        link = navegador.find_element(By.CLASS_NAME, 'ag-cell-content-link').get_attribute('href')
    sleep(3)
    a,b,c = link.partition('shipid:')
    ship_id,e,f = c.partition('/')
    return(ship_id)

def obter_dados_navio(ship_id):
    url1 = f'https://www.marinetraffic.com/en/vesselDetails/vesselInfo/shipid:{ship_id}'
    url2 = f'https://www.marinetraffic.com/en/vesselDetails/latestPosition/shipid:{ship_id}'

    headers = {
        "accept": "application/json",
        "accept-encoding": "gzip, deflate",
        "user-agent": "Mozilla/5.0",
        "x-requested-with": "XMLHttpRequest"
    }

    query1 = requests.get(url1, headers=headers)
    query2 = requests.get(url2, headers=headers)
    resultado = {}
    resultado.update(query1.json())
    resultado.update(query2.json())
    return resultado

def registrar_sqlite(dados, armador_sb, estimado_terminal, chegada_terminal, berco, movimentacao_total, movimentacao_embarque, movimentacao_descarga, estimado_saida, atrasado):
    estimado_terminal = str(estimado_terminal).replace('\n', '').replace('/n', '')
    estimado_terminal = datetime.strptime(estimado_terminal, '%d/%m/%Y%H:%M')
    estimado_terminal = estimado_terminal.strftime('%Y-%m-%d %H:%M:%S')
    try:
        chegada_terminal = str(chegada_terminal).replace('\n', '').replace('/n', '')
        chegada_terminal = datetime.strptime(chegada_terminal, '%d/%m/%Y%H:%M')
        chegada_terminal = chegada_terminal.strftime('%Y-%m-%d %H:%M:%S')
    except:
        pass
    if berco == "1":
        comprimento_maximo = 245
    elif berco == "2":
        comprimento_maximo = 383
    elif berco == "3":
        comprimento_maximo = 350

    mmsi = (str({dados["mmsi"]}))
    mmsi2 = "".join(str(mmsi))
    mmsi2 = mmsi2.replace('{', '')
    mmsi2 = mmsi2.replace('}', '')
    timestamp = datetime.fromtimestamp(dados["lastPos"])
    comprimento = dados["length"]
    imo = dados["imo"]
    nome = dados["name"]
    lat = dados["lat"]
    lon = dados["lon"]
    calado = dados["draughtReported"]
    timestamp = datetime.strftime(timestamp, '%Y-%m-%d %H:%M:%S')
    if dados["arrivalPort"]["timestampLabel"] == "ETA":
        estimado_marine = datetime.fromtimestamp(
            dados["arrivalPort"]["timestamp"])
        estimado_marine = datetime.strftime(
            estimado_marine, '%Y-%m-%d %H:%M:%S')
        c.execute(f"""INSERT OR REPLACE INTO output_santosbrasil VALUES
        ('{nome}','{mmsi2}','{timestamp}','{estimado_marine}','{estimado_terminal}','{berco}','{comprimento}','{comprimento_maximo}','{imo}','{calado}','{lat}','{lon}','{armador_sb}','{movimentacao_embarque}','{movimentacao_descarga}','{movimentacao_total}','{estimado_saida}','{atrasado}')""")
        conn.commit()
    elif dados["arrivalPort"]["timestampLabel"] == "ATA":
        chegada_marine = datetime.fromtimestamp(
            dados["arrivalPort"]["timestamp"])
        chegada_marine = datetime.strftime(chegada_marine, '%Y-%m-%d %H:%M:%S')
        c.execute(f"""INSERT OR REPLACE INTO output_santosbrasil_chegada VALUES
        ('{nome}','{mmsi2}','{timestamp}','{chegada_marine}','{chegada_terminal}','{berco}','{comprimento}','{comprimento_maximo}','{imo}','{calado}','{lat}','{lon}','{armador_sb}','{movimentacao_embarque}','{movimentacao_descarga}','{movimentacao_total}','{estimado_saida}','{atrasado}')""")
        conn.commit()


def scraping_fundeio():
    navegador.get('https://www.sppilots.com.br/?cmd=SETPRT&prt=1')
    try:
        navegador.find_element(By.ID, 'userid').send_keys("46414915858")
        navegador.find_element(By.ID, 'password').send_keys("46414915858")
        navegador.find_element(By.ID, 'acordo').click()
        navegador.find_element(By.ID, 'btLog').click()
    except:
        pass
    navegador.get('https://www.sppilots.com.br/?act=FUND')
    sleep(5)
    page_content = navegador.page_source
    soup = BeautifulSoup(page_content, 'html.parser')
    try:
        navios = soup.find('div', attrs={'style': 'width: 100%;'}).findAll('tr')
    except:
        pass
    else:
        for manobra in navios[1:]:
            elements = manobra.findAll('td')
            nome_prac_fund = elements[0].text
            data_prac_fund = elements[1].text
            data1, data2, data3 = str(data_prac_fund).partition(' ')
            data1 += f'/{datetime.now().year}'
            data1 += data2
            data1 += data3
            data_prac_fund = datetime.strptime(data1, '%d/%m/%Y %H:%M')
            data_prac_fund = datetime.strftime(
                data_prac_fund, '%Y-%m-%d %H:%M:%S')
            c.execute(f"""INSERT OR REPLACE INTO output_fundeio(nome,chegada_fundeio) VALUES
            ('{nome_prac_fund}','{data_prac_fund}')""")
            conn.commit()


def scraping_praticagem():
    navegador.get('https://www.sppilots.com.br/?cmd=SETPRT&prt=1')
    try:
        navegador.find_element(By.ID, 'userid').send_keys("46414915858")
        navegador.find_element(By.ID, 'password').send_keys("46414915858")
        navegador.find_element(By.ID, 'acordo').click()
        navegador.find_element(By.ID, 'btLog').click()
    except:
        pass
    navegador.get('https://www.sppilots.com.br/?act=MOVIM')
    page_content = navegador.page_source
    soup = BeautifulSoup(page_content, 'html.parser')
    try:
        navios = soup.find('table', attrs={'style': 'width: 100%;'}).findAll(
            'tr', attrs={'style': 'background:#00BFFF;'})
    except:
        pass
    else:
        for manobra in navios:
            elements = manobra.findAll('td')
            if elements[1].text == 'E':
                nome_prac = elements[0].text
                pob_prac = elements[4].text
                pob_hr_prac = pob_prac[:0] + pob_prac[6:]
                hr_prac = pob_hr_prac[:2] + pob_hr_prac[5:]
                min_prac = pob_hr_prac[:0] + pob_hr_prac[3:]
                hr_int_prac = int(hr_prac)
                min_int_prac = int(min_prac)
                date_and_time = datetime(
                    2022, 1, 1, hr_int_prac, min_int_prac, 0)
                time_change = timedelta(minutes=40)
                new_time = date_and_time + time_change
                tempo_previsto = new_time.strftime('%H:%M:%S')
                calado_prac = elements[6].text
                c.execute(f"""INSERT OR REPLACE INTO output_praticagem(nome,tempo_estimado) VALUES
                ('{nome_prac}','{tempo_previsto}')""")
                conn.commit()


def scraping_santosbrasil(date_time_str):
    navegador.get(
        f'https://www.santosbrasil.com.br/v2021/lista-de-atracacao?titulo=Tecon+Santos&unidade=tecon-santos&lista=lista-de-atracacao&atracadouro=TECON&dataInicial={date_time_str}')
    data_atual_sb = date_time_str
    page_content = navegador.page_source
    soup = BeautifulSoup(page_content, 'html.parser')
    sleep(1)
    try:
        navios = soup.find('table', attrs={'id': 'tableListaDeAtracacao'}).findAll(
            'tr', attrs={'id': 'tableRow'})
    except:
        pass
    else:
        cont = 0
        for navio in navios:
            elements = navio.findAll('td')
            berco_sb = elements[1].text
            nome = navio.find('td', attrs={'id': 'laTdNavio'}).find(
                'p', attrs={'class': 'p-preto'}).text
            armador_sb = navio.find('td', attrs={'id': 'laTdServico'}).find(
                'p', attrs={'class': 'p-cinza'}).text
            eta_sb = elements[5].text
            ata_sb = elements[6].text
            ets_sb = elements[9].text
            ats_sb = elements[10].text
            now = datetime.now()
            date_time_str = now.strftime("%d/%m/%Y %H:%M:%S")
            time = str(ets_sb).replace('\n', '').replace('/n', '')
            ats_str_sb = str(ats_sb).replace('\n', '').replace('/n', '')
            try:
                time_dia = int(time[:2] + time[15:])
                time_mes = time[:0] + time[3:]
                time_mes_2 = int(time_mes[:2] + time_mes[15:])
                time_ano = time[:0] + time[6:]
                time_ano_2 = int(time_ano[:4] + time_ano[15:])
                hora = time[:0] + time[10:]
                hora_2 = int(hora[:2] + hora[10:])
                min = int(time[:0] + time[13:])
            except:
                pass
            else:
                date_and_time = datetime(
                    time_ano_2, time_mes_2, time_dia, hora_2, min, 0)
                date_time_sb = date_and_time.strftime("%Y%m%d%H%M%S")
                now = datetime.now()
                date_time_str = now.strftime("%Y%m%d%H%M%S")
                if date_time_str > date_time_sb and ats_str_sb == '--':
                    date_and_time = datetime.datetime(
                        time_ano_2, time_mes_2, time_dia, hora_2, min, 0)
                    time_change = datetime.timedelta(minutes=360)
                    new_time = date_and_time + time_change
                    tempo_previsto_saida = new_time.strftime(
                        '%d/%m/%Y %H:%M:%S')
                    atrasado = 1
                else:
                    atrasado = 0
                    tempo_previsto_saida = ''
            navegador.get(
                f'https://www.santosbrasil.com.br/v2021/lista-de-atracacao?titulo=Tecon+Santos&unidade=tecon-santos&lista=lista-de-atracacao&atracadouro=TECON&dataInicial={data_atual_sb}')
            sleep(5)
            navegador.find_elements(By.ID, 'tableRow')[cont].click()
            page_content = navegador.page_source
            soup = BeautifulSoup(page_content, 'html.parser')
            embs_sb = soup.find(
                'div', attrs={'class': 'col-12 div-infos-table2'}).findAll('tr')
            emb_sb = embs_sb[10].find('strong').text
            des_sb = embs_sb[10].find(
                'td', attrs={'class': 'divisoria'}).find('strong').text
            try:
                emb_int_sb = int(emb_sb)
                des_int_sb = int(des_sb)
            except:
                pass
            else:
                emb_des_sb = emb_int_sb + des_int_sb
            ship_id = obter_ship_id(nome)
            dados = obter_dados_navio(ship_id)
            cont = cont + 1
            registrar_sqlite(dados, armador_sb, eta_sb, ata_sb, berco_sb, emb_des_sb,
                             emb_int_sb, des_int_sb, tempo_previsto_saida, atrasado)


while('true'):
    criartabela_fundeio()
    now = datetime.today()
    date_time_str = now.strftime("%Y-%m-%d")
    criartabela_praticagem()
    criartabela_santosbrasil()
    scraping_fundeio()
    scraping_praticagem()
    scraping_santosbrasil(date_time_str)
