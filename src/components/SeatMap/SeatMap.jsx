import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F'];
const COLS = 6;

export function SeatMap({ selectedSeatId, occupiedSeatIds, onSelectSeat }) {
  const seatMapRef = useRef(null);

  const handleSeatClick = useCallback(
    (seatId, status) => {
      if (status === 'occupied') return;
      onSelectSeat(seatId);
    },
    [onSelectSeat]
  );

  const seats = [];
  for (let r = 0; r < ROWS.length; r++) {
    for (let c = 1; c <= COLS; c++) {
      const seatId = `${ROWS[r]}${c}`;
      const isOccupied = occupiedSeatIds.includes(seatId);
      const isSelected = selectedSeatId === seatId;
      const status = isOccupied ? 'occupied' : isSelected ? 'selected' : 'available';
      seats.push(
        <button
          key={seatId}
          type="button"
          ref={r === 0 && c === 1 ? seatMapRef : undefined}
          className={`seat ${status}`}
          onClick={() => handleSeatClick(seatId, status)}
          disabled={isOccupied}
          aria-pressed={isSelected}
          aria-label={`Seat ${seatId} ${status}`}
        >
          {seatId}
        </button>
      );
    }
  }

  return (
    <div className="seat-map" ref={seatMapRef} role="group" aria-label="Seat map">
      {seats}
    </div>
  );
}

SeatMap.propTypes = {
  selectedSeatId: PropTypes.string,
  occupiedSeatIds: PropTypes.arrayOf(PropTypes.string),
  onSelectSeat: PropTypes.func.isRequired,
};
