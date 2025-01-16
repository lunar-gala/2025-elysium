// src/components/Model.tsx
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Line.module.css';

interface ModelProps {
  images: string[];
  caption: string;
}

const Model: React.FC<ModelProps> = ({ images, caption }) => {
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (started) {
      let index = 0;
      interval = setInterval(() => {
        if (index < images.length) {
          setCurrentImage(images[index]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 100); // Adjust the speed (100ms in this case)
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [started, images]);

  return (
    <div className={styles.model}>
      <Image
        src={currentImage}
        alt={caption}
        width={100}
        height={100}
        onMouseEnter={() => setStarted(true)}
        onMouseLeave={() => setStarted(false)}
      />
      <p>{caption}</p>
    </div>
  );
};

export default Model;