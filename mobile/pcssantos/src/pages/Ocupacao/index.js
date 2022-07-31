import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Linking  } from 'react-native';

const outputFundeio = {
  "name": "output_fundeio",
  "features": [
  { "nome": "INDIGO LAKE", "chegada_fundeio": "2022-06-26 16:00:00" },
  { "nome": "GENCO PREDATOR", "chegada_fundeio": "2022-07-01 10:30:00" },
  { "nome": "CIELO DI ANGRA", "chegada_fundeio": "2022-07-01 16:12:00" },
  { "nome": "MAERSK LIRQUEN", "chegada_fundeio": "2022-07-02 03:59:00" },
  { "nome": "LORD BYRON", "chegada_fundeio": "2022-07-08 05:18:00" },
  { "nome": "TBC PASSION", "chegada_fundeio": "2022-07-11 18:12:00" },
  { "nome": "THE HOLY", "chegada_fundeio": "2022-07-11 18:42:00" },
  { "nome": "COSMAR", "chegada_fundeio": "2022-07-12 02:30:00" },
  { "nome": "SOTIRIA", "chegada_fundeio": "2022-07-14 14:00:00" },
  { "nome": "RUBY INDAH", "chegada_fundeio": "2022-07-15 08:42:00" },
  { "nome": "MEGA BENEFIT", "chegada_fundeio": "2022-07-17 12:45:00" },
  { "nome": "CAPTAIN D", "chegada_fundeio": "2022-07-17 15:15:00" },
  { "nome": "ANASTASIA", "chegada_fundeio": "2022-07-17 16:42:00" },
  { "nome": "BELINDA", "chegada_fundeio": "2022-07-18 11:36:00" },
  { "nome": "FIGALIA NAVIGATOR", "chegada_fundeio": "2022-07-18 15:00:00" },
  { "nome": "MEDI SERAPO", "chegada_fundeio": "2022-07-18 21:18:00" },
  { "nome": "NORDSCHELDE", "chegada_fundeio": "2022-07-18 22:36:00" },
  { "nome": "STAR DESPOINA", "chegada_fundeio": "2022-07-20 01:00:00" },
  { "nome": "EVOIKOS THEO", "chegada_fundeio": "2022-07-21 10:15:00" },
  { "nome": "STELLA BELINDA", "chegada_fundeio": "2022-07-21 11:18:00" },
  { "nome": "NEFELI", "chegada_fundeio": "2022-07-22 07:30:00" },
  { "nome": "SHUN TONG", "chegada_fundeio": "2022-07-22 17:00:00" },
  { "nome": "FEDERAL ST LAURENT", "chegada_fundeio": "2022-07-23 07:24:00" },
  { "nome": "JABAL AR RAWDAH", "chegada_fundeio": "2022-07-23 09:46:00" },
  { "nome": "STOLT OCELOT", "chegada_fundeio": "2022-07-23 10:45:00" },
  { "nome": "BALOS", "chegada_fundeio": "2022-07-23 17:45:00" },
  { "nome": "SOL DO BRASIL", "chegada_fundeio": "2022-07-23 21:48:00" },
  { "nome": "PEACE PEARL", "chegada_fundeio": "2022-07-24 07:54:00" },
  { "nome": "TOMINI LIBERTY", "chegada_fundeio": "2022-07-24 08:00:00" },
  { "nome": "TRF MARQUETTE", "chegada_fundeio": "2022-07-24 12:30:00" },
  { "nome": "ARINAGA", "chegada_fundeio": "2022-07-24 13:45:00" },
  { "nome": "THREE SASKIAS", "chegada_fundeio": "2022-07-24 13:54:00" },
  { "nome": "SUNNY BAY", "chegada_fundeio": "2022-07-24 18:18:00" },
  { "nome": "LABRADOR", "chegada_fundeio": "2022-07-24 18:42:00" },
  { "nome": "ALPHA LEGACY", "chegada_fundeio": "2022-07-24 23:30:00" },
  { "nome": "DALIAN STAR D", "chegada_fundeio": "2022-07-25 03:45:00" },
  { "nome": "BOW ARCHITECT", "chegada_fundeio": "2022-07-25 04:50:00" },
  { "nome": "AQUARIUS HONOR", "chegada_fundeio": "2022-07-25 11:15:00" },
  { "nome": "MEL GRACE", "chegada_fundeio": "2022-07-25 17:00:00" },
  { "nome": "RHODES", "chegada_fundeio": "2022-07-25 19:36:00" },
  { "nome": "APHROS", "chegada_fundeio": "2022-07-26 15:24:00" },
  { "nome": "MG SAKURA", "chegada_fundeio": "2022-07-26 18:00:00" },
  { "nome": "IOLCOS LEGACY", "chegada_fundeio": "2022-07-26 18:00:00" },
  { "nome": "UNITY SAKURA", "chegada_fundeio": "2022-07-26 18:30:00" },
  { "nome": "STEFANOS T", "chegada_fundeio": "2022-07-26 20:00:00" },
  { "nome": "CANADIAN HIGHWAY", "chegada_fundeio": "2022-07-26 22:48:00" },
  { "nome": "EMERALD DONGJI", "chegada_fundeio": "2022-07-27 02:00:00" },
  { "nome": "LAZORD A", "chegada_fundeio": "2022-07-27 02:42:00" },
  { "nome": "CLEAROCEAN MELODY", "chegada_fundeio": "2022-07-27 13:42:00" },
  { "nome": "ALPHA CHARM", "chegada_fundeio": "2022-07-27 18:00:00" },
  { "nome": "GIANTS CAUSEWAY", "chegada_fundeio": "2022-07-27 18:20:00" },
  { "nome": "BOW OCEANIC", "chegada_fundeio": "2022-07-27 23:20:00" },
  { "nome": "STOLT BASUTO", "chegada_fundeio": "2022-07-27 23:25:00" },
  { "nome": "OCEAN BREEZE", "chegada_fundeio": "2022-07-27 23:30:00" },
  { "nome": "SCARLET ISLAND", "chegada_fundeio": "2022-07-28 02:12:00" },
  { "nome": "INCE POINT", "chegada_fundeio": "2022-07-28 02:15:00" },
  { "nome": "NAVEGANTES EXPRESS", "chegada_fundeio": "2022-07-28 12:18:00" },
  { "nome": "SC TAURUS", "chegada_fundeio": "2022-07-28 13:30:00" },
  { "nome": "LBC ENERGY", "chegada_fundeio": "2022-07-28 13:42:00" },
  { "nome": "MELISSUS", "chegada_fundeio": "2022-07-28 15:00:00" },
  { "nome": "ROSCO LEMON", "chegada_fundeio": "2022-07-28 15:00:00" },
  { "nome": "MTM TORTOLA", "chegada_fundeio": "2022-07-28 15:06:00" },
  { "nome": "NORD COPPER", "chegada_fundeio": "2022-07-28 15:18:00" },
  { "nome": "AQUAGEMINI", "chegada_fundeio": "2022-07-28 15:42:00" },
  { "nome": "FLAG METTE", "chegada_fundeio": "2022-07-28 16:30:00" },
  { "nome": "FLUMAR MACEIO", "chegada_fundeio": "2022-07-28 23:40:00" },
  { "nome": "HAFNIA SPARK", "chegada_fundeio": "2022-07-29 00:30:00" },
  { "nome": "AEOLIAN BREEZE", "chegada_fundeio": "2022-07-29 02:40:00" },
  { "nome": "OPAL LEADER", "chegada_fundeio": "2022-07-29 03:12:00" },
  { "nome": "SAN VICENTE", "chegada_fundeio": "2022-07-29 07:30:00" },
  { "nome": "FAIRCHEM FORTITUDE", "chegada_fundeio": "2022-07-29 12:00:00" },
  { "nome": "STOLT COBALT", "chegada_fundeio": "2022-07-29 12:59:00" },
  { "nome": "YANGZE 7", "chegada_fundeio": "2022-07-29 13:30:00" },
  { "nome": "MTM WESTPORT", "chegada_fundeio": "2022-07-29 16:00:00" },
  { "nome": "CMA CGM LITANI", "chegada_fundeio": "2022-07-29 20:00:00" },
  { "nome": "IBIS PACIFIC", "chegada_fundeio": "2022-07-29 21:12:00" },
  { "nome": "ROBERT MAERSK", "chegada_fundeio": "2022-07-29 21:24:00" },
  { "nome": "ATLANTIC POLARIS", "chegada_fundeio": "2022-07-29 21:48:00" },
  { "nome": "ARC RESOLVE", "chegada_fundeio": "2022-07-29 22:35:00" },
  { "nome": "CAP SAN MARCO", "chegada_fundeio": "2022-07-30 02:30:00" },
  { "nome": "CMA CGM PUERTO ANTIOQUIA", "chegada_fundeio": "2022-07-30 02:48:00" },
  { "nome": "AFRICAN TURACO", "chegada_fundeio": "2022-07-30 03:54:00" },
  { "nome": "RUTH", "chegada_fundeio": "2022-07-30 04:00:00" },
  { "nome": "MSC CATERINA", "chegada_fundeio": "2022-07-30 04:15:00" },
  { "nome": "GRANDIS", "chegada_fundeio": "2022-07-30 04:54:00" },
  { "nome": "GRAND SAPPHIRE", "chegada_fundeio": "2022-07-30 05:18:00" },
  { "nome": "TAIPEI TRADER", "chegada_fundeio": "2022-07-30 07:00:00" },
  { "nome": "BALD EAGLE", "chegada_fundeio": "2022-07-30 07:18:00" },
  { "nome": "SHANGHAI HIGHWAY", "chegada_fundeio": "2022-07-30 13:12:00" },
  { "nome": "TIAN MU SHAN", "chegada_fundeio": "2022-07-30 15:12:00" },
  { "nome": "COSCO SHIPPING GRACE", "chegada_fundeio": "2022-07-30 15:54:00" },
  { "nome": "ESPERANCE BAY", "chegada_fundeio": "2022-07-30 17:42:00" },
  { "nome": "MSC DARDANELLES", "chegada_fundeio": "2022-07-30 22:24:00" }
  ]
}

