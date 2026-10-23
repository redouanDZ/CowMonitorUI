
import React, { useState } from 'react';
import { 
  X, 
  Radio, 
  Battery, 
  Thermometer, 
  Activity, 
  Heart, 
  Calendar, 
  Flame, 
  FileText, 
  Check, 
  Send
} from 'lucide-react';

export default function CowDetailModal({ cow, onClose }) {
  const [activeTab, setActiveTab] = useState('telemetry'); // 'telemetry' | 'health' | 'notes'
  const [noteText, setNoteText] = useState('');
  const [notes, setNotes] = useState([
    { id: 1, date: '2026-10-20', author: 'د. كريم (طبيب بيطري)', text: 'تم إعطاء جرعة وقائية ومراقبة مؤشرات النشاط جيدة جداً.' }
  ]);

  if (!cow) return null;

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    setNotes([
      { id: Date.now(), date: '2026-10-23 (الآن)', author: 'مدير المزرعة', text: noteText },
      ...notes
    ]);
    setNoteText('');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-card)', paddingBottom: '16px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '54px',
              height: '54px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: '800',
              fontFamily: 'var(--font-latin)'
            }}>
              #{cow.tagNumber}
            </div>
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: '800' }}>{cow.name} (ملف 360° متكامل)</h2>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                {cow.breed} | {cow.group} | معرّف الجهاز: {cow.deviceId}
              </div>
            </div>
          </div>
          <button onClick={onClose} className="action-btn" style={{ padding: '8px' }}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Tabs */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-card)', paddingBottom: '12px', marginBottom: '20px' }}>
          <button 
            onClick={() => setActiveTab('telemetry')} 
            className={`action-btn ${activeTab === 'telemetry' ? 'action-btn-primary' : ''}`}
          >
            المؤشرات الحيوية والـ ESP32
          </button>
          <button 
            onClick={() => setActiveTab('health')} 
            className={`action-btn ${activeTab === 'health' ? 'action-btn-primary' : ''}`}
          >
            الخصوبة وكشف الشبق
          </button>
          <button 
            onClick={() => setActiveTab('notes')} 
            className={`action-btn ${activeTab === 'notes' ? 'action-btn-primary' : ''}`}
          >
            السجل الطبي والملاحظات ({notes.length})
          </button>
        </div>

        {/* Tab 1: Telemetry */}
        {activeTab === 'telemetry' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Quick Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
              <div style={{ padding: '14px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-card)', textAlign: 'center' }}>
                <Thermometer size={18} color="var(--primary)" style={{ margin: '0 auto 4px auto' }} />
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>الحرارة اللحظية</div>
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{cow.temperature}°C</div>
              </div>

              <div style={{ padding: '14px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-card)', textAlign: 'center' }}>
                <Activity size={18} color="var(--cyan)" style={{ margin: '0 auto 4px auto' }} />
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>معدل الاجترار</div>
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{cow.rumination} د/ي</div>
              </div>

              <div style={{ padding: '14px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-card)', textAlign: 'center' }}>
                <Radio size={18} color="var(--purple)" style={{ margin: '0 auto 4px auto' }} />
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>إشارة Wi-Fi/LoRa</div>
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{cow.signalRssi} dBm</div>
              </div>

              <div style={{ padding: '14px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-card)', textAlign: 'center' }}>
                <Battery size={18} color={cow.collarBattery < 20 ? 'var(--critical)' : 'var(--primary)'} style={{ margin: '0 auto 4px auto' }} />
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>بطارية الطوق</div>
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{cow.collarBattery}%</div>
              </div>
            </div>

            {/* 24-Hour Synced History Table/Chart */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
              <h4 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '12px' }}>
                سجل القياسات الحيوية على مدار 24 ساعة
              </h4>
              <table className="custom-table" style={{ fontSize: '13px' }}>
                <thead>
                  <tr>
                    <th>الوقت</th>
                    <th>درجة الحرارة</th>
                    <th>دقائق الاجترار</th>
                    <th>مؤشر النشاط</th>
                    <th>الحالة الحيوية</th>
                  </tr>
                </thead>
                <tbody>
                  {cow.history.map((h, i) => (
                    <tr key={i}>
                      <td style={{ fontFamily: 'var(--font-latin)' }}>{h.time}</td>
                      <td style={{ fontWeight: 'bold', color: h.temp > 39.3 ? 'var(--critical)' : 'inherit' }}>{h.temp}°C</td>
                      <td>{h.rumination} دقيقة</td>
                      <td>{h.activity} خطوة/فترة</td>
                      <td>
                        {h.temp > 39.3 ? (
                          <span style={{ color: 'var(--critical)' }}>⚠️ حرارة غير طبيعية</span>
                        ) : (
                          <span style={{ color: 'var(--primary)' }}>طبيعي</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Health & Estrus */}
        {activeTab === 'health' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{
              background: cow.estrusProbability > 70 ? 'rgba(245, 158, 11, 0.1)' : 'rgba(255,255,255,0.02)',
              border: '1px solid',
              borderColor: cow.estrusProbability > 70 ? 'rgba(245, 158, 11, 0.3)' : 'var(--border-card)',
              borderRadius: 'var(--radius-md)',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Flame color={cow.estrusProbability > 70 ? 'var(--warning)' : 'var(--text-muted)'} />
                    احتمالية فترة الشبق (Estrus Index)
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    يتم الحساب تلقائياً بمطابقة قفزات النشاط الحركي مع انخفاض زمن الاجترار.
                  </p>
                </div>
                <div style={{ fontSize: '32px', fontWeight: '900', fontFamily: 'var(--font-latin)', color: cow.estrusProbability > 70 ? 'var(--warning)' : 'inherit' }}>
                  {cow.estrusProbability}%
                </div>
              </div>

              {cow.estrusProbability > 70 && (
                <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(245, 158, 11, 0.15)', borderRadius: 'var(--radius-sm)', fontSize: '13px' }}>
                  <strong>توصية التلقيح:</strong> البقرة في ذروة النشاط الحركي. الوقت الأمثل للتلقيح الاصطناعي هو خلال الساعات الست القادمة.
                </div>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="glass-card" style={{ padding: '16px' }}>
                <h4 style={{ fontSize: '14px', color: 'var(--text-muted)' }}>مؤشر الصحة العام</h4>
                <div style={{ fontSize: '26px', fontWeight: 'bold', color: 'var(--primary)', marginTop: '6px' }}>
                  {cow.healthScore} / 100
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  حالة مستقرة وبدون مؤشرات التهابية معتادة.
                </p>
              </div>

              <div className="glass-card" style={{ padding: '16px' }}>
                <h4 style={{ fontSize: '14px', color: 'var(--text-muted)' }}>مرحلة الحلب والإنتاج</h4>
                <div style={{ fontSize: '26px', fontWeight: 'bold', color: 'var(--cyan)', marginTop: '6px' }}>
                  {cow.dailyMilkYield} لتر/يوم
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  اليوم {cow.daysInMilk} في موسم الإدرار الحالي.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Notes & Medical History */}
        {activeTab === 'notes' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <form onSubmit={handleAddNote} style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                placeholder="أضف ملاحظة بيطرية أو إجراء تم اتخاذه..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                style={{ flex: 1 }}
              />
              <button type="submit" className="action-btn action-btn-primary">
                <Send size={16} />
                <span>إضافة</span>
              </button>
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '250px', overflowY: 'auto' }}>
              {notes.map(n => (
                <div key={n.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-card)', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-dim)', marginBottom: '4px' }}>
                    <span>{n.author}</span>
                    <span>{n.date}</span>
                  </div>
                  <div style={{ fontSize: '14px' }}>{n.text}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-card)' }}>
          <button onClick={onClose} className="action-btn">
            إغلاق
          </button>
          <button onClick={() => alert('تم إرسال تنبيه طلب الفحص البيطري بنجاح.')} className="action-btn action-btn-primary">
            <Check size={16} />
            <span>طلب معاينة الطبيب البيطري</span>
          </button>
        </div>
      </div>
    </div>
  );
}
