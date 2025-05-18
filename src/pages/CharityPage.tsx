import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import { Search, Calendar, Heart, CreditCard, Plus } from 'lucide-react';

// Mock charity campaigns
const mockCharities = [
  {
    id: '1',
    title: 'Bantuan Pendidikan',
    image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Bantuan pendidikan untuk anak-anak dari keluarga prasejahtera anggota koperasi',
    target: 5000000,
    raised: 4750000,
    deadline: '30 Nov 2025',
    donorCount: 56,
    status: 'active'
  },
  {
    id: '2',
    title: 'Program Kesehatan Lansia',
    image: 'https://images.pexels.com/photos/7551615/pexels-photo-7551615.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Program pemeriksaan kesehatan gratis untuk anggota lansia',
    target: 3000000,
    raised: 3000000,
    deadline: '15 Sep 2025',
    donorCount: 42,
    status: 'completed'
  },
  {
    id: '3',
    title: 'Renovasi Masjid',
    image: 'https://images.pexels.com/photos/6152316/pexels-photo-6152316.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Bantuan renovasi masjid di wilayah koperasi cabang Jakarta Selatan',
    target: 10000000,
    raised: 7500000,
    deadline: '25 Dec 2025',
    donorCount: 78,
    status: 'active'
  },
  {
    id: '4',
    title: 'Bantuan Bencana Alam',
    image: 'https://images.pexels.com/photos/1464191/pexels-photo-1464191.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Bantuan bagi korban banjir di Jakarta dan sekitarnya',
    target: 8000000,
    raised: 2000000,
    deadline: '10 Nov 2025',
    donorCount: 24,
    status: 'active'
  }
];

// Payment methods
const paymentMethods = [
  { id: 'bank_transfer', name: 'Transfer Bank', icon: <CreditCard size={24} /> },
  { id: 'qris', name: 'QRIS', icon: <CreditCard size={24} /> },
  { id: 'ewallet', name: 'E-Wallet', icon: <CreditCard size={24} /> },
];

// Mock donation history
const mockDonations = [
  {
    id: '1',
    campaign: 'Bantuan Pendidikan',
    amount: 250000,
    date: '15 Oct 2025',
    status: 'success',
  },
  {
    id: '2',
    campaign: 'Program Kesehatan Lansia',
    amount: 100000,
    date: '20 Sep 2025',
    status: 'success',
  }
];

const CharityPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCharity, setSelectedCharity] = useState<any>(null);
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [activeTab, setActiveTab] = useState('campaigns');
  
  // Filter charities based on search query
  const filteredCharities = mockCharities.filter(charity => 
    charity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    charity.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleDonate = (charity: any) => {
    setSelectedCharity(charity);
    setShowDonateModal(true);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="primary">Aktif</Badge>;
      case 'completed':
        return <Badge variant="success">Selesai</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };
  
  return (
    <Layout title="Program Amal">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Program Amal</h2>
          <p className="text-gray-600 mt-1">Program amal dan donasi dari koperasi</p>
        </div>
        
        <div className="flex">
          <Button 
            variant={activeTab === 'campaigns' ? 'primary' : 'outline'}
            className="rounded-r-none"
            onClick={() => setActiveTab('campaigns')}
          >
            Program
          </Button>
          <Button 
            variant={activeTab === 'history' ? 'primary' : 'outline'}
            className="rounded-l-none"
            onClick={() => setActiveTab('history')}
          >
            Riwayat Donasi
          </Button>
        </div>
      </div>
      
      {activeTab === 'campaigns' ? (
        <>
          <Card className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Cari program amal..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredCharities.map(charity => (
              <Card key={charity.id} className="overflow-hidden">
                <div className="relative pb-[60%] overflow-hidden bg-gray-100">
                  <img
                    src={charity.image}
                    alt={charity.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {getStatusBadge(charity.status)}
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{charity.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{charity.description}</p>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Terkumpul</span>
                      <span className="font-medium">
                        {Math.round((charity.raised / charity.target) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${(charity.raised / charity.target) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-2 text-sm">
                      <span className="font-medium">Rp {charity.raised.toLocaleString('id-ID')}</span>
                      <span className="text-gray-500">dari Rp {charity.target.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Heart size={16} className="mr-1" />
                      {charity.donorCount} donatur
                    </div>
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      Hingga {charity.deadline}
                    </div>
                  </div>
                  
                  <Button 
                    variant="primary" 
                    className="w-full mt-4"
                    onClick={() => handleDonate(charity)}
                    disabled={charity.status !== 'active'}
                  >
                    {charity.status === 'active' ? 'Donasi Sekarang' : 'Donasi Ditutup'}
                  </Button>
                </div>
              </Card>
            ))}
            
            {filteredCharities.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">Tidak ada program amal ditemukan</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <Card>
          <h3 className="text-lg font-medium mb-4">Riwayat Donasi Saya</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Program
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jumlah
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tanggal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockDonations.map(donation => (
                  <tr key={donation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {donation.campaign}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      Rp {donation.amount.toLocaleString('id-ID')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2 text-gray-400" />
                        {donation.date}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="success">Berhasil</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {mockDonations.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">Belum ada riwayat donasi</p>
              </div>
            )}
          </div>
        </Card>
      )}
      
      {/* Donate Modal */}
      {showDonateModal && selectedCharity && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 transition-opacity" 
              onClick={() => setShowDonateModal(false)}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Donasi untuk "{selectedCharity.title}"
                </h3>
                
                <div className="mb-4">
                  <Input
                    label="Jumlah Donasi (Rp)"
                    type="number"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    placeholder="Masukkan jumlah donasi"
                    required
                  />
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
                    disabled={!donationAmount || !selectedMethod}
                    onClick={() => {
                      alert('Donasi berhasil!');
                      setShowDonateModal(false);
                    }}
                  >
                    Donasi Sekarang
                  </Button>
                  <Button 
                    variant="outline"
                    className="mt-3 w-full sm:mt-0 sm:w-auto"
                    onClick={() => setShowDonateModal(false)}
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

export default CharityPage;