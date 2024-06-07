import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StatusBar, Image, StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import Footer from '../../components/footer/App';
import Menu from '../../components/menu/App';

const api = axios.create({
  baseURL: "https://solutech-fiap-default-rtdb.firebaseio.com/"
});

export default function Perfil({ navigation, route }) {
  const usuario = route?.params?.usuario;
  const [editing, setEditing] = useState(false);
  const [usuarioAtualizado, setUsuarioAtualizado] = useState(usuario);

  const handleUpdateProfile = () => {
    api.put(`/usuarios/${usuario.id}.json`, usuarioAtualizado)
      .then(() => {
        alert("Perfil atualizado com sucesso!");
        setEditing(false);
      })
      .catch((error) => {
        console.error("Erro ao atualizar perfil:", error);
        alert("Erro ao atualizar perfil. Por favor, tente novamente.");
      });
  };

  const handleEditButton = () => {
    setEditing(true);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateTipo = (tipo) => {
    return tipo === "pescador" || tipo === "comprador" || tipo === "vendedor";
  };

  const handleSaveChanges = () => {
    if (!usuarioAtualizado.nome || !usuarioAtualizado.email || !usuarioAtualizado.tipo || !usuarioAtualizado.senha) {
      alert("Todos os campos são obrigatórios");
      return;
    }

    if (!validateEmail(usuarioAtualizado.email)) {
      alert("Por favor, insira um email válido");
      return;
    }

    if (!validateTipo(usuarioAtualizado.tipo)) {
      alert("Por favor, insira uma função válida (pescador, comprador ou vendedor)");
      return;
    }

    handleUpdateProfile();
  };

  const signOut = () => {
    navigation.navigate('SingIn');
    alert("Você saiu da conta...");
  };

  return (
    <ScrollView style={styles.container}>
      <Menu navigation={navigation} route={route}/>
      <View style={styles.conteudo}>
        <View style={styles.conteudoInput}>
          <Text style={styles.titulo}>Seu Perfil</Text>
          <View>
            <Text style={styles.desInput}>Nome:</Text>
            <TextInput
              style={[styles.input, !editing && styles.disabledInput]}
              placeholder="Digite seu nome"
              placeholderTextColor="#3b3b3b"
              value={usuarioAtualizado?.nome || ''}
              onChangeText={(text) => setUsuarioAtualizado({ ...usuarioAtualizado, nome: text })} // Atualizando o estado do usuário atualizado
              editable={editing}
            />
          </View>
          <View>
            <Text style={styles.desInput}>Email:</Text>
            <TextInput
              style={[styles.input, !editing && styles.disabledInput]}
              placeholder="Digite seu email"
              placeholderTextColor="#3b3b3b"
              value={usuarioAtualizado?.email || ''}
              onChangeText={(text) => setUsuarioAtualizado({ ...usuarioAtualizado, email: text })} // Atualizando o estado do usuário atualizado
              editable={editing}
            />
          </View>
          <View>
            <Text style={styles.desInput}>CPF:</Text>
            <TextInput
              style={[styles.input, styles.disabledInput]}
              placeholder="Digite sua CPF"
              placeholderTextColor="#3b3b3b"
              value={usuarioAtualizado?.cpf || ''}
              editable={false}
            />
          </View>
          <View>
            <Text style={styles.desInput}>Função:</Text>
            <TextInput
              style={[styles.input, !editing && styles.disabledInput]}
              placeholder="Digite sua função"
              placeholderTextColor="#3b3b3b"
              value={usuarioAtualizado?.tipo || ''}
              onChangeText={(text) => setUsuarioAtualizado({ ...usuarioAtualizado, tipo: text })} // Atualizando o estado do usuário atualizado
              editable={editing}
            />
          </View>
          <View>
            <Text style={styles.desInput}>Senha:</Text>
            <TextInput
              style={[styles.input, !editing && styles.disabledInput]}
              placeholder="Digite sua nova senha"
              placeholderTextColor="#3b3b3b"
              secureTextEntry={true}
              value={usuarioAtualizado?.senha || ''}
              onChangeText={(text) => setUsuarioAtualizado({ ...usuarioAtualizado, senha: text })} // Atualizando o estado do usuário atualizado
              editable={editing}
            />
          </View>
          {!editing ? (
            <TouchableOpacity style={styles.botao} onPress={handleEditButton}>
              <Text style={styles.textoBotao}>Alterar</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.botao} onPress={handleSaveChanges}>
              <Text style={styles.textoBotao}>Salvar Alterações</Text>
            </TouchableOpacity>
          )}
           <TouchableOpacity style={styles.botaoSair} onPress={signOut}>
                <Text style={styles.textoBotao}>Sair</Text>
           </TouchableOpacity>
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
  conteudo: {
    alignItems: 'center',
    backgroundColor: '#000',
    color: '#fff',
    borderTopLeftRadius: 100,
    paddingBottom: '10%',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: '5%',
  },
  conteudoInput: {
    paddingHorizontal: '3%',
    paddingTop: '15%',
    marginBottom: '5%',
    alignItems: 'center',
  },
  desInput: {
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
  disabledInput: {
    backgroundColor: '#666',
  },
  botao: {
    backgroundColor: '#fff',
    paddingHorizontal: '12%',
    paddingVertical: '3%',
    borderRadius: 10,
  },
  botaoSair: {
    backgroundColor: '#fff',
    paddingHorizontal: '12%',
    paddingVertical: '3%',
    borderRadius: 10,
    marginTop: '5%',
  },
  editButton: {
    marginTop: '5%',
    backgroundColor: '#fff',
    paddingHorizontal: '12%',
    paddingVertical: '3%',
    borderRadius: 10,
  },
  logoutButton: {
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
});