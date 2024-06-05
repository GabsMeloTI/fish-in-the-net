import React, { useState } from 'react';
import axios from 'axios';
import { StatusBar, Image, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Dimensions, Modal } from 'react-native';
import Footer from '../../components/footer/App';
const logo = require('../../assets/img/Logo.png');

const api = axios.create({
  baseURL: "https://solutech-fiap-default-rtdb.firebaseio.com/"
});

export default function Forgot({navigation}) {
  const [senha, setSenha] = useState("");
  const [confirmacaoSenha, setConfirmacaoSenha] = useState("");
  const [modalVisible, setModalVisible] = useState(true);
  const [email, setEmail] = useState("");
  
  const handleChangePassword = () => {
    if (senha !== confirmacaoSenha) {
      alert("As senhas não coincidem. Por favor, verifique.");
      return;
    }

    if (!email.trim()) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }

    api.get(`/usuarios.json?orderBy="email"&equalTo="${email}"`)
      .then(response => {
        const userData = response.data;
        const userId = Object.keys(userData)[0]; 

        if (!userData || !userId) {
          alert("Este e-mail não está registrado.");
          return;
        }

        api.patch(`/usuarios/${userId}.json`, { senha: senha })
          .then(() => {
            alert("Senha alterada com sucesso!");
            setModalVisible(false);
            navigation.navigate('SingIn');
          })
          .catch(error => {
            console.error("Erro ao alterar a senha:", error);
            alert("Ocorreu um erro ao alterar a senha. Por favor, tente novamente mais tarde.");
          });
      })
      .catch(error => {
        console.error("Erro ao verificar o e-mail:", error);
        alert("Ocorreu um erro ao verificar o e-mail. Por favor, tente novamente mais tarde.");
      });
  };

  const handleEmailConfirmation = () => {
    if (!email.trim()) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }
  
    api.get(`/usuarios.json?orderBy="email"&equalTo="${email}"`)
      .then(response => {
        const userData = response.data;
        const userId = Object.keys(userData)[0]; 
  
        if (!userData || !userId) {
          alert("Este e-mail não está registrado.");
          return;
        }
  
        setModalVisible(false);
        alert("Email já cadastro, agora realize redefinição de senha.");
      })
      .catch(error => {
        console.error("Erro ao verificar o e-mail:", error);
        alert("Ocorreu um erro ao verificar o e-mail. Por favor, tente novamente mais tarde.");
      });
  };


  return (
    <ScrollView style={styles.container}>
      <View style={styles.menu}>
        <Image source={logo} style={styles.logo} />
      </View>

      <View style={styles.conteudo}>
        <View style={styles.conteudoTitle}>
          <Text style={styles.titulo}>ALTERAR SENHA</Text>
        </View>

        <View style={styles.conteudoInput}>
          <View>
            <View>
              <Text style={styles.desInput}>Senha:</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite sua nova senha"
                placeholderTextColor="#3b3b3b"
                value={senha}
                onChangeText={setSenha}
              />
            </View>
            <View>
              <Text style={styles.desInput}>Confirme sua senha:</Text>
              <TextInput
                style={styles.input}
                placeholder="Realize a confirmação da sua senha"
                placeholderTextColor="#3b3b3b"
                secureTextEntry={true}
                value={confirmacaoSenha}
                onChangeText={setConfirmacaoSenha}
              />
            </View>
            <TouchableOpacity style={styles.botaoOne} onPress={handleChangePassword}>
              <Text style={styles.textoBotao}>Alterar senha</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Footer/>
      </View>

      <StatusBar style="auto" />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>CONFIRME SEU E-MAIL</Text>
            <TouchableOpacity
              style={{ ...styles.openButton, position: 'absolute', right: 10, top: 10 }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>X</Text>
            </TouchableOpacity>
            <Text style={styles.modalText}>E-mail:</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Digite seu e-mail"
              value={email}
              onChangeText={setEmail}
            />
            <TouchableOpacity
              style={styles.botaoModal}
              onPress={handleEmailConfirmation}>
              <Text style={styles.textoBotao}>Confirme seu e-mail</Text>
            </TouchableOpacity>
            <Text style={styles.modalSubText}>
              Se existir a conta com o e-mail {email}, você poderá redefinir sua senha.
            </Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    minHeight: height,
  },
  menu: {
    alignItems: 'center',
    padding: '15%',
  },
  conteudo: {
    alignItems: 'center',
    backgroundColor: '#000',
    color: '#fff',
    borderTopLeftRadius: 100,
    paddingBottom:'10%'
  },
  conteudoTitle: {
    alignItems: 'center',
    width: 350,
    marginTop: '18%',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: '1%'
  },
  subtitulo: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
  conteudoInput: {
    paddingHorizontal: '3%',
    paddingVertical: '12%',
    alignItems: 'center',
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
    backgroundColor: '#f2f2f2',
    paddingHorizontal: '12%',
    paddingVertical: '3%',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: '8%',
  },
  textoBotao: {
    color: '#000',
    fontSize: 12,
  },
  titleButton: {
    fontSize: 12,
    color: '#fff',
    width: 275,
    textAlign: 'center'
  },
  esqueciSenha: {
    fontSize: 12,
    color: '#fff',
    marginTop: -15,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
      height: 2
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
  modalText: {
    fontSize: 13,
    color: '#fff',
    alignSelf: 'flex-start', 
    marginLeft: '10%',
    marginTop: '5%',
  },
  modalInput: {
    height: 40,
    width: '80%',
    borderColor: '#fff',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    color: '#fff',
    marginBottom: '5%',
  },
  modalSubText: {
    fontSize: 12,
    color: '#fff',
    marginTop: 15,
    textAlign: 'center',
    width: '80%',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  openButton: {
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
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
  }
});
