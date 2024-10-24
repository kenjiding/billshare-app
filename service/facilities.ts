
import Request from '@/utils/request';


export interface IFacilities {
  name: string;
  id: string;
}

export const getFacilities = () => {
  return Request.get<IFacilities[]>('/facilities');
}