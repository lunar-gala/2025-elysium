// src/components/Line.tsx
import React from 'react';
import Model from './Line';
import styles from './Row.module.css';

interface LineProps {
  models: { images: string[]; caption: string }[];
}

const Row: React.FC<LineProps> = ({ models }) => {
  return (
    <div className={styles.line}>
      <div className={styles.models}>
        {models.map((model, index) => (
          <Model key={index} images={model.images} caption={model.caption} />
        ))}
      </div>
    </div>
  );
};

export default Row;