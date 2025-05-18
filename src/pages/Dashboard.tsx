import React from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';
import { Users, CreditCard, ShoppingBag, Heart } from 'lucide-react';

const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
}> = ({ title, value, icon, change, changeType = 'neutral' }) => {
  const changeColor = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-500',
  }[changeType];
  
  return (
    <Card className="flex-1">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-semibold mt-1">{value}</h3>
          {change && (
            <p className={`text-xs mt-1 ${changeColor}`}>
              {change}
            </p>
          )}
        </div>
        <div className="p-3 rounded-full bg-blue-50">
          {icon}
        </div>
      </div>
    </Card>
  );
};

const RecentActivityItem: React.FC<{
  title: string;
  time: string;
  description: string;
  status?: 'success' | 'pending' | 'failed';
}> = ({ title, time, description, status }) => {
  const statusColors = {
    success: 'bg-green-500',
    pending: 'bg-yellow-500',
    failed: 'bg-red-500',
  };
  
  return (
    <div className="py-3 border-b last:border-0">
      <div className="flex justify-between">
        <h4 className="font-medium text-gray-800">{title}</h4>
        <span className="text-xs text-gray-500">{time}</span>
      </div>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
      {status && (
        <div className="flex items-center mt-2">
          <span className={`w-2 h-2 rounded-full mr-2 ${statusColors[status]}`}></span>
          <span className="text-xs capitalize">{status}</span>
        </div>
      )}
    </div>
  );
};

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin_central' || user?.role === 'admin_branch';
  
  // Dummy data for admin dashboard
  const adminStats = [
    { 
      title: 'Total Anggota', 
      value: 245, 
      change: '+12% sejak bulan lalu', 
      changeType: 'positive' as const,
      icon: <Users size={24} className="text-blue-600" />
    },
    { 
      title: 'Pembayaran Iuran', 
      value: 'Rp 12.5 juta', 
      change: '+8% sejak bulan lalu', 
      changeType: 'positive' as const,
      icon: <CreditCard size={24} className="text-blue-600" />
    },
    { 
      title: 'Produk UMKM', 
      value: 32, 
      change: '+3 produk baru', 
      changeType: 'positive' as const,
      icon: <ShoppingBag size={24} className="text-blue-600" />
    },
    { 
      title: 'Total Donasi', 
      value: 'Rp 4.8 juta', 
      change: '+15% sejak bulan lalu', 
      changeType: 'positive' as const,
      icon: <Heart size={24} className="text-blue-600" />
    }
  ];
  
  // Dummy data for member dashboard
  const memberStats = [
    { 
      title: 'Status Iuran', 
      value: 'Lunas', 
      change: 'Valid hingga 30 Nov 2025', 
      changeType: 'positive' as const,
      icon: <CreditCard size={24} className="text-green-600" />
    },
    { 
      title: 'Donasi Saya', 
      value: 'Rp 250.000', 
      change: '2 donasi tahun ini', 
      changeType: 'neutral' as const,
      icon: <Heart size={24} className="text-blue-600" />
    }
  ];
  
  // Recent activities
  const recentActivities = [
    {
      title: 'Pembayaran Iuran',
      time: '2 jam yang lalu',
      description: 'Ahmad Fauzi telah melakukan pembayaran iuran bulanan sebesar Rp. 50.000',
      status: 'success' as const
    },
    {
      title: 'Anggota Baru',
      time: '5 jam yang lalu',
      description: 'Siti Aminah telah terdaftar sebagai anggota baru dari cabang Jakarta Selatan',
      status: 'success' as const
    },
    {
      title: 'Produk Baru',
      time: '1 hari yang lalu',
      description: 'Produk baru "Keripik Singkong" telah ditambahkan oleh UMKM Makmur Jaya',
      status: 'success' as const
    },
    {
      title: 'Donasi',
      time: '2 hari yang lalu',
      description: 'Donasi untuk "Bantuan Pendidikan" telah mencapai target Rp. 5.000.000',
      status: 'success' as const
    }
  ];
  
  const welcomeMessage = isAdmin 
    ? `Selamat datang kembali, ${user?.name}!` 
    : `Halo, ${user?.name}!`;
  
  const statsData = isAdmin ? adminStats : memberStats;
  
  return (
    <Layout title="Dashboard">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{welcomeMessage}</h2>
        <p className="text-gray-600 mt-1">Berikut adalah ringkasan aktivitas terbaru.</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 xl:grid-cols-4">
        {statsData.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            change={stat.change}
            changeType={stat.changeType}
          />
        ))}
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card title="Aktivitas Terbaru">
            <div>
              {recentActivities.map((activity, index) => (
                <RecentActivityItem
                  key={index}
                  title={activity.title}
                  time={activity.time}
                  description={activity.description}
                  status={activity.status}
                />
              ))}
            </div>
          </Card>
        </div>
        
        <div>
          <Card title="Agenda Mendatang">
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-3 py-2">
                <p className="font-medium">Rapat Anggota Tahunan</p>
                <p className="text-sm text-gray-500 mt-1">12 November 2025, 09:00 WIB</p>
                <p className="text-sm mt-1">Aula Utama Kantor Pusat</p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-3 py-2">
                <p className="font-medium">Pelatihan UMKM</p>
                <p className="text-sm text-gray-500 mt-1">18 November 2025, 13:00 WIB</p>
                <p className="text-sm mt-1">Online via Zoom</p>
              </div>
              
              <div className="border-l-4 border-yellow-500 pl-3 py-2">
                <p className="font-medium">Batas Akhir Pembayaran Iuran</p>
                <p className="text-sm text-gray-500 mt-1">30 November 2025</p>
                <p className="text-sm mt-1">Harap segera melakukan pembayaran</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;