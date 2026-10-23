
import React from 'react';
import { 
  Tractor,
  LayoutDashboard, 
  Users, 
  Bell, 
  Cpu, 
  Sliders, 
  Activity, 
  Radio, 
  Sun,
  ShieldAlert
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, unreadAlertsCount }) {
  const menuItems = [
    { id: 'farmer', label: 'وضع الفلاح البسيط 🚜', icon: Tractor, isFarmer: true },
    { id: 'dashboard', label: 'لوحة القيادة والتحليلات', icon: LayoutDashboard },
    { id: 'herd', label: 'إدارة قطيع الأبقار', icon: Users },
    { id: 'alerts', label: 'مركز التنبيهات والإنذار', icon: Bell, badge: unreadAlertsCount },
    { id: 'devices', label: 'أجهزة وأطواق ESP32', icon: Cpu },
    { id: 'settings', label: 'إعدادات النظام والمزرعة', icon: Sliders },
  ];

  return (
    <aside className="sidebar">
      <div className="logo-wrapper">
        <div className="logo-icon">
          <Activity size={24} />
        </div>
        <div className="logo-text">
          <h1>CowMonitor</h1>
          <span className="logo-badge">نظام الرعاية الذكية IoT</span>
        </div>
      </div>

      <nav className="nav-links">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`nav-item ${isActive ? 'active' : ''} ${item.isFarmer ? 'highlight-farmer' : ''}`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
              {item.badge > 0 && (
                <span className="nav-badge badge-alert">{item.badge}</span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="iot-status-pill">
          <div className="status-dot"></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '13px', fontWeight: '800', color: '#065f46' }}>بث IoT مباشر</div>
            <div style={{ fontSize: '11px', color: '#047857' }}>122 طوق ESP32 متصل</div>
          </div>
          <Radio size={16} color="#059669" />
        </div>

        <div style={{ textAlign: 'center', fontSize: '12px', color: '#64748b', fontWeight: '600', padding: '4px' }}>
          ثيم نهاري فائق الوضوح ☀️
        </div>
      </div>
    </aside>
  );
}
