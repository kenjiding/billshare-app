import React, { useState } from 'react';
import Register from './UserRegister';
import FaceUpload from './FaceUpload';
import CommonWraper from '@/components/CommonWraper';
import { register } from '@/service/auth';
import { catchError } from '@utils/helper';
import { useGlobalStore } from '@/store';
import { useRouter } from 'expo-router';

// userId: 66d845d229b4a3cb638deb02
// phone: '0422222222',
// password: '123456',
// username: 'Kenji',
// confirmPassword: '123456',
// email: Math.random().toString(36).substring(2) + '@gmail.com',
// propertyInfo: {
//   address: '8 - 12 sdjs d',
//   state: 'SA',
//   code: '5000',
//   city: 'Adelaide',
//   propertyPhotos: [],
// },

type indexProps = {
  // props
};
interface IForm {
  phone: string;
  password: string;
  confirmPassword: string;
  email: string;
  username: string;
  role: string;
  propertyId: string;
  idCardImages: string[];
  file: any;
}

const Index: React.FC<indexProps> = (props) => {
  const router = useRouter();
  const { updateLoading } = useGlobalStore();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<IForm>({
    phone: '0455555555',
    password: '123456',
    username: 'Mokok',
    confirmPassword: '123456',
    propertyId: 'Kenji-wSwuxlgXDp',
    email: Math.random().toString(36).substring(2) + '@gmail.com',
    role: 'tenant',
    idCardImages: [],
    file: null
  });

  const registed = async () => {
    updateLoading({ loading: true, text: 'registering' });
    const formData = new FormData();
    // 将图像文件添加到FormData中
    formData.append('file', {
      uri: form?.file?.uri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    } as any);
    formData.append('username', form.username);
    formData.append('phone', form.phone);
    formData.append('password', form.password);
    formData.append('role', form.role);
    formData.append('email', form.email);
    formData.append('propertyId', form.propertyId);
    const [err, data] = await catchError<any>(register({
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    }));
    updateLoading({ loading: false });
    console.log(data, 'err: ', err);
    if (err) {
      return err.message;
    }
    router.replace('/login');
  }

  const beforeSetStep = (num: number) => {
    setStep(num);
  }

  return (
    <CommonWraper linearGradientConf={{
      colors: ['#E4F2FF', '#B8DDFF'],
      start: { x: 0.5, y: 0 },
      end: { x: 0.5, y: 1 }
    }}>
      {
        step === 1 &&
        <Register
          data={form}
          onSetFormData={(data) => setForm({...form, ...data })}
          onConfirm={registed}
          onSetStep={beforeSetStep} />
      }
      {/* {
        step === 2 &&
        <IdCard
          onSetImages={(images) => setForm({...form, idCardImages: images })}
          images={form.idCardImages}
          onSetStep={beforeSetStep} />
      } */}
      {
        step === 2 && 
        <FaceUpload
          onSetImages={(file) => setForm({...form, file })}
          images={form.file ? [form.file.uri] : []}
          onConfirm={registed} 
          onSetStep={beforeSetStep} />
      }
    </CommonWraper>
  );
};

export default Index;