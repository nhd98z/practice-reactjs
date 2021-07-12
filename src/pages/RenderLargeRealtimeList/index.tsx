// Run project express-socketio-tutorial.
import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { FixedSizeList } from 'react-window';

export const socket = io('http://localhost:8080/');

function useSocketIo(eventName: string, callback: (data: any) => void): null {
  useEffect(() => {
    socket.on(eventName, callback);
    return () => {
      socket.off(eventName, callback);
    };
  }, [eventName, callback]);

  return null;
}

export default function RenderLargeRealtimeList() {
  const [data, setData] = useState<Array<any>>([]);
  const [range, setRange] = useState<{ begin: number; end: number }>({ begin: 0, end: 10 });

  useEffect(() => {
    console.log('range', range);
    socket.emit('serverGetNewRange', range);
  }, [range]);

  const callback = useCallback(
    (newData) => {
      setData((prevData) => [...prevData.slice(0, range.begin), ...newData, ...prevData.slice(range.end)]);
    },
    [range]
  );

  useSocketIo('dataFirstTime', callback);
  useSocketIo('dataInterval', callback);

  const myRef = useRef<HTMLDivElement>(null);

  const Row = ({ index, style }: { index: number; style: CSSProperties }) => (
    <div
      style={{
        height: '50px',
        borderBottom: '1px solid black',
        ...style,
      }}
    >
      Row {index}: {data[index].name}
    </div>
  );

  return (
    <FixedSizeList
      outerRef={myRef}
      onScroll={() => {
        if (myRef.current) {
          const begin = Math.floor(myRef.current.scrollTop / 50);
          const end = begin + 10 + (myRef.current.scrollTop % 50 === 0 ? 0 : 1);
          setRange({ begin, end });
        }
      }}
      style={{ backgroundColor: 'orange' }}
      height={500}
      itemCount={data.length}
      itemSize={50}
      width={500}
    >
      {Row}
    </FixedSizeList>
  );
}
