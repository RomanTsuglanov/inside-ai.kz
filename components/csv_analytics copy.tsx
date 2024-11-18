import React, { useState } from 'react';
import { Upload, FileType, BarChart, LineChart } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart as RechartsLineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Тип для структуры данных CSV
type CSVData = {
  [key: string]: string | number;
}[];

// Цвета для графиков
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const CSVAnalytics = () => {
  const [data, setData] = useState<CSVData>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [summary, setSummary] = useState<{[key: string]: number}>({});
  const [error, setError] = useState<string>("");
  const [numericColumns, setNumericColumns] = useState<string[]>([]);
  const [selectedMetric, setSelectedMetric] = useState<string>("");

  // Функция для парсинга CSV
  const parseCSV = (text: string) => {
    try {
      const lines = text.split('\n');
      const headers = lines[0].split(',').map(header => header.trim());
      setHeaders(headers);

      const parsedData = lines.slice(1).map(line => {
        const values = line.split(',');
        const row: {[key: string]: string | number} = {};
        headers.forEach((header, index) => {
          const value = values[index]?.trim();
          row[header] = isNaN(Number(value)) ? value : Number(value);
        });
        return row;
      }).filter(row => Object.keys(row).length > 0);

      // Определяем числовые колонки
      const numericCols = headers.filter(header => 
        parsedData.some(row => typeof row[header] === 'number')
      );
      setNumericColumns(numericCols);
      if (numericCols.length > 0) {
        setSelectedMetric(numericCols[0]);
      }

      setData(parsedData);
      calculateSummary(parsedData, headers);
    } catch (e) {
      setError("Ошибка при парсинге CSV файла. Проверьте формат файла.");
    }
  };

  // Расчет базовой статистики
  const calculateSummary = (data: CSVData, headers: string[]) => {
    const summary: {[key: string]: number} = {};
    
    headers.forEach(header => {
      const values = data.map(row => row[header]).filter(val => typeof val === 'number') as number[];
      if (values.length > 0) {
        summary[`${header}_avg`] = values.reduce((a, b) => a + b, 0) / values.length;
        summary[`${header}_max`] = Math.max(...values);
        summary[`${header}_min`] = Math.min(...values);
      }
    });

    setSummary(summary);
  };

  // Подготовка данных для графика распределения
  const prepareDistributionData = () => {
    if (!selectedMetric) return [];
    
    const values = data.map(row => Number(row[selectedMetric]));
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min;
    const bucketSize = range / 5;
    
    const distribution = Array(5).fill(0).map((_, i) => ({
      range: `${(min + i * bucketSize).toFixed(1)}-${(min + (i + 1) * bucketSize).toFixed(1)}`,
      count: values.filter(v => v >= min + i * bucketSize && v < min + (i + 1) * bucketSize).length
    }));

    return distribution;
  };

  // Подготовка данных для линейного графика
  const prepareTimeSeriesData = () => {
    if (!selectedMetric) return [];
    return data.slice(0, 10).map((row, index) => ({
      name: index + 1,
      value: Number(row[selectedMetric])
    }));
  };

  // Обработчик загрузки файла
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        parseCSV(text);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      {/* Секция загрузки */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Загрузка CSV файла
          </CardTitle>
          <CardDescription>
            Загрузите CSV файл для анализа данных
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-zinc-50">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FileType className="w-8 h-8 mb-2 text-zinc-500" />
                <p className="mb-2 text-sm text-zinc-500">
                  <span className="font-semibold">Нажмите для загрузки</span> или перетащите файл
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept=".csv"
                onChange={handleFileUpload}
              />
            </label>
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-500">{error}</p>
          )}
        </CardContent>
      </Card>

      {/* Секция аналитики и графиков */}
      {data.length > 0 && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="w-5 h-5" />
                Аналитика данных
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Выберите метрику для анализа:
                </label>
                <select
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  {numericColumns.map(column => (
                    <option key={column} value={column}>{column}</option>
                  ))}
                </select>
              </div>

              {/* Графики */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                {/* Линейный график */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <LineChart className="w-4 h-4" />
                      Тренд
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsLineChart data={prepareTimeSeriesData()}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#8884d8"
                            name={selectedMetric}
                          />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Гистограмма распределения */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <BarChart className="w-4 h-4" />
                      Распределение
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsBarChart data={prepareDistributionData()}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="range" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="count" fill="#8884d8" name="Количество" />
                        </RechartsBarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Таблица с данными */}
              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full divide-y divide-zinc-200">
                  <thead>
                    <tr>
                      {headers.map((header) => (
                        <th
                          key={header}
                          className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    {data.slice(0, 5).map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {headers.map((header) => (
                          <td
                            key={`${rowIndex}-${header}`}
                            className="px-6 py-4 whitespace-nowrap text-sm"
                          >
                            {row[header]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {data.length > 5 && (
                  <p className="mt-2 text-sm text-zinc-500 text-center">
                    Показаны первые 5 записей из {data.length}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default CSVAnalytics;