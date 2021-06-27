import React from 'react';
import loader from '../assets/logo/loader.mp4';

export function Logo() {
  return (
    <div className='loader-container flex center align-center'>
      <video width='600' height='600' autoPlay loop preload='true'>
        <source src={loader} type='video/mp4'></source>
      </video>
    </div>
  );
}
