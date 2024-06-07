import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, Modal, FlatList, Image, SafeAreaView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; 
import axios from 'axios';
import Menu from '../../components/menu/App';
import Footer from '../../components/footer/App';
import { format } from 'date-fns';

const linha = require('../../assets/img/linha.png');
const api = axios.create({
    baseURL: "https://solutech-fiap-default-rtdb.firebaseio.com/"
});

export default function EncontrosEVendas({ navigation, route }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [encontros, setEncontros] = useState({
    data: new Date(),
    hora: "",
    local: "",
    status: "",
  });
  const [encontrosListagem, setEncontrosListagem] = useState([]);

  function cadastrar() {
    if (!encontros.data || !encontros.hora || !encontros.status) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    api.post('/encontros.json', encontros)
      .then(() => {
        alert("Encontro salvo com sucesso!");
        fetchEncontros(); 
        navigation.navigate('EncontrosEVendas');
      })
      .catch((err) => {
        alert("Erro! " + err);
      });
  }

  const handleChange = (name, value) => {
    setEncontros({
      ...encontros,
      [name]: value
    });
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || encontros.data;
    setShowDatePicker(false);
  
    setEncontros({
      ...encontros,
      data: currentDate,
    });
  };

  const fetchEncontros = async () => {
    try {
      const response = await api.get('/encontros.json');
      const data = response.data;
      const encontrosList = [];
      for (const key in data) {
        const encontro = {
          id: key,
          ...data[key]
        };
        encontro.data = new Date(data[key].data); 
        encontro.data = format(encontro.data, 'dd/MM/yyyy'); 
        encontrosList.push(encontro);
      }
      setEncontrosListagem(encontrosList);
    } catch (error) {
      console.error("Erro ao buscar encontro:", error);
    }
  };
  
  useEffect(() => {
    fetchEncontros();
  }, []);


  const renderItem = ({ item }) => (
    <View style={styles.encontroItem}>
       <View style={styles.textosGerais}>
        <Text style={styles.encontroText}>Data: {item.data}</Text>
        <Text style={styles.encontroText}>Hora: {format(new Date(item.hora), 'HH:mm')}</Text>
       </View>
       <Image source={linha} style={styles.linhaRodape} />
       <View style={styles.textosGerais}>
        <Text style={styles.encontroText}>Status: {item.status}</Text>
        <Text style={styles.encontroText}>Local: {item.local}</Text>
       </View>
      <TouchableOpacity style={styles.excluirButton} onPress={() => handleExcluirEncontro(item.id)}>
        <Text style={styles.excluirButtonText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );
  

  const handleNovoEncontro = () => {
    setModalVisible(true);
  };

  const handleCriarEncontro = () => {
    setModalVisible(false);
    cadastrar();
  };

  const handleExcluirEncontro = async (encontroId) => {
    try {
      await api.delete(`/encontros/${encontroId}.json`);
      setEncontrosListagem(encontrosListagem.filter(item => item.id !== encontroId));
      alert("Encontro excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir encontro:", error);
      alert("Erro ao excluir encontro!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Menu navigation={navigation} route={route}/>
      <View style={styles.conteudo}>
        <View style={styles.conteudoTitle}>
          <Text style={styles.titulo}>Encontros e Vendas</Text>
        </View>

        <TouchableOpacity style={styles.novoEncontroButton} onPress={handleNovoEncontro}>
          <Text style={styles.novoEncontroButtonText}>Novo Encontro</Text>
        </TouchableOpacity>
        
        <FlatList
          data={encontrosListagem}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.flatListContent}
        />
        <Footer/>
      </View>

      <StatusBar style="auto" />

      <Modal
        animationType="slide"
        transparent={true}
       
        visible={modalVisible}
        onRequestClose={() => {
            setModalVisible(false);
      }}>
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <Text style={styles.modalTitle}>CRIAR ENCONTRO</Text>

            <DateTimePicker
                value={encontros.data}
                mode="date"
                display="default"
                onChange={handleDateChange}
                style={{ marginBottom: 20, justifyContent: 'space-between' }} 
            />

            <DateTimePicker
                value={encontros.data}
                mode="time"
                display="default"
                onChange={(event, selectedTime) => handleChange('hora', selectedTime)}
                style={{ marginBottom: 20, justifyContent: 'space-between' }} 
            />

            <TextInput
                style={styles.input}
                placeholder="Digite o local do encontro"
                placeholderTextColor="#3b3b3b"
                value={encontros.local}
                onChangeText={(text) => handleChange('local', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Digite o status do encontro"
                placeholderTextColor="#3b3b3b"
                value={encontros.status}
                onChangeText={(text) => handleChange('status', text)}
            />
            <TouchableOpacity
                style={styles.botaoModal}
                onPress={handleCriarEncontro}
            >
                <Text style={styles.textoBotao}>Criar Encontro</Text>
            </TouchableOpacity>
            </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    minHeight: height,
  },
  conteudo: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000',
    color: '#fff',
    borderTopLeftRadius: 100,
    paddingBottom: '10%',
    paddingHorizontal: '5%',
    minWidth: '100%',
  },
  conteudoTitle: {
    alignItems: 'center',
    width: '100%',
    marginTop: '18%',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: '1%',
  },
  novoEncontroButton: {
    backgroundColor: '#f2f2f2',
    paddingHorizontal: '12%',
    paddingVertical: '3%',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: '8%',
    width: '60%',
  },
  novoEncontroButtonText: {
    color: '#000',
    fontSize: 12,
  },
  flatListContent: {
    alignItems: 'center',
    width: '80%'
  },
  encontroItem: {
    backgroundColor: '#000',
    padding: '8%',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: '4%',
    width: '100%',
    borderColor: '#fff',
    borderWidth: 1,
  },
  encontroText: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 5,
    width: '50%',
    textAlign: 'center',
  },
  editarButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  textosGerais: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
  linhaRodape: {
    height: 2,
    width: 230,
    marginVertical: '2%',
  },
  excluirButton: {
    backgroundColor: '#ff4848',
    paddingHorizontal: '5%',
    paddingVertical: '3%',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: '2%',
    width: '100%', 
  },
  excluirButtonText: {
    color: '#fff',
    fontSize: 12
  },
centeredView: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
modalView: {
  margin: 20,
  backgroundColor: 'black',
  padding: 35,
  alignItems: 'center',
  shadowColor: '#000',
  minWidth: '100%',
  borderColor: '#fff',
  borderWidth: 1,
  borderTopLeftRadius: 100,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
  width: '80%',
},
modalTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 15,
  color: '#fff',
},
input: {
  height: 40,
  width: '80%',
  borderColor: '#fff',
  borderWidth: 1,
  paddingHorizontal: 10,
  borderRadius: 10,
  color: '#fff',
  marginBottom: '5%',
},
botaoModal: {
  marginTop: '2%',
  backgroundColor: '#f2f2f2',
  paddingHorizontal: '12%',
  paddingVertical: '3%',
  borderRadius: 10,
  alignItems: 'center',
  marginTop: '8%',
  width: '80%',
},
textoBotao: {
  color: '#000',
  fontSize: 12,
},
});

