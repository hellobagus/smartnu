import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import { Search, Calendar, CreditCard, Plus, Download } from 'lucide-react';

// List of Indonesian provinces
const provinces = [
  'DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur', 'Banten'
];

// Mock member data with branches and payment histories
const mockMembers = [
  {
    id: '1',
    name: 'Ahmad Fauzi',
    province: 'DKI Jakarta',
    monthlyDues: 50000,
    paymentHistory: [
      { id: '1-1', type: 'Iuran Bulanan', amount: 50000, date: '05 Oct 2025', status: 'success', method: 'Transfer Bank' },
      { id: '1-2', type: 'Iuran Bulanan', amount: 50000, date: '05 Sep 2025', status: 'success', method: 'QRIS' },
      { id: '1-3', type: 'Pendaftaran', amount: 100000, date: '15 Jan 2023', status: 'success', method: 'Transfer Bank' },
    ],
  },
  {
    id: '2',
    name: 'Siti Aminah',
    province: 'Jawa Barat',
    monthlyDues: 50000,
    paymentHistory: [
      { id: '2-1', type: 'Iuran Bulanan', amount: 50000, date: '10 Oct 2025', status: 'success', method: 'E-Wallet' },
      { id: '2-2', type: 'Iuran Bulanan', amount: 50000, date: '10 Sep 2025', status: 'pending', method: 'QRIS' },
    ],
  },
  {
    id: '3',
    name: 'Budi Santoso',
    province: 'Jawa Tengah',
    monthlyDues: 50000,
    paymentHistory: [
      { id: '3-1', type: 'Iuran Bulanan', amount: 50000, date: '15 Aug 2025', status: 'success', method: 'Transfer Bank' },
      { id: '3-2', type: 'Pendaftaran', amount: 100000, date: '22 Jun 2023', status: 'success', method: 'Transfer Bank' },
    ],
  },
  {
    id: '4',
    name: 'Dewi Lestari',
    province: 'Jawa Timur',
    monthlyDues: 50000,
    paymentHistory: [
      { id: '4-1', type: 'Iuran Bulanan', amount: 50000, date: '02 Oct 2025', status: 'success', method: 'QRIS' },
    ],
  },
  {
    id: '5',
    name: 'Eko Prasetyo',
    province: 'Banten',
    monthlyDues: 50000,
    paymentHistory: [
      { id: '5-1', type: 'Pendaftaran', amount: 100000, date: '14 Dec 2023', status: 'success', method: 'Transfer Bank' },
    ],
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
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedMember, setSelectedMember] = useState('');
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('');

  // Filter members based on selected province
  const filteredMembers = selectedProvince
    ? mockMembers.filter(member => member.province === selectedProvince)
    : mockMembers;

  // Get payment history for selected member or all members in selected province
  const filteredPayments = filteredMembers
    .filter(member => !selectedMember || member.id === selectedMember)
    .flatMap(member => member.paymentHistory)
    .filter(payment => 
      payment.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.method.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.date.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Calculate total dues for selected province
  const totalDues = filteredMembers.reduce((sum, member) => sum + member.monthlyDues, 0);
  const memberCount = filteredMembers.length;

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
          <p className="text-gray-600 mt-1">Kelola dan pantau pembayaran iuran bulanan per cabang</p>
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
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Semua Provinsi</option>
              {provinces.map(province => (
                <option key={province} value={province}>{province}</option>
              ))}
            </select>
            <select
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Semua Anggota</option>
              {filteredMembers.map(member => (
                <option key={member.id} value={member.id}>{member.name}</option>
              ))}
            </select>
            <Button variant="outline" icon={<Download size={16} />}>
              Export
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Anggota
                  </th>
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
                {filteredPayments.map(payment => {
                  const member = mockMembers.find(m => m.paymentHistory.some(p => p.id === payment.id));
                  return (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {member?.name}
                      </td>
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
                  );
                })}
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
            <h3 className="text-lg font-medium text-gray-900">
              {selectedProvince ? `Iuran ${selectedProvince}` : 'Iuran Semua Provinsi'}
            </h3>
            <p className="text-sm text-gray-600 mt-1">Jumlah Anggota: {memberCount}</p>
            <p className="text-sm text-gray-600 mt-1">Total Iuran Bulanan: Rp {totalDues.toLocaleString('id-ID')}</p>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800">Informasi Iuran</h4>
              <p className="text-sm text-blue-700 mt-1">
                Iuran bulanan dibayarkan setiap awal bulan sebesar Rp 50.000 per anggota
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
                  <label htmlFor="member" className="block text-sm font-medium text-gray-700">
                    Pilih Anggota
                  </label>
                  <select
                    id="member"
                    value={selectedMember}
                    onChange={(e) => setSelectedMember(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    <option value="">Pilih Anggota</option>
                    {mockMembers.map(member => (
                      <option key={member.id} value={member.id}>{member.name} ({member.province})</option>
                    ))}
                  </select>
                </div>
                
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
                    disabled={!selectedMethod || !selectedMember}
                    onClick={() => {
                      alert('Pembayaran berhasil!');
                      setShowPayModal(false);
                      setSelectedMember('');
                      setSelectedMethod('');
                    }}
                  >
                    Bayar Sekarang
                  </Button>
                  <Button 
                    variant="outline"
                    className="mt-3 w-full sm:mt-0 sm:w-auto"
                    onClick={() => {
                      setShowPayModal(false);
                      setSelectedMember('');
                      setSelectedMethod('');
                    }}
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