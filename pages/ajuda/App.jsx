import React, { useState } from 'react';
import { StatusBar, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions, Alert } from 'react-native';
import Menu from '../../components/menu/App';
import Footer from '../../components/footer/App';

export default function HelpSupport({ navigation, route }) {
  const screenWidth = Dimensions.get('window').width;
  const formWidth = screenWidth * 0.8;

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleEnviar = () => {
    if (nome.trim() === '' || !validateEmail(email) || descricao.trim().length < 20) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos corretamente.');
      return;
    }

    Alert.alert('Sucesso', 'Formulário enviado com sucesso');
    setNome('');
    setEmail('');
    setDescricao('');
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <ScrollView style={styles.container}>
      <Menu navigation={navigation} route={route}/>

      <View style={styles.conteudo}>
        <View style={styles.conteudoTitle}>
          <Text style={styles.titulo}>AJUDA E SUPORTE</Text>
        </View>

        <View style={styles.conteudoBoasVindas}>
          <Text style={styles.subtitulo}>FAQs</Text>
          <View style={styles.perguntasGeral}>
            <Text style={styles.descricao}>
                1. Como o assistente ajuda no planejamento de pesca? {"\n"}
                Identifica áreas com mais peixes e melhores condições climáticas.
            </Text>
            <Text style={styles.descricao}>
                2. Como funciona o registro de pesca? {"\n"}
                Registra quantidade e tipo de peixes capturados para gestão sustentável.
            </Text>
            <Text style={styles.descricao}>
                3. Como facilita o acesso a mercados? {"\n"}
                Conecta pescadores a compradores e fornece informações de mercado.
            </Text>
          </View>
        </View>

        <View style={styles.conteudoLinks}>
          <Text style={styles.subtitulo}>Contato com Suporte</Text>
          <Text style={styles.desc}>Formulário para enviar dúvidas ou problemas.</Text>
          
          <View style={[styles.formContainer, { width: formWidth }]}>
            <TextInput
              style={styles.input}
              placeholder="Seu Nome"
              placeholderTextColor="#3b3b3b"
              value={nome}
              onChangeText={setNome}
            />
            <TextInput
              style={styles.input}
              placeholder="Seu Email"
              placeholderTextColor="#3b3b3b"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Sua Mensagem"
              placeholderTextColor="#3b3b3b"
              multiline
              numberOfLines={5}
              value={descricao}
              onChangeText={setDescricao}
            />
            <TouchableOpacity style={styles.button} onPress={handleEnviar}>
              <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
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
    backgroundColor: '#E8E9E4',
  },
  conteudo: {
    backgroundColor: '#000',
    minHeight: '100%',
    alignItems: 'center',
    borderTopLeftRadius: 100,
    paddingVertical: '10%',
  },
  titulo: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '200',
  },
  conteudoBoasVindas: {
    width: '80%',
    alignItems: 'center',
    paddingVertical: '5%',
    justifyContent: 'center',
  },
  subtitulo: {
    fontSize: 18,
    paddingTop: '3%',
    color: '#fff',
  },
  descricao: {
    color: '#fff',
    fontSize: 12,
    paddingVertical: '1%',
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom: '2%',
    padding: '2%',
    borderRadius: 8,
  },
  desc: {
    color: '#fff',
    fontSize: 12,
    marginBottom: '5%',
  },
  conteudoLinks: {
    width: '80%',
    alignItems: 'center',
  },
  formContainer: {
    borderWidth: 1,
    borderColor: '#fff',
    marginVertical: '2%',
    padding: '5%',
    borderRadius: 8,
    alignItems: 'center'
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#f2f2f2',
    paddingHorizontal: '12%',
    paddingVertical: '3%',
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: '#000',
    fontSize: 12,
  }
});
