import React, { createContext, useContext, useState, useEffect } from 'react';
import { getApiUrl } from '../api/client';

const PreloadContext = createContext(null);

export function PreloadProvider({ initialData, children }) {
  return (
    <PreloadContext.Provider value={initialData ?? null}>
      {children}
    </PreloadContext.Provider>
  );
}

export function usePreload() {
  return useContext(PreloadContext);
}

export function useOffers() {
  const preload = usePreload();
  const [offers, setOffers] = useState(preload?.offers ?? null);
  const [loading, setLoading] = useState(preload?.offers == null);

  useEffect(() => {
    if (preload == null) {
      fetch(getApiUrl('api/offers'))
        .then((r) => r.json())
        .then(setOffers)
        .finally(() => setLoading(false));
      return;
    }
    if (preload?.offers != null) {
      setOffers(preload.offers);
      setLoading(false);
      return;
    }
  }, [preload]);

  return { offers, loading };
}
