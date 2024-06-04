import React from 'react';
import { StatusBar, Image, StyleSheet, Text, View } from 'react-native';

const linha = require('../../assets/img/linha.png');
const instagram = require('../../assets/img/Instagram.png');
const facebook = require('../../assets/img/facebook.png');
const twitter = require('../../assets/img/twitterX.png');

export default function Footer() {
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
                <View style={styles.imageRedes}>
                  <Image source={linha} style={styles.imgRodape} /> 
                  <Text style={styles.textRedes}>Solutech Investments</Text>
                </View>
                <View style={styles.imageRedes}>
                  <Image source={linha} style={styles.imgRodape} />
                  <Text style={styles.textRedes}>Solutech</Text>
                </View>
                <View style={styles.imageRedes}>
                  <Image source={linha} style={styles.imgRodape} />
                  <Text style={styles.textRedes}>solutech_investments</Text>
                </View>
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
    marginTop: '10%',
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