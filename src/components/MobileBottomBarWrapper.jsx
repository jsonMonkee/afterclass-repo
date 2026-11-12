'use client';

import React from 'react';
import MobileBottomBar from './MobileBottomBar';

export default function MobileBottomBarWrapper() {
  const handleOpenAi = () => {
    window.dispatchEvent(new CustomEvent('open-dia-chatbot'));
  };

  return <MobileBottomBar onOpenAi={handleOpenAi} />;
}

