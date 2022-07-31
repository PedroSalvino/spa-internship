from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import requests
from datetime import datetime
from time import sleep


chrome_options = Options()
# chrome_options.add_argument("--headless")
# chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.binary_location = r"C:\Program Files\Google\Chrome Beta\Application\chrome.exe"
navegador = webdriver.Chrome(options=chrome_options)
while('true'):
    now = datetime.today()
    date_time_str = now.strftime("%Y-%m-%d")
    navegador.get(f'https://www.santosbrasil.com.br/v2021/lista-de-atracacao?titulo=Tecon+Santos&unidade=tecon-santos&lista=lista-de-atracacao&atracadouro=TECON&dataInicial={date_time_str}')
    sleep(5)
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
            sleep(1)
            navios = navegador.find_elements(By.ID, 'tableRow')[cont].click()
            cont += 1
            page_content = navegador.page_source
            soup = BeautifulSoup(page_content, 'html.parser')
            embs_sb = soup.find('div', attrs={'class': 'col-12 div-infos-table2'}).findAll('tr')
            emb_sb = embs_sb[10].find('strong').text
            des_sb = embs_sb[10].find('td', attrs={'class': 'divisoria'}).find('strong').text
            try:
                emb_int_sb = int(emb_sb)
                des_int_sb = int(des_sb)
            except:
                print("Sem valor")
            else:
                emb_des_sb = emb_int_sb + des_int_sb
            sleep(1)
            navegador.refresh()

    navegador.get('https://www.sppilots.com.br/?cmd=SETPRT&prt=1')
    try:
        navegador.find_element(By.ID, 'userid').send_keys("46414915858")
        navegador.find_element(By.ID, 'password').send_keys("46414915858")
        navegador.find_element(By.ID, 'acordo').click()
        navegador.find_element(By.ID, 'btLog').click()
    except:
        print("Sem login")
    navegador.get('https://www.sppilots.com.br/?act=MOVIM')
    page_content = navegador.page_source
    soup = BeautifulSoup(page_content, 'html.parser')
    try:
        navios = soup.find('table', attrs={'style': 'width: 100%;'}).findAll('tr', attrs={'style': 'background:#00BFFF;'})
    except:
        print('Sem navios em manobra')
    else:
        for manobra in navios:
            elements = manobra.findAll('td')
            if elements[1].text == 'S':
                try:
                    nome_prac = elements[0].text
                    mov_prac = elements[1].text
                    loc1_prac = elements[2].text
                    loc2_prac = elements[3].text
                    pob_prac = elements[4].text
                    pob_hr_prac = pob_prac[:0] + pob_prac[6:]
                    hr_prac = pob_hr_prac[:2] + pob_hr_prac[5:]
                    min_prac = pob_hr_prac[:0] + pob_hr_prac[3:]
                    hr_int_prac = int(hr_prac)
                    min_int_prac = int(min_prac)
                    date_and_time = datetime.datetime(2022, 1, 1, hr_int_prac, min_int_prac)
                    time_change = datetime.timedelta(minutes=40)
                    new_time = date_and_time + time_change
                    tempo_previsto = new_time.strftime('%H:%M')
                    passag_prac = elements[5].text
                    calado_prac = elements[6].text
                    bordo_prac = elements[7].text
                    tug_prac = elements[8].text
                except:
                    print('Não encontrado linha 89')

    navegador.get('https://www.sppilots.com.br/?act=TABMAR')
    page_content = navegador.page_source
    soup = BeautifulSoup(page_content, 'html.parser')
    try:
        navios = soup.find('td', attrs={'style': 'height: 1px;'}).findAll('tr', attrs={'style': 'height: 18px;'})
    except:
        print('Sem navios em manobra')
    else:
        for manobra in navios:
            elements = manobra.findAll('td')
            try:
                horario_prac = elements[0].text
                mare_prac = elements[1].text
            except:
                print('Não encontrado linha 105')
    
    navegador.get('https://www.sppilots.com.br/?act=FUND')
    page_content = navegador.page_source
    soup = BeautifulSoup(page_content, 'html.parser')
    try:
        navios = soup.find('div', attrs={'style': 'width: 100%;'}).findAll('tr')
    except:
        print("Não encontrado linha 113")
    else:
        for manobra in navios:
            elements = manobra.findAll('td')
            try:
                nome_prac_fund = elements[0].text
                data_prac_fund = elements[1].text
            except:
                print('Não encontrado linha 122')

    page = requests.get('https://www.portodesantos.com.br/informacoes-operacionais/operacoes-portuarias/navegacao-e-movimento-de-navios/atracacoes-programadas/')
    soup = BeautifulSoup(page.content, 'html.parser')
    try:
        navios = soup.find('div', attrs={'id': 'iniciodoconteudo'}).findAll('div', attrs={'style': 'overflow-x:auto;margin-bottom:20px;'})
    except:
        print('Não encontrado linha 128')
    else:
        for navio in navios:
            navios_rows = navio.find('tbody').findAll('tr')
            for navio_row in navios_rows:
                elements = navio_row.findAll('td')
                if elements[2].text == 'TECON':
                    data_spa = elements[0].text
                    hora_spa = elements[1].text
                    local_spa = elements[2].text
                    navio_spa = elements[3].text
                    carga_spa = elements[4].text
                    evento_spa = elements[5].text
                    viagem_spa = elements[6].text
                    duv_spa = elements[7].text
    sleep(300)