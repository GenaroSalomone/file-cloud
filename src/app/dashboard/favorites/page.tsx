"use client";
import FileBrowser from "../_components/FileBrowser";

const FavoritesPage = () => {
  return (
    <div>
      <FileBrowser title="Favorites" favoritesOnly />
    </div>
  );
};

export default FavoritesPage;
