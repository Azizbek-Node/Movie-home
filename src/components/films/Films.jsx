import React, { useEffect, useState } from 'react';
import { request } from '@/api';
import Movies from '@/components/movies/Movies';
import Genre from '@/components/genre/Genre';
import Pagination from "@mui/material/Pagination";

const Films = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([]);

  useEffect(() => {
    setLoading(true);
    request("/discover/movie", {
      params: {
        page,
        with_genres: selectedGenre.join(","),
      },
    })
      .then((res) => {
        setData(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, selectedGenre]);

  useEffect(() => {
    request("/genre/movie/list").then((res) => {
      setGenres(res.data.genres);
    });
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (loading) {
    return (
      <div className="loader-container flex flex-col items-center justify-center min-h-[585px]">
        <span className="loader"></span>
        <p className="text-2xl mt-4">Загрузка...</p>
      </div>
    );
  }

  if (!data || !data.results) {
    return (
      <p className="text-red-500 text-2xl text-center mt-10">
        Нет данных для отображения.
      </p>
    );
  }

  return (
    <div className="bg-black text-white mb-6 min-h-[585px]">
      <div className="container max-w-[1200px] mx-auto">
        <Genre
          data={genres}
          setSelectedGenre={setSelectedGenre}
          selectedGenre={selectedGenre}
        />
        <Movies data={data} />
        <div className="flex justify-center py-6">
          <Pagination
            page={page}
            onChange={handlePageChange}
            count={data.total_pages <= 500 ? data.total_pages : 500}
            sx={{
              "& .MuiPaginationItem-root": {
                color: "#fff",
                backgroundColor: "#1a1a1a",
                border: "1px solid #ff4040",
                "&:hover": {
                  backgroundColor: "#ff4040",
                  color: "#fff",
                },
              },
              "& .Mui-selected": {
                backgroundColor: "#ff4040",
                color: "#fff",
                border: "1px solid #ff7373",
                "&:hover": {
                  backgroundColor: "#ff7373",
                },
              },
              "& .MuiPaginationItem-ellipsis": {
                color: "#ff7373",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Films;
