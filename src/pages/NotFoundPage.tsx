import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-blue-600">404</h1>
          <h2 className="mt-2 text-2xl font-semibold text-gray-900">Halaman Tidak Ditemukan</h2>
          <p className="mt-2 text-base text-gray-500">
            Maaf, halaman yang Anda cari tidak dapat ditemukan.
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <Button 
              variant="outline" 
              icon={<ArrowLeft size={16} />}
              onClick={() => window.history.back()}
            >
              Kembali
            </Button>
            <Link to="/dashboard">
              <Button 
                variant="primary" 
                icon={<Home size={16} />}
              >
                Kembali ke Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;