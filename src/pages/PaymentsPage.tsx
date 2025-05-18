import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import { Search, Calendar, CreditCard, Plus, Download } from 'lucide-react';

// Mock payment history
const mockPayments = [
  {
    id: '1',
    type: 'Iuran Bulanan',
    amount: 50000,
    date: '05 Oct 2025',
    status: 'success',
    method: 'Transfer Bank',
  },
  {
    id: '2',
    type: 'Iuran Bulanan',
    amount: 50000,
    date: '05 Sep 2025',
    status: 'success',
    method: 'QRIS',
  },
  {
    id: '3',
    type: 'Iuran Bulanan',
    amount: 50000,
    date: '05 Aug 2025',
    status: 'success',
    method: 'E-Wallet',
  },
  {
    id: '4',
    type: 'Pendaftaran',
    amount: 100000,
    date: '15 Jan 2023',
    status: 'success',
    method: 'Transfer Bank',
  },
];

// Payment methods
const paymentMethods = [
  { id: 'bank_transfer', name: 'Transfer Bank', icon: <CreditCard size={24} /> },
  { id: 'qris', name: 'QRIS', icon: <CreditCard size={24} /> },
  { id: 'ewallet', name: 'E-Wallet', icon: <CreditCard size={24} /> },
];

const PaymentsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('');
  
  // Filter payments based on search query
  const filteredPayments = mockPayments.filter(payment => 
    payment.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.method.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.date.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge variant="success">Berhasil</Badge>;
      case 'pending':
        return <Badge variant="warning">Diproses</Badge>;
      case 'failed':
        return <Badge variant="danger">Gagal</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };
  
  return (
    <Layout title="Pembayaran Iuran">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Pembayaran Iuran</h2>
          <p className="text-gray-600 mt-1">Kelola dan pantau pembayaran iuran bulanan</p>
        </div>
        <Button 
          variant="primary" 
          icon={<Plus size={16} />}
          onClick={() => setShowPayModal(true)}
        >
          Bayar Iuran
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <div className="mb-4 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Cari riwayat pembayaran..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Button variant="outline" icon={<Download size={16} />}>
              Export
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipe
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jumlah
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tanggal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Metode
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPayments.map(payment => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {payment.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      Rp {payment.amount.toLocaleString('id-ID')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2 text-gray-400" />
                        {payment.date}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.method}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(payment.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredPayments.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">Tidak ada riwayat pembayaran ditemukan</p>
              </div>
            )}
          </div>
        </Card>
        
        <Card title="Status Iuran">
          <div className="text-center py-6">
            <div className="w-24 h-24 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
              <CreditCard size={36} className="text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Status: Lunas</h3>
            <p className="text-sm text-gray-600 mt-1">Terakhir Bayar: 05 October 2025</p>
            <p className="text-sm text-gray-600 mt-1">Valid hingga: 30 November 2025</p>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800">Informasi Iuran</h4>
              <p className="text-sm text-blue-700 mt-1">
                Iuran bulanan dibayarkan setiap awal bulan sebesar Rp 50.000
              </p>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Pay Modal */}
      {showPayModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 transition-opacity" 
              onClick={() => setShowPayModal(false)}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Bayar Iuran Bulanan</h3>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Jumlah Pembayaran:</p>
                  <div className="text-2xl font-bold text-gray-900">Rp 50.000</div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Pilih Metode Pembayaran:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {paymentMethods.map(method => (
                      <div
                        key={method.id}
                        className={`
                          border rounded-lg p-4 cursor-pointer hover:bg-gray-50
                          ${selectedMethod === method.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
                        `}
                        onClick={() => setSelectedMethod(method.id)}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          {method.icon}
                          <span className="text-sm">{method.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                  <Button 
                    variant="primary"
                    className="w-full sm:ml-3 sm:w-auto"
                    disabled={!selectedMethod}
                    onClick={() => {
                      alert('Pembayaran berhasil!');
                      setShowPayModal(false);
                    }}
                  >
                    Bayar Sekarang
                  </Button>
                  <Button 
                    variant="outline"
                    className="mt-3 w-full sm:mt-0 sm:w-auto"
                    onClick={() => setShowPayModal(false)}
                  >
                    Batal
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default PaymentsPage;