import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, MapPin, Calendar, Edit, CheckCircle, XCircle, Shield, Building } from 'lucide-react';

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  nik: string;
  nokk: string;
}

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    name: user?.name || '',
    email: user?.email || '',
    phone: '081234567890', // Mock data
    address: 'Jl. Kenanga No. 15, Jakarta Selatan', // Mock data
    nik: '3374052501900001', // Mock data
    nokk: '3374051234567890', // Mock data
  });
  
  const [changePassword, setChangePassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [activeTab, setActiveTab] = useState('profile');
  const [passwordError, setPasswordError] = useState('');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChangePassword(prev => ({ ...prev, [name]: value }));
    setPasswordError('');
  };
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, would send to API
    console.log('Updating profile:', formData);
    setIsEditing(false);
  };
  
  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (changePassword.newPassword !== changePassword.confirmPassword) {
      setPasswordError('Password baru dan konfirmasi password tidak sama');
      return;
    }
    
    if (changePassword.newPassword.length < 8) {
      setPasswordError('Password harus minimal 8 karakter');
      return;
    }
    
    // In a real app, would send to API
    console.log('Updating password:', changePassword);
    
    // Reset form
    setChangePassword({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    
    alert('Password berhasil diperbarui');
  };
  
  // Mock membership data
  const membershipData = {
    memberId: 'M-' + Math.floor(10000 + Math.random() * 90000),
    joinDate: '15 Jan 2023',
    status: 'Aktif',
    lastPayment: '05 Oct 2025',
    validUntil: '30 Nov 2025',
  };
  
  return (
    <Layout title="Profil">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Profil Saya</h2>
        <p className="text-gray-600 mt-1">Kelola informasi pribadi dan pengaturan akun</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <div className="border-b">
              <div className="flex space-x-2">
                <button
                  className={`px-4 py-3 text-sm font-medium ${
                    activeTab === 'profile'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('profile')}
                >
                  Informasi Pribadi
                </button>
                <button
                  className={`px-4 py-3 text-sm font-medium ${
                    activeTab === 'password'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('password')}
                >
                  Ganti Password
                </button>
              </div>
            </div>
            
            <div className="p-4">
              {activeTab === 'profile' ? (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Informasi Pribadi</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={isEditing ? <CheckCircle size={16} /> : <Edit size={16} />}
                      onClick={() => isEditing ? handleProfileUpdate : setIsEditing(!isEditing)}
                    >
                      {isEditing ? 'Simpan' : 'Edit'}
                    </Button>
                  </div>
                  
                  <form onSubmit={handleProfileUpdate}>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Input
                        label="Nama Lengkap"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        icon={<User size={18} className="text-gray-400" />}
                      />
                      <Input
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        icon={<Mail size={18} className="text-gray-400" />}
                      />
                      <Input
                        label="Telepon"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        icon={<Phone size={18} className="text-gray-400" />}
                      />
                      <Input
                        label="NIK (KTP)"
                        name="nik"
                        value={formData.nik}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        icon={<Shield size={18} className="text-gray-400" />}
                      />
                      <Input
                        label="No. KK"
                        name="nokk"
                        value={formData.nokk}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        icon={<Shield size={18} className="text-gray-400" />}
                      />
                      <div className="sm:col-span-2">
                        <Input
                          label="Alamat"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          icon={<MapPin size={18} className="text-gray-400" />}
                        />
                      </div>
                    </div>
                    
                    {isEditing && (
                      <div className="mt-4 flex justify-end space-x-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                          icon={<XCircle size={16} />}
                        >
                          Batal
                        </Button>
                        <Button
                          type="submit"
                          variant="primary"
                          icon={<CheckCircle size={16} />}
                        >
                          Simpan Perubahan
                        </Button>
                      </div>
                    )}
                  </form>
                </>
              ) : (
                <>
                  <div className="mb-4">
                    <h3 className="text-lg font-medium">Ganti Password</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Untuk keamanan akun, gunakan password yang kuat dan jangan gunakan password yang sama dengan akun lain
                    </p>
                  </div>
                  
                  {passwordError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-sm text-red-700">{passwordError}</p>
                    </div>
                  )}
                  
                  <form onSubmit={handlePasswordUpdate}>
                    <div className="space-y-4">
                      <Input
                        label="Password Saat Ini"
                        name="currentPassword"
                        type="password"
                        value={changePassword.currentPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                      <Input
                        label="Password Baru"
                        name="newPassword"
                        type="password"
                        value={changePassword.newPassword}
                        onChange={handlePasswordChange}
                        required
                        helperText="Minimal 8 karakter"
                      />
                      <Input
                        label="Konfirmasi Password Baru"
                        name="confirmPassword"
                        type="password"
                        value={changePassword.confirmPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                    </div>
                    
                    <div className="mt-5">
                      <Button
                        type="submit"
                        variant="primary"
                      >
                        Perbarui Password
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </Card>
        </div>
        
        <div>
          <Card className="mb-6">
            <div className="text-center p-4">
              <div className="h-24 w-24 bg-blue-100 rounded-full mx-auto flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-blue-600">{user?.name.charAt(0).toUpperCase()}</span>
              </div>
              <h3 className="text-xl font-medium">{user?.name}</h3>
              <p className="text-gray-600 mt-1">{user?.email}</p>
              
              <div className="flex items-center justify-center mt-3">
                {user?.role === 'admin_central' && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    <Shield size={12} className="mr-1" /> Admin Pusat
                  </span>
                )}
                {user?.role === 'admin_branch' && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <Building size={12} className="mr-1" /> Admin Cabang {user?.branch}
                  </span>
                )}
                {user?.role === 'member' && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <User size={12} className="mr-1" /> Anggota
                  </span>
                )}
              </div>
            </div>
          </Card>
          
          <Card title="Detail Keanggotaan">
            <div className="divide-y">
              <div className="py-3 flex justify-between">
                <span className="text-sm text-gray-500">ID Anggota</span>
                <span className="text-sm font-medium">{membershipData.memberId}</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-sm text-gray-500">Tanggal Bergabung</span>
                <span className="text-sm font-medium flex items-center">
                  <Calendar size={14} className="mr-1 text-gray-400" />
                  {membershipData.joinDate}
                </span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-sm text-gray-500">Status</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {membershipData.status}
                </span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-sm text-gray-500">Pembayaran Terakhir</span>
                <span className="text-sm font-medium">{membershipData.lastPayment}</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-sm text-gray-500">Valid Hingga</span>
                <span className="text-sm font-medium">{membershipData.validUntil}</span>
              </div>
            </div>
            
            <div className="mt-4">
              <Button variant="outline" fullWidth>
                Lihat Riwayat Pembayaran
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;