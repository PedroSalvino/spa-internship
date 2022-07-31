import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Linking  } from 'react-native';

const santosbrasil = {
  "name": "output_santosbrasil",
  "features": [
  { "nome": "NORTHERN PRIORITY", "mmsi": "636091832", "ultima_atualizacao": "31/07/2022 07:51:50", "estimado_marinetraffic": "31/07/2022 09:00:00", "estimado_terminal": "31/07/2022 09:00:00", "berco": "1", "comprimento": "264.28", "comprimento_maximo": "245", "imo": "9450313", "calado": "10.2", "lat": "-24.25726", "lon": "-46.14867", "armador": "MSL             ", "movimentacao_embarque": "706", "movimentacao_descarga": "318", "movimentacao_total": "1024", "estimado_saida": "", "atrasado": "0" },
  { "nome": "SAN FELIPE", "mmsi": "538005732", "ultima_atualizacao": "24/07/2022 18:20:19", "estimado_marinetraffic": "01/08/2022 14:00:00", "estimado_terminal": "01/08/2022 06:00:00", "berco": "2", "comprimento": "299.9", "comprimento_maximo": "383", "imo": "9698628", "calado": "13.9", "lat": "-32.96366", "lon": "6.239763", "armador": "ZIM             ", "movimentacao_embarque": "293", "movimentacao_descarga": "1979", "movimentacao_total": "2272", "estimado_saida": "", "atrasado": "0" },
  { "nome": "CMA CGM FORT ST GEORGES", "mmsi": "710005274", "ultima_atualizacao": "31/07/2022 02:48:45", "estimado_marinetraffic": "01/08/2022 10:00:00", "estimado_terminal": "01/08/2022 13:00:00", "berco": "1", "comprimento": "197.2", "comprimento_maximo": "245", "imo": "9261918", "calado": "9.2", "lat": "-21.0586", "lon": "-40.29008", "armador": "MER             ", "movimentacao_embarque": "514", "movimentacao_descarga": "1979", "movimentacao_total": "2272", "estimado_saida": "", "atrasado": "0" },
  { "nome": "KOTA CANTIK", "mmsi": "563149900", "ultima_atualizacao": "31/07/2022 07:53:46", "estimado_marinetraffic": "31/07/2022 10:30:00", "estimado_terminal": "01/08/2022 22:00:00", "berco": "3", "comprimento": "299.95", "comprimento_maximo": "350", "imo": "9494591", "calado": "10.5", "lat": "-26.72702", "lon": "-48.44512", "armador": "PIL             ", "movimentacao_embarque": "554", "movimentacao_descarga": "1979", "movimentacao_total": "2272", "estimado_saida": "", "atrasado": "0" },
  { "nome": "MONTE CERVANTES", "mmsi": "563051200", "ultima_atualizacao": "31/07/2022 07:53:53", "estimado_marinetraffic": "01/08/2022 08:00:00", "estimado_terminal": "02/08/2022 01:00:00", "berco": "2", "comprimento": "272", "comprimento_maximo": "383", "imo": "9283186", "calado": "9.8", "lat": "-33.15998", "lon": "-51.90712", "armador": "MSL             ", "movimentacao_embarque": "985", "movimentacao_descarga": "1979", "movimentacao_total": "2272", "estimado_saida": "", "atrasado": "0" },
  { "nome": "AL SAFAT", "mmsi": "636017670", "ultima_atualizacao": "30/07/2022 17:58:38", "estimado_marinetraffic": "03/08/2022 12:00:00", "estimado_terminal": "02/08/2022 12:00:00", "berco": "2", "comprimento": "306", "comprimento_maximo": "383", "imo": "9349497", "calado": "10.4", "lat": "-8.736645", "lon": "-34.77029", "armador": "HLC             ", "movimentacao_embarque": "333", "movimentacao_descarga": "0", "movimentacao_total": "333", "estimado_saida": "", "atrasado": "0" },
  { "nome": "MONTE AZUL", "mmsi": "563051700", "ultima_atualizacao": "30/07/2022 17:24:54", "estimado_marinetraffic": "02/08/2022 23:00:00", "estimado_terminal": "03/08/2022 01:00:00", "berco": "3", "comprimento": "272", "comprimento_maximo": "350", "imo": "9348053", "calado": "9.6", "lat": "-8.56385", "lon": "-34.62025", "armador": "HSG             ", "movimentacao_embarque": "621", "movimentacao_descarga": "0", "movimentacao_total": "333", "estimado_saida": "", "atrasado": "0" },
  { "nome": "LOG IN PANTANAL", "mmsi": "710003840", "ultima_atualizacao": "31/07/2022 02:59:50", "estimado_marinetraffic": "31/07/2022 19:00:00", "estimado_terminal": "03/08/2022 12:00:00", "berco": "1", "comprimento": "182.48", "comprimento_maximo": "245", "imo": "9351799", "calado": "9.6", "lat": "-22.61471", "lon": "-41.43849", "armador": "LOG             ", "movimentacao_embarque": "621", "movimentacao_descarga": "0", "movimentacao_total": "333", "estimado_saida": "", "atrasado": "0" },
  { "nome": "KOTA PAHLAWAN", "mmsi": "563033800", "ultima_atualizacao": "26/07/2022 12:50:36", "estimado_marinetraffic": "03/08/2022 13:00:00", "estimado_terminal": "03/08/2022 13:00:00", "berco": "3", "comprimento": "330", "comprimento_maximo": "350", "imo": "9786712", "calado": "14.9", "lat": "-34.25653", "lon": "13.88456", "armador": "PIL             ", "movimentacao_embarque": "621", "movimentacao_descarga": "0", "movimentacao_total": "333", "estimado_saida": "", "atrasado": "0" }
  ]
};  

