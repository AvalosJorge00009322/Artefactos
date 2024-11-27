import React from 'react';
import Card from './Card';
import { useMqtt } from '../hooks/UseMqtt';

const CardField = () => {
  const { messages } = useMqtt();

  // Datos dinamicos para cada seccion
  const cardsData = [
    {
      id: 1,
      title: 'Sección 1',
      temperature: messages["/internal/section1/temperature"],
      humidity: messages["/internal/section1/humidity"],
    },
    {
      id: 2,
      title: 'Sección 2',
      temperature: messages["/internal/section2/temperature"],
      humidity: messages["/internal/section2/humidity"],
    },
    {
      id: 3,
      title: 'Sección 3',
      temperature: messages["/internal/section3/temperature"],
      humidity: messages["/internal/section3/humidity"],
    },
    {
      id: 4,
      title: 'Sección 4',
      temperature: messages["/internal/section4/temperature"],
      humidity: messages["/internal/section4/humidity"],
    },
  ];

  return (
    <div className="grid gap-6 px-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 max-w-5xl mx-auto">
      {cardsData.map((card) => (
        <Card
          key={card.id}
          title={card.title}
          temperature={card.temperature}
          humidity={card.humidity}
        />
      ))}
    </div>
  );
};

export default CardField;
