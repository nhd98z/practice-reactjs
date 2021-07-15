import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import { FixedSizeList } from 'react-window';
import { socket } from '../../index';

function useSocketIo(eventName: string, callback: (data: any) => void, isPause: boolean): null {
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isPause) {
      socket.off(eventName, callback);
    } else {
      socket.on(eventName, callback);
    }
    return () => {
      socket.off(eventName, callback);
    };
  }, [eventName, callback, isPause]);

  return null;
}

const ITEM_SIZE = 50;

export default function RenderLargeRealtimeList() {
  const [data, setData] = useState<Array<any>>([]);
  const [range, setRange] = useState<{ begin: number; end: number }>({ begin: 0, end: 10 });
  const [isPause, setPause] = useState(false);

  useEffect(() => {
    console.log('range', range);
    socket.emit('serverGetNewRange', range);
  }, [range]);

  const dataFirstTimeCallback = useCallback((newData) => {
    setData(newData);
  }, []);

  const dataIntervalCallback = useCallback(
    (newData) => {
      setData((prevData) => {
        const prevDataCopied = [...prevData];
        for (let i = range.begin; i < range.end; i++) {
          prevDataCopied[i] = newData[i - range.begin];
        }
        return prevDataCopied;
      });
    },
    [range]
  );

  useSocketIo('dataFirstTime', dataFirstTimeCallback, false);
  useSocketIo('dataInterval', dataIntervalCallback, isPause);

  const myRef = useRef<HTMLDivElement>(null);

  const Row = ({ index, style }: { index: number; style: CSSProperties }) => {
    if (data[index] === undefined || data[index] === null) {
      return null;
    }

    return (
      <div
        style={{
          height: '50px',
          backgroundColor: index % 2 === 0 ? 'orange' : 'cyan',
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
            backgroundColor: Math.round(data[index].value1) % 2 === 0 ? 'lime' : 'red',
            color: Math.round(data[index].value1) % 2 === 0 ? 'black' : 'white',
          }}
        >
          {data[index].value1}
        </div>
        <div
          style={{
            width: '150px',
            backgroundColor: Math.round(data[index].value2) % 2 === 0 ? 'lime' : 'red',
            color: Math.round(data[index].value2) % 2 === 0 ? 'black' : 'white',
          }}
        >
          {data[index].value2}
        </div>
        <div
          style={{
            width: '150px',
            backgroundColor: Math.round(data[index].value3) % 2 === 0 ? 'lime' : 'red',
            color: Math.round(data[index].value3) % 2 === 0 ? 'black' : 'white',
          }}
        >
          {data[index].value3}
        </div>
      </div>
    );
  };

  return (
    <div>
      <button
        style={{
          padding: '10px',
          width: '1000px',
          borderRadius: '5px',
          outline: 'none',
          border: '1px solid black',
        }}
        onClick={() => setPause((prev) => !prev)}
      >
        {isPause ? 'resume' : 'pause'}
      </button>
      <FixedSizeList
        outerRef={myRef}
        onScroll={() => {
          if (myRef.current) {
            const begin = Math.floor(myRef.current.scrollTop / ITEM_SIZE);
            const end = begin + 10 + (myRef.current.scrollTop % ITEM_SIZE === 0 ? 0 : 1);
            setRange({ begin, end });
          }
        }}
        style={{ backgroundColor: 'orange' }}
        height={500}
        itemData={data}
        itemCount={data.length}
        itemSize={ITEM_SIZE}
        width={1000}
      >
        {Row}
      </FixedSizeList>
      <p>Có 2 lỗi ở đây:</p>
      <p>
        1. FixedSizeList bị ràng buộc giữa itemSize và itemCount. Ví dụ: Nếu muốn render ra 1,000,000 item thì chiều cao
        của mỗi item không được quá 33.5px.
      </p>
      <p>
        2. Giá trị thực và giá trị in ra console của scrollTop không giống nhau khi user drag scrollbar. Ví dụ: User
        drag scrollbar xuống dưới cùng, đúng ra range.end phải là 999,999 nhưng nó lại là 670,000.
      </p>
      <blockquote>
        PS: Tại sao lại xác định được giá trị thực đúng còn giá trị in ra console sai? Vì data realtime từ socket trả về
        vẫn giữ đúng dòng, tức là số &quot;999,999.42&quot; vẫn nhảy liên tục thành: &quot;999,999.61&quot;,
        &quot;999,999.89&quot;...
      </blockquote>
      <blockquote>
        More PS: Muốn click một phát xuống dòng 200?
        https://codesandbox.io/s/bvaughnreact-window-fixed-size-list-vertical-wqmeo
      </blockquote>
    </div>
  );
}
