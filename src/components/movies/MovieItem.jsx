import React from "react";
import { useNavigate } from "react-router-dom";

const MovieItem = ({ title, poster_path, release_date, genre, image, id }) => {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="w-full flex flex-col">
      <img
        className="w-full h-[300px] rounded-lg object-cover mb-3 cursor-pointer"
        src={`${import.meta.env.VITE_IMAGE_URL}${poster_path || image}`}
        alt="movie-poster"
        onClick={handleImageClick}
      />
      <h3 className="text-xl font-medium mb-2 text-slate-600 truncate">{title}</h3>
      {genre && <p className="text-sm font-medium text-gray-400 mb-2">{genre}</p>}
      <p className="text-slate-600 text-[14px] font-bold">{release_date}</p>
    </div>
  );
};

export default MovieItem;
