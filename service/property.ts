
import Request from '@/utils/request';
import { IProperty } from '@/types/property';

export const addProperty = (data: IProperty) => {
  return Request.post<IProperty>('/property/add', {data});
}

export const removeProperty = (propertyId: string) => {
  return Request.get('/property/delete', {
    data: {
      propertyId,
    }
  });
}

export const getProperty = () => {
  return Request.get<IProperty>('/property');
}