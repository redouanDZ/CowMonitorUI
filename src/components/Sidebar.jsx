
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Bell, 
  Cpu, 
  Sliders, 
  Activity, 
  Radio, 
  Sun, 
  Moon,
  ShieldAlert
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, unreadAlertsCount, theme, toggleTheme }) {
  const menuItems = [
    { id: 'dashboard', label: 'لوحة القيادة الميدانية', icon: LayoutDashboard },
    { id: 'herd', label: 'إدارة قطيع الأبقار', icon: Users },
    { id: 'alerts', label: 'مركز التنبيهات الذكي', icon: Bell, badge: unreadAlertsCount },
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
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={19} />
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
            <div style={{ fontSize: '13px', fontWeight: 'bold' }}>بث IoT مباشر</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>122 طوق ESP32 متصل</div>
          </div>
          <Radio size={16} color="var(--primary)" />
        </div>

        <button 
          onClick={toggleTheme} 
          className="action-btn" 
          style={{ width: '100%', justifyContent: 'center' }}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          <span>{theme === 'dark' ? 'الوضع النهاري' : 'الوضع الليلي'}</span>
        </button>
      </div>
    </aside>
  );
}
