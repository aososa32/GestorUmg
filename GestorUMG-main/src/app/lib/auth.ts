import axios, { Method } from 'axios';
import { url } from 'inspector';
import { Cookies } from 'react-cookie';

interface APIResponse<T> {
  ok: boolean;
  code: number;
  result: T | null; // Permitimos que result pueda ser null
  status: string;
}

export default async function API<T>(body: any, URL: string, method: Method, token?: boolean): Promise<APIResponse<T>> {
  try {
    const cookies = new Cookies();

    const headers: any = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${cookies.get('next-token')}`;
    }

    console.log(headers);
    console.log(`${process.env.API}${URL}`);
    console.log(method);
    const response = await axios({
      method: method,
      url: `${process.env.API}${URL}`,
      headers: headers,
      data: body,
    });

    return {
      ok: true,
      code: response.status,
      result: response.data as T, // Asignamos directamente a T
      status: response.statusText,
    };
  } catch (error: any) {
    console.error('Error:', error);

    return {
      ok: false,
      code: error.response?.status || 500,
      result: error.response?.data as T | null || null, // Manejamos el caso de error
      status: error.response?.statusText || 'Internal Server Error',
    };
  }
}
