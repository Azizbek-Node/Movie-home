import React, { useEffect, useState } from 'react';
import './loading.css';
import { request } from '@/api';
import Movies from '../movies/Movies';

const Saved = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    request('/discover/movie')
      .then((res) => {
        setData(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loader-container flex flex-col items-center justify-center min-h-[585px]">
        <span className="loader"></span>
        <p className="text-2xl mt-4">Загрузка...</p>
      </div>
    );
  }

  if (!data) {
    return <p className="text-red-500 text-2xl">Нет данных для отображения.</p>;
  }

  return (
    <div className="container min-h-[585px] flex items-center justify-center">
      <div className="w-full max-w-[1200px]">
        <Movies data={data} />
      </div>
    </div>
  );
};

export default Saved;
