
import React, { useState } from 'react';
import { X, Plus, Radio } from 'lucide-react';

export default function AddCowModal({ onClose, onAddCow }) {
  const [tagNumber, setTagNumber] = useState('');
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('هولشتاين (Holstein)');
  const [group, setGroup] = useState('حظيرة الحليب (أ)');
  const [deviceId, setDeviceId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tagNumber.trim() || !name.trim()) return;

    const newCow = {
      id: `cow-${tagNumber}`,
      tagNumber,
      name,
      breed,
      group,
      status: 'lactating',
      statusLabel: 'حلوب نشطة',
      birthDate: '2022-01-01',
      lactationNumber: 1,
      daysInMilk: 10,
      dailyMilkYield: 28.0,
      deviceId: deviceId || 'ESP32-CM-NEW',
      collarBattery: 100,
      signalRssi: -55,
      temperature: 38.5,
      rumination: 480,
      activityIndex: 100,
      healthScore: 98,
      estrusProbability: 5,
      lastCheck: 'الآن',
      history: [
        { time: "00:00", temp: 38.4, rumination: 45, activity: 10 },
        { time: "06:00", temp: 38.5, rumination: 50, activity: 15 },
        { time: "12:00", temp: 38.6, rumination: 42, activity: 22 },
      ]
    };

    onAddCow(newCow);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800' }}>تسجيل بقرة جديدة وتعيين طوق ESP32</h3>
          <button onClick={onClose} className="action-btn" style={{ padding: '6px' }}><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px' }}>رقم القرط (Tag Number) *</label>
            <input 
              type="text" 
              required
              placeholder="مثال: 1099" 
              value={tagNumber} 
              onChange={(e) => setTagNumber(e.target.value)} 
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px' }}>اسم أو لقب البقرة *</label>
            <input 
              type="text" 
              required
              placeholder="مثال: ياسمينة" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px' }}>السلالة</label>
            <select value={breed} onChange={(e) => setBreed(e.target.value)} style={{ width: '100%' }}>
              <option value="هولشتاين (Holstein)">هولشتاين (Holstein)</option>
              <option value="مونتبليارد (Montbéliarde)">مونتبليارد (Montbéliarde)</option>
              <option value="جيرسي (Jersey)">جيرسي (Jersey)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px' }}>الحظيرة أو المجموعة</label>
            <select value={group} onChange={(e) => setGroup(e.target.value)} style={{ width: '100%' }}>
              <option value="حظيرة الحليب (أ)">حظيرة الحليب (أ)</option>
              <option value="حظيرة الحليب (ب)">حظيرة الحليب (ب)</option>
              <option value="حظيرة العزل الصحي">حظيرة العزل الصحي</option>
              <option value="حظيرة التجفيف">حظيرة التجفيف</option>
              <option value="حظيرة الحوامل">حظيرة الحوامل</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px' }}>معرّف طوق ESP32 (اختياري)</label>
            <input 
              type="text" 
              placeholder="مثال: ESP32-CM-8B12" 
              value={deviceId} 
              onChange={(e) => setDeviceId(e.target.value)} 
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '14px' }}>
            <button type="button" onClick={onClose} className="action-btn">إلغاء</button>
            <button type="submit" className="action-btn action-btn-primary">
              <Plus size={16} />
              <span>إضافة البقرة</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
