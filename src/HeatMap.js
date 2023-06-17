import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

const Heatmap = () => {
  // Genera algunos datos aleatorios para el mapa de calor
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);
  const endDate = new Date();

  const generateRandomValue = () => Math.floor(Math.random() * 5);

  const generateRandomData = () => {
    const data = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      data.push({
        date: currentDate.toISOString(),
        count: generateRandomValue()
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return data;
  };

  const heatmapData = generateRandomData();

  return (
    <div>
      <h2>Mapa de calor</h2>
      <CalendarHeatmap
        width={20}
        startDate={startDate.toISOString()}
        endDate={endDate.toISOString()}
        values={heatmapData}
        showWeekdayLabels
      />
    </div>
  );
};

export default Heatmap;
