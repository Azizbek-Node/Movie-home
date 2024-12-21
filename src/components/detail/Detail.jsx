import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/movie/${id}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_BASE_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setMovie(data);
        setLoading(false);
      } catch (error) {
        console.error("Xato yuz berdi:", error);
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10">Yuklanmoqda...</p>;
  }

  if (!movie) {
    return <p className="text-center mt-10">Ma'lumot topilmadi!</p>;
  }

  return (
    <div className="container mx-auto my-10">
      <div className="relative w-full rounded-lg overflow-hidden">
        {/* Rasm */}
        <img
          src={`${import.meta.env.VITE_IMAGE_URL}${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-[500px] object-cover"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-black/60 via-transparent to-transparent text-white p-5">
          <p className="text-lg font-semibold">
            {movie.original_language?.toUpperCase()}
          </p>
          <p className="text-lg font-semibold mt-2">Release Date: {movie.release_date}</p>
          <button
          onClick={() =>
            window.open(
              `https://www.youtube.com/results?search_query=${movie.title} trailer`,
              "_blank"
            )
          }
          className="mt-5 px-6 py-3 bg-red-600 text-white text-lg rounded-lg hover:bg-red-700"
        >
          Treylerni ko‘rish
        </button>
        </div>
      </div>

      {/* Malumotlar */}
      <div className="mt-10">
        <h1 className="text-4xl font-bold">{movie.title}</h1>
        <p className="text-lg font-semibold mt-5">Rating: {movie.vote_average}</p>
        <p className="mt-5">{movie.overview}</p>
        <div className="mt-5">
          <h3 className="text-2xl font-bold">Janrlar:</h3>
          <ul className="flex gap-2 mt-3">
            {movie.genres?.map((genre) => (
              <li
                key={genre.id}
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md"
              >
                {genre.name}
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() =>
            window.open(
              `https://www.youtube.com/results?search_query=${movie.title} trailer`,
              "_blank"
            )
          }
          className="mt-5 px-6 py-3 bg-red-600 text-white text-lg rounded-lg hover:bg-red-700"
        >
          Treylerni ko‘rish
        </button>
      </div>
    </div>
  );
};

export default Detail;
