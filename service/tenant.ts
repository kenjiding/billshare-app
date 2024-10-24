// /tenants/{tenantId}/facilities


import Request from '@/utils/request';


export interface IFacilities {
  name: string;
  id: string;
}

export const upload = (tenantId: string, data: any) => {
  return Request.get<{url: string}>(`/tenants/${tenantId}/facilities`, data);
}