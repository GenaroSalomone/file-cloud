"use client";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import FileBrowser from "../_components/FileBrowser";

const FavoritesPage = () => {

  return (
    <div>
      <FileBrowser title="Favorites Files" favoritesOnly/>
    </div>
  );
};

export default FavoritesPage;
