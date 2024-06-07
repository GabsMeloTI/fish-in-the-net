USUÁRIO: 

Explicação: Endpoint usado para cadastrar dados dos usuário, alterar e realizar o login na aplicação.
Requisição: https://solutech-fiap-default-rtdb.firebaseio.com/usuarios.json
Retorno:
{
  "-Nzd62lts6PVfstRsWu6": {
    "cpf": "11111111111",
    "email": "melo@gmail.com",
    "nome": "melo",
    "senha": "091104",
    "tipo": "pescador"
  }
}

---------------------------------------------------------------------------------------------------------

ENCONTROS:

Explicação: Endpoint usado para salvar dados de encontros entre os usuários.
Requisição: https://solutech-fiap-default-rtdb.firebaseio.com/encontros
Retorno:
{
  "-Nznxwv67WOM64JZvPSN": {
    "data": "2024-06-07T18:30:36.849Z",
    "hora": "2024-06-07T18:30:36.849Z",
    "local": "Condomínio nações ",
    "status": "ativo"
  }
}

---------------------------------------------------------------------------------------------------------

OFERTAS:

Explicação: Endpoint usado para salvar dados de ofertas criadas para os usuários venderem seus peixes.
Requisição: https://solutech-fiap-default-rtdb.firebaseio.com/ofertas
Retorno:
{
  "-Nzf1DRR9v4S4tgFnXKI": {
    "especie": " baiacu",
    "preco": "2,50",
    "quantidade": "5",
    "status": "Disponível "
  }
}

---------------------------------------------------------------------------------------------------------

REGISTROS:

Explicação: Endpoint usado para salvar informações de um dia de pesca.
Requisição: https://solutech-fiap-default-rtdb.firebaseio.com/registros
Retorno:
{
  "-Nze_uM_AByy8i95aO0C": {
    "data": "2024-05-15T22:48:00.000Z",
    "especie": "sardinha",
    "peso": "2.5",
    "quantidade": "5"
  }
}

---------------------------------------------------------------------------------------------------------

Explicação: Endpoint usado para salvar buscar informações de meteorologia. de
Requisição: https://api.openweathermap.org/data/2.5/weather
Retorno:
Localização obtida: {
  "coords": {
    "accuracy": 18.295715089728176,
    "altitude": 781.3202514648438,
    "altitudeAccuracy": 5.287419319152832,
    "heading": -1,
    "latitude": -23.734196841886256,
    "longitude": -46.69826679701399,
    "speed": -1
  },
  "timestamp": 1717459116860.136
}
{
  "base": "stations",
  "clouds": { "all": 0 },
  "cod": 200,
  "coord": { "lat": -23.7342, "lon": -46.6983 },
  "dt": 1717458845,
  "id": 3464739,
  "main": {
    "feels_like": 19.11,
    "humidity": 70,
    "pressure": 1025,
    "temp": 19.3,
    "temp_max": 20.62,
    "temp_min": 16.57
  },
  "name": "Diadema",
  "sys": {
    "country": "BR",
    "id": 8446,
    "sunrise": 1717407776,
    "sunset": 1717446447,
    "type": 1
  },
  "timezone": -10800,
  "visibility": 10000,
  "weather": [
    { "description": "céu limpo", "icon": "01n", "id": 800, "main": "Clear" }
  ],
  "wind": { "deg": 0, "speed": 1.03 }
}
