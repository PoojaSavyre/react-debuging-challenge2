# Flight Booking App (React Debug Challenge)

A full working React flight booking application with an **Express backend** in the same repo. This repo is designed so that **specific flows can be broken** to test candidate competencies (entry and mid-level). The app is fully functional with **no bugs injected** in the baseline.

## Run the app

**1. Install dependencies (root and server):**

```bash
npm install
cd server && npm install && cd ..
```

**2. Start the API server** (in one terminal):

```bash
npm run server
```

Server runs at [http://localhost:3001](http://localhost:3001).

**3. Start the frontend** (in another terminal):

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). The app uses the API at `http://localhost:3001` by default. Override with `VITE_API_URL` (e.g. in `.env`: `VITE_API_URL=http://localhost:3001`).

## Run tests

```bash
npm run test
# or one-off
npm run test:run
```

## Backend (Express, `server/`)

- **Auth:** `POST /api/auth/login` (body: `{ email, name }`) → `{ user, token }`; `GET /api/auth/me` (header: `Authorization: Bearer <token>`) → `{ user }`; `POST /api/auth/logout`.
- **Flights:** `GET /api/flights?origin=DEL&destination=BOM` → array of flights; `GET /api/flights/:id` → single flight.
- **Bookings:** `POST /api/bookings` (body: `{ flightId, passengers, selectedSeats, baggageItems }`) → `{ bookingId }`.

Data is in-memory (users, tokens, bookings in `server/data/store.js`). Token is returned on login; frontend stores it in `localStorage` and sends it in the `Authorization` header for `/api/auth/me`, `/api/auth/logout`, and `/api/bookings`.

## Login flow

1. User enters **name** and **email** on Home and submits the login form.
2. Frontend calls `POST /api/auth/login` with `{ email, name }`.
3. Server creates or finds the user, creates a token, returns `{ user, token }`.
4. Frontend stores the token in `localStorage` and sets the user in **AuthContext**.
5. On reload, frontend calls `GET /api/auth/me` with the stored token to restore the session.
6. Protected routes (passengers, seats, baggage, review) use **PrivateRoute** and `useAuth().isAuthenticated`.
7. Logout clears the token and user and optionally calls `POST /api/auth/logout`.

## Flows (user journeys)

1. **Home** → Search form (origin, destination, date, passengers) → optional login.
2. **Search** → Results from **API** `GET /api/flights`, then Redux + Context, sort/filter.
3. **Flight detail** → Single flight from **API** `GET /api/flights/:id` → store in BookingContext.
4. **Passengers** → Multi-passenger form (dynamic fields, validation).
5. **Seats** → Seat map per passenger, refs and state.
6. **Baggage** → Drag-and-drop baggage options into “Your baggage”.
7. **Review** → Summary from Context → **Confirm** calls `POST /api/bookings` → get `bookingId`.
8. **Confirmation** → Show booking ID from API, reset booking.

## Tech stack

- **React 18** (functional + class components)
- **React Router 6**
- **React Context** (BookingContext, AuthContext)
- **Redux** (search results, filters, sort)
- **Express** (auth, flights, bookings APIs in `server/`)
- **Vite**, **Vitest**, **Testing Library**
- **PropTypes** where used

## Competency → flow mapping (for injecting bugs)

Use this map to **break a particular flow** and test the corresponding competency. Each competency lists bug types that can be introduced in the indicated files/flows.

