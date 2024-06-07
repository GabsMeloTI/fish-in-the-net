import React from 'react';
import { StatusBar, Image, StyleSheet, Text, View, TouchableOpacity , Linking } from 'react-native';

const linha = require('../../assets/img/linha.png');
const instagram = require('../../assets/img/Instagram.png');
const facebook = require('../../assets/img/Facebook.png');
const twitter = require('../../assets/img/TwitterX.png');

export default function Footer() {
    const handleInstagramPress = () => {
      Linking.openURL('https://www.instagram.com/gb__melo/');
    };
    const handleFacebookPress = () => {
      Linking.openURL('https://www.facebook.com/gabrielmeloccri/?locale=pt_BR');
    };
    const handleTwiterPress = () => {
      Linking.openURL('https://x.com/gb___melo');
    };
    return(
        <View style={styles.rodape}>
          <View>
            <Image source={linha} style={styles.linhaRodape} />
          </View>

          <View style={styles.conteudoRodape}>
            <View style={styles.textGeral}>
              <View style={styles.textTitulo}>
                <Text style={styles.textRodape}>Conectando pescadores e compradores para uma pesca mais sustentável e eficiente.</Text>
              </View>
              <View style={styles.textContato}>
                <Text style={styles.textRodape}>Contato:</Text>
                <Text style={styles.textRodape}>suporte@peixenarede.com</Text>
              </View>
            </View>
            <View>
              <View>
                <Text style={styles.textRedes}>Nossas Redes Sociais:</Text>
              </View>
              <View>
                <TouchableOpacity  style={styles.imageRedes} onPress={handleFacebookPress}>
                  <Image source={facebook} style={styles.imgRodape} /> 
                  <Text style={styles.textRedes}>Peixe na Rede</Text>
                </TouchableOpacity >
                <TouchableOpacity  style={styles.imageRedes} onPress={handleTwiterPress}>
                  <Image source={twitter} style={styles.imgRodape} />
                  <Text style={styles.textRedes}>Peixe na Rede</Text>
                </TouchableOpacity >
                <TouchableOpacity  style={styles.imageRedes} onPress={handleInstagramPress}>
                  <Image source={instagram} style={styles.imgRodape} />
                  <Text style={styles.textRedes}>peixe_na_rede</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
  rodape: {
    flexDirection: "column",
    width: '100%',
  },
  conteudoRodape: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: "row",
    width: '100%',
    paddingHorizontal: '7%'
  },
  textRodape: {
    width: 180,
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
  textRedes: {
    fontSize: 12,
    marginBottom: '10%',
    color: '#fff',
  },
  imageRedes: {
    flexDirection: "row",
  },
  linhaRodape: {
    height: 2,
    marginTop: '5%',
    width: '100%',
    marginBottom: '5%',
  },
  imgRodape: {
    width: 17,
    height: 17,
    marginRight: '5%',
  },
  textContato: {
    marginTop: '15%',
  },
  
});