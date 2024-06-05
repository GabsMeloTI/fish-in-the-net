import React, { useState } from 'react';
import axios from 'axios';
import { StatusBar, Image, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Footer from '../../components/footer/App';
const logo = require('../../assets/img/Logo.png');

const api = axios.create({
  baseURL: "https://solutech-fiap-default-rtdb.firebaseio.com/"
});

export default function SingIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const login = async () => {
    try {
      const response = await api.get('/usuarios.json');
      const data = response.data;

      let userFound = false;

      for (const key in data) {
        if (data[key].email === email && data[key].senha === senha) {
          userFound = true;
          alert("Login bem-sucedido!", `Bem-vindo, ${data[key].nome}!`);
          navigation.navigate('Home');
          break;
        } else if (data[key].email != email && data[key].senha === senha) {
          alert("Erro de login, o email está incorreto. Tente novamente.");
        } else if (data[key].email === email && data[key].senha != senha) {
          alert("Erro de login, a senha está incorreta. Tente novamente.");
        }
      }


    } catch (error) {
      alert("Erro", `Erro ao fazer login: ${error.message}`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.menu}>
        <Image source={logo} style={styles.logo} />
      </View>

      <View style={styles.conteudo}>
        <View style={styles.conteudoTitle}>
          <Text style={styles.titulo}>LOGIN</Text>
          <Text style={styles.titleInput}>BEM-VINDO AO PEIXE NA REDE!</Text>
        </View>

        <View style={styles.conteudoInput}>
          <View>
            <View>
              <Text style={styles.desInput}>Email:</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite seu email"
                placeholderTextColor="#fff"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View>
              <Text style={styles.desInput}>Senha:</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite sua senha"
                placeholderTextColor="#fff"
                secureTextEntry={true}
                value={senha}
                onChangeText={setSenha}
              />
              <Text style={styles.esqueciSenha} onPress={() => { navigation.navigate('Forgot'); }}>Esqueci a senha</Text>
            </View>
            <TouchableOpacity style={styles.botaoOne} onPress={login}>
              <Text style={styles.textoBotao}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botao} onPress={() => { navigation.navigate('SingUp'); }}>
                <Text style={styles.textoBotao}>Cadastre-se</Text>
              </TouchableOpacity>
            <View style={styles.botaoetexto}> 
              <Text style={styles.titleButton}>Seja parte da nossa comunidade! Se ainda não tem uma conta, cadastre-se agora e junte-se a nós</Text>
            </View>
          </View>
        </View>
        <Footer/>
      </View>

      <StatusBar style="auto" />
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
    marginTop: '5%',
    backgroundColor: '#f2f2f2',
    paddingHorizontal: '12%',
    paddingVertical: '3%',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: '8%'
  },
  botao: {
    marginTop: '5%',
    backgroundColor: '#f2f2f2',
    paddingHorizontal: '12%',
    paddingVertical: '3%',
    borderRadius: 10,
    alignItems: 'center'
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
  }
});
