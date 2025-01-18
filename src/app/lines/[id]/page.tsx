"use client"

import { useParams } from 'next/navigation';

export default function LineDetailsPage() {
    const { id } = useParams();

    return (
        <div>
            <h1>Details for {id}</h1>
            <p>This is the page for line ID: {id}.</p>
        </div>
    );
}
