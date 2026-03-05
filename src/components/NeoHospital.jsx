import React from 'react';
import './NeoHospital.css';

export default function NeoHospital() {
  return (
    <div className="neo-hospital">
      <div className="hospital-header">
        <span>NEO HOSPITAL - STUDENT STARTER</span>
        <span className="hospital-status">TODO</span>
      </div>

      <button className="simulate-btn" disabled>
        SIMULATE CRISIS (TODO)
      </button>

      <div className="hospital-body">
        <div className="ecg-section">
          <div className="ecg-label">
            <span>ECG</span>
            <span className="bpm-display">TODO BPM</span>
          </div>
          <div className="ecg-screen" />
          <div className="power-badge">TODO POWER MODE</div>
        </div>
        <div className="beds-section">
          <div className="beds-label">Beds TODO</div>
          <div className="beds-grid">
            <div className="bed bed-empty">[]</div>
          </div>
        </div>
      </div>

      <div className="intakes-section">
        <div className="intakes-label">ADMISSIONS - TODO</div>
        <div className="intake-line">
          <span className="intake-time">00:00:00</span>
          <span>TODO</span>
        </div>
      </div>

      <div style={{ fontSize: '0.65rem', color: '#4a5568' }}>
        listen: weather:change, power:outage, crowd:panic, hacker:command | emit: hospital:alert
      </div>
    </div>
  );
}