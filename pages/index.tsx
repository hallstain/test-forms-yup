import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <input type="number"/>
      <select>
        <option value="USDC">USDC</option>
        <option value="BUSD">USDC</option>
      </select>
    </div>
  )
}

export default Home
