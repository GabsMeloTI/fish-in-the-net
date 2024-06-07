import React from 'react';
import { StatusBar, ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import Menu from '../../components/menu/App';
import Footer from '../../components/footer/App';

export default function Dashboards({ navigation, route }) {
  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth * 0.8;

  const dataFishingStats = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2
      }
    ],
    legend: ["Pescarias"]
  };

  const pieData = [
    {
      name: "Salmão",
      population: 215,
      color: "#f00",
      legendFontColor: "#fff",
      legendFontSize: 12
    },
    {
      name: "Tilápia",
      population: 280,
      color: "#0f0",
      legendFontColor: "#fff",
      legendFontSize: 12
    },
    {
      name: "Tucunaré",
      population: 527,
      color: "#00f",
      legendFontColor: "#fff",
      legendFontSize: 12
    }
  ];

  const dataWeatherConditions = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [15, 17, 20, 25, 22, 18],
        color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`,
        strokeWidth: 2,
        label: "Temperatura (°C)",
      },
      {
        data: [5, 10, 12, 8, 7, 6],
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        strokeWidth: 2,
        label: "Velocidade do Vento (km/h)",
      }
    ],
    legend: ["Temperatura", "Velocidade do Vento"]
  };

  return (
    <ScrollView style={styles.container}>
      <Menu navigation={navigation} route={route}/>

      <View style={styles.conteudo}>
        <View style={styles.conteudoTitle}>
          <Text style={styles.titulo}>DASHBOARDS</Text>
        </View>

        <View style={styles.conteudoBoasVindas}>
          <Text style={styles.descricao}>Visualize as áreas com maior abundância de peixes, condições climáticas favoráveis e estatísticas detalhadas de suas pescarias.</Text>
        </View>

        <View style={styles.conteudoLinks}>
          <Text style={styles.subtitulo}>Áreas com Maior Abundância de Peixes</Text>
          <PieChart
            data={pieData}
            width={chartWidth}
            height={220}
            chartConfig={{
              backgroundColor: '#000',
              backgroundGradientFrom: '#1E2923',
              backgroundGradientTo: '#08130D',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
              }
            }}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            absolute
          />

          <Text style={styles.subtitulo}>Estatísticas de Pescarias</Text>
          <LineChart
            data={dataFishingStats}
            width={chartWidth}
            height={220}
            chartConfig={{
              backgroundColor: '#000',
              backgroundGradientFrom: '#1E2923',
              backgroundGradientTo: '#08130D',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />

          <Text style={styles.subtitulo}>Condições Climáticas Favoráveis</Text>
          <LineChart
            data={dataWeatherConditions}
            width={chartWidth}
            height={220}
            chartConfig={{
              backgroundColor: '#000',
              backgroundGradientFrom: '#1E2923',
              backgroundGradientTo: '#08130D',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />

          <Text style={styles.maisOpcoes}>Dados acima são fictícios.</Text>
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
    paddingVertical: '3%',
    color: '#fff',
  },
  descricao: {
    borderColor: '#fff',
    borderWidth: 1,
    color: '#fff',
    fontSize: 12,
    padding: '5%',
    borderRadius: 10,
  },
  conteudoLinks: {
    width: '80%',
    alignItems: 'center',
  },
  maisOpcoes: {
    color: '#fff',
    marginTop: '5%',
    marginBottom: '5%',
    fontSize: 12,
  }
});
