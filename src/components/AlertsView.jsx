
import React, { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  Flame, 
  Battery, 
  CheckCircle, 
  Check, 
  Filter, 
  ShieldAlert,
  ChevronLeft
} from 'lucide-react';

export default function AlertsView({ alerts, onAcknowledgeAlert, onSelectCowTag }) {
  const [filterSeverity, setFilterSeverity] = useState('all');

  const filteredAlerts = alerts.filter(a => {
    if (filterSeverity === 'all') return true;
    return a.severity === filterSeverity;
  });

  return (
    <div className="content-body">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '800' }}>مركز التنبيهات والإنذار المبكر</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
            رصد استباقي للحالات الحرجة ومواسم الشبق والتغيرات البيومترية
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => setFilterSeverity('all')}
            className={`action-btn ${filterSeverity === 'all' ? 'action-btn-primary' : ''}`}
          >
            الكل ({alerts.length})
          </button>
          <button 
            onClick={() => setFilterSeverity('critical')}
            className={`action-btn ${filterSeverity === 'critical' ? 'action-btn-primary' : ''}`}
            style={{ color: filterSeverity === 'critical' ? '#fff' : 'var(--critical)' }}
          >
            الحالات الحرجة
          </button>
          <button 
            onClick={() => setFilterSeverity('warning')}
            className={`action-btn ${filterSeverity === 'warning' ? 'action-btn-primary' : ''}`}
            style={{ color: filterSeverity === 'warning' ? '#fff' : 'var(--warning)' }}
          >
            التحذيرات والشبق
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filteredAlerts.map(alert => (
          <div 
            key={alert.id}
            className="glass-card"
            style={{
              padding: '20px',
              borderRight: alert.severity === 'critical' ? '4px solid var(--critical)' : alert.severity === 'warning' ? '4px solid var(--warning)' : '4px solid var(--cyan)',
              opacity: alert.acknowledged ? 0.75 : 1
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: alert.severity === 'critical' ? 'rgba(239,68,68,0.15)' : alert.severity === 'warning' ? 'rgba(245,158,11,0.15)' : 'rgba(6,182,212,0.15)',
                  color: alert.severity === 'critical' ? 'var(--critical)' : alert.severity === 'warning' ? 'var(--warning)' : 'var(--cyan)',
                  flexShrink: 0
                }}>
                  {alert.severity === 'critical' ? <AlertTriangle size={22} /> : alert.severity === 'warning' ? <Flame size={22} /> : <Bell size={22} />}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h3 style={{ fontSize: '17px', fontWeight: '800' }}>{alert.title}</h3>
                    {alert.acknowledged && (
                      <span className="badge" style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--text-muted)' }}>
                        تمت المتابعة
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    البقرة المعنية: <strong style={{ color: 'var(--text-main)' }}>{alert.cowTag}</strong> | الموقع: {alert.location} | الوقت: {alert.time}
                  </div>
                  <div style={{ fontSize: '13px', marginTop: '6px', color: 'var(--cyan)', fontFamily: 'var(--font-latin)' }}>
                    {alert.metric}
                  </div>
                  <div style={{ marginTop: '10px', fontSize: '13px', background: 'rgba(255,255,255,0.02)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-card)' }}>
                    <strong>التوصية الإرشادية:</strong> {alert.recommendation}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                {!alert.acknowledged ? (
                  <button 
                    onClick={() => onAcknowledgeAlert(alert.id)} 
                    className="action-btn action-btn-primary"
                    style={{ padding: '8px 14px', fontSize: '13px' }}
                  >
                    <Check size={14} />
                    <span>تأكيد المتابعة</span>
                  </button>
                ) : (
                  <button 
                    disabled 
                    className="action-btn"
                    style={{ padding: '8px 14px', fontSize: '13px', opacity: 0.5 }}
                  >
                    <CheckCircle size={14} />
                    <span>تم التأكيد</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
