
import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Flame, 
  CheckCircle2, 
  Phone, 
  Camera, 
  MapPin, 
  Thermometer, 
  ChevronLeft, 
  Check, 
  Sparkles,
  Sun
} from 'lucide-react';

export default function FarmerView({ cows, onSelectCow }) {
  const [scannedFeedback, setScannedFeedback] = useState(false);

  const sickCows = cows.filter(c => c.status === 'treatment');
  const heatCows = cows.filter(c => c.status === 'estrus');
  const healthyCount = cows.length - sickCows.length - heatCows.length;

  const handleSimulateScan = () => {
    setScannedFeedback(true);
    setTimeout(() => {
      setScannedFeedback(false);
      onSelectCow(cows[0]);
    }, 1200);
  };

  return (
    <div className="content-body farmer-container">
      {/* Top Friendly Farmer Weather Alert */}
      <div className="farmer-banner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706' }}>
            <Sun size={32} />
          </div>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#92400e' }}>
              نصيحة اليوم الميدانية: الجو حار اليوم (31°C) ☀️
            </h2>
            <p style={{ fontSize: '15px', color: '#78350f', marginTop: '4px', fontWeight: '600' }}>
              يُرجى تشغيل مراوح الحظائر ورش رذاذ الماء لتفادي انخفاض كميات الحليب.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={handleSimulateScan}
            className="action-btn farmer-btn-large action-btn-primary"
            style={{ fontSize: '15px' }}
          >
            <Camera size={20} />
            <span>{scannedFeedback ? 'جاري قراءة القرط...' : 'مسح قرط البقرة بالكاميرا'}</span>
          </button>

          <a 
            href="tel:+213555123456" 
            className="action-btn farmer-btn-large" 
            style={{ background: '#ffffff', color: '#dc2626', borderColor: '#fca5a5', textDecoration: 'none' }}
          >
            <Phone size={20} />
            <span>اتصال بالطبيب البيطري 📞</span>
          </a>
        </div>
      </div>

      {/* 1. RED SECTION: SICK COWS NEEDING CHECKUP */}
      <div className="farmer-big-card farmer-red-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#dc2626', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertTriangle size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#991b1b' }}>
                🔴 أبقار مريضة تحتاج معاينة فورية ({sickCows.length} أبقار)
              </h3>
              <p style={{ fontSize: '14px', color: '#7f1d1d', fontWeight: '600' }}>
                ظهرت عليها علامات حمى أو قلة الأكل؛ يُرجى فحصها في الحظيرة فوراً.
              </p>
            </div>
          </div>
          <span style={{ background: '#ffffff', color: '#dc2626', padding: '6px 14px', borderRadius: 'var(--radius-full)', fontWeight: '800', fontSize: '14px', border: '1.5px solid #f87171' }}>
            مطلوب تدخل عاجل
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
          {sickCows.map(cow => (
            <div key={cow.id} className="farmer-cow-item" style={{ borderLeft: '6px solid #dc2626' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '900', fontFamily: 'var(--font-latin)' }}>
                  #{cow.tagNumber}
                </div>
                <div>
                  <h4 style={{ fontSize: '17px', fontWeight: '800', color: '#0f172a' }}>{cow.name}</h4>
                  <div style={{ fontSize: '13px', color: '#dc2626', fontWeight: '700', marginTop: '2px' }}>
                    حرارة مرتفعة {cow.temperature}°C (حمى)
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                    <MapPin size={13} />
                    <span>مكانها: {cow.group}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => onSelectCow(cow)} 
                className="action-btn action-btn-primary"
                style={{ padding: '10px 16px', fontSize: '13.5px', background: '#dc2626' }}
              >
                افحص البقرة 🔍
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 2. AMBER SECTION: HEAT & INSEMINATION TODAY */}
      <div className="farmer-big-card farmer-amber-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#d97706', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Flame size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#92400e' }}>
                🟡 أبقار جاهزة للتلقيح اليوم ({heatCows.length} أبقار)
              </h3>
              <p style={{ fontSize: '14px', color: '#78350f', fontWeight: '600' }}>
                في قمة فترة الشبق والنشاط؛ لقّحها اليوم لضمان الحمل والإخصاب الناجح.
              </p>
            </div>
          </div>
          <span style={{ background: '#ffffff', color: '#d97706', padding: '6px 14px', borderRadius: 'var(--radius-full)', fontWeight: '800', fontSize: '14px', border: '1.5px solid #fbbf24' }}>
            موعد التلقيح متاح الآن
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
          {heatCows.map(cow => (
            <div key={cow.id} className="farmer-cow-item" style={{ borderLeft: '6px solid #d97706' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '900', fontFamily: 'var(--font-latin)' }}>
                  #{cow.tagNumber}
                </div>
                <div>
                  <h4 style={{ fontSize: '17px', fontWeight: '800', color: '#0f172a' }}>{cow.name}</h4>
                  <div style={{ fontSize: '13px', color: '#d97706', fontWeight: '700', marginTop: '2px' }}>
                    وقت التلقيح الأنسب: خلال 6 ساعات القادمة
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                    <MapPin size={13} />
                    <span>مكانها: {cow.group}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => onSelectCow(cow)} 
                className="action-btn"
                style={{ padding: '10px 16px', fontSize: '13.5px', background: '#fef3c7', color: '#92400e', borderColor: '#fcd34d' }}
              >
                تفاصيل التلقيح 🐄
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 3. GREEN SECTION: HEALTHY HERD STATUS */}
      <div className="farmer-big-card farmer-green-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#059669', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={32} />
            </div>
            <div>
              <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#065f46' }}>
                🟢 باقي القطيع سليم وبصحة ممتازة ({healthyCount} بقرة)
              </h3>
              <p style={{ fontSize: '15px', color: '#047857', fontWeight: '600', marginTop: '4px' }}>
                جميع الأبقار ترعى وتجتر بمعدل طبيعي ممتاز، ولا توجد أي بلاغات طارئة أخرى.
              </p>
            </div>
          </div>

          <div style={{ background: '#ffffff', padding: '12px 24px', borderRadius: 'var(--radius-md)', border: '1.5px solid #86efac', textAlign: 'center' }}>
            <div style={{ fontSize: '13px', color: '#475569', fontWeight: 'bold' }}>الحالة العامة للمزرعة</div>
            <div style={{ fontSize: '22px', fontWeight: '900', color: '#059669' }}>مستقرة 100% 👍</div>
          </div>
        </div>
      </div>
    </div>
  );
}
