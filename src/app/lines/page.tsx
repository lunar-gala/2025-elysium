"use client"

import Link from 'next/link'; 
import { useState } from 'react'; 
import Model from '../../components/lines/Line';
import styles from './Container.module.css';

export default function Lines() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const chairs = [
        '/chair/IMG_9084.png',
        '/chair/IMG_9086.png',
        '/chair/IMG_9088.png',
        '/chair/IMG_9090.png',
        '/chair/IMG_9092.png',
        '/chair/IMG_9094.png',
        '/chair/IMG_9096.png',
        '/chair/IMG_9097.png',
        '/chair/IMG_9099.png',
        '/chair/IMG_9100.png',
        '/chair/IMG_9102.png',
        '/chair/IMG_9103.png',
        '/chair/IMG_9105.png',
        '/chair/IMG_9106.png',
        '/chair/IMG_9108.png',
        '/chair/IMG_9110.png',
        '/chair/IMG_9112.png',
        '/chair/IMG_9114.png',
        '/chair/IMG_9116.png',
        '/chair/IMG_9117.png',
    ];

    const turn360 = [
        '/360/IMG_9237.png',
        '/360/IMG_9239.png',
        '/360/IMG_9241.png',
        '/360/IMG_9243.png',
        '/360/IMG_9245.png',
        '/360/IMG_9247.png',
        '/360/IMG_9249.png',
        '/360/IMG_9251.png',
        '/360/IMG_9253.png',
        '/360/IMG_9255.png',
        '/360/IMG_9257.png',
        '/360/IMG_9259.png',
        '/360/IMG_9261.png',
        '/360/IMG_9263.png',
        '/360/IMG_9265.png',
        '/360/IMG_9267.png',
        '/360/IMG_9269.png',
        '/360/IMG_9271.png',
        '/360/IMG_9273.png',
        '/360/IMG_9275.png',
        '/360/IMG_9277.png',
        '/360/IMG_9279.png',
        '/360/IMG_9281.png',
    ]

    const models = [
        {
            images: chairs,
            caption: 'line 1',
        },
        {
            images: chairs,
            caption: 'line 2',
        },
        {
            images: chairs,
            caption: 'line 3',
        },
        {
            images: chairs,
            caption: 'line 4',
        },
        {
            images: chairs,
            caption: 'line 5',
        },
        {
            images: chairs,
            caption: 'line 6',
        },
        {
            images: chairs,
            caption: 'line 7',
        },
        {
            images: turn360,
            caption: 'line 8',
        },
        {
            images: turn360,
            caption: 'line 9',
        },
        {
            images: turn360,
            caption: 'line 10',
        },
        {
            images: turn360,
            caption: 'line 11',
        },
        {
            images: turn360,
            caption: 'line 12',
        },
        {
            images: turn360,
            caption: 'line 13',
        },
        {
            images: turn360,
            caption: 'line 14',
        },
    ]
  return (
    <div className={styles.container}>
      {models.map((model, index) => (
        <Link
          href={`/lines/${model.caption.split(" ").join("-")}`}
          key={index}
          onMouseOver={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div
            className={`${styles.model} ${
              index === hoveredIndex
                ? styles.hover
                : index === (hoveredIndex ?? -1) - 1 || index === (hoveredIndex ?? -1) + 1
                ? styles.neighbor
                : index === (hoveredIndex ?? -1) - 2 || index === (hoveredIndex ?? -1) + 2
                ? styles.neighborFar
                : ""
            }`}
          >
            <Model images={model.images} caption={model.caption} />
          </div>
        </Link>
      ))}
    </div>
  );
}