| # | Competency | Where it appears in the app | Bug types (when you break the flow) |
|---|------------|-----------------------------|--------------------------------------|
| 1 | **react-component-architecture** | Compound: `SearchForm` + `SearchFormField`; `FlightCard` (memo); HOC `withLoading`; `ErrorBoundary`; list keys in results | Compound pattern break, unmount leak, wrong composition, HOC wrapping, reconciliation/key instability, pure component, lifecycle misuse |
| 2 | **component-architecture** | Hierarchy: Layout → pages → components; naming; error boundaries; controlled inputs in forms; keys in lists; `Layout`, `SearchForm`, `FlightCard`, `SeatMap` | Incorrect hierarchy, naming, HOC use, component tree, error boundaries, unhandled props, controlled/controlled, key usage, props not received, overlapping responsibilities, nesting, file structure |
| 3 | **react-context-api-usage** | `BookingContext`, `AuthContext` in `main.jsx`; `useBooking()`, `useAuth()` across pages | Stale context, missing provider, incorrect value, value not updating, nested providers, consumer not rendering, stale closure, outside provider, default value, multiple contexts, type mismatch, provider not wrapping, value not from state, consumer not accessing, not in functional component |
| 4 | **react-component-reusability** | `FlightCard`, `SearchFormField`, `SeatMap`, HOCs | Composition, reusability, nesting, HOC use, abstracted logic, duplicate instances, component interfaces, props, complexity, composition, boundaries, hierarchy |
| 5–6 | **react-component-lifecycles** (class) | `ErrorBoundary`, `FlightListLoader` (class) | componentWillUnmount cleanup, componentDidMount, componentWillUpdate state, componentDidUpdate, shouldComponentUpdate, componentWillReceiveProps, mounting, memory leak, lifecycle misuse, state across lifecycles, rendering in lifecycle, data fetching phase, unhandled promise, async in componentDidMount |
| 7 | **react-form-handling** | `SearchForm`, `PassengerFormPage` | Validation, preventDefault, initial state, form errors, reset, checkbox, accessibility, serialization, multi-select, error messages, duplicate submit, dynamic fields, onChange, input type, async validation |
| 8 | **react-component-patterns** | PropTypes on components; `FlightCard` (memo); HOCs; `SearchForm` structure | Prop types, function component usage, nesting, HOCs, composition, memoization, encapsulate logic, render props, hierarchy |
| 9 | **react-performance-monitoring** | `FlightCard` (React.memo); Redux selectors | React.memo use, performance metrics, profiling |
| 10 | **react-component-testing** | `SearchForm.test.jsx`, `FlightCard.test.jsx`, `src/test/setup.js` | State updates, lifecycle, props, isolation, testing library, mocking, conditional rendering, snapshot, cleanup, assertions, a11y, side effects, async tests |
| 11 | **react-hook-usage** | All functional components and Context (useState, useEffect, useCallback, useReducer, useContext, useRef) | useEffect cleanup/deps, useState init, useCallback stale closure, useMemo deps, uncontrolled input, useReducer, useContext without provider, mutating state, useRef, custom hook return, conditional hooks, multiple state, errors in useEffect, async in useEffect |
| 12 | **react-component-lifecycle-management** | `ErrorBoundary`, `FlightListLoader` | componentWillUnmount, componentDidMount, componentDidUpdate re-renders, componentDidCatch, shouldComponentUpdate, context in lifecycle, componentDidCatch errors, lifecycle usage, ComponentDidMount not firing, ComponentWillUnmount logic, async lifecycle state |
| 13 | **react-component-refs-usage** | `SeatMap` (useRef), focus/refs in forms | Ref attachment, ref in functional component, ref in event handlers, string refs, ref forwarding, ref assignment, ref update, ref callback, ref to child, ref value, useRef, re-renders, ref type, ref init, ref cleanup |
| 14 | **react-form-management** | `SearchForm`, `PassengerFormPage` | Validation, form state update, submission not triggering, default values, reset, bound methods, persistence, submission feedback, form state structure, focus, submission without validation, error messages |
| 15 | **redux-state-management** | `store/index.js`, reducers, `SearchResultsPage` (dispatch/setFlights) | State mutation in reducer |
| 16 | **client-side-state-management** | `BaggagePage` (drag-and-drop state: `draggedItem`, `selectedItems`) | Drag and drop state management |

## Project structure

```
├── server/                 # Express backend
│   ├── index.js            # App entry, CORS, routes
│   ├── data/
│   │   └── store.js        # In-memory flights, users, tokens, bookings
│   └── routes/
│       ├── auth.js         # POST /login, GET /me, POST /logout
│       ├── flights.js      # GET /, GET /:id
│       └── bookings.js     # POST /, GET /:id
├── src/
│   ├── api/
│   │   └── client.js       # getApiUrl, apiRequest (fetch + auth header)
│   ├── main.jsx            # Providers: Redux, Router, Auth, Booking
│   ├── App.jsx             # Routes, ErrorBoundary, PrivateRoute
│   ├── index.css
│   ├── context/
│   │   ├── AuthContext.jsx # login/logout via API, token in localStorage, restore /me
│   │   └── BookingContext.jsx
│   ├── store/
│   │   └── index.js        # Redux store + rootReducer
│   ├── hoc/
│   ├── components/
│   ├── pages/
│   ├── data/
│   │   └── flights.js     # Still used by FlightListLoader; search uses API
│   └── test/
│       └── setup.js
└── package.json            # scripts: dev, server, test
```

## How to use for candidate testing

1. Keep a **clean baseline** (this repo) as the “correct” version.
2. **Clone or branch** and introduce **one (or a few) bug types** for the competency you want to test.
3. Ask the candidate to **find and fix** the bug in the broken flow.
4. Use the table above to choose which file/flow to break for each competency.

No bugs are present in this baseline; inject them per the competency list when creating challenge variants.
#   r e a c t - d e b u g i n g - c h a l l e n g e 2  
 