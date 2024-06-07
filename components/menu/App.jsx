import React from 'react';
import { StatusBar, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const logo = require('../../assets/img/Logo.png');
const home = require('../../assets/img/icon-home.png');
const localizacao = require('../../assets/img/icon-localition.png');
const agenda = require('../../assets/img/icon-calendar.png');
const anotacao = require('../../assets/img/icon-observability.png');
const oferta = require('../../assets/img/icon-cash.png');
const dash = require('../../assets/img/icon-painel.png');
const ajuda = require('../../assets/img/icon-ajuda.png');
const user = require('../../assets/img/icon-user.png');

export default function Menu({ navigation, route }) {
    const usuario = route && route.params && route.params.usuario;
    
    return(
        <View style={styles.menu}>
            <View>
                <Image source={logo} style={styles.logo} />
            </View>
            <View style={styles.lista}>
                <TouchableOpacity onPress={() => navigation.navigate('Home', { usuario: usuario })}>
                    <Image source={home} style={styles.imgMenu} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('EncontrosEVendas', { usuario: usuario })}>
                    <Image source={localizacao} style={styles.imgMenu} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('MapScreen', { usuario: usuario })}>
                    <Image source={agenda} style={styles.imgMenu} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('AdicionarRegistros', { usuario: usuario })}>
                    <Image source={anotacao} style={styles.imgMenu} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Ofertas', { usuario: usuario })}>
                    <Image source={oferta} style={styles.imgMenu} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Dashboards', { usuario: usuario })}>
                    <Image source={dash} style={styles.imgMenu} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Ajuda', { usuario: usuario })}>
                    <Image source={ajuda} style={styles.imgMenu} />
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => navigation.navigate('Perfil', { usuario: usuario })}>
                    <Image source={user} style={styles.imgMenu} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  menu: {
    alignItems: 'center',
    marginHorizontal: '3%',
    marginVertical: '5%',
  },
  lista: {
    flexDirection: "row",
    justifyContent: 'space-between',
    width: '85%',
    marginTop: -20,
  },
  topicos: {
    color: '#797777',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 50,
  },
  imgMenu: {
    width: 15,
    height: 15,
    marginBottom: 20,
  },
});
