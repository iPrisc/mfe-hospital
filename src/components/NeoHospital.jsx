import React, { useState, useEffect } from 'react';
import eventBus from 'shared/eventBus';
import { INITIAL } from '../hospitalConfig';
import './NeoHospital.css';
import ECGDisplay from './ECGDisplay';
import BedsGrid from './BedsGrid';
import StatusBadge from './StatusBadge';
import IntakesLog from './IntakesLog';

export default function NeoHospital() {
  const [state, setState] = useState({ ...INITIAL });

  // ── Listeners ────────────────────────────────────────────────────────────
  useEffect(() => {
    const unsub = eventBus.on('weather:change', ({ condition, toxicity }) => {
      if (toxicity > 40) {
        setState((s) => ({ ...s, status: 'busy', occupied: 6, bpm: 95, love: false }));
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = eventBus.on('power:outage', ({ severity, cityPower }) => {
      if (severity === 'total') {
        setState((s) => ({ ...s, status: 'critical', occupied: 9, bpm: 110, generator: true, love: false }));
      } else if (severity === 'partial') {
        setState((s) => ({ ...s, status: 'busy', generator: true, love: false }));
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = eventBus.on('crowd:panic', ({ level }) => {
      if (level > 80) {
        setState((s) => ({ ...s, status: 'overwhelmed', occupied: 12, bpm: 140, love: false }));
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = eventBus.on('hacker:command', ({ command }) => {
      if (command === 'love') {
        setState({ ...INITIAL, status: 'stable', occupied: 2, bpm: 65, love: true, generator: false });
      } else if (command === 'reset') {
        setState({ ...INITIAL });
      }
    });
    return () => unsub();
  }, []);

  // ── Emitter hospital:alert ────────────────────────────────────────────────
  useEffect(() => {
    eventBus.emit('hospital:alert', {
      status: state.status,
      beds: { total: 12, occupied: state.occupied, available: 12 - state.occupied },
      generator: state.generator,
    });
  }, [state.status, state.occupied, state.generator]);

  // ── Simulate button ───────────────────────────────────────────────────────
  const simulate = () => eventBus.emit('crowd:panic', { level: 90 });

  return (
    <div className="neo-hospital">
      <div className="hospital-header">
        <span>NEO HOSPITAL</span>
        <StatusBadge status={state.status} love={state.love} />
      </div>

      <button className="simulate-btn" onClick={simulate}>
        SIMULATE CRISIS
      </button>

      <div className="hospital-body">
        <ECGDisplay bpm={state.bpm} status={state.love ? 'love' : state.status} generator={state.generator} />
        <BedsGrid occupied={state.occupied} status={state.status} />
      </div>

      <IntakesLog status={state.status} love={state.love} />
    </div>
  );
}