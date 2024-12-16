import React, { useState, useEffect } from "react";
import {
  getDailyReport,
  getSalesByDateRange,
} from "@services/report.service.js";
import "@styles/dailyReport.css";
import { mayusLetter } from "../utils";
import { PieChart } from "@mui/x-charts/PieChart";

const DailyReport = () => {
  const [report, setReport] = useState({ dishesSold: [], ingredientsUsed: [] });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchDailyReport = async () => {
      try {
        const data = await getDailyReport();
        if (data.status === "Success") {
          setReport(data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchDailyReport();
  }, []);

  const fetchReportByDateRange = async () => {
    try {
      const data = await getSalesByDateRange(startDate, endDate);
      if (data.status === "Success") {
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

  const pieChartData = report.dishesSold.map(({ dish, quantity }) => ({
    id: dish.id,
    label: dish.nombre,
    value: quantity,
  }));

  // Calcula el total de ventas
  const totalSales = report.dishesSold.reduce((acc, { totalPrice }) => acc + totalPrice, 0);

  return (
    <div className="report-container">
      <h1>Reporte de Ventas</h1>

      <form className="report-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="startDate">Fecha de Inicio:</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">Fecha de Fin:</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group button-group">
            <button type="submit">Generar Reporte</button>
          </div>
        </div>
      </form>

      {pieChartData.length > 0 ? (
<<<<<<< HEAD
        <div className="chart-and-total">
          <PieChart
            series={[
              {
                data: pieChartData,
                innerRadius: 27,
                outerRadius: 100,
                paddingAngle: 5,
                cornerRadius: 6,
                startAngle: -110,
                endAngle: 253,
                cx: 150,
                cy: 150,
              },
            ]}
            slotProps={{
              legend: {
                labelStyle: {
                  fontWeight: 600,
                },
              },
            }}
            width={500}
            height={300}
          />
          <div className="total-sales">
            <h3>Total de Ventas</h3>
            <p className="total-amount">${totalSales.toFixed(2)}</p>
          </div>
        </div>
=======
        <PieChart
          series={[
            {
              data: pieChartData,
              innerRadius: 27,
              outerRadius: 100,
              paddingAngle: 5,
              cornerRadius: 6,
              startAngle: -110,
              endAngle: 253,
              cx: 150,
              cy: 150,
            },
          ]}
          slotProps={{
            legend: {
              labelStyle: {
                fontWeight: 600,
              },
            },
          }}
          width={500}
          height={300}
        />
>>>>>>> e78c2b490d96e34eb00bb1c3004b9076bcb54531
      ) : (
        <p>No hay datos para mostrar en el gráfico</p>
      )}

      <h2>Platos Vendidos</h2>
      <table>
        <thead>
          <tr>
            <th>Plato</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Precio Total</th>
          </tr>
        </thead>
        <tbody>
          {report.dishesSold.map(({ dish, quantity, totalPrice }, index) => (
            <tr key={index}>
              <td>{mayusLetter(dish.nombre)}</td>
              <td>{quantity}</td>
              <td>${dish.precio.toFixed(2)}</td>
              <td>${totalPrice.toFixed(2)}</td>
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
              <td>{mayusLetter(ingredient.nombre)}</td>
              <td>{quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DailyReport;
