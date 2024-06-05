import React from 'react';
import { StatusBar, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Tooltip } from 'react-native-elements';

const logo = require('../../assets/img/Logo.png');
const home = require('../../assets/img/icon-home.png');
const localizacao = require('../../assets/img/icon-localition.png');
const agenda = require('../../assets/img/icon-calendar.png');
const anotacao = require('../../assets/img/icon-observability.png');
const oferta = require('../../assets/img/icon-cash.png');
const dash = require('../../assets/img/icon-painel.png');
const rede = require('../../assets/img/icon-network.png');
const user = require('../../assets/img/icon-user.png');

export default function Menu({ navigation }) {
    return(
        <View style={styles.menu}>
            <View>
                <Image source={logo} style={styles.logo} />
            </View>
            <View style={styles.lista}>
                <Tooltip popover={<Text>Home</Text>} >
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Image source={home} style={styles.imgMenu} />
                    </TouchableOpacity>
                </Tooltip>
                <Tooltip popover={<Text>Planejamento</Text>} >
                    <TouchableOpacity onPress={() => navigation.navigate('MapScreen')}>
                        <Image source={localizacao} style={styles.imgMenu} />
                    </TouchableOpacity>
                </Tooltip>
                <Tooltip popover={<Text>Planejamento</Text>}>
                    <TouchableOpacity onPress={() => navigation.navigate('MapScreen')}>
                        <Image source={agenda} style={styles.imgMenu} />
                    </TouchableOpacity>
                </Tooltip>
                <Tooltip popover={<Text>Registros</Text>}>
                    <TouchableOpacity onPress={() => navigation.navigate('AdicionarRegistros')}>
                        <Image source={anotacao} style={styles.imgMenu} />
                    </TouchableOpacity>
                </Tooltip>
                <Tooltip popover={<Text>Oferta</Text>}>
                    <Image source={oferta} style={styles.imgMenu} />
                </Tooltip>
                <Tooltip popover={<Text>Painel</Text>}>
                    <Image source={dash} style={styles.imgMenu} />
                </Tooltip>
                <Tooltip popover={<Text>Rede</Text>}>
                    <Image source={rede} style={styles.imgMenu} />
                </Tooltip>
                <Tooltip popover={<Text>Usuário</Text>}>
                    <Image source={user} style={styles.imgMenu} />
                </Tooltip>
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
