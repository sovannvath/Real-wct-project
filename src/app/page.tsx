"use client";

import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React from "react";
import styles from "@/components/styles/utilityBar.module.css";
import Link from "next/link";
import JoinCommunity from "@/components/JoinCommunity";

export default function Home() {
  return (
    <>
      {/* Utility Bar */}
      <nav className={styles.utilityBar}>
        <div className={styles.languages}>
          <Link href="/" className={styles.active}>
            English
          </Link>
          | <Link href="/">Khmer</Link>
        </div>
        <ul className={styles.navLinks}>
          <li>
            <Link href="/help">Help/FAQ</Link>
          </li>
          <li>
            <Link href="/contactus">Contact Us</Link>
          </li>
          <li>
            <Link href="/aboutus">About Us</Link>
          </li>
        </ul>
        <div className={styles.authButtons}>
          <button className={styles.loginButton}><Link href="/auth/login">Log In</Link></button>
          <button className={styles.signupButton}><Link href="/auth/register">Sign Up</Link></button>
        </div>
      </nav>

      {/* Other Components */}
      <Navbar />
      <Hero />
      <JoinCommunity />
      <Footer />
    </>
  );
}
