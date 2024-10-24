import Request from '@/utils/request';

interface ILoginParams {
  phone: string;
  password: string;
}

interface IRegisterParams {
  phone: string;
  password: string;
}

export const login = (data: ILoginParams) => {
  return Request.post('/auth/login', {
    data
  });
}

export const register = (data: any) => {
  return Request.post('/auth/register', data);
}