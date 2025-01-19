"use client"

import Link from 'next/link'; 
import { useState } from 'react'; 
import Model from '../../components/lines/Line';
import styles from './Container.module.css';

export default function Lines() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const chairs = [
        '/chair/IMG_9084.JPG',
        '/chair/IMG_9086.JPG',
        '/chair/IMG_9088.JPG',
        '/chair/IMG_9090.JPG',
        '/chair/IMG_9092.JPG',
        '/chair/IMG_9094.JPG',
        '/chair/IMG_9096.JPG',
        '/chair/IMG_9097.JPG',
        '/chair/IMG_9099.JPG',
        '/chair/IMG_9100.JPG',
        '/chair/IMG_9102.JPG',
        '/chair/IMG_9103.JPG',
        '/chair/IMG_9105.JPG',
        '/chair/IMG_9106.JPG',
        '/chair/IMG_9108.JPG',
        '/chair/IMG_9110.JPG',
        '/chair/IMG_9112.JPG',
        '/chair/IMG_9114.JPG',
        '/chair/IMG_9116.JPG',
        '/chair/IMG_9117.JPG',
    ];

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
            images: [
                '/360/IMG_9237.JPG',
                '/360/IMG_9239.JPG',
                '/360/IMG_9241.JPG',
                '/360/IMG_9243.JPG',
                '/360/IMG_9245.JPG',
                '/360/IMG_9247.JPG',
                '/360/IMG_9249.JPG',
                '/360/IMG_9251.JPG',
            ],
            caption: 'line 8',
        },
        {
            images: [
                '/360/IMG_9237.JPG',
                '/360/IMG_9239.JPG',
                '/360/IMG_9241.JPG',
                '/360/IMG_9243.JPG',
                '/360/IMG_9245.JPG',
                '/360/IMG_9247.JPG',
                '/360/IMG_9249.JPG',
                '/360/IMG_9251.JPG',
            ],
            caption: 'line 9',
        },
        {
            images: [
                '/360/IMG_9253.JPG',
                '/360/IMG_9255.JPG',
                '/360/IMG_9257.JPG',
                '/360/IMG_9259.JPG',
                '/360/IMG_9261.JPG',
                '/360/IMG_9263.JPG',
                '/360/IMG_9265.JPG',
                '/360/IMG_9267.JPG',
            ],
            caption: 'line 10',
        },
        {
            images: [
                '/360/IMG_9237.JPG',
                '/360/IMG_9239.JPG',
                '/360/IMG_9241.JPG',
                '/360/IMG_9243.JPG',
                '/360/IMG_9245.JPG',
                '/360/IMG_9247.JPG',
                '/360/IMG_9249.JPG',
                '/360/IMG_9251.JPG',
            ],
            caption: 'line 11',
        },
        {
            images: [
                '/360/IMG_9237.JPG',
                '/360/IMG_9239.JPG',
                '/360/IMG_9241.JPG',
                '/360/IMG_9243.JPG',
                '/360/IMG_9245.JPG',
                '/360/IMG_9247.JPG',
                '/360/IMG_9249.JPG',
                '/360/IMG_9251.JPG',
            ],
            caption: 'line 12',
        },
        {
            images: [
                '/360/IMG_9237.JPG',
                '/360/IMG_9239.JPG',
                '/360/IMG_9241.JPG',
                '/360/IMG_9243.JPG',
                '/360/IMG_9245.JPG',
                '/360/IMG_9247.JPG',
                '/360/IMG_9249.JPG',
                '/360/IMG_9251.JPG',
            ],
            caption: 'line 13',
        },
        {
            images: [
                '/360/IMG_9237.JPG',
                '/360/IMG_9239.JPG',
                '/360/IMG_9241.JPG',
                '/360/IMG_9243.JPG',
                '/360/IMG_9245.JPG',
                '/360/IMG_9247.JPG',
                '/360/IMG_9249.JPG',
                '/360/IMG_9251.JPG',
            ],
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
