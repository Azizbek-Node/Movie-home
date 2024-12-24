import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { request } from "../../api";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import './loading.css';
import Movies from "../movies/Movies";
import { useStateValue } from "../context";

const Details = () => {
  const { id } = useParams();
  const [isSaved, setIsSaved] = useState(false);
  const { setWishlist, wishlist, setCount } = useStateValue();

  const handleBookmark = (movie) => {
    const isInWishlist = wishlist.some((item) => item.id === movie.id);
    if (isInWishlist) {
      setWishlist((prev) => prev.filter((item) => item.id !== movie.id));
      setCount((prev) => prev - 1);
      setIsSaved(false);
    } else {
      setWishlist((prev) => [...prev, movie]);
      setCount((prev) => prev + 1);
      setIsSaved(true);
    }
  };

  const fetchMovieDetails = async () => {
    const [movieRes, similarRes, creditsRes] = await Promise.all([
      request.get(`/movie/${id}`),
      request.get(`/movie/${id}/similar`),
      request.get(`/movie/${id}/credits`),
    ]);
    return {
      movie: movieRes.data,
      similar: similarRes.data.results,
      credits: creditsRes.data,
    };
  };

  const { data, isLoading, error } = useQuery(["movieDetails", id], fetchMovieDetails);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Wishlistda ushbu film mavjudligini tekshirish
    if (data?.movie) {
      setIsSaved(wishlist.some((item) => item.id === data.movie.id));
    }
  }, [data, wishlist]);

  if (isLoading) {
    return (
      <div className="loader-container flex flex-col items-center justify-center min-h-[585px]">
        <span className="loader"></span>
        <p className="text-2xl mt-4">Загрузка...</p>
      </div>
    );
  }

  if (error) return <div>Ошибка: {error.message}</div>;

  const { movie, similar, credits } = data;

  const translatedData = {
    countries: movie.production_countries.map((country) => country.name),
    genres: movie.genres.map((genre) => genre.name),
    jobs: credits.crew
      .filter((member) => member.job === "Director")
      .map((member) => member.name),
    casts: credits.cast.slice(0, 5).map((member) => ({
      character: member.character,
      name: member.name,
    })),
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}ч ${remainingMinutes}м / ${minutes} минут`;
  };

  return (
    <div className="bg-black text-white">
      <div className="flex flex-col items-center">
        <div className="w-full max-w-[1360px] h-[640px] relative">
          <img
            className="w-full h-full object-cover rounded-xl shadow-lg"
            src={`${import.meta.env.VITE_IMAGE_URL}${movie?.backdrop_path}`}
            alt={movie?.title || "Постер"}
          />
          <div
            onClick={() => handleBookmark(movie)}
            className="absolute top-4 right-4 bg-opacity-75 bg-black text-white p-2 rounded-full hover:bg-blue-700 cursor-pointer"
          >
            {isSaved ? (
              <IoBookmark size={24} />
            ) : (
              <IoBookmarkOutline size={24} />
            )}
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{movie?.title}</h1>
            <p className="text-sm md:text-lg mb-6">
              {new Date(movie?.release_date).getFullYear()} •{" "}
              {translatedData.genres.slice(0, 2).join(", ")} • {formatTime(movie?.runtime)}
            </p>
            <button className="bg-green-600 hover:bg-violet-900 text-white py-3 px-16 rounded-md shadow-lg">
              Купить билет
            </button>
          </div>
        </div>

        <div className="detail-list w-full max-w-[450px] mt-12 mb-10 flex flex-wrap flex-col">
          <div className="grid grid-cols-2 gap-4">
            <button className="bg-[#111111] py-4 border px-2 rounded-lg font-semibold hover:bg-violet-900 transition">
              Билеты
            </button>
            <button className="bg-[#1D1D1D] border py-4 px-2 rounded-lg font-semibold hover:bg-teal-600 transition">
              О фильме
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-12">
            <button className="border border-gray-700 px-4 py-2 rounded-xl text-xl font-bold">
              {((movie?.vote_average / 100) * 90).toFixed(1)}
            </button>
            <button className="border border-gray-700 px-4 py-2 rounded-xl text-xl font-bold">
              {movie?.vote_average?.toFixed(1)}+
            </button>
          </div>

          <div className="border-b pb-8 border-gray-800">
            <h3 className="mt-12 text-xl">Детали</h3>
            <div className="mt-6 flex justify-between">
              <p>Продолжительность</p>
              <p>{formatTime(movie?.runtime)}</p>
            </div>
            <div className="mt-4 flex justify-between">
              <p>Премьера</p>
              <p>{new Date(movie?.release_date).toLocaleDateString()}</p>
            </div>
            <div className="mt-4 flex justify-between">
              <p>Производство</p>
              <p>{translatedData.countries.join(", ")}</p>
            </div>
            <div className="mt-4 flex justify-between">
              <p>Жанр</p>
              <p>{translatedData.genres.slice(0, 2).join(", ")}</p>
            </div>
            <div className="mt-4 flex justify-between">
              <p>Режиссер</p>
              <p>{translatedData.jobs.length > 0 ? translatedData.jobs.join(", ") : "Неизвестно"}</p>
            </div>
          </div>

          <div className="pb-6">
            <h3 className="mt-12 text-xl">Сюжет</h3>
            <p className="mt-6 text-gray-400 leading-relaxed">{movie?.overview}</p>
          </div>

          <button
            onClick={() =>
              window.open(
                `https://www.youtube.com/results?search_query=${movie.title} трейлер`,
                "_blank"
              )
            }
            className="mt-5 px-6 py-3 bg-red-600 text-white text-lg rounded-lg hover:bg-red-700"
          >
            Смотреть трейлер
          </button>
          <div>
            <Movies data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
