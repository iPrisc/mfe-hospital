import React from 'react';

// Path ECG statique stable 72 BPM (3 complexes PQRST sur 300px)
const STABLE_PATH =
  'M0,30 L10,30 L15,25.5 L22,30 L30,30 L33,31.8 L37,12 L40,32.7 L46,30 L55,30 L62,26.4 L70,26.0 L78,30 L100,30' +
  ' L110,30 L115,25.5 L122,30 L130,30 L133,31.8 L137,12 L140,32.7 L146,30 L155,30 L162,26.4 L170,26.0 L178,30 L200,30' +
  ' L210,30 L215,25.5 L222,30 L230,30 L233,31.8 L237,12 L240,32.7 L246,30 L255,30 L262,26.4 L270,26.0 L278,30 L300,30';

export default function ECGDisplay({ bpm = 72, status = 'stable', generator = false }) {
  return (
    <div className="ecg-section">
      <div className="ecg-label">
        <span>ECG</span>
        <span className="bpm-display">{bpm} BPM</span>
      </div>

      <div className="ecg-screen">
        <svg className="ecg-wave" viewBox="0 0 300 60" preserveAspectRatio="none">
          <path className="ecg-path-glow" d={STABLE_PATH} />
          <path className="ecg-path" d={STABLE_PATH} />
        </svg>
        <div className="ecg-scanline" />
      </div>

      <div className="power-badge">⚡ GRID POWER</div>
    </div>
  );
}
