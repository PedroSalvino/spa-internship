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
navegador = webdriver.Chrome(options=chrome_options)
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
            nome = elements[2].find('p', attrs={'class': 'p-preto'})
            print(nome)
    sleep(1000)
    #         nome_viagem_sb = elements[2].text
    #         servico_armador_sb = elements[3].text
    #         remocoes_sb = elements[4].text
    #         eta_sb = elements[5].text
    #         ata_sb = elements[6].text
    #         etb_sb = elements[7].text
    #         atb_sb = elements[8].text
    #         ets_sb = elements[9].text
    #         ats_sb = elements[10].text
    #         status_sb = navio.get('class')

    # navegador.get('https://www.sppilots.com.br/?cmd=SETPRT&prt=1')
    # navegador.find_element(By.ID, 'userid').send_keys("46414915858")
    # navegador.find_element(By.ID, 'password').send_keys("46414915858")
    # navegador.find_element(By.ID, 'acordo').click()
    # navegador.find_element(By.ID, 'btLog').click()
    # navegador.get('https://www.sppilots.com.br/?act=MOVIM')
    # page_content = navegador.page_source
    # soup = BeautifulSoup(page_content, 'html.parser')
    # try:
    #     navios = soup.find('table', attrs={'style': 'width: 100%;'}).findAll('tr', attrs={'style': 'background:#00BFFF;'})
    # except:
    #     print('Sem navios em manobra')
    # else:
    #     for manobra in navios:
    #         elements = manobra.findAll('td')
    #         if elements[1].text == 'S':
    #             try:
    #                 nome_prac = elements[0].text
    #                 mov_prac = elements[1].text
    #                 loc1_prac = elements[2].text
    #                 loc2_prac = elements[3].text
    #                 pob_prac = elements[4].text
    #                 passag_prac = elements[5].text
    #                 calado_prac = elements[6].text
    #                 bordo_prac = elements[7].text
    #                 tug_prac = elements[8].text
    #             except:
    #                 print('Não encontrado')
    # sleep(300)
