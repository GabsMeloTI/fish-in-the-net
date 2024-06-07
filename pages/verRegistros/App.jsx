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

export default function VisaoRegistros({ navigation, route, usuario }) {
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    const fetchRegistros = async () => {
      try {
        const response = await api.get('/registros.json');
        const data = response.data;
        const registrosList = [];
        for (const key in data) {
          const registro = {
            id: key,
            ...data[key]
          };
          registro.data = format(new Date(registro.data), 'dd/MM/yyyy');
          registrosList.push(registro);
        }
        setRegistros(registrosList);
      } catch (error) {
        console.error("Erro ao buscar registros:", error);
      }
    };

    fetchRegistros();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.registrosContainer}>
      <View style={styles.linhaContainer}>
        <View style={styles.registrosTextos}>
          <Text style={styles.registrosTexto}>Data:</Text>
          <Text style={styles.registrosValor}>{item.data}</Text>
        </View>
        <View style={styles.registrosTextos}>
          <Text style={styles.registrosTexto}>Quantidade:</Text>
          <Text style={styles.registrosValor}>{item.quantidade}</Text>
        </View>
      </View>
      <Image source={linha} style={styles.linhaRodape} />
      <View style={styles.linhaContainer}>
        <View style={styles.registrosTextos}>
          <Text style={styles.registrosTexto}>Espécie:</Text>
          <Text style={styles.registrosValor}>{item.especie}</Text>
        </View>
        <View style={styles.registrosTextos}>
          <Text style={styles.registrosTexto}>Peso(KG):</Text>
          <Text style={styles.registrosValor}>{item.peso}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Menu navigation={navigation} route={route}/>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Registro de Pesca</Text>
        </View>

        <View style={styles.opcoes}>
          <TouchableOpacity onPress={() => navigation.navigate('AdicionarRegistros')}>
            <Text style={styles.opcoesTexto}>Adicionar</Text>
          </TouchableOpacity>
          <Text style={styles.opcoesTexto}>|</Text>
          <TouchableOpacity>
            <Text style={styles.opcoesTextoP}>Ver Registros</Text>
          </TouchableOpacity>
        </View>

        {registros.length === 0 ? (
          <View style={styles.semRegistrosHeader}>
            <Text style={styles.semRegistrosTexto}>Sem registro até o momento, você pode adicionar um registro na página "Adicionar".</Text>
          </View>
        ) : (
          <FlatList
            data={registros}
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
    width: '100%',
    minHeight: '100%',
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
  registrosContainer: {
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
  registrosTexto: {
    color: '#fff',
    textAlign: 'center',
  },
  registrosValor: {
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
  registrosTextos: {
    flex: 1,
    alignItems: 'center',
  },
  semRegistrosTexto: {
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
  semRegistrosHeader: {
    minHeight: '38%',
    width: '60%',
    justifyContent: 'center',
  }
});
