/** @format */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { UserRound, Lock, AlertCircle } from 'lucide-react';
import logo from '../assets/images/logo-muslimat.jpg';


interface LoginForm {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<LoginForm>>({});
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setLoginError(null);
  };

  const validate = (): boolean => {
    const newErrors: Partial<LoginForm> = {};

    if (!formData.email) {
      newErrors.email = 'Email diperlukan';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (!formData.password) {
      newErrors.password = 'Password diperlukan';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);
    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        navigate('/dashboard');
      } else {
        setLoginError('Email atau password salah. Silakan coba lagi.');
      }
    } catch (error) {
      setLoginError('Terjadi kesalahan saat login. Silakan coba lagi.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Example accounts
  const exampleAccounts = [
    { role: 'Admin Pusat', email: 'admin@example.com', password: 'password' },
    { role: 'Admin Cabang', email: 'branch@example.com', password: 'password' },
    { role: 'Anggota', email: 'member@example.com', password: 'password' },
  ];

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md px-4'>
        <div className='text-center mb-6'>
          <img
            src={logo}
            alt='NU Logo'
            className='mx-auto mb-2'
          />
        </div>

        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border'>
          <h2 className='text-xl font-semibold text-gray-800 mb-6 text-center'>
            Masuk ke Akun Anda
          </h2>

          {loginError && (
            <div className='mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start'>
              <AlertCircle
                size={18}
                className='text-red-500 mt-0.5 mr-2 flex-shrink-0'
              />
              <p className='text-sm text-red-700'>{loginError}</p>
            </div>
          )}

          <form className='space-y-5' onSubmit={handleSubmit}>
            <div>
              <Input
                label='Email'
                type='email'
                name='email'
                id='email'
                value={formData.email}
                onChange={handleInputChange}
                placeholder='Email Anda'
                error={errors.email}
                autoComplete='email'
                icon={<UserRound size={18} />}
              />
            </div>

            <div>
              <Input
                label='Password'
                type='password'
                name='password'
                id='password'
                value={formData.password}
                onChange={handleInputChange}
                placeholder='Password Anda'
                error={errors.password}
                autoComplete='current-password'
                icon={<Lock size={18} />}
              />
            </div>

            <div>
              <Button
                type='submit'
                variant='primary'
                fullWidth
                disabled={isLoading}>
                {isLoading ? 'Memproses...' : 'Masuk'}
              </Button>
            </div>
          </form>
        </div>

        <div className='mt-8 bg-white p-4 rounded-lg border shadow'>
          <h3 className='text-sm font-medium text-gray-700 mb-2'>Akun Demo:</h3>
          <div className='space-y-2 text-xs'>
            {exampleAccounts.map((account, index) => (
              <div
                key={index}
                className='p-2 bg-gray-50 rounded border flex justify-between'>
                <span className='font-medium'>{account.role}:</span>
                <span>
                  {account.email} / {account.password}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
