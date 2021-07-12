// Run project express-socketio-tutorial.
import React, { useEffect } from 'react';
import { socket } from '../RenderLargeRealtimeList';

export default function TestSocketIo() {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected');
    });

    return () => {
      socket.disconnect();
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  return <div>OK.</div>;
}
