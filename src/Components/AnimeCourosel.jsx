// AnimeCarousel.jsx
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const AnimeCarousel = () => {
  const [animeList, setAnimeList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetch("https://api.jikan.moe/v4/top/anime")
      .then((res) => res.json())
      .then((data) => setAnimeList(data.data.slice(0, 5))); // Ambil 5 anime teratas
  }, []);

  const handleSearch = (query) => {
    fetch(`https://api.jikan.moe/v4/anime?q=${query}`)
      .then((res) => res.json())
      .then((data) => setSearchResults(data.data.slice(0, 5))); // Ambil 5 hasil
  };

  return (
    <div className="relative w-full h-screen">
      {/* Navbar */}
      <Navbar onSearch={handleSearch} />

      {/* Swiper Carousel */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        className="w-full h-full"
      >
        {animeList.map((anime) => (
          <SwiperSlide key={anime.mal_id} className="relative flex items-center justify-center flex-col md:flex-row">
            {/* Background Blur */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-100 blur-sm"
              style={{ backgroundImage: `url(${anime.images.jpg.large_image_url})` }}
            ></div>

            {/* Container Utama */}
            <div className="relative z-10 flex flex-col md:flex-row h-full w-full items-center px-5 md:px-20 bg-gradient-to-r from-gray-900/90 via-gray-900/50 to-transparent">
              {/* Text Anime */}
              <div className="w-full mt-10 sm:mt-0 md:w-1/2 text-white text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold">{anime.title}</h1>
                <p className="mt-3 text-sm md:text-base">{anime.synopsis?.substring(0, 150)}...</p>

                <div className="mt-5 flex gap-2 flex-wrap justify-center md:justify-start">
                  {anime.genres.map((genre) => (
                    <span key={genre.mal_id} className="px-3 py-1 text-sm bg-gray-700 rounded-lg">
                      {genre.name}
                    </span>
                  ))}
                </div>

                <Link to={`/anime/${anime.mal_id}`}>
                  <button className="cursor-pointer mt-5 px-5 py-2 bg-blue-500 font-semibold md:text-xl text-white rounded-sm shadow-lg hover:bg-blue-600 justify-center items-center">
                  <i className="ai-play fill-current  brightness-0 invert text-white mr-2 md:text-xl"></i>
                     Watch Now
                  </button>
                </Link>
              </div>

              {/* Gambar Anime */}
              <Link to={`/anime/${anime.mal_id}`} className="w-full md:w-1/2 flex justify-center mt-5 md:mt-0">
                <img
                  src={anime.images.jpg.large_image_url}
                  alt={anime.title}
                  className="max-h-[400px] md:max-h-[600px] mt-5 sm:mt-0 object-contain drop-shadow-2xl rounded-xl cursor-pointer"
                />
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Hasil Pencarian */}
      {searchResults.length > 0 && (
        <div className="absolute top-[70px] left-1/2 transform -translate-x-1/2 bg-gray-900 text-white rounded-lg p-4 w-[300px] max-h-[300px] overflow-auto z-50 shadow-xl border border-blue-600">
          <h3 className="text-lg font-bold mb-2 text-center text-blue-400">Hasil Pencarian:</h3>
          {searchResults.map((anime) => (
            <Link
              key={anime.mal_id}
              to={`/anime/${anime.mal_id}`}
              className="block p-3 mb-2 rounded-md hover:bg-gray-700 transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg"
            >
              <p className="font-semibold">{anime.title}</p>
              <p className="text-sm text-gray-400">{anime.synopsis?.substring(0, 80)}...</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnimeCarousel;
