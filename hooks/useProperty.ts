import { useState, useEffect } from 'react';
import { getProperty } from '@/service/property';
import { IProperty } from '@/types/property';

export default function useProperty(data?: IProperty) {
  const [propertyList, setPropertyList] = useState<IProperty[]>([]);

  useEffect(() => {
    getPropertyHandler();
  }, []);

  const getPropertyHandler = async () => {
    const data: any = await getProperty();
    setPropertyList(data.properties);
  }

  return {
    propertyList,
    reload: getPropertyHandler,
  };
}