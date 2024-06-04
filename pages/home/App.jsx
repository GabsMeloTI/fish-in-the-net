import React from 'react';
import { StatusBar, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import Menu from '../../components/menu/App';
import Footer from '../../components/footer/App';


const localizacao = require('../../assets/img/localizacao.png');
const agenda = require('../../assets/img/agender.png');
const anotacao = require('../../assets/img/observar.png');
const oferta = require('../../assets/img/oferta.png');

export default function Home({ navigation }) {

  return (
    <ScrollView style={styles.container}>
      <Menu navigation={navigation} />

      <View style={styles.conteudo}>
        <View style={styles.conteudoTitle}>
          <Text style={styles.titulo}>HOME</Text>
        </View>

        <View style={styles.conteudoBoasVindas}>
          <Text style={styles.subtitulo}>Bem-vindo ao Peixe na Rede!</Text>
          <Text style={styles.descricao}>Descubra as melhores áreas para pesca, registre suas capturas, e conecte-se diretamente com compradores interessados em produtos pesqueiros frescos e sustentáveis. Nossa plataforma utiliza inteligência artificial para oferecer as melhores sugestões e condições climáticas, garantindo uma pesca mais produtiva e segura.</Text>
        </View>

        <View style={styles.conteudoLinks}>
          <Text style={styles.subtitulo}>O que você deseja?</Text>
          <View style={styles.blocoOpcoes} >
            <View style={styles.blocoImg}>
              <Image source={agenda} style={styles.img} />
            </View>
            <View style={styles.blocoTexto}>
              <Text style={styles.blocoTitulo} onPress={() => { navigation.navigate('MapScreen'); }}>Planejamento de Pesca</Text>
              <Text style={styles.blocoDescricao}>Encontre os locais com maior abundância de peixes e as melhores condições climáticas para sua pescaria.</Text>
            </View>
          </View>
          <View style={styles.blocoOpcoes}>
            <View style={styles.blocoImg}>
              <Image source={anotacao} style={styles.img} />
            </View>
            <View style={styles.blocoTexto}>
              <Text style={styles.blocoTitulo}>Registro de Pesca</Text>
              <Text style={styles.blocoDescricao}>Mantenha um registro detalhado de suas capturas, contribuindo para a gestão sustentável da pesca.</Text>
            </View>
          </View>
          <View style={styles.blocoOpcoes}>
            <View style={styles.blocoImg}>
              <Image source={localizacao} style={styles.img} />
            </View>
            <View style={styles.blocoTexto}>
              <Text style={styles.blocoTitulo}>Encontros e Vendas</Text>
              <Text style={styles.blocoDescricao}>Organize e participe de encontros para vender ou comprar peixes diretamente de outros pescadores.</Text>
            </View>
          </View>
          <View style={styles.blocoOpcoes}>
            <View style={styles.blocoImg}>
              <Image source={oferta} style={styles.img} />
            </View>
            <View style={styles.blocoTexto}>
              <Text style={styles.blocoTitulo}>Ofertas de Peixe</Text>
              <Text style={styles.blocoDescricao}>Encontre os locais com maior abundância de peixes e as melhores condições climáticas para sua pescaria.</Text>
            </View>
          </View>
          <Text style={styles.maisOpcoes}>Essas são algumas sugestões, há mais opções no menu acima.</Text>
        </View>
        <Footer/>
      </View>
      
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8E9E4',
  },
  conteudo: {
    backgroundColor: '#000',
    minHeight: '100%',
    alignItems: 'center',
    borderTopLeftRadius: 100,
    paddingVertical: '10%',
  },
  titulo: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '200',
  },
  conteudoBoasVindas: {
    width: '80%',
    alignItems: 'center',
    paddingVertical: '5%',
    justifyContent: 'center',
  },
  subtitulo: {
    fontSize: 18,
    paddingVertical: '3%',
    color: '#fff',
  },
  descricao: {
    borderColor: '#fff',
    borderWidth: 1,
    color: '#fff',
    fontSize: 12,
    padding: '5%',
    borderRadius: 10,
  },
  conteudoLinks: {
    width: '80%',
    alignItems: 'center',
  },
  blocoOpcoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderColor: '#fff',
    borderWidth: 1,
    padding: '5%',
    borderRadius: 10,
    marginBottom: '5%',
  },
  blocoTexto: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '80%',
  },
  blocoTitulo: {
    color: '#fff',
    fontSize: 16,
    marginBottom: '3%',
  },
  blocoDescricao: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 11,
  },
  maisOpcoes: {
    color: '#fff',
    marginTop: '-3%',
    fontSize: 12,

  }
});
