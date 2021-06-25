import React, { useEffect } from 'react';
import io from 'socket.io-client';

export default function TestSocketIO() {
  useEffect(() => {
    // Run project express-socketio-tutorial.
    const socket = io('http://localhost:8080/');

    socket.on('connect', () => {
      console.log('Connected');
    });
    socket.on('socketToMe', function (data) {
      console.log('data', data);
    });
    return () => {
      socket.off('connect');
      socket.off('socketToMe');
    };
  }, []);

  return <div>OK.</div>;
}
