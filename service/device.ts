
import Request from '@/utils/request';


export interface IPi {
  name: string;
  id: string;
}

export const getAvailablePi = () => {
  return Request.get<IPi[]>('/devices/pi/available');
}