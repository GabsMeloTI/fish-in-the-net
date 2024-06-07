import React, { useState } from 'react';
import axios from 'axios';
import { StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Footer from '../../components/footer/App';

const api = axios.create({
  baseURL: "https://solutech-fiap-default-rtdb.firebaseio.com/"
});

export default function SingUp({ navigation }) {
  const [usuario, setUsuario] = useState({
    nome: "",
    cpf: "",
    tipo: "",
    email: "",
    senha: "",
  });
  const [confirmacao, setConfirmacao] = useState("");

  function cadastrar(usuario) {
    api.post('/usuarios.json', usuario)
      .then(() => {
        alert("Cadastrado com sucesso! Seja bem-vindo " + usuario.nome);
        navigation.navigate('Home');
      })
      .catch((err) => {
        alert("Erro! " + err);
      });
    console.log(usuario);
  }

  const handleChange = (name, value) => {
    if (name === 'cpf') {
      value = value.replace(/[^0-9]/g, '');
    }
    setUsuario({
      ...usuario,
      [name]: value
    });
  };

  const handleConfirmacao = (value) => {
    setConfirmacao(value);
  };

  const handleSignUp = () => {
    if (!usuario.nome || !usuario.cpf || !usuario.tipo || !usuario.email || !usuario.senha) {
      alert("Todos os campos são obrigatórios");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(usuario.email)) {
      alert("Por favor, insira um email válido");
      return;
    }

    if (usuario.cpf.length !== 11) {
      alert("CPF deve ter 11 números");
      return;
    }

    if (usuario.senha !== confirmacao) {
      alert("As senhas não conferem! Tente novamente");
      return;
    }

    cadastrar(usuario);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.menu}>
        <Text style={styles.titulo}>CADASTRAR</Text>
      </View>
      <View style={styles.conteudo}>
        <View style={styles.conteudoInput}>
          <View style={styles.conteudoTitle}>
            <Text style={styles.titleInput}>BEM-VINDO À SOLUTECH FINANCE!</Text>
          </View>
          <View>
            <View>
              <Text style={styles.desInput}>Nome completo:</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite seu nome"
                placeholderTextColor="#3b3b3b"
                value={usuario.nome}
                onChangeText={(text) => handleChange('nome', text)}
              />
            </View>
            <View>
              <Text style={styles.desInput}>CPF:</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite seu CPF"
                placeholderTextColor="#3b3b3b"
                value={usuario.cpf}
                onChangeText={(text) => handleChange('cpf', text)}
                keyboardType="numeric"
                maxLength={11}
              />
            </View>
            <View style={styles.dropdownWrapper}>
              <Text style={styles.desInput}>Função(Comprador, Vendedor, Pescador):</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite sua função principal no app"
                placeholderTextColor="#3b3b3b"
                value={usuario.tipo}
                onChangeText={(text) => handleChange('tipo', text)}
                maxLength={10}
              />
            </View>
            <View>
              <Text style={styles.desInput}>Email:</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite seu email"
                placeholderTextColor="#3b3b3b"
                value={usuario.email}
                onChangeText={(text) => handleChange('email', text)}
              />
            </View>
            <View>
              <Text style={styles.desInput}>Senha:</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite sua senha"
                placeholderTextColor="#3b3b3b"
                secureTextEntry={true}
                value={usuario.senha}
                onChangeText={(text) => handleChange('senha', text)}
              />
            </View>
            <View>
              <Text style={styles.desInput}>Confirme sua senha:</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirme sua senha"
                placeholderTextColor="#3b3b3b"
                secureTextEntry={true}
                value={confirmacao}
                onChangeText={(text) => handleConfirmacao(text)}
              />
            </View>
            <TouchableOpacity style={styles.botao} onPress={handleSignUp}>
              <Text style={styles.textoBotao}>Cadastre-se</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botao} onPress={() => { navigation.navigate('SingIn'); }}>
              <Text style={styles.textoBotao}>Entrar</Text>
            </TouchableOpacity>
            <View style={styles.botaoetexto}> 
              <Text style={styles.titleButton}>Seja parte da nossa comunidade! Se ainda não tem uma conta, cadastre-se agora e junte-se a nós</Text>
            </View>
          </View>
        </View>

        <Footer />
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
  },
  menu: {
    alignItems: 'center',
    padding: '5%',
  },
  conteudo: {
    alignItems: 'center',
    backgroundColor: '#000',
    color: '#fff',
    borderTopLeftRadius: 100,
    paddingBottom:'10%',
  },
  conteudoTitle: {
    alignItems: 'center',
    marginBottom: '6%',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
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
    fontSize: 10,
    color: '#fff',
    width: '80%',
    marginBottom: '2%',
  },
  titleInput: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
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
  dropdownWrapper: {
    zIndex: 1000,
    width: 280,
  },
  dropdown: {
    backgroundColor: '#000',
    borderColor: '#fff',
    height: 40,
    width: 280,
    marginBottom: 30,
    borderColor: '#fff',
    color: '#fff',
  },
  dropdownText: {
    color: '#fff',
  },
  dropdownContainer: {
    backgroundColor: '#000',
    borderColor: '#fff',
    zIndex: 1000,
  },
  placeholder: {
    color: '#fff',
  },
  selectedText: {
    marginTop: 20,
    fontSize: 18,
    color: '#fff',
  },
  botao: {
    marginTop: '5%',
    backgroundColor: '#fff',
    paddingHorizontal: '12%',
    paddingVertical: '3%',
    borderRadius: 10,
  },
  textoBotao: {
    color: '#000',
    fontSize: 12,
    textAlign: 'center',
  },
  titleButton: {
    fontSize: 12,
    color: '#fff',
    width: 275,
    textAlign: 'center'
  }
});
