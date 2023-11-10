import React, { useState, useRef, useEffect } from 'react';
import styles from "./page.module.css"
import WhiteBoard from '@/components/WhiteBoard';
import ToolKitContext from '@/components/ToolKitContext';



export default function Home() {
  return (
    <div className={styles.editor}>
      <WhiteBoard/>
      <ToolKitContext/>
    </div>
  );
}
