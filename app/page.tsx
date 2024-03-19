"use client";
import React from 'react'
import FlightSearch from './components/FlightSearch';
import Navbar from './navigation/Navbar';
import { Router } from 'next/router';

export default function page() {
  return (
    <div>
      <Navbar />
      <FlightSearch />
    </div>

  )
}
