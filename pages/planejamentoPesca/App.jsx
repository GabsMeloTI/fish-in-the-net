import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import MapView from 'react-native-maps';
import Menu from '../../components/menu/App';
import Footer from '../../components/footer/App';
import axios from 'axios';
import * as Location from 'expo-location';
import { REACT_APP_OPEN_WEATHER_KEY } from '@env'; 

export default function MapScreen({ navigation }) {
    const [localizacao, setLocalizacao] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [weatherForecast, setWeatherForecast] = useState(null);

    let getWeather = async (lat, lon) => {
        try {
            let res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
                params: {
                    lat: lat,
                    lon: lon,
                    appid: REACT_APP_OPEN_WEATHER_KEY,
                    lang: 'pt',
                    units: 'metric'
                }
            });
            setWeatherData(res.data);
        } catch (error) {
            console.error('Erro ao buscar dados meteorológicos:', error);
        }
    };

    let getWeatherForecast = async (lat, lon) => {
        try {
            let res = await axios.get("https://api.openweathermap.org/data/2.5/forecast", {
                params: {
                    lat: lat,
                    lon: lon,
                    appid: REACT_APP_OPEN_WEATHER_KEY,
                    lang: 'pt',
                    units: 'metric'
                }
            });
            setWeatherForecast(res.data);
        } catch (error) {
            console.error('Erro ao buscar previsão do tempo:', error);
        }
    };

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permissão para acessar a localização negada');
                return;
            }
    
            let location = await Location.getCurrentPositionAsync({});
            console.log('Localização obtida:', location);
            setLocalizacao(location);
        })();
    }, []);
    

    useEffect(() => {
        if (localizacao) {
            getWeather(localizacao.coords.latitude, localizacao.coords.longitude);
            getWeatherForecast(localizacao.coords.latitude, localizacao.coords.longitude);
        }
    }, [localizacao]);
    
    useEffect(() => {
        console.log('WeatherData:', weatherData);
    }, [weatherData]);

    useEffect(() => {
        console.log('Weather Forecast:', weatherForecast);
    }, [weatherForecast]);


    return (
        <ScrollView>
            <Menu navigation={navigation} />
            <View style={styles.conteudo}>
                <View style={styles.header}>
                    <Text style={styles.title}>Planejamento de Pesca</Text>
                    <Text style={styles.description}>Veja as melhores áreas de pesca do Brasil.</Text>
                </View>
                <View style={styles.mapContainer}>
                    {localizacao && (
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: localizacao.coords.latitude,
                                longitude: localizacao.coords.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        />
                    )}
                </View>
                
                <View style={styles.weatherContainer}>
                    <Text style={styles.title}>Condições climáticas</Text>
                    {weatherData ? (
                        <View style={styles.weatherData}>
                            <Text style={styles.weatherTitle}>Temperatura atual: {weatherData.main.temp}°C</Text>
                            <Text style={styles.weatherDescription}>Previsão para hoje: {weatherData.weather[0].description}</Text>
                        </View>
                    ) : (
                        <Text style={styles.weatherTitle}>Carregando...</Text>
                    )}

                    {weatherForecast ? (
                        <View style={styles.forecastContainer}>
                            <Text style={styles.forecastTitle}>Previsão para os próximos dias:</Text>
                            {weatherForecast.list.slice(1, 6).map((item, index) => (
                                <View key={index} style={styles.forecastItem}>
                                    <Text style={styles.forecastItemDate}>{getDateFromTimestamp(item.dt, index + 1)}</Text>
                                    <Text style={styles.forecastItemTemp}>Mín: {item.main.temp_min.toFixed(1)}°C - Máx: {item.main.temp_max.toFixed(1)}°C</Text>
                                </View>
                            ))}
                        </View>
                    ) : (
                        <Text style={styles.forecastTitle}></Text>
                    )}

                </View>
            
                <Footer />
            </View>
        </ScrollView>
    );
}

const getDateFromTimestamp = (timestamp, daysAhead) => {
    const date = new Date(timestamp * 1000);
    date.setDate(date.getDate() + daysAhead);
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    return `${day}/${month}`;
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
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
    mapContainer: {
        flex: 1,
        width: '80%',
        maxHeight: '30%',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    weatherContainer: {
        marginVertical: 20,
        alignItems: 'center',
    },
    weatherData: {
        marginVertical: 20,
        textAlign: 'center',
        alignItems: 'center',
    },
    weatherTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    weatherDescription: {
        fontSize: 16,
        color: '#fff',
        marginTop: -10,
    },
    forecastContainer: {
        borderColor: '#fff',
        borderWidth: 1,
        padding: '5%',
        borderRadius: 10,
        alignItems: 'center',
    },
    forecastTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    forecastItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    forecastItemDate: {
        fontSize: 16,
        color: '#fff',
        marginRight: 10,
    },
    forecastItemTemp: {
        fontSize: 16,
        color: '#fff',
    },
});
