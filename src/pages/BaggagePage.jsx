import React, { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { PageHeader } from '../components/PageHeader';

const BAGGAGE_OPTIONS = [
  { id: 'carry-1', label: 'Carry-on (1 piece)', weight: '7 kg' },
  { id: 'checked-1', label: 'Checked bag (1 piece)', weight: '23 kg' },
  { id: 'checked-2', label: 'Checked bag (2 pieces)', weight: '23 kg each' },
];

export function BaggagePage() {
  const navigate = useNavigate();
  const { baggageItems, setBaggageItems } = useBooking();
  const [draggedItem, setDraggedItem] = useState(null);
  const [selectedItems, setSelectedItems] = useState(baggageItems || []);
  const currentItemRef = useRef(null);

  const handleDragStart = useCallback((e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', item.id);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    e.currentTarget.classList.add('drag-over');
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.currentTarget.classList.remove('drag-over');
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.currentTarget.classList.remove('drag-over');
      if (!draggedItem) return;
      const id = e.dataTransfer.getData('text/plain');
      const item = BAGGAGE_OPTIONS.find((o) => o.id === id);
      if (item && !selectedItems.some((s) => s.id === item.id)) {
        setSelectedItems((prev) => [...prev, item]);
      }
      setDraggedItem(null);
    },
    [draggedItem, selectedItems]
  );

  const removeItem = useCallback((id) => {
    setSelectedItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const handleContinue = () => {
    setBaggageItems(selectedItems);
    navigate('/review');
  };

  return (
    <>
      <PageHeader title="Baggage" subtitle="Add baggage options to your booking. Drag items into the box below." />
      <div className="container">
        <div className="content-section">
      <p className="content-lead">Drag items to add to your booking.</p>
      <div
        className="drop-zone"
        data-testid="baggage-drop-zone"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Your baggage</p>
        {selectedItems.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Drag baggage options here
          </p>
        ) : (
          selectedItems.map((item) => {
            currentItemRef.current = item;
            return (
              <div
                key={item.id}
                className="draggable-baggage"
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <span>{item.label} – {item.weight}</span>
                <button type="button" onClick={() => removeItem(currentItemRef.current.id)} className="btn btn-secondary">
                  Remove
                </button>
              </div>
            );
          })
        )}
      </div>
      <div style={{ marginTop: '1rem' }}>
        <p style={{ marginBottom: '0.5rem' }}>Available options (drag to add):</p>
        {BAGGAGE_OPTIONS.map((item) => (
          <div
            key={item.id}
            className="draggable-baggage"
            draggable
            onDragStart={(e) => handleDragStart(e, item)}
          >
            {item.label} – {item.weight}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '1.5rem' }}>
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/seats')}>
          Back
        </button>
        <button
          type="button"
          className="btn btn-primary"
          style={{ marginLeft: '0.5rem' }}
          onClick={handleContinue}
        >
          Continue to review
        </button>
      </div>
        </div>
      </div>
    </>
  );
}