const santosbrasil = {
  "name": "output_santosbrasil",
  "features": [
  { "nome": "NORTHERN PRIORITY", "mmsi": "636091832", "ultima_atualizacao": "2022-07-31 07:51:50", "estimado_marinetraffic": "2022-07-31 09:00:00", "estimado_terminal": "2022-07-31 09:00:00", "berco": "1", "comprimento": "264.28", "comprimento_maximo": "245", "imo": "9450313", "calado": "10.2", "lat": "-24.25726", "lon": "-46.14867", "armador": "MSL             ", "movimentacao_embarque": "706", "movimentacao_descarga": "318", "movimentacao_total": "1024", "estimado_saida": "", "atrasado": "1" },
  { "nome": "SAN FELIPE", "mmsi": "538005732", "ultima_atualizacao": "2022-07-24 18:20:19", "estimado_marinetraffic": "2022-08-01 14:00:00", "estimado_terminal": "2022-08-01 06:00:00", "berco": "2", "comprimento": "299.9", "comprimento_maximo": "383", "imo": "9698628", "calado": "13.9", "lat": "-32.96366", "lon": "6.239763", "armador": "ZIM             ", "movimentacao_embarque": "293", "movimentacao_descarga": "1979", "movimentacao_total": "2272", "estimado_saida": "", "atrasado": "0" },
  { "nome": "CMA CGM FORT ST GEORGES", "mmsi": "710005274", "ultima_atualizacao": "2022-07-31 02:48:45", "estimado_marinetraffic": "2022-08-01 10:00:00", "estimado_terminal": "2022-08-01 13:00:00", "berco": "1", "comprimento": "197.2", "comprimento_maximo": "245", "imo": "9261918", "calado": "9.2", "lat": "-21.0586", "lon": "-40.29008", "armador": "MER             ", "movimentacao_embarque": "514", "movimentacao_descarga": "1979", "movimentacao_total": "2272", "estimado_saida": "", "atrasado": "0" },
  { "nome": "KOTA CANTIK", "mmsi": "563149900", "ultima_atualizacao": "2022-07-31 07:53:46", "estimado_marinetraffic": "2022-07-31 10:30:00", "estimado_terminal": "2022-08-01 22:00:00", "berco": "3", "comprimento": "299.95", "comprimento_maximo": "350", "imo": "9494591", "calado": "10.5", "lat": "-26.72702", "lon": "-48.44512", "armador": "PIL             ", "movimentacao_embarque": "554", "movimentacao_descarga": "1979", "movimentacao_total": "2272", "estimado_saida": "", "atrasado": "0" },
  { "nome": "MONTE CERVANTES", "mmsi": "563051200", "ultima_atualizacao": "2022-07-31 07:53:53", "estimado_marinetraffic": "2022-08-01 08:00:00", "estimado_terminal": "2022-08-02 01:00:00", "berco": "2", "comprimento": "272", "comprimento_maximo": "383", "imo": "9283186", "calado": "9.8", "lat": "-33.15998", "lon": "-51.90712", "armador": "MSL             ", "movimentacao_embarque": "985", "movimentacao_descarga": "1979", "movimentacao_total": "2272", "estimado_saida": "", "atrasado": "0" },
  { "nome": "AL SAFAT", "mmsi": "636017670", "ultima_atualizacao": "2022-07-30 17:58:38", "estimado_marinetraffic": "2022-08-03 12:00:00", "estimado_terminal": "2022-08-02 12:00:00", "berco": "2", "comprimento": "306", "comprimento_maximo": "383", "imo": "9349497", "calado": "10.4", "lat": "-8.736645", "lon": "-34.77029", "armador": "HLC             ", "movimentacao_embarque": "333", "movimentacao_descarga": "0", "movimentacao_total": "333", "estimado_saida": "", "atrasado": "0" },
  { "nome": "MONTE AZUL", "mmsi": "563051700", "ultima_atualizacao": "2022-07-30 17:24:54", "estimado_marinetraffic": "2022-08-02 23:00:00", "estimado_terminal": "2022-08-03 01:00:00", "berco": "3", "comprimento": "272", "comprimento_maximo": "350", "imo": "9348053", "calado": "9.6", "lat": "-8.56385", "lon": "-34.62025", "armador": "HSG             ", "movimentacao_embarque": "621", "movimentacao_descarga": "0", "movimentacao_total": "333", "estimado_saida": "", "atrasado": "0" },
  { "nome": "LOG IN PANTANAL", "mmsi": "710003840", "ultima_atualizacao": "2022-07-31 02:59:50", "estimado_marinetraffic": "2022-07-31 19:00:00", "estimado_terminal": "2022-08-03 12:00:00", "berco": "1", "comprimento": "182.48", "comprimento_maximo": "245", "imo": "9351799", "calado": "9.6", "lat": "-22.61471", "lon": "-41.43849", "armador": "LOG             ", "movimentacao_embarque": "621", "movimentacao_descarga": "0", "movimentacao_total": "333", "estimado_saida": "", "atrasado": "0" },
  { "nome": "KOTA PAHLAWAN", "mmsi": "563033800", "ultima_atualizacao": "2022-07-26 12:50:36", "estimado_marinetraffic": "2022-08-03 13:00:00", "estimado_terminal": "2022-08-03 13:00:00", "berco": "3", "comprimento": "330", "comprimento_maximo": "350", "imo": "9786712", "calado": "14.9", "lat": "-34.25653", "lon": "13.88456", "armador": "PIL             ", "movimentacao_embarque": "621", "movimentacao_descarga": "0", "movimentacao_total": "333", "estimado_saida": "", "atrasado": "0" }
  ]
};  

