
import Request from '@/utils/request';


export interface IPi {
  // name: string;
  // id: string;
}

export const saveNotificationsToken = (data: any) => {
  return Request.post('/notifications/save-token', {
    data
  });
}


export const sendTestNotifications = (data: any) => {
  return Request.post('/notifications/send-test-notification', {
    data
  });
}

