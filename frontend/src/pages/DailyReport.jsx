import React, { useState } from 'react';
import axios from 'axios';
import '@styles/dailyReport.css';

const DailyReport = () => {
  const [report, setReport] = useState({ dishesSold: [], ingredientsUsed: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:3000/api/report/daily');
    
      console.log('API Response:', response.data); // Asegúrate de que este log esté aquí
      if (response.data.status === 'Success') {
        setReport(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-container">
      <h1>Reporte Diario</h1>
      <button onClick={fetchReport} disabled={loading}>
        {loading ? 'Generando reporte...' : 'Generar Reporte Diario'}
      </button>
      {loading && (
        <div>
          <h2>Cargando reporte...</h2>
        </div>
      )}
      {error && (
        <div>
          <h2>Error al cargar el reporte</h2>
          <p>{error}</p>
        </div>
      )}
      {!loading && !error && (
        <>
          <h2>Platos Vendidos</h2>
          <table>
            <thead>
              <tr>
                <th>Plato</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {report.dishesSold.length > 0 ? (
                report.dishesSold.map((dish, index) => (
                  <tr key={index}>
                    <td>{dish.dish.nombre}</td>
                    <td>{dish.quantity}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No hay datos disponibles</td>
                </tr>
              )}
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
              {report.ingredientsUsed.length > 0 ? (
                report.ingredientsUsed.map((ingredient, index) => (
                  <tr key={index}>
                    <td>{ingredient.ingredient.nombre}</td>
                    <td>{ingredient.quantity}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No hay datos disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default DailyReport;