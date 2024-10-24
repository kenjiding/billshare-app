
import Request from '@/utils/request';


export interface IBill {
  propertyId: string,
  utilityType: '',
  totalCost: string,
  billingPeriod: {
    startDate: string,
    endDate: string,
  },
  dueDate: string,
  isPaid: boolean,
}

export interface IBillResponse {
  totalUsageTime: number,
  totalCost: number,
  tenantPayments: {
    id: string,
    payment: number,
  }[]
}

export interface IGetBillParams {
  propertyId: string,
  startDate?: string,
  endDate?: string,
  dueDate?: string,
  utilityType?: string,
}

export const getBill = (data: IGetBillParams) => {
  return Request.get<any>('/bills', {data});
}

export const payBill = (billId: string) => {
  return Request.post<IBill>('/bills/pay', {
    data: {
      billId
    }
  });
}

export const addBill = (data: IBill) => {
  return Request.post<IBill>('/bills/add', {data});
}

export const triggerBill = (propertyId: string, utility: string) => {
  return Request.get<IBillResponse>(`/bills/property/${propertyId}/breakdown`, {
    data: {
      utilityType: utility
    }
  });
}
