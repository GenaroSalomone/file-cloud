"use client";
import FileBrowser from "../_components/FileBrowser";

const FavoritesPage = () => {
  return (
    <div>
      <FileBrowser title="Trash" deletedOnly />
    </div>
  );
};

export default FavoritesPage;
