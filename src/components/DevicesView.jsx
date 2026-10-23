
import React, { useState } from 'react';
import { 
  Cpu, 
  Radio, 
  Battery, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  RotateCw,
  Sliders,
  Wifi
} from 'lucide-react';

export default function DevicesView({ devices }) {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <div className="content-body">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '800' }}>أسطول أطواق التتبع ومستشعرات ESP32</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
            إدارة حالة العتاد، فحص البطاريات، ومراقبة جودة البث اللاسلكي
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleRefresh} className="action-btn">
            <RotateCw size={16} className={refreshing ? 'spin-icon' : ''} />
            <span>فحص الإشارات الآن</span>
          </button>
          <button onClick={() => alert('معالج اقتران طوق جديد: قم بتشغيل الطوق ومسح الـ QR كود المطبوع عليه.')} className="action-btn action-btn-primary">
            <Plus size={16} />
            <span>ربط طوق ESP32 جديد</span>
          </button>
        </div>
      </div>

      {/* Fleet Stats Overview */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-info">
            <h4>الأطواق النشطة المتصلة</h4>
            <div className="metric-value" style={{ color: 'var(--primary)' }}>122</div>
            <div className="metric-sub">تبث القياسات كل 30 ثانية</div>
          </div>
          <div className="metric-icon-box" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--primary)' }}>
            <Radio size={24} />
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-info">
            <h4>أطواق في وضع الاستعداد</h4>
            <div className="metric-value">5</div>
            <div className="metric-sub">مشحونة وجاهزة للربط</div>
          </div>
          <div className="metric-icon-box" style={{ background: 'rgba(14, 165, 233, 0.15)', color: 'var(--cyan)' }}>
            <Cpu size={24} />
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-info">
            <h4>بطاريات تتطلب شحن</h4>
            <div className="metric-value" style={{ color: 'var(--warning)' }}>1</div>
            <div className="metric-sub">أقل من 20% شحن</div>
          </div>
          <div className="metric-icon-box" style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--warning)' }}>
            <Battery size={24} />
          </div>
        </div>
      </div>

      {/* Devices Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {devices.map(device => (
          <div key={device.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Cpu size={22} color="var(--primary)" />
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', fontFamily: 'var(--font-latin)' }}>{device.id}</h3>
                  <div style={{ fontSize: '11px', color: 'var(--text-dim)', fontFamily: 'var(--font-latin)' }}>MAC: {device.mac}</div>
                </div>
              </div>
              <span className="badge" style={{ 
                background: device.status === 'online' ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.06)', 
                color: device.status === 'online' ? 'var(--primary)' : 'var(--text-muted)' 
              }}>
                {device.status === 'online' ? 'متصل وبث حي' : 'استعداد'}
              </span>
            </div>

            <div style={{ fontSize: '13px', background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: 'var(--radius-sm)' }}>
              <div>البقرة المقترنة: <strong>{device.cowTag}</strong></div>
              <div style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '2px' }}>الإصدار البرمجي: {device.firmware}</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Battery size={16} color={device.battery < 20 ? 'var(--critical)' : 'var(--primary)'} />
                <span>البطارية: <strong>{device.battery}%</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Wifi size={16} color="var(--cyan)" />
                <span>الإشارة: <strong>{device.rssi} dBm</strong></span>
              </div>
            </div>

            <div style={{ fontSize: '11px', color: 'var(--text-dim)', borderTop: '1px solid var(--border-card)', paddingTop: '10px' }}>
              آخر استجابة: {device.lastPing} | حزم مرسلة: {device.packetsSent}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
