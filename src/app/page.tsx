"use client"
import React from 'react';
import styles from "./page.module.css"
import WhiteBoard from '@/components/WhiteBoard';
import ToolKitContext from '@/components/ToolKitContext';
import { motion } from "framer-motion"
import WallInfo from '@/components/WallInfo';
import Portal from '@/components/WallInfo';
import Zoom from '@/components/Zoom';

export default function Home() {
  return (
    <div className={styles.editor}>
      
      <WhiteBoard/>
      <Zoom/>
      <ToolKitContext/>
      <WallInfo/>
      
    </div>
  );
}
