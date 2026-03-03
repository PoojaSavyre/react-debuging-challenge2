import { createStore } from 'redux';

const initialState = {
  flights: [],
  filters: { minPrice: null, maxPrice: null, airline: null },
  sortBy: 'departure',
  loading: false,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_FLIGHTS':
      return { ...state, flights: action.payload };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'SET_SORT':
      return { ...state, sortBy: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

export const store = createStore(rootReducer);
