'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PrimaryButton from '@/app/components/Buttons/PrimaryButton';
import ProductCard from '@/app/components/Cards/ProductCard';
import Tabs from '@/app/components/Tabs/Tabs';
import Modal from '@/app/components/Modal';


export default function DashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem('isAuthenticated');
    const email = localStorage.getItem('userEmail');
    
    if (auth === 'true' && email) {
      setIsAuthenticated(true);
      setUserEmail(email);
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    router.push('/');
  };

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  const stats = [
    { label: 'Total Orders', value: '12', icon: '📦' },
    { label: 'Pending', value: '3', icon: '⏳' },
    { label: 'Completed', value: '9', icon: '✅' },
    { label: 'Total Spent', value: '$1,240', icon: '💰' },
  ];

  const recentOrders = [
    { id: 1, product: 'Handwoven Basket', date: '2024-01-15', status: 'Delivered', amount: '$45' },
    { id: 2, product: 'Ceramic Pottery Set', date: '2024-01-10', status: 'Delivered', amount: '$85' },
    { id: 3, product: 'Wooden Carving', date: '2024-01-08', status: 'Processing', amount: '$120' },
  ];

  const tabs = [
    {
      label: 'Overview',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <ProductCard key={index} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <span className="text-3xl">{stat.icon}</span>
                </div>
              </ProductCard>
            ))}
          </div>

          <ProductCard className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4 text-sm font-medium text-gray-700">Product</th>
                    <th className="text-left py-2 px-4 text-sm font-medium text-gray-700">Date</th>
                    <th className="text-left py-2 px-4 text-sm font-medium text-gray-700">Status</th>
                    <th className="text-left py-2 px-4 text-sm font-medium text-gray-700">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="py-3 px-4 text-sm text-gray-800">{order.product}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{order.date}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Delivered' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm font-semibold text-gray-900">{order.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ProductCard>
        </div>
      ),
    },
    {
      label: 'Orders',
      content: (
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <ProductCard key={order.id} className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{order.product}</h4>
                  <p className="text-sm text-gray-600">Ordered on {order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 mb-1">{order.amount}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === 'Delivered' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            </ProductCard>
          ))}
        </div>
      ),
    },
    {
      label: 'Profile',
      content: (
        <ProductCard className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <p className="text-gray-900">{userEmail}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
              <p className="text-gray-900">January 2024</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Account Status</label>
              <p className="text-green-600 font-medium">Active</p>
            </div>
          </div>
        </ProductCard>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-amber-800">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{userEmail}</span>
            <PrimaryButton onClick={() => setShowLogoutModal(true)} variant="outline">
              Logout
            </PrimaryButton>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs tabs={tabs} />
      </main>

      {/* Logout Modal */}
      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Confirm Logout"
      >
        <p className="text-gray-700 mb-6">Are you sure you want to logout?</p>
        <div className="flex gap-3 justify-end">
          <PrimaryButton onClick={() => setShowLogoutModal(false)} variant="secondary">
            Cancel
          </PrimaryButton>
          <PrimaryButton onClick={handleLogout} variant="danger">
            Logout
          </PrimaryButton>
        </div>
      </Modal>
    </div>
  );
}
