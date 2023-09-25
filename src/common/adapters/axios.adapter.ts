import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { httpAdapter } from '../Interfaces/http-adapter.interface';

@Injectable()
export class AxiosAdapter implements httpAdapter {
  private axios: AxiosInstance = axios;

  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await this.axios.get<T>(url);
      // destructure la data con el {}
      return data;
    } catch (error) {
      throw new Error(
        `This is an Error, for call of AXIOS to: ${url} - check Log`,
      );
    }
  }
}
