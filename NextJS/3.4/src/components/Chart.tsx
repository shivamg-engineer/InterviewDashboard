import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface DataPoint {
  name: string;
  value: number;
}

export default function Chart() {
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API delay (2-3 seconds)
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 2500)); // 2.5s delay
      const fakeData: DataPoint[] = [
        { name: 'Jan', value: 400 },
        { name: 'Feb', value: 300 },
        { name: 'Mar', value: 500 },
        { name: 'Apr', value: 280 },
        { name: 'May', value: 600 },
        { name: 'Jun', value: 700 },
      ];
      setData(fakeData);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <div style={{ fontSize: '16px', color: '#666' }}>Heavy chart data loading...</div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: 400, padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h3 style={{ marginTop: 0, marginBottom: '20px' }}>Sales Analytics</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