const santosBrasilChegada = {
  "name": "output_santosbrasil_chegada",
  "features": [
  { "nome": "MAERSK BERMUDA", "mmsi": "563096400", "ultima_atualizacao": "31/07/2022 07:52:16", "chegada_marinetraffic": "30/07/2022 16:41:00", "chegada_terminal": "--", "berco": "2", "comprimento": "194.93", "comprimento_maximo": "383", "imo": "9697014", "calado": "8.8", "lat": "-26.18422", "lon": "-48.60041", "armador": "MSL             ", "movimentacao_embarque": "474", "movimentacao_descarga": "479", "movimentacao_total": "953", "chegada_saida": "", "atrasado": "0", "shipid": "3772462", "atracacao_prevista_terminal": null },
  { "nome": "COSCO SHIPPING ZHUO YUE", "mmsi": "412260000", "ultima_atualizacao": "31/07/2022 07:48:15", "chegada_marinetraffic": "31/07/2022 00:34:00", "chegada_terminal": "--", "berco": "1", "comprimento": "201.8", "comprimento_maximo": "245", "imo": "9872157", "calado": "9", "lat": "-25.5008", "lon": "-48.502", "armador": "CPO             ", "movimentacao_embarque": "1", "movimentacao_descarga": "479", "movimentacao_total": "953", "chegada_saida": "", "atrasado": "0", "shipid": "5967327", "atracacao_prevista_terminal": "02/08/2022 06:30:00" },
  { "nome": "GREAT QIN", "mmsi": "477711900", "ultima_atualizacao": "30/07/2022 02:44:42", "chegada_marinetraffic": "30/07/2022 03:15:00", "chegada_terminal": "--", "berco": "1", "comprimento": "291.8", "comprimento_maximo": "245", "imo": "9526667", "calado": "17.5", "lat": "22.63775", "lon": "69.58387", "armador": "CPO             ", "movimentacao_embarque": "554", "movimentacao_descarga": "1979", "movimentacao_total": "2272", "chegada_saida": "", "atrasado": "0", "shipid": "4850397", "atracacao_prevista_terminal": "02/08/2022 21:30:00" },
  { "nome": "COSCO SHIPPING VISION", "mmsi": "477696900", "ultima_atualizacao": "31/07/2022 07:54:50", "chegada_marinetraffic": "27/07/2022 07:31:00", "chegada_terminal": "--", "berco": "1", "comprimento": "201.8", "comprimento_maximo": "245", "imo": "9881677", "calado": "7.5", "lat": "-23.97372", "lon": "-46.29359", "armador": "CPO             ", "movimentacao_embarque": "333", "movimentacao_descarga": "0", "movimentacao_total": "333", "chegada_saida": "", "atrasado": "0", "shipid": "6580745", "atracacao_prevista_terminal": "04/08/2022 10:30:00" },
  { "nome": "EVER URBAN", "mmsi": "357939000", "ultima_atualizacao": "31/07/2022 07:43:24", "chegada_marinetraffic": "30/07/2022 02:00:00", "chegada_terminal": "--", "berco": "3", "comprimento": "285", "comprimento_maximo": "350", "imo": "9169160", "calado": "11.3", "lat": "-25.63879", "lon": "-48.18372", "armador": "EMA             ", "movimentacao_embarque": "621", "movimentacao_descarga": "0", "movimentacao_total": "333", "chegada_saida": "", "atrasado": "0", "shipid": "1187574", "atracacao_prevista_terminal": "04/08/2022 01:00:00" },
  { "nome": "FERNAO DE MAGALHAES", "mmsi": "253414000", "ultima_atualizacao": "31/07/2022 07:56:42", "chegada_marinetraffic": "27/02/2022 12:45:00", "chegada_terminal": "--", "berco": "1", "comprimento": "138.5", "comprimento_maximo": "245", "imo": "9466697", "calado": "6.5", "lat": "51.31897", "lon": "3.212007", "armador": "ALI             ", "movimentacao_embarque": "621", "movimentacao_descarga": "0", "movimentacao_total": "333", "chegada_saida": "", "atrasado": "0", "shipid": "297882", "atracacao_prevista_terminal": "05/08/2022 01:00:00" },
  { "nome": "CAP SAN LORENZO", "mmsi": "219096000", "ultima_atualizacao": "31/07/2022 08:09:28", "chegada_marinetraffic": "31/07/2022 00:15:00", "chegada_terminal": "--", "berco": "3", "comprimento": "333.2", "comprimento_maximo": "350", "imo": "9622227", "calado": "12.1", "lat": "-24.18368", "lon": "-46.37471", "armador": "HSG             ", "movimentacao_embarque": "1365", "movimentacao_descarga": "637", "movimentacao_total": "2002", "chegada_saida": "", "atrasado": "0", "shipid": "297177", "atracacao_prevista_terminal": "01/08/2022 21:30:00" },
  { "nome": "NORTHERN PRIORITY", "mmsi": "636091832", "ultima_atualizacao": "2022-07-31 09:39:07", "chegada_marinetraffic": "2022-07-31 09:27:00", "chegada_terminal": "2022-07-31 09:30:00", "berco": "1", "comprimento": "264.28", "comprimento_maximo": "245", "imo": "9450313", "calado": "10.2", "lat": "-23.9929", "lon": "-46.31256", "armador": "MSL             ", "movimentacao_embarque": "706", "movimentacao_descarga": "318", "movimentacao_total": "1024", "chegada_saida": "", "atrasado": "0", "shipid": "758281", "atracacao_prevista_terminal": "\n31\/07\/2022\n10:30\n" }
]
};    