const santosBrasilChegada = {
  "name": "output_santosbrasil_chegada",
  "features": [
  { "nome": "MAERSK BERMUDA", "mmsi": "563096400", "ultima_atualizacao": "2022-07-31 07:52:16", "chegada_marinetraffic": "2022-07-30 16:41:00", "chegada_terminal": "--", "berco": "2", "comprimento": "194.93", "comprimento_maximo": "383", "imo": "9697014", "calado": "8.8", "lat": "-26.18422", "lon": "-48.60041", "armador": "MSL             ", "movimentacao_embarque": "474", "movimentacao_descarga": "479", "movimentacao_total": "953", "chegada_saida": "", "atrasado": "0", "shipid": "3772462", "atracacao_prevista_terminal": null },
  { "nome": "COSCO SHIPPING ZHUO YUE", "mmsi": "412260000", "ultima_atualizacao": "2022-07-31 07:48:15", "chegada_marinetraffic": "2022-07-31 00:34:00", "chegada_terminal": "--", "berco": "1", "comprimento": "201.8", "comprimento_maximo": "245", "imo": "9872157", "calado": "9", "lat": "-25.5008", "lon": "-48.502", "armador": "CPO             ", "movimentacao_embarque": "1", "movimentacao_descarga": "479", "movimentacao_total": "953", "chegada_saida": "", "atrasado": "0", "shipid": "5967327", "atracacao_prevista_terminal": "2022-08-02 06:30:00" },
  { "nome": "GREAT QIN", "mmsi": "477711900", "ultima_atualizacao": "2022-07-30 02:44:42", "chegada_marinetraffic": "2022-07-30 03:15:00", "chegada_terminal": "--", "berco": "1", "comprimento": "291.8", "comprimento_maximo": "245", "imo": "9526667", "calado": "17.5", "lat": "22.63775", "lon": "69.58387", "armador": "CPO             ", "movimentacao_embarque": "554", "movimentacao_descarga": "1979", "movimentacao_total": "2272", "chegada_saida": "", "atrasado": "0", "shipid": "4850397", "atracacao_prevista_terminal": "2022-08-02 21:30:00" },
  { "nome": "COSCO SHIPPING VISION", "mmsi": "477696900", "ultima_atualizacao": "2022-07-31 07:54:50", "chegada_marinetraffic": "2022-07-27 07:31:00", "chegada_terminal": "--", "berco": "1", "comprimento": "201.8", "comprimento_maximo": "245", "imo": "9881677", "calado": "7.5", "lat": "-23.97372", "lon": "-46.29359", "armador": "CPO             ", "movimentacao_embarque": "333", "movimentacao_descarga": "0", "movimentacao_total": "333", "chegada_saida": "", "atrasado": "0", "shipid": "6580745", "atracacao_prevista_terminal": "2022-08-04 10:30:00" },
  { "nome": "EVER URBAN", "mmsi": "357939000", "ultima_atualizacao": "2022-07-31 07:43:24", "chegada_marinetraffic": "2022-07-30 02:00:00", "chegada_terminal": "--", "berco": "3", "comprimento": "285", "comprimento_maximo": "350", "imo": "9169160", "calado": "11.3", "lat": "-25.63879", "lon": "-48.18372", "armador": "EMA             ", "movimentacao_embarque": "621", "movimentacao_descarga": "0", "movimentacao_total": "333", "chegada_saida": "", "atrasado": "0", "shipid": "1187574", "atracacao_prevista_terminal": "2022-08-04 01:00:00" },
  { "nome": "FERNAO DE MAGALHAES", "mmsi": "253414000", "ultima_atualizacao": "2022-07-31 07:56:42", "chegada_marinetraffic": "2022-02-27 12:45:00", "chegada_terminal": "--", "berco": "1", "comprimento": "138.5", "comprimento_maximo": "245", "imo": "9466697", "calado": "6.5", "lat": "51.31897", "lon": "3.212007", "armador": "ALI             ", "movimentacao_embarque": "621", "movimentacao_descarga": "0", "movimentacao_total": "333", "chegada_saida": "", "atrasado": "0", "shipid": "297882", "atracacao_prevista_terminal": "2022-08-05 01:00:00" },
  { "nome": "CAP SAN LORENZO", "mmsi": "219096000", "ultima_atualizacao": "2022-07-31 08:09:28", "chegada_marinetraffic": "2022-07-31 00:15:00", "chegada_terminal": "--", "berco": "3", "comprimento": "333.2", "comprimento_maximo": "350", "imo": "9622227", "calado": "12.1", "lat": "-24.18368", "lon": "-46.37471", "armador": "HSG             ", "movimentacao_embarque": "1365", "movimentacao_descarga": "637", "movimentacao_total": "2002", "chegada_saida": "", "atrasado": "0", "shipid": "297177", "atracacao_prevista_terminal": "2022-08-01 21:30:00" }
  ]
};    

