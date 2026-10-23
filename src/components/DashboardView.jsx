
import React from 'react';
import { 
  Users, 
  Flame, 
  HeartPulse, 
  BatteryCharging, 
  Thermometer, 
  CloudSun, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronLeft,
  ArrowUpRight,
  TrendingUp,
  Milk
} from 'lucide-react';

export default function DashboardView({ farmStats, cows, alerts, onSelectCow, setActiveTab }) {
  const criticalCows = cows.filter(c => c.status === 'treatment' || c.status === 'estrus');

  return (
    <div className="content-body">
      {/* Top Welcome & Farm Meta */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '800' }}>مرحباً بك في {farmStats.farmName} 👋</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
            الموقع: {farmStats.location} | بث المؤشرات الحيوية يتم لحظياً عبر مستشعرات ESP32
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setActiveTab('herd')} className="action-btn action-btn-primary">
            <Users size={16} />
            <span>استعراض القطيع الكامل</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-info">
            <h4>إجمالي القطيع المفحوص</h4>
            <div className="metric-value">{farmStats.totalCows}</div>
            <div className="metric-sub" style={{ color: 'var(--primary)' }}>
              <ArrowUpRight size={14} />
              <span>94 بقرة في مرحلة الحلب</span>
            </div>
          </div>
          <div className="metric-icon-box" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--primary)' }}>
            <Users size={24} />
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-info">
            <h4>متوسط الإنتاج اليومي للحليب</h4>
            <div className="metric-value">{farmStats.avgMilkYield} <span style={{ fontSize: '16px', fontWeight: 'normal' }}>لتر/بقرة</span></div>
            <div className="metric-sub" style={{ color: 'var(--cyan)' }}>
              <TrendingUp size={14} />
              <span>+1.4 لتر عن الأسبوع الماضي</span>
            </div>
          </div>
          <div className="metric-icon-box" style={{ background: 'rgba(6, 182, 212, 0.15)', color: 'var(--cyan)' }}>
            <Milk size={24} />
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-info">
            <h4>كشف حالات الشبق (Estrus)</h4>
            <div className="metric-value" style={{ color: 'var(--warning)' }}>{farmStats.estrusDetected}</div>
            <div className="metric-sub" style={{ color: 'var(--warning)' }}>
              <Flame size={14} />
              <span>جاهزة للتلقيح الفوري</span>
            </div>
          </div>
          <div className="metric-icon-box" style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--warning)' }}>
            <Flame size={24} />
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-info">
            <h4>حالات صحية تحت المتابعة</h4>
            <div className="metric-value" style={{ color: 'var(--critical)' }}>{farmStats.cowsUnderTreatment}</div>
            <div className="metric-sub" style={{ color: 'var(--critical)' }}>
              <AlertTriangle size={14} />
              <span>اشتباه حمى والتهاب ضرع</span>
            </div>
          </div>
          <div className="metric-icon-box" style={{ background: 'rgba(239, 68, 68, 0.15)', color: 'var(--critical)' }}>
            <HeartPulse size={24} />
          </div>
        </div>
      </div>

      {/* Main Grid: Live Biometrics vs Weather & Triage */}
      <div className="dashboard-grid">
        {/* Left: Biometrics Telemetry Overview */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: '700' }}>مؤشرات القطيع الحيوية (درجة الحرارة وساعات الاجترار)</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>متوسط القياسات الحية المستلمة من أطواق ESP32 على مدار اليوم</p>
            </div>
            <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.12)', color: 'var(--primary)' }}>
              مباشر (تحديث كل 30 ثانية)
            </span>
          </div>

          {/* Custom SVG Trend Chart */}
          <div style={{ position: 'relative', height: '220px', width: '100%', marginTop: '10px' }}>
            <svg viewBox="0 0 500 180" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              <defs>
                <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="cyanGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="30" x2="500" y2="30" stroke="rgba(255,255,255,0.06)" strokeDasharray="4" />
              <line x1="0" y1="80" x2="500" y2="80" stroke="rgba(255,255,255,0.06)" strokeDasharray="4" />
              <line x1="0" y1="130" x2="500" y2="130" stroke="rgba(255,255,255,0.06)" strokeDasharray="4" />

              {/* Area 1: Rumination */}
              <path 
                d="M 0 120 Q 80 70 160 90 T 320 60 T 500 80 L 500 170 L 0 170 Z" 
                fill="url(#greenGrad)" 
              />
              <path 
                d="M 0 120 Q 80 70 160 90 T 320 60 T 500 80" 
                fill="none" 
                stroke="#10b981" 
                strokeWidth="3" 
              />

              {/* Area 2: Temperature Baseline */}
              <path 
                d="M 0 85 Q 90 95 180 80 T 360 85 T 500 78 L 500 170 L 0 170 Z" 
                fill="url(#cyanGrad)" 
              />
              <path 
                d="M 0 85 Q 90 95 180 80 T 360 85 T 500 78" 
                fill="none" 
                stroke="#06b6d4" 
                strokeWidth="2.5" 
                strokeDasharray="2"
              />

              {/* Data points */}
              <circle cx="160" cy="90" r="5" fill="#10b981" stroke="#0e1a14" strokeWidth="2" />
              <circle cx="320" cy="60" r="5" fill="#10b981" stroke="#0e1a14" strokeWidth="2" />
              <circle cx="500" cy="80" r="5" fill="#10b981" stroke="#0e1a14" strokeWidth="2" />
            </svg>

            {/* Labels under chart */}
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-dim)', fontSize: '12px', marginTop: '8px' }}>
              <span>00:00 (الفجر)</span>
              <span>04:00</span>
              <span>08:00 (الحلبة الصباحية)</span>
              <span>12:00 (الظهيرة)</span>
              <span>16:00 (الحلبة المسائية)</span>
              <span>الآن</span>
            </div>
          </div>

          {/* Chart Legend */}
          <div style={{ display: 'flex', gap: '24px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-card)', fontSize: '13px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '12px', height: '12px', background: '#10b981', borderRadius: '3px' }}></span>
              <span>متوسط دقائق الاجترار (472 دقيقة/يوم)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '12px', height: '12px', background: '#06b6d4', borderRadius: '3px' }}></span>
              <span>معدل حرارة القطيع (38.6°C)</span>
            </div>
          </div>
        </div>

        {/* Right: Weather & Heat Stress THI + Urgent Attention */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* THI Card */}
          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700' }}>مؤشر الإجهاد الحراري (THI)</h3>
              <CloudSun size={20} color="var(--warning)" />
            </div>

            <div className="thi-gauge-box">
              <Thermometer size={32} color="var(--warning)" />
              <div>
                <div style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'var(--font-latin)' }}>
                  71.4 THI
                </div>
                <div style={{ fontSize: '12px', color: 'var(--warning)', fontWeight: 'bold' }}>
                  {farmStats.thiStatus}
                </div>
              </div>
            </div>

            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '12px', lineHeight: '1.6' }}>
              درجة حرارة الجو 31°C مع رطوبة 62%. يوصى بتشغيل مراوح التهوية وتوفير مياه باردة للحفاظ على معدل الإدرار.
            </p>
          </div>

          {/* Urgent Cows Triage */}
          <div className="glass-card" style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700' }}>أبقار تستوجب المعاينة الآن</h3>
              <span className="badge badge-treatment">{criticalCows.length} حالات</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {criticalCows.map(cow => (
                <div 
                  key={cow.id} 
                  onClick={() => onSelectCow(cow)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border-card)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: cow.status === 'treatment' ? 'rgba(239,68,68,0.15)' : 'rgba(245,158,11,0.15)',
                      color: cow.status === 'treatment' ? 'var(--critical)' : 'var(--warning)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '13px'
                    }}>
                      #{cow.tagNumber}
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '700' }}>{cow.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        {cow.status === 'treatment' ? `حمى ${cow.temperature}°C` : `شبق مؤكد ${cow.estrusProbability}%`}
                      </div>
                    </div>
                  </div>
                  <ChevronLeft size={18} color="var(--text-dim)" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
