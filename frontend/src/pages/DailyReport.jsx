import React, { useState, useEffect } from 'react';
import { getDailyReport, getSalesByDateRange } from '@services/report.service.js';
import '@styles/dailyReport.css';

const DailyReport = () => {
  const [report, setReport] = useState({ dishesSold: [], ingredientsUsed: [] });
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Cargar el reporte diario al montar el componente
  useEffect(() => {
    const fetchDailyReport = async () => {
      try {
        const data = await getDailyReport();
        if (data.status === 'Success') {
          setReport(data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchDailyReport();
  }, []);

  // Función para obtener el reporte por rango de fechas
  const fetchReportByDateRange = async () => {
    try {
      const data = await getSalesByDateRange(startDate, endDate);
      if (data.status === 'Success') {
        setReport(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchReportByDateRange();
  };

  return (
    <div className="report-container">
      <h1>Reporte Diario</h1>
  
      {/* Formulario para seleccionar el rango de fechas */}
      <form className="report-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="startDate">Fecha de Inicio:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="endDate">Fecha de Fin:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Generar Reporte</button>
      </form>

      <h2>Platos Vendidos</h2>
      <table>
        <thead>
          <tr>
            <th>Plato</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {report.dishesSold.map(({ dish, quantity }, index) => (
            <tr key={index}>
              <td>{dish.nombre}</td>
              <td>{quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Ingredientes Utilizados</h2>
      <table>
        <thead>
          <tr>
            <th>Ingrediente</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {report.ingredientsUsed.map(({ ingredient, quantity }, index) => (
            <tr key={index}>
              <td>{ingredient.nombre}</td>
              <td>{quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DailyReport;