import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { ReactTyped } from "react-typed";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../../api";
import Movies from "../../components/movies/Movies";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get("q") || "");
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ["movie", searchValue],
    queryFn: () =>
      request
        .get("/search/movie", {
          params: { query: searchValue },
        })
        .then((res) => res.data),
    enabled: !!searchValue,
  });

  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    if (searchValue) {
      setDebounceTimeout(
        setTimeout(() => {
          setSearchParams({ q: searchValue });
          queryClient.invalidateQueries(["movie"]);
        }, [])
      );
    } else {
      setSearchParams({});
      queryClient.invalidateQueries(["movie"]);
    }

    return () => clearTimeout(debounceTimeout);
  }, [searchValue, debounceTimeout, queryClient, setSearchParams]);

  const handleClear = () => {
    setSearchParams({});
    setSearchValue("");
    queryClient.invalidateQueries(["movie"]);
  };

  return (
    <div className="container h-[585px]">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="border max-w-[800px] mx-auto h-10 flex"
      >
        <ReactTyped
          strings={["Avengers", "Venom", "Avatar", "Spiderman"]}
          typeSpeed={40}
          backSpeed={50}
          attr="placeholder"
          loop
          className="flex-1"
        >
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="h-full outline-none w-full indent-3 text-black"
            type="text"
          />
        </ReactTyped>
        {searchValue.length ? (
          <button
            type="button"
            onClick={handleClear}
            className="w-10 grid place-items-center bg-red-400 text-gray-500"
          >
            <span>X</span>
          </button>
        ) : null}
        <button
          type="submit"
          className="w-10 grid place-items-center bg-blue-400 text-gray-600"
        >
          <CiSearch />
        </button>
      </form>

      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {!isLoading && !error && <Movies data={data} />}
    </div>
  );
};

export default Search;