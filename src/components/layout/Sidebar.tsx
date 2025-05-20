/** @format */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Users,
  ShoppingBag,
  CreditCard,
  Heart,
  Info,
  User,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/images/logo-muslimat.jpg';

interface NavItemProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  to,
  label,
  icon,
  active,
  onClick,
}) => {
  return (
    <Link
      to={to}
      className={`flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
        active
          ? 'bg-blue-100 text-blue-800 font-medium'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
      onClick={onClick}>
      <span className='mr-3'>{icon}</span>
      {label}
    </Link>
  );
};

const Sidebar: React.FC<{ isMobile?: boolean; onClose?: () => void }> = ({
  isMobile = false,
  onClose,
}) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    {
      to: '/dashboard',
      label: 'Dashboard',
      icon: <Home size={20} />,
      roles: ['member', 'admin_central', 'admin_branch'],
    },
    {
      to: '/members',
      label: 'Anggota',
      icon: <Users size={20} />,
      roles: ['admin_central', 'admin_branch'],
    },
    {
      to: '/products',
      label: 'Produk UMKM',
      icon: <ShoppingBag size={20} />,
      roles: ['member', 'admin_central', 'admin_branch'],
    },
    {
      to: '/payments',
      label: 'Pembayaran Iuran',
      icon: <CreditCard size={20} />,
      roles: ['member', 'admin_central', 'admin_branch'],
    },
    {
      to: '/charity',
      label: 'Amal',
      icon: <Heart size={20} />,
      roles: ['member', 'admin_central', 'admin_branch'],
    },
    {
      to: '/info',
      label: 'Informasi Koperasi',
      icon: <Info size={20} />,
      roles: ['member', 'admin_central', 'admin_branch'],
    },
  ];

  const isAllowed = (roles: string[]) => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  const handleItemClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  return (
    <div
      className={`flex flex-col h-full ${
        isMobile ? 'w-full' : 'w-64'
      } bg-white border-r`}>
      <div className='p-4 border-b'>
        <img
          src={logo}
          alt='NU Logo'
          className='mx-auto mb-2'
        />
      </div>

      <div className='flex-1 py-4 overflow-y-auto'>
        <div className='px-3 space-y-1'>
          {navItems.map(
            (item) =>
              isAllowed(item.roles) && (
                <NavItem
                  key={item.to}
                  to={item.to}
                  label={item.label}
                  icon={item.icon}
                  active={location.pathname === item.to}
                  onClick={handleItemClick}
                />
              )
          )}
        </div>
      </div>

      <div className='p-4 border-t'>
        <NavItem
          to='/profile'
          label='Profil'
          icon={<User size={20} />}
          active={location.pathname === '/profile'}
          onClick={handleItemClick}
        />
        <button
          className='flex items-center w-full px-4 py-3 mt-1 text-sm text-red-600 rounded-lg hover:bg-red-50'
          onClick={() => {
            logout();
            if (isMobile && onClose) {
              onClose();
            }
          }}>
          <LogOut size={20} className='mr-3' />
          Keluar
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
