import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import { Plus, Search, Filter, Download, Edit, Trash2, User, Eye } from 'lucide-react';

// List of Indonesian provinces
const provinces = [
  'Aceh', 'Sumatera Utara', 'Sumatera Barat', 'Riau', 'Kepulauan Riau', 
  'Jambi', 'Sumatera Selatan', 'Bangka Belitung', 'Bengkulu', 'Lampung',
  'DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'DI Yogyakarta', 'Jawa Timur',
  'Banten', 'Bali', 'Nusa Tenggara Barat', 'Nusa Tenggara Timur',
  'Kalimantan Barat', 'Kalimantan Tengah', 'Kalimantan Selatan', 
  'Kalimantan Timur', 'Kalimantan Utara', 'Sulawesi Utara', 'Sulawesi Tengah',
  'Sulawesi Selatan', 'Sulawesi Tenggara', 'Gorontalo', 'Sulawesi Barat',
  'Maluku', 'Maluku Utara', 'Papua', 'Papua Barat'
];

// Mock data for members with provinces
const mockMembers = [
  {
    id: '1',
    name: 'Ahmad Fauzi',
    nik: '3374052501850002',
    province: 'DKI Jakarta',
    status: 'active',
    joinDate: '15 Jan 2023',
    lastPayment: '05 Oct 2025',
  },
  {
    id: '2',
    name: 'Siti Aminah',
    nik: '3374052501900003',
    province: 'Jawa Barat',
    status: 'active',
    joinDate: '03 Mar 2023',
    lastPayment: '10 Oct 2025',
  },
  {
    id: '3',
    name: 'Budi Santoso',
    nik: '3374052501880004',
    province: 'Jawa Tengah',
    status: 'inactive',
    joinDate: '22 Jun 2023',
    lastPayment: '15 Aug 2025',
  },
  {
    id: '4',
    name: 'Dewi Lestari',
    nik: '3374052501950005',
    province: 'Jawa Timur',
    status: 'active',
    joinDate: '08 Sep 2023',
    lastPayment: '02 Oct 2025',
  },
  {
    id: '5',
    name: 'Eko Prasetyo',
    nik: '3374052501870006',
    province: 'Banten',
    status: 'pending',
    joinDate: '14 Dec 2023',
    lastPayment: '-',
  },
];

interface MemberFormData {
  name: string;
  nik: string;
  nokk: string;
  address: string;
  phone: string;
  email: string;
  province: string;
  ktpFile?: File | null;
  kkFile?: File | null;
}

const MembersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [formData, setFormData] = useState<MemberFormData>({
    name: '',
    nik: '',
    nokk: '',
    address: '',
    phone: '',
    email: '',
    province: '',
    ktpFile: null,
    kkFile: null,
  });
  
  // Filter members based on search query
  const filteredMembers = mockMembers.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.nik.includes(searchQuery) ||
    member.province.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (files) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, would send to API (including file uploads)
    console.log('Adding new member:', formData);
    setShowAddModal(false);
    // Reset form
    setFormData({
      name: '',
      nik: '',
      nokk: '',
      address: '',
      phone: '',
      email: '',
      province: '',
      ktpFile: null,
      kkFile: null,
    });
  };
  
  const handleViewMember = (member: any) => {
    setSelectedMember(member);
    setShowViewModal(true);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Aktif</Badge>;
      case 'inactive':
        return <Badge variant="danger">Tidak Aktif</Badge>;
      case 'pending':
        return <Badge variant="warning">Menunggu</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };
  
  return (
    <Layout title="Anggota">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Manajemen Anggota</h2>
          <p className="text-gray-600 mt-1">Kelola data anggota koperasi</p>
        </div>
        <Button 
          variant="primary" 
          icon={<Plus size={16} />}
          onClick={() => setShowAddModal(true)}
        >
          Tambah Anggota
        </Button>
      </div>
      
      <Card>
        <div className="mb-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Cari anggota..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" icon={<Filter size={16} />}>
              Filter
            </Button>
            <Button variant="outline" icon={<Download size={16} />}>
              Export
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NIK
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cabang
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal Bergabung
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pembayaran Terakhir
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMembers.map(member => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <User size={16} className="text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{member.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.nik}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.province}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(member.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.joinDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.lastPayment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => handleViewMember(member)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Eye size={18} />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit size={18} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredMembers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Tidak ada anggota ditemukan</p>
            </div>
          )}
        </div>
      </Card>
      
      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 transition-opacity" 
              onClick={() => setShowAddModal(false)}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Tambah Anggota Baru</h3>
                
                <form onSubmit={handleAddMember}>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Input
                      label="Nama Lengkap"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      label="NIK (KTP)"
                      name="nik"
                      value={formData.nik}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      label="No. KK"
                      name="nokk"
                      value={formData.nokk}
                      onChange={handleInputChange}
                      required
                    />
                    <div>
                      <label htmlFor="province" className="block text-sm font-medium text-gray-700">
                        Pilih cabang
                      </label>
                      <select
                        id="province"
                        name="province"
                        value={formData.province}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                      >
                        <option value="">Pilih Provinsi</option>
                        {provinces.map(province => (
                          <option key={province} value={province}>{province}</option>
                        ))}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <Input
                        label="Alamat"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <Input
                      label="Telepon"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      label="Email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    <div className="sm:col-span-2">
                      <label htmlFor="ktpFile" className="block text-sm font-medium text-gray-700">
                        Upload KTP
                      </label>
                      <input
                        type="file"
                        id="ktpFile"
                        name="ktpFile"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleInputChange}
                        className="mt-1 block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-md file:border-0
                          file:text-sm file:font-semibold
                          file:bg-indigo-50 file:text-indigo-700
                          hover:file:bg-indigo-100"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="kkFile" className="block text-sm font-medium text-gray-700">
                        Upload KK
                      </label>
                      <input
                        type="file"
                        id="kkFile"
                        name="kkFile"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleInputChange}
                        className="mt-1 block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-md file:border-0
                          file:text-sm file:font-semibold
                          file:bg-indigo-50 file:text-indigo-700
                          hover:file:bg-indigo-100"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                    <Button 
                      type="submit"
                      variant="primary"
                      className="w-full sm:ml-3 sm:w-auto"
                    >
                      Simpan
                    </Button>
                    <Button 
                      type="button"
                      variant="outline"
                      className="mt-3 w-full sm:mt-0 sm:w-auto"
                      onClick={() => setShowAddModal(false)}
                    >
                      Batal
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* View Member Modal */}
      {showViewModal && selectedMember && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 transition-opacity" 
              onClick={() => setShowViewModal(false)}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <User size={20} className="text-blue-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium text-gray-900">
                      Detail Anggota
                    </h3>
                  </div>
                </div>
                
                <div className="mt-4 border-t pt-4">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Nama Lengkap</dt>
                      <dd className="mt-1 text-sm text-gray-900">{selectedMember.name}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">NIK</dt>
                      <dd className="mt-1 text-sm text-gray-900">{selectedMember.nik}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Provinsi</dt>
                      <dd className="mt-1 text-sm text-gray-900">{selectedMember.province}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Status</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {getStatusBadge(selectedMember.status)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Tanggal Bergabung</dt>
                      <dd className="mt-1 text-sm text-gray-900">{selectedMember.joinDate}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Pembayaran Terakhir</dt>
                      <dd className="mt-1 text-sm text-gray-900">{selectedMember.lastPayment}</dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <Button 
                  variant="outline"
                  className="w-full sm:ml-3 sm:w-auto"
                  onClick={() => setShowViewModal(false)}
                >
                  Tutup
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default MembersPage;