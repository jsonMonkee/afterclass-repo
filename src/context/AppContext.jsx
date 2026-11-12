'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [savedItems, setSavedItems] = useState(new Set(['ev-1', 'op-2']));
  const [followedClubs, setFollowedClubs] = useState(new Set(['turing-club', 'cadence']));
  const [searchQuery, setSearchQuery] = useState('');

  // Hydrate from localStorage on client
  useEffect(() => {
    try {
      const localSaved = localStorage.getItem('afterclass_saved');
      if (localSaved) setSavedItems(new Set(JSON.parse(localSaved)));

      const localFollowed = localStorage.getItem('afterclass_followed');
      if (localFollowed) setFollowedClubs(new Set(JSON.parse(localFollowed)));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleSave = (id, e) => {
    e?.stopPropagation();
    setSavedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        localStorage.setItem('afterclass_saved', JSON.stringify(Array.from(next)));
      } catch (err) {}
      return next;
    });
  };

  const toggleFollow = (clubId, e) => {
    e?.stopPropagation();
    setFollowedClubs(prev => {
      const next = new Set(prev);
      if (next.has(clubId)) next.delete(clubId);
      else next.add(clubId);
      try {
        localStorage.setItem('afterclass_followed', JSON.stringify(Array.from(next)));
      } catch (err) {}
      return next;
    });
  };

  return (
    <AppContext.Provider value={{
      savedItems,
      toggleSave,
      followedClubs,
      toggleFollow,
      searchQuery,
      setSearchQuery
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    return {
      savedItems: new Set(),
      toggleSave: () => {},
      followedClubs: new Set(),
      toggleFollow: () => {},
      searchQuery: '',
      setSearchQuery: () => {}
    };
  }
  return context;
}
