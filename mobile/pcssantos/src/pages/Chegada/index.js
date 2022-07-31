import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList  } from 'react-native';

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

export default function Chegada() {

  const renderChegadas = ({item}) => {
    return (
      <View style={
       styles.card
      }>
        <Text>{item.nome}</Text>
        <br/>
        <Text>{item.chegada_fundeio}</Text>
      </View>
    );
  };

  useEffect(async () => {
    await outputFundeio.features;
  }, []);

 return (
   <View>
     <Text>Confirmação de Chegada na barra</Text>
    
     <FlatList 
        horizontal={true}
        data={outputFundeio.features}
        renderItem={ renderChegadas}
        />
   </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30
  },
  card:{
    backgroundColor: '#F9F5E3',
    marginVertical: 25,
    marginHorizontal: 15,
    padding: 25,
    textAlign: 'center'
  },
  tituloCard:{
    color: '#EF798A',
    fontSize: 20,
    fontWeight: 500,
  },

});