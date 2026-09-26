import React from 'react';
import logo from '@/assets/logo.png';
import Image from 'next/image';

const footer = () => {
  return (
    <div className="w-full  flex justify-between py-10 mt-20 bg-amber-50">
      
      <div className="flex gap-2 items-center">
        <Image src={logo} alt="Logo" />
        <a className="btn btn-ghost text-xl">FITLOG</a>
      </div>

      <div>
        @ 2026 FitLog - Workout Library. Train hard, log honest.
      </div>

    </div>
  );
};

export default footer;