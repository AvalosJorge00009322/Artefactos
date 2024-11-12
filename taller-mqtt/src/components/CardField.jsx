// src/components/CardField.jsx
import React from 'react';
import Card from './Card';

const CardField = () => {
  // Puedes crear una lista de datos para representar cada tarjeta.
  const cardsData = [
    { id: 1, title: 'Lote 1' },
    { id: 2, title: 'Lote 2' },
    { id: 3, title: 'Lote 3' },
    { id: 4, title: 'Lote 4' },
  ];

  return (
    <div className="grid gap-6 px-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2grid max-w-5xl mx-auto xl:grid-cols-2">
      {cardsData.map((card) => (
        <Card key={card.id} title={card.title} />
      ))}
    </div>
  );
};

export default CardField;
