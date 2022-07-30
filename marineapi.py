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

# calculo de distancia
import geopy.distance

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

def obter_ship_id(nome):

    navio = nome.replace(' ','%20')
    url = 'https://www.marinetraffic.com/en/data/?asset_type=vessels&columns=flag,shipname,photo,recognized_next_port,reported_eta,reported_destination,current_port,imo,ship_type,show_on_live_map,time_of_latest_position,lat_of_latest_position,lon_of_latest_position,notes&quicksearch|begins|quicksearch={}'.format(navio)

    navegador.get(url)
    sleep(5)
    botoes = navegador.find_elements(By.CLASS_NAME, 'css-1hy2vtq')
    botoes[1].click()
    sleep(5)
    link = navegador.find_element(By.CLASS_NAME, 'ag-cell-content-link').get_attribute('href')
    sleep(3)
    a,b,c = link.partition('shipid:')
    ship_id,e,f = c.partition('/')
    return(ship_id)

def obter_dados_navio(ship_id):

    url1 = 'https://www.marinetraffic.com/en/vesselDetails/vesselInfo/shipid:{}'.format(ship_id)
    print(url1)
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
    print(resultado)
    return resultado

def registrar_firebase(dados):

    mmsi = (str({dados["mmsi"]}))
    mmsi2 = "".join(str(mmsi))
    mmsi2 = mmsi2.replace('{','')
    mmsi2 = mmsi2.replace('}','')
    timestamp = datetime.fromtimestamp(dados["lastPos"])
    print(timestamp)
    eta = datetime.fromtimestamp(dados["arrivalPort"]["timestamp"])
    print(eta)
    ships = firebase_db.collection("ships")
    ships.document(mmsi2).set({
        "mmsi": mmsi2,
        "timestamp":timestamp,
        "content":dados
    })

    # cordenada_atual = (f'{dados["lat"]}',f'{dados["lon"]}')
    # coordenada_ilha = ('-24.007947','-46.326595')
    # distancia_km = geopy.distance.geodesic(cordenada_atual, coordenada_ilha).km
    # velocidade_km = dados["speed"] * 1.852
    # tempo_estimado = distancia_km/velocidade_km
    # print(f'O tempo estimado é {tempo_estimado} horas')
    # print(f'O tempo estimado é {tempo_estimado/24} dias')




nome = 'CAP SAN LORENZO'
ship_id = obter_ship_id(nome)
print(ship_id)
dados = obter_dados_navio(ship_id)
registrar_firebase(dados)