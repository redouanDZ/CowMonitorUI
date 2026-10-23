
import React, { useState } from 'react';
import { 
  Sliders, 
  Save, 
  Check, 
  Bell, 
  Thermometer, 
  Database,
  ShieldCheck
} from 'lucide-react';

export default function SettingsView({ farmStats }) {
  const [feverThreshold, setFeverThreshold] = useState(39.3);
  const [ruminationThreshold, setRuminationThreshold] = useState(320);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="content-body" style={{ maxWidth: '900px' }}>
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: '800' }}>إعدادات النظام وعتبات التنبيه الحيوية</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
          تخصيص قواعد الإنذار المبكر وحساسية رصد الشبق والحمى
        </p>
      </div>

      <form onSubmit={handleSave} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '16px' }}>معلومات المزرعة</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px', color: 'var(--text-muted)' }}>اسم المزرعة</label>
              <input type="text" defaultValue={farmStats.farmName} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px', color: 'var(--text-muted)' }}>الموقع الجغرافي</label>
              <input type="text" defaultValue={farmStats.location} style={{ width: '100%' }} />
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-card)', paddingTop: '20px' }}>
          <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '16px' }}>عتبات التنبيه البيطرية</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ fontSize: '14px' }}>عتبة إنذار الحمى (درجة الحرارة القصوى)</label>
                <span style={{ fontWeight: 'bold', color: 'var(--critical)' }}>{feverThreshold}°C</span>
              </div>
              <input 
                type="range" 
                min="38.8" 
                max="40.5" 
                step="0.1" 
                value={feverThreshold}
                onChange={(e) => setFeverThreshold(e.target.value)}
                style={{ width: '100%', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>الحرارة الطبيعية للأبقار تتراوح بين 38.0°C و 39.2°C.</span>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ fontSize: '14px' }}>عتبة انخفاض الاجترار الحاد (خمول المعدة والاضطرابات الهضمية)</label>
                <span style={{ fontWeight: 'bold', color: 'var(--warning)' }}>{ruminationThreshold} دقيقة/يوم</span>
              </div>
              <input 
                type="range" 
                min="200" 
                max="420" 
                step="10" 
                value={ruminationThreshold}
                onChange={(e) => setRuminationThreshold(e.target.value)}
                style={{ width: '100%', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>المعدل الطبيعي للاجترار يتراوح بين 450 و 520 دقيقة يومياً.</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '16px', borderTop: '1px solid var(--border-card)' }}>
          <button type="submit" className="action-btn action-btn-primary">
            {saved ? <Check size={16} /> : <Save size={16} />}
            <span>{saved ? 'تم حفظ التغييرات بنجاح!' : 'حفظ الإعدادات'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
