import {TokenData} from '../modelos/TokenData';
import {jwtDecode} from 'jwt-decode';

export function getTokenData(): TokenData | null {
  const token = localStorage.getItem('token');
  if (!token) {
    console.warn('Token no encontrado en localStorage');
    return null;
  }

  try {
    const tokenData: TokenData = jwtDecode<TokenData>(token);
    return tokenData;
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return null;
  }
}

