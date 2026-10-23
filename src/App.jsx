
import React, { useState } from 'react';
import './App.css';
import { 
  mockFarmStats, 
  mockCows, 
  mockAlerts, 
  mockDevices 
} from './mockData';

import Sidebar from './components/Sidebar';
import FarmerView from './components/FarmerView';
import DashboardView from './components/DashboardView';
import HerdView from './components/HerdView';
import AlertsView from './components/AlertsView';
import DevicesView from './components/DevicesView';
import SettingsView from './components/SettingsView';
import CowDetailModal from './components/CowDetailModal';
import AddCowModal from './components/AddCowModal';

import { Bell, Tractor, LayoutDashboard } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('farmer'); // Default to Farmer View!
  const [cows, setCows] = useState(mockCows);
  const [alerts, setAlerts] = useState(mockAlerts);
  const [devices, setDevices] = useState(mockDevices);
  const [farmStats, setFarmStats] = useState(mockFarmStats);
  const [selectedCow, setSelectedCow] = useState(null);
  const [isAddCowOpen, setIsAddCowOpen] = useState(false);

  const handleAcknowledgeAlert = (alertId) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, acknowledged: true } : a));
  };

  const handleAddCow = (newCow) => {
    setCows(prev => [newCow, ...prev]);
    setFarmStats(prev => ({
      ...prev,
      totalCows: prev.totalCows + 1,
      milkingCows: prev.milkingCows + 1
    }));
  };

  const unreadAlertsCount = alerts.filter(a => !a.acknowledged).length;

  const getPageTitle = () => {
    switch (activeTab) {
      case 'farmer': return { title: 'واجهة الفلاح الميدانية البسيطة 🚜', subtitle: 'موجز فوري بألوان واضحة بدون تعقيد تقني' };
      case 'dashboard': return { title: 'لوحة القيادة والتحليلات المتقدمة', subtitle: 'نظرة عامة على حالة القطيع وبث أجهزة الـ ESP32 اللحظي' };
      case 'herd': return { title: 'إدارة قطيع الأبقار', subtitle: 'سجل الأبقار، التوزيع، والفحوصات الحيوية' };
      case 'alerts': return { title: 'مركز التنبيهات والإنذار المبكر', subtitle: 'التنبيهات الصحية ومواسم الشبق' };
      case 'devices': return { title: 'أجهزة وأطواق التتبع (IoT ESP32)', subtitle: 'مراقبة شحن البطاريات وجودة الإشارة' };
      case 'settings': return { title: 'إعدادات النظام وعتبات التنبيه', subtitle: 'تخصيص الحساسية وتفاصيل المزرعة' };
      default: return { title: 'CowMonitor', subtitle: '' };
    }
  };

  const { title, subtitle } = getPageTitle();

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        unreadAlertsCount={unreadAlertsCount}
      />

      {/* Main Content Area */}
      <main className="main-wrapper">
        {/* Top Header Bar */}
        <header className="top-bar">
          <div className="top-title">
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>

          <div className="top-actions">
            {/* Quick Switch Button between Farmer and Dashboard */}
            {activeTab === 'farmer' ? (
              <button 
                onClick={() => setActiveTab('dashboard')} 
                className="action-btn"
                style={{ background: '#f1f5f9', fontWeight: 'bold' }}
              >
                <LayoutDashboard size={18} />
                <span>عرض التحليلات المتقدمة 📊</span>
              </button>
            ) : (
              <button 
                onClick={() => setActiveTab('farmer')} 
                className="action-btn action-btn-primary"
                style={{ background: '#d97706', borderColor: '#b45309' }}
              >
                <Tractor size={18} />
                <span>العودة لواجهة الفلاح البسيطة 🚜</span>
              </button>
            )}

            <button 
              onClick={() => setActiveTab('alerts')} 
              className="action-btn"
              style={{ position: 'relative' }}
              title="التنبيهات المفتوحة"
            >
              <Bell size={18} />
              {unreadAlertsCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: 'var(--critical)',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {unreadAlertsCount}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* View Routing */}
        {activeTab === 'farmer' && (
          <FarmerView 
            cows={cows}
            onSelectCow={(cow) => setSelectedCow(cow)}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardView 
            farmStats={farmStats} 
            cows={cows} 
            alerts={alerts}
            onSelectCow={(cow) => setSelectedCow(cow)}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'herd' && (
          <HerdView 
            cows={cows}
            onSelectCow={(cow) => setSelectedCow(cow)}
            onAddCowClick={() => setIsAddCowOpen(true)}
          />
        )}

        {activeTab === 'alerts' && (
          <AlertsView 
            alerts={alerts}
            onAcknowledgeAlert={handleAcknowledgeAlert}
            onSelectCowTag={(tag) => {
              const c = cows.find(cow => cow.tagNumber === tag);
              if (c) setSelectedCow(c);
            }}
          />
        )}

        {activeTab === 'devices' && (
          <DevicesView 
            devices={devices}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsView 
            farmStats={farmStats}
          />
        )}
      </main>

      {/* Modals */}
      {selectedCow && (
        <CowDetailModal 
          cow={selectedCow} 
          onClose={() => setSelectedCow(null)} 
        />
      )}

      {isAddCowOpen && (
        <AddCowModal 
          onClose={() => setIsAddCowOpen(false)}
          onAddCow={handleAddCow}
        />
      )}
    </div>
  );
}
