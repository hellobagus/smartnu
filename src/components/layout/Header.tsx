import React, { useState } from 'react';
import { Menu, X, Bell, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from './Sidebar';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleNotifications = () => setIsNotificationsOpen(!isNotificationsOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  
  // Mock notifications
  const notifications = [
    { id: 1, message: 'Pembayaran iuran berhasil', time: '5 menit yang lalu', isRead: false },
    { id: 2, message: 'Produk baru telah ditambahkan', time: '1 jam yang lalu', isRead: false },
    { id: 3, message: 'Pemberitahuan rapat anggota', time: '1 hari yang lalu', isRead: true },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 bg-white border-b md:px-6">
        <div className="flex items-center lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-md hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
        </div>
        
        <div className="hidden lg:block">
          <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <button
              onClick={toggleNotifications}
              className="p-2 rounded-full hover:bg-gray-100 relative"
              aria-label="Notifications"
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden border z-40">
                <div className="p-3 border-b">
                  <h3 className="font-medium">Notifikasi</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map(notification => (
                    <div 
                      key={notification.id}
                      className={`p-3 border-b hover:bg-gray-50 ${
                        !notification.isRead ? 'bg-blue-50' : ''
                      }`}
                    >
                      <p className="text-sm font-medium">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t text-center">
                  <button className="text-sm text-blue-600 hover:text-blue-800">
                    Lihat semua notifikasi
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="relative">
            <button
              onClick={toggleProfileMenu}
              className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg"
            >
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <span className="hidden md:block text-sm font-medium">{user?.name}</span>
              <ChevronDown size={16} />
            </button>
            
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden border z-40">
                <div className="p-3 border-b">
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <div className="p-2">
                  <button 
                    onClick={logout}
                    className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
                  >
                    Keluar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={toggleMobileMenu}></div>
          <div className="relative flex flex-col h-full max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 pt-2 pr-2">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                <X size={24} />
              </button>
            </div>
            <Sidebar isMobile onClose={toggleMobileMenu} />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;