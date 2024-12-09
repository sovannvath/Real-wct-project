import React from 'react'
import styles from './styles/utilityBar.module.css';
import Link from 'next/link';

const Utilitybar = () => {
  return (
    <>
     <nav className={styles.utilityBar}>
      <div className={styles.languages}>
        <Link href="/" className={styles.active}>English</Link> | <Link href="#">Khmer</Link>
      </div>
      <ul className={styles.navLinks}>
        <li><Link href="/">Help/FAQ</Link></li>
        <li><Link href="/">Contact Us</Link></li>
        <li><Link href="/aboutus">About Us</Link></li>
      </ul>
      <div className={styles.authButtons}>
        <button className={styles.loginButton}>Log In</button>
        <button className={styles.signupButton}>Sign Up</button>
      </div>
    </nav>
    </>
  )
}

export default Utilitybar
