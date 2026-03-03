import React from 'react';
import PropTypes from 'prop-types';
import { getFlightsByRoute } from '../../data/flights';
import { FlightCard } from '../FlightCard';

/**
 * Class component used for lifecycle-based flows (componentDidMount, componentWillUnmount, etc.).
 * Fetches flights when mounted and cleans up on unmount.
 */
export class FlightListLoader extends React.Component {
  static propTypes = {
    origin: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    onLoaded: PropTypes.func,
  };

  state = {
    flights: [],
    loading: true,
  };

  _mounted = false;

  componentDidMount() {
    this._mounted = true;
    this.loadFlights();
  }

  componentWillUnmount() {
    this._mounted = false;
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
  }

  loadFlights = () => {
    const { origin, destination, onLoaded } = this.props;
    this.setState({ loading: true });
    const timer = setTimeout(() => {
      const list = getFlightsByRoute(origin, destination);
      if (this._mounted) {
        this.setState({ flights: list, loading: false });
        onLoaded?.(list);
      }
    }, 300);
    this._timer = timer;
  };

  render() {
    const { loading, flights } = this.state;
    if (loading) return <div className="card">Loading flights...</div>;
    if (flights.length === 0) return <div className="card">No flights found.</div>;
    return (
      <div>
        {flights.map((flight) => (
          <FlightCard key={flight.id} flight={flight} />
        ))}
      </div>
    );
  }
}
