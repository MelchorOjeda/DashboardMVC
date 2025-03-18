import datos from '../data/iotapp.json';
import { ApiResponse } from '../interfaces/SensorData';

export const obtenerDatosSensores = async (): Promise<ApiResponse> => {
  return Promise.resolve(datos);
};
