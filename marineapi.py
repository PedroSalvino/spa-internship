# chamadas a api marinetraffic
from marinetrafficapi import MarineTrafficApi
import requests

# conexão ao firebase
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# datas, horarios e pausas
import datetime
from time import sleep

# coleta de shipid
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

#api = MarineTrafficApi(api_key='{chaveapi}')
#url = 'https://services.marinetraffic.com/api/shipsearch/{api_key}?protocol=json&shipid={ship_id}'.format('{chavedaapi}, {iddonavio}')

caminho_driver = r"chromedriver.exe"
opcoes_chrome = webdriver.ChromeOptions()
# opcoes_chrome.add_argument('--headless')
opcoes_chrome.binary_location = r"C:\Program Files\Google\Chrome Beta\Application\chrome.exe"
navegador = webdriver.Chrome(caminho_driver, options=opcoes_chrome)

def obter_ship_id(nome):

    print('a')
    navio = nome.replace(' ','%20')
    url = 'https://www.marinetraffic.com/en/data/?asset_type=vessels&columns=flag,shipname,photo,recognized_next_port,reported_eta,reported_destination,current_port,imo,ship_type,show_on_live_map,time_of_latest_position,lat_of_latest_position,lon_of_latest_position,notes&quicksearch|begins|quicksearch={}'.format(navio)


    navegador.get(url)
    sleep(3)
    botoes = navegador.find_elements(By.CLASS_NAME, 'css-1hy2vtq')
    botoes[1].click()
    sleep(7)
    link = navegador.find_element(By.CLASS_NAME, 'ag-cell-content-link').get_attribute('href')
    sleep(3)
    print(link)
    a,b,c = link.partition('shipid:')
    ship_id,e,f = c.partition('/')
    print(ship_id)


nome = 'CAP SAN MARCO'
obter_ship_id(nome)