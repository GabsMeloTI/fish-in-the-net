import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native';
import { format } from 'date-fns'; // Importe a função format
import Menu from '../../components/menu/App';
import Footer from '../../components/footer/App';
import axios from 'axios';
const linha = require('../../assets/img/linha.png');

const api = axios.create({
  baseURL: "https://solutech-fiap-default-rtdb.firebaseio.com/"
});

export default function VisaoRegistros({ navigation }) {
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
          registro.data = format(new Date(registro.data), 'dd/MM/yyyy'); // Use a função format para formatar a data
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
        <View style={styles.divisao}>
            <Text style={styles.registrosTexto}>{item.especie}</Text>
            <Text style={styles.registrosTexto}>{item.data}</Text>
        </View>
        <Image source={linha} style={styles.linhaRodape} />
        <View style={styles.divisao}> 
            <Text style={styles.registrosTexto}>{item.peso}</Text>
            <Text style={styles.registrosTexto}>|</Text>
            <Text style={styles.registrosTexto}>{item.quantidade}</Text>
        </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Menu navigation={navigation} />
      <SafeAreaView style={styles.content}>
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

        <FlatList
          data={registros}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.flatListContainer}
        />
        <Footer />
      </SafeAreaView>
      
    </View>
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
  },
  divisao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  registrosTexto: {
    color: '#fff',
  },
  linhaRodape: {
    height: 2,
    marginTop: '5%',
    width: '100%',
    marginBottom: '5%',
  },
});
