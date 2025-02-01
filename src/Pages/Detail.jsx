import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const AnimeDetail = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/anime/${id}`)
      .then((res) => res.json())
      .then((data) => setAnime(data.data));
  }, [id]);

  if (!anime) return <p className="text-center text-white">Loading...</p>;

  return (
    <div className="bg-gray-900 min-h-screen text-white py-10">
      <div className="max-w-screen-lg mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Gambar Anime */}
          <div className="w-full lg:w-1/3">
            <img
              src={anime.images.jpg.large_image_url}
              alt={anime.title}
              className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Detail Anime */}
          <div className="w-full lg:w-2/3">
            <h1 className="text-4xl font-bold mt-6 lg:mt-0">{anime.title}</h1>
            <p className="mt-3 text-lg text-gray-300">{anime.synopsis}</p>

            {/* Genre */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold">Genres:</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {anime.genres.map((genre) => (
                  <span key={genre.mal_id} className="px-4 py-2 bg-gray-700 rounded-full text-sm text-yellow-400">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Producers */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold">Producers:</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {anime.producers.map((producer) => (
                  <span key={producer.mal_id} className="px-4 py-2 bg-gray-700 rounded-full text-sm text-yellow-400">
                    {producer.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Link to Watch */}
            <div className="mt-6">
              <a
                href={anime.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
              >
                Watch Now
              </a>
            </div>
          </div>
        </div>

        {/* Video Trailer */}
        {anime.trailer && anime.trailer.url && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">Watch the Trailer:</h2>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                width="100%"
                height="500"
                src={`https://www.youtube.com/embed/${anime.trailer.youtube_id}`}
                title="Anime Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg shadow-lg"
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimeDetail;