const praticagem = {
  "name": "output_praticagem",
  "features": [
  { "nome": "STOLT OCELOT", "tempo_estimado": "05:40:00" }, 
  { "nome": "TRF MARQUETTE", "tempo_estimado": "05:40:00" }, 
  { "nome": "CANADIAN HIGHWAY", "tempo_estimado": "06:10:00" },
  { "nome": "NORTHERN PRIORITY", "tempo_estimado": "10:10:00" }
  
  ]
};

export default function Atracacao() {

  const renderChegadas = ({item}) => {
    return (
      <View style={
       styles.card
      }>
        <Text style={styles.texto}>IMO: {item.imo}</Text>
        <Text style={styles.texto}>Navio: {item.nome}</Text>
        <Text style={styles.texto}>Armador: {item.armador}</Text>
        <Text style={styles.texto}>Berço: {item.berco}</Text>
        <Text style={styles.texto}>Quantidade de Container para Descarga: {item.movimentacao_descarga}</Text>
        <Text style={styles.texto}>Previsão de Atracação do Terminal: {item.atracacao_prevista_terminal}</Text>
        {(item.nome == "NORTHERN PRIORITY" ) ? <Text style={styles.texto}>Previsão de Chegada (PCS Santos e Praticagem): {praticagem.features[3].tempo_estimado}</Text> : ''}
        <Text style={styles.texto}>Atracação efetiva do terminal: {item.chegada_terminal}</Text>
        <Text style={styles.texto}>Loa: {item.comprimento}</Text>
        <Text style={styles.texto}>Comprimento do Berço: {item.comprimento_maximo}</Text>
        <Pressable style={styles.botao}  onPress={() => Linking.openURL('https://www.marinetraffic.com/en/ais/home/shipid:'+item.shipid+'/zoom:14')}>
          <Text style={styles.textoBotao}>Exibir no Marine Traffic</Text></Pressable>
      </View>
    );
  };

  useEffect(async () => {
    await santosBrasilChegada.features;
  }, []);

 return (
   <View style={styles.container}>
     <Text style={styles.titulo}>Confirmação de Atracação na Santos Brasil</Text>
    
     <FlatList 
        horizontal={true}
        data={santosBrasilChegada.features}
        renderItem={renderChegadas}
        />
   </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#1F1F1F',
  },
  card:{
    backgroundColor: '#FBFCFF',
    marginVertical: 25,
    marginHorizontal: 15,
    padding: 25,
    borderRadius: 35,
  },
  titulo:{
    color: '#CFCFEC',
    fontSize: 25,
    fontWeight: 500,
    textAlign: 'center'
  },
  texto:{
    textAlign: 'left',
    marginBottom: 10,
    fontWeight: '500'
  },
  botao:{
    backgroundColor: "#6290C3",
    padding: 15,
    borderRadius: 25,
    width: "80%",
    marginHorizontal: 'auto'
  },
  textoBotao:{
    textAlign: 'center',
    color: "#FBFCFF",
    fontSize: 15
  }
});