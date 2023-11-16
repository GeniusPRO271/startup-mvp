"use client"
import React from 'react';
import styles from "./page.module.css"
import WhiteBoard from '@/components/WhiteBoard';
import ToolKitContext from '@/components/ToolKitContext';
import style from "@/app/page.module.css"
import { useSelector } from 'react-redux';
import { motion } from "framer-motion";
import { selectShowfloorInfo } from './redux/slices/floorSlice';



export default function Home() {
  const showfloorInfo = useSelector(selectShowfloorInfo)
  const popUp = {
    hidden: {
      opacity: 0,
      x:100,
      transition: {
        duration: 0,
      },
    },
    show : {
      opacity: 1,
      x:0,
      transition: {
        duration: 0.15,
      },
    }
  }
  return (
    <div className={styles.editor}>
      
      <WhiteBoard/>
      <motion.div id='popUp' className={style.WallInfoContainer} variants={popUp} animate={showfloorInfo ? "show" : "hidden"}/>
      <ToolKitContext/>
    </div>
  );
}
