import React, { useState, useRef, useEffect } from 'react';
import styles from "./page.module.css"
import WhiteBoard from '@/components/WhiteBoard';



export default function Home() {
  return (
    <div className={styles.editor}>
      <WhiteBoard/>
    </div>
  );
}
