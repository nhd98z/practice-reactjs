import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

type FormValues = {
  tokenA: string;
  tokenB: string;
};

export default function TestFieldDependencyWithReactHookForm() {
  const render = useRef(0);
  render.current++;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue: _setValue,
    watch,
  } = useForm<FormValues>({ mode: 'all' });
  const tokenA = register('tokenA', { required: true, max: 123 });
  const tokenB = register('tokenB', { required: true, max: 456 });
  const watchTokenA = watch('tokenA');
  const watchTokenB = watch('tokenB');
  const [independentField, setIndependentField] = useState<'tokenA' | 'tokenB'>();

  const setValue = useCallback(
    (name: 'tokenA' | 'tokenB', value: string | number, isSetIndependentField) => {
      if (isSetIndependentField) setIndependentField(name);
      _setValue(name, value.toString(), { shouldValidate: true });
    },
    [_setValue]
  );

  const onSubmit = (data: any) => console.log('data', data);

  const onTokenAChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIndependentField('tokenA');
    control.register('tokenA').onChange(event).then();
  };

  const onTokenBChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIndependentField('tokenB');
    control.register('tokenA').onChange(event).then();
  };

  const onSetTokenA = () => {
    setValue('tokenA', '1', true);
  };

  useEffect(() => {
    console.log('errors', errors);
  }, [errors]);

  useEffect(() => {
    if (watchTokenA === undefined || independentField !== 'tokenA') return;
    setValue('tokenB', watchTokenA === '' ? '' : +watchTokenA * 2, false);
  }, [setValue, watchTokenA, independentField]);

  useEffect(() => {
    if (watchTokenB === undefined || independentField !== 'tokenB') return;
    setValue('tokenA', watchTokenB === '' ? '' : +watchTokenB / 2, false);
  }, [setValue, watchTokenB, independentField]);

  return (
    <>
      <div>
        render time: <h1 style={{ display: 'inline' }}>{render.current}</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="number" placeholder="Token A" {...tokenA} onChange={onTokenAChange} />
        <input type="number" placeholder="Token B" {...tokenB} onChange={onTokenBChange} />
        <input type="submit" />
      </form>
      <button onClick={onSetTokenA}>set tokenA programmatically</button>
      <div>tokenA: {'<' + watchTokenA + '>'}</div>
      <div>tokenB: {'<' + watchTokenB + '>'}</div>
      <div>independent field: {'<' + independentField + '>'}</div>
      <div>Mọi thứ của react-hook-form đều tuyệt vời trừ việc không hỗ trợ dependent field.</div>
      <DevTool control={control} placement="bottom-right" /> {/* set up the dev tool */}
    </>
  );
}
