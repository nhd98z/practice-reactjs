import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import { FixedSizeList } from 'react-window';
import { socket } from '../../index';

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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        ...style,
      }}
    >
      <div style={{ width: '150px' }}>Row {index}</div>
      <div style={{ width: '250px' }}>{data[index].name}</div>
      <div
        style={{
          width: '150px',
          justifySelf: 'center',
          backgroundColor: data[index].value1 % 2 === 0 ? 'lime' : 'red',
          color: data[index].value1 % 2 === 0 ? 'black' : 'white',
        }}
      >
        {data[index].value1}
      </div>
      <div
        style={{
          width: '150px',
          backgroundColor: data[index].value2 % 2 === 0 ? 'lime' : 'red',
          color: data[index].value2 % 2 === 0 ? 'black' : 'white',
        }}
      >
        {data[index].value2}
      </div>
      <div
        style={{
          width: '150px',
          backgroundColor: data[index].value3 % 2 === 0 ? 'lime' : 'red',
          color: data[index].value3 % 2 === 0 ? 'black' : 'white',
        }}
      >
        {data[index].value3}
      </div>
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
      width={1000}
    >
      {Row}
    </FixedSizeList>
  );
}
