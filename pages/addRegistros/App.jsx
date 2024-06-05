import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Menu from '../../components/menu/App';
import Footer from '../../components/footer/App';
import axios from 'axios';
import DatePicker from '@react-native-community/datetimepicker'; // Importe o DatePicker do novo pacote

const api = axios.create({
  baseURL: "https://solutech-fiap-default-rtdb.firebaseio.com/"
});

export default function AdicionarRegistros({ navigation }) {
  const [registro, setRegistro] = useState({
    data: new Date(),
    especie: "",
    quantidade: "",
    peso: "",
  });

  function cadastrar() {
    if (!registro.especie || !registro.quantidade || !registro.peso) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    const registroCopy = { ...registro };
    api.post('/registros.json', registroCopy)
      .then(() => {
        alert("Registro salvo com sucesso!");
        navigation.navigate('VisaoRegistros');
      })
      .catch((err) => {
        alert("Erro! " + err);
      });
  }

  const handleChange = (name, value) => {
    setRegistro({
      ...registro,
      [name]: value
    });
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || registro.data;
    setRegistro({
      ...registro,
      data: currentDate
    });
  };

  return (
    <ScrollView>
      <Menu navigation={navigation} />
      <View style={styles.conteudo}>
        <View style={styles.header}>
          <Text style={styles.title}>Registro de Pesca</Text>
        </View>

        <View style={styles.opcoes}>
          <TouchableOpacity onPress={() => navigation.navigate('Registros')}>
            <Text style={styles.opcoesTextoP}>Adicionar</Text>
          </TouchableOpacity>
          <Text style={styles.opcoesTexto}>|</Text>
          <TouchableOpacity onPress={() => navigation.navigate('VisaoRegistros')}>
            <Text style={styles.opcoesTexto}>Ver Registros</Text>
          </TouchableOpacity>
        </View>

        <View >
          <View style={styles.geralInput}>
            <Text style={styles.desInput}>Espécie do peixe:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite a espécie do peixe capturado"
              placeholderTextColor="#3b3b3b"
              value={registro.especie}
              onChangeText={(text) => handleChange('especie', text)}
            />
          </View>

          <View style={styles.geralInput}>
            <Text style={styles.desInput}>Quantidade:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite a quantidade de peixes capturados"
              placeholderTextColor="#3b3b3b"
              value={registro.quantidade}
              keyboardType="numeric"
              onChangeText={(numeric) => handleChange('quantidade', numeric)}
            />
          </View>

          <View style={styles.geralInput}>
            <Text style={styles.desInput}>Peso(Aproximadamente):</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o peso do peixe capturado"
              placeholderTextColor="#3b3b3b"
              value={registro.peso}
              onChangeText={(text) => handleChange('peso', text)}
            />
          </View>

          <View style={styles.datePickerContainer}>
            <Text style={styles.desInput}>Data da pesca:</Text>
            <DatePicker
              style={styles.escolhaData} // Ajuste o estilo aqui
              mode="date"
              value={registro.data}
              display="default"
              onChange={handleDateChange}
            />
          </View>


          <TouchableOpacity style={styles.botaoOne} onPress={cadastrar}>
            <Text style={styles.textoBotao}>Adicionar Registro</Text>
          </TouchableOpacity>
        </View>
        <Footer />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  conteudo: {
    minHeight: '100%',
    alignItems: 'center',
    borderTopLeftRadius: 100,
    paddingVertical: '10%',
    width: '100%',
    backgroundColor: '#000',
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
  description: {
    fontSize: 16,
    color: 'gray',
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
  geralInput: {
    marginBottom: '2%',
  },
  desInput: {
    fontSize: 12,
    color: '#fff',
    width: '80%',
    marginBottom: '2%',
  },
  titleInput: {
    fontSize: 16,
    color: '#fff',
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
  botaoOne: {
    marginTop: '3%',
    backgroundColor: '#f2f2f2',
    paddingHorizontal: '12%',
    paddingVertical: '3%',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: '8%',
  },
  escolhaData: {
    borderColor: '#fff',
    borderWidth: 1,
    padding: '1%',
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#000',
    color: '#fff',
  },
});
