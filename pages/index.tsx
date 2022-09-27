import type { NextPage } from 'next';
import * as yup from 'yup';
import styles from '../styles/Home.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useCallback, useState } from 'react';

interface IFormInputs {
  amount: number;
  stablecoin: number;
}

const Home: NextPage = () => {
  const [counter, setCounter] = useState(0);

  const schema =
    yup.object({
      amount: yup.number().positive().required().min(0).when('$amount', (amount, schema) => {
        return schema.max(amount);
      }),
    });

  const { register, handleSubmit, formState: { errors }, trigger } = useForm<IFormInputs>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    context: { amount: counter }
  });
  const onSubmit = (data: IFormInputs) => console.log(data);

  const handleInc = useCallback(() => {
    setTimeout(()=> {
      setCounter(value => value + 1);
    }, 4000)
  }, [setCounter]);

  const handleDec = useCallback(() => {
    setCounter(value => value - 1);
  }, [setCounter]);

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.counterControl}>
        <button type="button" onClick={handleInc}>+</button>
        <button type="button" onClick={handleDec}>-</button>
        <span>Max value {counter}</span>
      </div>
      <input type="number" {...register('amount', { valueAsNumber: true })}/>
      <select {...register('stablecoin', {onChange: handleInc})}>
        <option value="USDC">USDC</option>
        <option value="BUSD">USDC</option>
      </select>
      <button type="submit">Submit</button>
      <span>{errors.amount?.message}</span>
      <span>{errors.stablecoin?.message}</span>
    </form>
  );
};

export default Home;
