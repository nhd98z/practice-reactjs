import React, { useEffect, useState } from 'react';
import { socket } from '../../index';

export default function TestSocketIo() {
  const [data, setData] = useState<any>();
  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      console.log('Connected');
    });

    socket.on('dataInterval', (newData) => {
      setData(newData);
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

  return (
    <div>
      {data?.length &&
        data.map((item: any) => (
          <div key={item.id}>
            {item.name}: {item.value1}
          </div>
        ))}
    </div>
  );
}
