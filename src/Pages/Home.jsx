// Home.jsx
import { useEffect, useState } from "react";
import { getAnimeList } from "../Services/Api";
import { Link } from "react-router-dom";
import AnimeCarousel from "../Components/AnimeCourosel";
import './Home.css';
import Footer from "./Footer";

function Home() {
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAnimeList();
      setAnimeList(data);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col">
      {/* Anime Carousel */}
      {animeList.length > 0 && <AnimeCarousel animeList={animeList.slice(0, 5)} />}

      {/* Title Section */}
      <h1 className="text-3xl pt-40 font-bold mb-6 text-center">Daftar Anime</h1>

      {/* Anime List Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 pt-10">
        {animeList.map((anime) => (
          <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id} className="group">
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105">
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="object-cover w-full h-full transition-all duration-300 img-desktop"
              />
              <h3 className="text-center text-lg font-semibold p-3 group-hover:text-blue-500">
                {anime.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default Home;
