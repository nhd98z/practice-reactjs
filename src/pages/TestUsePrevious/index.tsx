import { useEffect, useRef, useState } from 'react';

// modified from https://usehooks.com/usePrevious/
export function usePrevious<T>(value: T) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef<T>();

  // Store current value in ref
  useEffect(() => {
    // const [value, setValue] = useState(0);
    // const prevValue = usePrevious(value);
    // return;
    // const [value, setValue] = useState(0);
    // const prevValue = usePrevious(value);
    // return;
    // Sau đó chạy vào đây.
    // Giải thích: useEffect chỉ chạy sau khi component đã được render.
    // Có nghĩa: khi render lần cuối, giá trị của ref đang là value cũ, sau khi render xong nó được cập nhật value mới,
    // tuy nhiên việc gán giá trị mới cho ref.current không làm nó re-render (vì nó là ref), nên giá trị của usePrevious() là giá trị cũ,
    // còn giá trị ref.current thì mới :D.
    ref.current = value;
    console.log('ref.current', ref.current);
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

export default function TestUsePrevious() {
  const [value, setValue] = useState(0);

  const prevValue = usePrevious(value);

  useEffect(() => {
    console.log('prevValue', prevValue);
  }, [prevValue]);

  return (
    <>
      <h1>Value: {value}</h1>
      <h1>Prev Value: {prevValue}</h1>
      <button
        onClick={() => {
          setValue((prev) => prev + 0.1234);
        }}
      >
        Increase
      </button>
    </>
  );
}
