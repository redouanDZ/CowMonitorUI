
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Grid, 
  List, 
  Radio, 
  Battery, 
  Thermometer, 
  HeartPulse, 
  Activity, 
  ChevronLeft,
  Flame,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';

export default function HerdView({ cows, onSelectCow, onAddCowClick }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  const filteredCows = cows.filter(cow => {
    const matchesSearch = cow.name.includes(searchQuery) || cow.tagNumber.includes(searchQuery) || cow.deviceId.includes(searchQuery);
    const matchesGroup = selectedGroup === 'all' || cow.group === selectedGroup;
    const matchesStatus = selectedStatus === 'all' || cow.status === selectedStatus;
    return matchesSearch && matchesGroup && matchesStatus;
  });

  const getStatusBadge = (status, label) => {
    switch (status) {
      case 'lactating': return <span className="badge badge-lactating">{label}</span>;
      case 'estrus': return <span className="badge badge-estrus"><Flame size={12} /> {label}</span>;
      case 'treatment': return <span className="badge badge-treatment">{label}</span>;
      case 'dry': return <span className="badge badge-dry">{label}</span>;
      case 'pregnant': return <span className="badge badge-pregnant">{label}</span>;
      default: return <span className="badge">{label}</span>;
    }
  };

  return (
    <div className="content-body">
      {/* Header and Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '800' }}>إدارة قطيع الأبقار ومتابعة الحساسات</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
            إجمالي الأبقار في هذا العرض: {filteredCows.length} بقرة مقترنة بأطواق التتبع
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={onAddCowClick} className="action-btn action-btn-primary">
            <Plus size={16} />
            <span>تسجيل بقرة جديدة وتعيين طوق</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card" style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1', minWidth: '280px' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '360px' }}>
              <input
                type="text"
                placeholder="بحث برقم القرط، الاسم، أو معرف الطوق..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', paddingRight: '40px' }}
              />
              <Search size={18} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
            </div>

            <select 
              value={selectedStatus} 
              onChange={(e) => setSelectedStatus(e.target.value)}
              style={{ minWidth: '150px' }}
            >
              <option value="all">جميع الحالات الصحية</option>
              <option value="lactating">حلوب نشطة</option>
              <option value="estrus">فترة شبق (تلقيح)</option>
              <option value="treatment">تحت العلاج (مريضة)</option>
              <option value="pregnant">عشار (حامل)</option>
              <option value="dry">فترة تجفيف</option>
            </select>

            <select 
              value={selectedGroup} 
              onChange={(e) => setSelectedGroup(e.target.value)}
              style={{ minWidth: '160px' }}
            >
              <option value="all">جميع الحظائر والمجموعات</option>
              <option value="حظيرة الحليب (أ)">حظيرة الحليب (أ)</option>
              <option value="حظيرة الحليب (ب)">حظيرة الحليب (ب)</option>
              <option value="حظيرة العزل الصحي">حظيرة العزل الصحي</option>
              <option value="حظيرة التجفيف">حظيرة التجفيف</option>
              <option value="حظيرة الحوامل">حظيرة الحوامل</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button 
              onClick={() => setViewMode('grid')} 
              className={`action-btn ${viewMode === 'grid' ? 'action-btn-primary' : ''}`}
              style={{ padding: '8px 12px' }}
            >
              <Grid size={16} />
            </button>
            <button 
              onClick={() => setViewMode('table')} 
              className={`action-btn ${viewMode === 'table' ? 'action-btn-primary' : ''}`}
              style={{ padding: '8px 12px' }}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '20px' }}>
          {filteredCows.map(cow => (
            <div 
              key={cow.id} 
              className="glass-card"
              onClick={() => onSelectCow(cow)}
              style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              {/* Card Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: 'var(--radius-md)',
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(6, 182, 212, 0.1) 100%)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '800',
                    fontSize: '15px',
                    color: 'var(--primary)',
                    fontFamily: 'var(--font-latin)'
                  }}>
                    #{cow.tagNumber}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '17px', fontWeight: '800' }}>{cow.name}</h3>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{cow.breed}</div>
                  </div>
                </div>
                {getStatusBadge(cow.status, cow.statusLabel)}
              </div>

              {/* Group & Collar Info */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', background: 'rgba(255,255,255,0.02)', padding: '8px 12px', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ color: 'var(--text-muted)' }}>{cow.group}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--cyan)' }}>
                  <Radio size={12} />
                  {cow.deviceId}
                </span>
              </div>

              {/* Live Sensor Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', textAlign: 'center' }}>
                <div style={{ padding: '8px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-dim)', marginBottom: '2px' }}>الحرارة</div>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: cow.temperature > 39.3 ? 'var(--critical)' : 'var(--text-main)' }}>
                    {cow.temperature}°C
                  </div>
                </div>

                <div style={{ padding: '8px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-dim)', marginBottom: '2px' }}>الاجترار</div>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: cow.rumination < 300 ? 'var(--warning)' : 'var(--text-main)' }}>
                    {cow.rumination} د/ي
                  </div>
                </div>

                <div style={{ padding: '8px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-dim)', marginBottom: '2px' }}>البطارية</div>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: cow.collarBattery < 20 ? 'var(--warning)' : 'var(--primary)' }}>
                    {cow.collarBattery}%
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid var(--border-card)', fontSize: '12px' }}>
                <span style={{ color: 'var(--text-dim)' }}>آخر بث: {cow.lastCheck}</span>
                <span style={{ color: 'var(--primary)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '2px' }}>
                  عرض الملف 360° <ChevronLeft size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="glass-card" style={{ padding: '0', overflowX: 'auto' }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>رقم القرط</th>
                <th>اسم البقرة</th>
                <th>السلالة</th>
                <th>الحظيرة</th>
                <th>الحالة</th>
                <th>درجة الحرارة</th>
                <th>دقائق الاجترار</th>
                <th>إنتاج الحليب</th>
                <th>طوق ESP32</th>
                <th>البطارية</th>
                <th>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredCows.map(cow => (
                <tr key={cow.id}>
                  <td style={{ fontWeight: 'bold', fontFamily: 'var(--font-latin)' }}>#{cow.tagNumber}</td>
                  <td style={{ fontWeight: 'bold' }}>{cow.name}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{cow.breed}</td>
                  <td>{cow.group}</td>
                  <td>{getStatusBadge(cow.status, cow.statusLabel)}</td>
                  <td style={{ fontWeight: 'bold', color: cow.temperature > 39.3 ? 'var(--critical)' : 'inherit' }}>
                    {cow.temperature}°C
                  </td>
                  <td>{cow.rumination} د/يوم</td>
                  <td style={{ fontWeight: 'bold' }}>{cow.dailyMilkYield} L</td>
                  <td style={{ fontFamily: 'var(--font-latin)', color: 'var(--cyan)' }}>{cow.deviceId}</td>
                  <td style={{ color: cow.collarBattery < 20 ? 'var(--warning)' : 'inherit' }}>{cow.collarBattery}%</td>
                  <td>
                    <button 
                      onClick={() => onSelectCow(cow)} 
                      className="action-btn"
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                    >
                      التفاصيل
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
