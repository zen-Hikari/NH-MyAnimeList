const BASE_URL = "https://api.jikan.moe/v4"; // API MyAnimeList

export const getAnimeList = async () => {
  const res = await fetch(`${BASE_URL}/top/anime`);
  const data = await res.json();
  return data.data;
};

export const getAnimeDetail = async (id) => {
  const res = await fetch(`${BASE_URL}/anime/${id}`);
  const data = await res.json();
  return data.data;
};
