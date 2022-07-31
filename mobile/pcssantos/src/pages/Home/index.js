import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
 
export default function Home() {
 return (
   <View style={styles.container}>
     

     <Image
      source={{ uri: 'https://raw.githubusercontent.com/PedroSalvino/spa-internship/mobile/mobile/pcssantos/src/assets/logo-pcs.png'}}
      style={{ width: 350, height: 350, borderRadius: 30, marginHorizontal: 'auto'}}
     />

      <View>
        <Text></Text>
      </View>

     <View>
      <Text>Marine Traffic</Text>

     </View>
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    marginVertical: 'auto',
    backgroundColor: "#1F1F1F"
  },
  titulo:{
    color: '#EF798A',
    fontSize: 35,
    fontWeight: 500,
  },
});