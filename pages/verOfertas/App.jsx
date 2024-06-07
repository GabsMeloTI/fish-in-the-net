import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native';
import { format } from 'date-fns';
import Menu from '../../components/menu/App';
import Footer from '../../components/footer/App';
import axios from 'axios';

const linha = require('../../assets/img/linha.png');
const api = axios.create({
  baseURL: "https://solutech-fiap-default-rtdb.firebaseio.com/"
});

export default function Ofertas({ navigation, route }) {
  const [ofertas, setOfertas] = useState([]);

  useEffect(() => {
    const fetchOfertas = async () => {
      try {
        const response = await api.get('/ofertas.json');
        const data = response.data;
        const ofertasList = [];
        
        for (const key in data) {
          ofertasList.push({
            id: key,
            ...data[key]
          });
        }
        
        setOfertas(ofertasList);
      } catch (error) {
        console.error("Erro ao buscar ofertas:", error);
      }
    };

    fetchOfertas();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.ofertasContainer}>
      <View style={styles.linhaContainer}>
        <View style={styles.ofertasTextos}>
          <Text style={styles.ofertasTexto}>Status:</Text>
          <Text style={styles.ofertasValor}>{item.status}</Text>
        </View>
        <View style={styles.ofertasTextos}>
          <Text style={styles.ofertasTexto}>Quantidade:</Text>
          <Text style={styles.ofertasValor}>{item.quantidade}</Text>
        </View>
      </View>
      <Image source={linha} style={styles.linhaRodape} />
      <View style={styles.linhaContainer}>
        <View style={styles.ofertasTextos}>
          <Text style={styles.ofertasTexto}>Espécie:</Text>
          <Text style={styles.ofertasValor}>{item.especie}</Text>
        </View>
        <View style={styles.ofertasTextos}>
          <Text style={styles.ofertasTexto}>Preço(Unidade):</Text>
          <Text style={styles.ofertasValor}>{item.preco}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Menu navigation={navigation} route={route}/>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Ofertas</Text>
        </View>

        <View style={styles.opcoes}>
          <TouchableOpacity onPress={() => navigation.navigate('AddOferta')}>
            <Text style={styles.opcoesTexto}>Criar Nova Oferta</Text>
          </TouchableOpacity>
          <Text style={styles.opcoesTexto}>|</Text>
          <TouchableOpacity>
            <Text style={styles.opcoesTextoP}>Visualizar Ofertas</Text>
          </TouchableOpacity>
        </View>

        {ofertas.length === 0 ? (
          <View style={styles.semOfertasHeader}>
            <Text style={styles.semOfertasTexto}>Sem registro até o momento, você pode adicionar um registro na página "Adicionar".</Text>
          </View>
        ) : (
          <FlatList
            data={ofertas}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={2}
            contentContainerStyle={styles.flatListContainer}
          />
        )}
        <Footer />
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    backgroundColor: '#000',
    flex: 1,
    alignItems: 'center',
    borderTopLeftRadius: 100,
    paddingVertical: '10%',
    width: '100%',
    minHeight: '80%',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  opcoes: {
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10%',
  },
  opcoesTextoP: {
    color: '#fff',
    borderColor: '#fff',
    borderWidth: 1,
    padding: '3%',
    borderRadius: 5,
    fontWeight: 'bold',
  },
  opcoesTexto: {
    color: '#fff',
  },
  flatListContainer: {
    alignItems: 'center',
    marginHorizontal: '15%',
    
  },
  ofertasContainer: {
    color: '#fff',
    borderColor: '#fff',
    borderWidth: 1,
    padding: '3%',
    borderRadius: 5,
    fontWeight: 'bold',
    width: '100%',
    marginBottom: 10,
    
  },
  linhaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginVertical: 5,
  },
  ofertasTexto: {
    color: '#fff',
    textAlign: 'center',
  },
  ofertasValor: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  linhaRodape: {
    height: 2,
    marginTop: '5%',
    width: '100%',
    marginBottom: '5%',
  },
  ofertasTextos: {
    flex: 1,
    alignItems: 'center',
  },
  semOfertasTexto: {
    color: "#3b3b3b",
    textAlign: 'center',
    fontSize: 16,
    width: '100%',
    borderColor: "#3b3b3b",
    borderWidth: 1,
    marginTop: '-5%',
    padding: '5%',
    borderRadius: 10,
  },
  semOfertasHeader: {
    minHeight: '38%',
    width: '60%',
    justifyContent: 'center',
  }
});
