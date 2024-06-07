import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Menu from '../../components/menu/App';
import Footer from '../../components/footer/App';
import axios from 'axios';

const api = axios.create({
    baseURL: "https://solutech-fiap-default-rtdb.firebaseio.com/"
});

export default function AddOferta({ navigation, route }) {
  const usuario = route.params && route.params.usuario;
  const [ofertas, setOfertas] = useState({
    especie: "",
    quantidade: "",
    preco: "",
    status: "",
  });

  const criarOferta = () => {
    if (!ofertas.especie || !ofertas.quantidade || !ofertas.preco || !ofertas.status) {
        alert("Por favor, preencha todos os campos!");
        return;
      }
  
      const ofertasCopy = { ...ofertas };
      api.post('/ofertas.json', ofertasCopy)
        .then(() => {
          alert("Oferta criada com sucesso!");
          navigation.navigate('Ofertas');
        })
        .catch((err) => {
          alert("Erro! " + err);
        });
  };

  const handleChange = (name, value) => {
    setOfertas({
      ...ofertas,
      [name]: value
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Menu navigation={navigation} route={route} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Criar Nova Oferta</Text>
        </View>

        <View style={styles.opcoes}>
          <TouchableOpacity >
            <Text style={styles.opcoesTextoP}>Criar Nova Oferta</Text>
          </TouchableOpacity>
          <Text style={styles.opcoesTexto}>|</Text>
          <TouchableOpacity>
            <Text style={styles.opcoesTexto} onPress={() => navigation.navigate('Ofertas')}>Visualizar Ofertas</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Espécie do Peixe:</Text>
          <TextInput
            style={styles.input}
            value={ofertas.especie}
            placeholder="Digite Espécie do Peixe"
            placeholderTextColor="#3b3b3b"
            onChangeText={(text) => handleChange('especie', text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Quantidade:</Text>
          <TextInput
            style={styles.input}
            value={ofertas.quantidade}
            placeholder="Digite a Quantidade"
            placeholderTextColor="#3b3b3b"
            onChangeText={(text) => handleChange('quantidade', text)}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Preço(unidade):</Text>
          <TextInput
            style={styles.input}
            value={ofertas.preco}
            placeholder="Digite o Preço"
            placeholderTextColor="#3b3b3b"
            onChangeText={(text) => handleChange('preco', text)}
            keyboardType="numeric"
          />
        </View>
        

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Status (Disponível/Vendido):</Text>
          <TextInput
            style={styles.input}
            value={ofertas.status}
            placeholder="Digite o status do produto"
            placeholderTextColor="#3b3b3b"
            onChangeText={(text) => handleChange('status', text)}
          />
        </View>

        <TouchableOpacity style={styles.botao} onPress={criarOferta}>
          <Text style={styles.botaoTexto}>Criar Oferta</Text>
        </TouchableOpacity>
        <Footer />
      </View>
    </ScrollView>
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
    marginBottom: 30,
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
  inputContainer: {
  },
  label: {
    fontSize: 12,
    color: '#fff',
    width: '80%',
    marginBottom: '2%',
  },
  input: {
    height: 40,
    width: 280,
    borderColor: '#fff',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#000',
    color: '#fff',
  },
  botao: {
    marginTop: '5%',
    backgroundColor: '#f2f2f2',
    paddingHorizontal: '12%',
    paddingVertical: '3%',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: '0%',
    width: 280,
  },
  botaoTexto: {
    color: '#000',
    fontSize: 12,
  },
});
