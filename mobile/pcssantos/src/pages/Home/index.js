import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
 
export default function Home() {
 return (
   <View style={styles.container}>
     <Text style={styles.titulo}>PCS Santos</Text>

     <Image
      source={{ uri: 'https://avatars.githubusercontent.com/u/52542914?v=4'}}
      style={{ width: 300, height: 300}}
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
    margin:0,
    backgroundColor: "#1F1F1F"
  },
  titulo:{
    color: '#EF798A',
    fontSize: 35,
    fontWeight: 500,
  },
});