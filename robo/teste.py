from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
from datetime import datetime
from time import sleep


chrome_options = Options()
# chrome_options.add_argument("--headless")
# chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.binary_location = r"C:\Program Files\Google\Chrome Beta\Application\chrome.exe"
navegador = webdriver.Chrome(options=chrome_options)
now = datetime.today()
date_time_str = now.strftime("%Y-%m-%d")
navegador.get(f'https://www.santosbrasil.com.br/v2021/lista-de-atracacao?titulo=Tecon+Santos&unidade=tecon-santos&lista=lista-de-atracacao&atracadouro=TECON&dataInicial={date_time_str}')
sleep(1)
page_content = navegador.page_source
soup = BeautifulSoup(page_content, 'html.parser')
try:
    navios = soup.find('table', attrs={'id': 'tableListaDeAtracacao'}).findAll('tr', attrs={'id': 'tableRow'})
except:
    print('Não encontrado linha 25')
else:
    cont = 0
    for navio in navios:
        elements = navio.findAll('td')
        ets_sb = elements[9].text
        ats_sb = elements[10].text
        time = str(ets_sb).replace('\n','').replace('/n','')
        ats_str_sb = str(ats_sb).replace('\n','').replace('/n','')
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
            print("Não encontrado")
        else:
            date_and_time = datetime(time_ano_2, time_mes_2, time_dia, hora_2, min, 0)
            date_time_sb = date_and_time.strftime("%Y%m%d%H%M%S")
            now = datetime.now()
            date_time_str = now.strftime("%Y%m%d%H%M%S")
            if date_time_str > date_time_sb and ats_str_sb == '--':
                ate_and_time = datetime.datetime(time_ano_2, time_mes_2, time_dia, hora_2, min, 0)
                time_change = datetime.timedelta(minutes=360)
                new_time = date_and_time + time_change
                tempo_previsto_saida = new_time.strftime('%d/%m/%Y %H:%M:%S')
                atrasado = 1
            else:
                atrasado = 0