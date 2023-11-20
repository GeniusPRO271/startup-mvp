"use client"
import React from 'react';
import styles from "./page.module.css"
import WhiteBoard from '@/components/WhiteBoard';
import ToolKitContext from '@/components/ToolKitContext';
import { motion } from "framer-motion"
import WallInfo from '@/components/WallInfo';
import Portal from '@/components/WallInfo';

export default function Home() {
  return (
    <div className={styles.editor}>
      <WhiteBoard/>
      <ToolKitContext/>
      <WallInfo/>
    </div>
  );
}
