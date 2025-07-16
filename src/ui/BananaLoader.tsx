"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./BananaLoader.module.css";

export default function BananaLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const now = new Date();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      const totalSeconds = minutes * 60 + seconds;
      const SecondsPerHour = 3600;
      const progressPercentage = (totalSeconds / SecondsPerHour) * 100;

      setProgress(progressPercentage);
    };

    updateProgress();
    const interval = setInterval(updateProgress, 1000);
    return () => clearInterval(interval);
  }, []);

  const circumference = 2 * Math.PI * 22.5;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      className={styles.loaderContainer}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
    >
      <svg className={styles.progressRing} width="56" height="56">
        <circle
          className={styles.progressBackground}
          cx="28"
          cy="28"
          r="22.5"
          fill="transparent"
          stroke="#e0e0e0"
          strokeWidth="4"
        />
        <circle
          className={styles.progressCircle}
          cx="28"
          cy="28"
          r="22.5"
          fill="transparent"
          stroke="#FFD700"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 28 28)"
        />
      </svg>
      <div className={styles.bananaContainer}>
        <Image
          src="/banana.png"
          alt="Loading next Banana"
          width={32}
          height={32}
          className={styles.bananaImage}
        />
      </div>
    </div>
  );
}
