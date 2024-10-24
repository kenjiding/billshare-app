import Request from '@/utils/request';

interface IRegisterParams {
  phone: string;
  password: string;
}

export const upload = (userId: string, data: any) => {
  return Request.post<{url: string}>(`/users/${userId}/photo`, data);
}