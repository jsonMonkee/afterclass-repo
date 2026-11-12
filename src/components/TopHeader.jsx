'use client';

import React from 'react';
import HeaderNav from './HeaderNav';
import DiaBanner from './DiaBanner';

export default function TopHeader() {
  return (
    <div className="relative w-full z-40 arc-grain-red">
      <HeaderNav />
      <DiaBanner />
    </div>
  );
}

