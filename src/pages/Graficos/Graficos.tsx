import { GraficoLluvia, GraficoSol, GraficoTemperatura, GraficoHumedad } from '../../components/Charts';
import { obtenerHistoricoSensores } from '../../services/sensorService';
import React, { useEffect, useState } from 'react';
import { Sensores } from '../../interfaces/SensorData';
import Sidebar from '../../components/UI/Dashboard/Sidebar/Sidebar';
import './Graficos.css';

const Graficos: React.FC = () => {
  const [historico, setHistorico] = useState<Sensores[]>([]);
  const [intervalo, setIntervalo] = useState<string>('dias'); // 'dias', 'semanas', 'horas'

  useEffect(() => {
    obtenerHistoricoSensores().then(setHistorico);
  }, []);

  // Función para generar las fechas dentro del intervalo seleccionado
  const generarFechas = (intervalo: string) => {
    const ahora = new Date();
    const fechasGeneradas: Date[] = [];

    switch (intervalo) {
      case 'dias':
        for (let i = 9; i >= 0; i--) {
          const fecha = new Date();
          fecha.setDate(ahora.getDate() - i);
          fechasGeneradas.push(fecha);
        }
        break;
      case 'semanas':
        for (let i = 9; i >= 0; i--) {
          const fecha = new Date();
          fecha.setDate(ahora.getDate() - i * 7);
          fechasGeneradas.push(fecha);
        }
        break;
      case 'horas':
        for (let i = 0; i < 24; i++) {
          const fecha = new Date();
          fecha.setHours(i);
          fechasGeneradas.push(fecha);
        }
        break;
      default:
        break;
    }

    return fechasGeneradas;
  };

  // Función para agrupar y calcular el promedio de los registros por día, semana o hora
  const agruparYCalcularPromedio = (intervalo: string) => {
    const historicoAgrupado: { [key: string]: Sensores[] } = {};

    historico.forEach((registro) => {
      const fechaRegistro = new Date(registro.fecha_registro);
      let clave: string;

      switch (intervalo) {
        case 'dias':
          clave = `${fechaRegistro.getDate()}/${fechaRegistro.getMonth() + 1}/${fechaRegistro.getFullYear()}`;
          break;
        case 'semanas':
          const inicioSemana = new Date(fechaRegistro);
          inicioSemana.setDate(fechaRegistro.getDate() - fechaRegistro.getDay()); // Establecer al inicio de la semana
          clave = `${inicioSemana.getDate()}/${inicioSemana.getMonth() + 1}/${inicioSemana.getFullYear()} - Semana`;
          break;
        case 'horas':
          clave = `${fechaRegistro.getHours()}`;
          break;
        default:
          clave = `${fechaRegistro.getDate()}/${fechaRegistro.getMonth() + 1}/${fechaRegistro.getFullYear()}`;
      }

      if (!historicoAgrupado[clave]) {
        historicoAgrupado[clave] = [];
      }
      historicoAgrupado[clave].push(registro);
    });

    // Calcular el promedio de los registros
    const historicoPromediado = Object.keys(historicoAgrupado).map((clave) => {
      const registros = historicoAgrupado[clave];
      const promedio = {
        fecha: clave,
        lluvia: registros.reduce((sum, reg) => sum + reg.lluvia, 0) / registros.length,
        sol: registros.reduce((sum, reg) => sum + reg.sol, 0) / registros.length,
        temperatura: registros.reduce((sum, reg) => sum + reg.temperatura, 0) / registros.length,
        humedad: registros.reduce((sum, reg) => sum + reg.humedad, 0) / registros.length,
      };
      return promedio;
    });

    return historicoPromediado;
  };

  // Generar las fechas para el intervalo seleccionado
  const fechasGeneradas = generarFechas(intervalo);
  const historicoAgrupadoYPromediado = agruparYCalcularPromedio(intervalo);

  // Crear las etiquetas y valores para las fechas generadas
  const labels = fechasGeneradas.map((fecha) => {
    switch (intervalo) {
      case 'dias':
        return `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
      case 'semanas':
        const inicioSemana = new Date(fecha);
        inicioSemana.setDate(fecha.getDate() - fecha.getDay()); // Establecer al inicio de la semana
        return `${inicioSemana.getDate()}/${inicioSemana.getMonth() + 1}/${inicioSemana.getFullYear()} - Semana`;
      case 'horas':
        return `${fecha.getHours()}:00`;
      default:
        return `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
    }
  });

  // Para las últimas 24 horas, agrupar los datos por hora
  const historicoFiltradoHoras = historico.filter((registro) => {
    const fechaRegistro = new Date(registro.fecha_registro);
    const ahora = new Date();
    const diferenciaEnHoras = (ahora.getTime() - fechaRegistro.getTime()) / (1000 * 3600);
    return diferenciaEnHoras <= 24;
  });

  // Agrupar por hora
  const historicoHorasAgrupado: { [key: number]: Sensores[] } = {};
  historicoFiltradoHoras.forEach((registro) => {
    const fechaRegistro = new Date(registro.fecha_registro);
    const hora = fechaRegistro.getHours();

    if (!historicoHorasAgrupado[hora]) {
      historicoHorasAgrupado[hora] = [];
    }
    historicoHorasAgrupado[hora].push(registro);
  });

  // Calcular los promedios de cada hora
  const horasData = Array.from({ length: 24 }, (_, hora) => {
    const registrosHora = historicoHorasAgrupado[hora];
    const promedio = registrosHora
      ? registrosHora.reduce((sum, reg) => sum + reg.lluvia, 0) / registrosHora.length
      : 0;
    return promedio;
  });

  // Asignar los datos promediados a los gráficos
  const lluviaData = labels.map((label) => {
    const registro = historicoAgrupadoYPromediado.find((r) => r.fecha === label);
    return registro ? registro.lluvia : 0;
  });

  const solData = labels.map((label) => {
    const registro = historicoAgrupadoYPromediado.find((r) => r.fecha === label);
    return registro ? registro.sol : 0;
  });

  const temperaturaData = labels.map((label) => {
    const registro = historicoAgrupadoYPromediado.find((r) => r.fecha === label);
    return registro ? registro.temperatura : 0;
  });

  const humedadData = labels.map((label) => {
    const registro = historicoAgrupadoYPromediado.find((r) => r.fecha === label);
    return registro ? registro.humedad : 0;
  });

  return (
    <div className="graficos-dashboard">
      <Sidebar />
      <main className="graficos-container">
        <h1>Estadísticas de Sensores</h1>

        {/* Selector de intervalo */}
        <div className="intervalo-selector">
          <label>Mostrar datos por:</label>
          <select onChange={(e) => setIntervalo(e.target.value)} value={intervalo}>
            <option value="dias">Últimos 10 días</option>
            <option value="semanas">Últimas 10 semanas</option>
            <option value="horas">Últimas 24 horas</option>
          </select>
        </div>

        <div className="graficos-grid">
          <div className="grafico-box">
            <GraficoLluvia labels={labels} data={intervalo === 'horas' ? horasData : lluviaData} />
          </div>
          <div className="grafico-box">
            <GraficoSol labels={labels} data={intervalo === 'horas' ? horasData : solData} />
          </div>
          <div className="grafico-box">
            <GraficoTemperatura labels={labels} data={intervalo === 'horas' ? horasData : temperaturaData} />
          </div>
          <div className="grafico-box">
            <GraficoHumedad labels={labels} data={intervalo === 'horas' ? horasData : humedadData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Graficos;