const praticagem = {
  "name": "output_praticagem",
  "features": [
  { "nome": "STOLT OCELOT", "tempo_estimado": "05:40:00" }, 
  { "nome": "TRF MARQUETTE", "tempo_estimado": "05:40:00" }, 
  { "nome": "CANADIAN HIGHWAY", "tempo_estimado": "06:10:00" }
  ]
};

export default function Ocupacao() {

  const renderChegadas = ({item}) => {
    return (
      <View style={
       styles.card
      }>
        <Text style={styles.texto}>IMO: {item.imo}</Text>
        <Text style={styles.texto}>Navio: {item.nome}</Text>
        <Text style={styles.texto}>Previsão de Saída: {item.estimado_saida}</Text>
        <Text style={styles.texto}>Nível da Maré: {item.calado}</Text>
        {(item.atrasado) == 1 ? <Text style={styles.alerta}>Atrasado para Saída</Text> : ''}
        <Pressable style={styles.botao}  onPress={() => Linking.openURL('https://www.marinetraffic.com/en/ais/home/shipid:'+item.shipid+'/zoom:14')}>
          <Text style={styles.textoBotao}>Exibir no Marine Traffic</Text></Pressable>
      </View>
    );
  };

  useEffect(async () => {
    await santosbrasil.features;
  }, []);

 return (
   <View style={styles.container}>
     <Text style={styles.titulo}>Visão de Ocupação do Berço</Text>
    
     <FlatList 
        horizontal={true}
        data={santosbrasil.features}
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
    color: '#6290C3',
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
  },
  alerta:{
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10
  }
});