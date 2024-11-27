import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MqttProvider } from "./context/MqttContext";
import Dashboard from "./pages/Dashboard";
import Grove from "./components/Grove";
import GreenHouse from "./components/GreenHouse";


function App() {
  const brokerUrl = "ws://172.17.0.1:9001"; // URL de tu broker MQTT -> ws://<IP>:<Puerto>
  const options = {
    username: "ROQUE", // Usuario MQTT
    password: "2002", // Contraseña MQTT
  };

  const topics = [
    "/test/int",
    "/test/float", 
    "/test/comment",
    "/external/temperature",
    "/external/humidity",
    "/external/light",
    "/external/rain",
  ]; // Lista de topics a los que se suscribirá

  return (
    <MqttProvider brokerUrl={brokerUrl} options={options} topics={topics}>
      <Router>
        <Routes>
          <Route path="/" element={<Grove />} />
          <Route path="/greenhouse" element={<GreenHouse />} />
          <Route path="/grove" element={<Grove />} />   
        </Routes>
      </Router>
    </MqttProvider>
  );
}

export default App;