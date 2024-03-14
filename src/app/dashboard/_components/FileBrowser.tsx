"use client";

import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { GridIcon, Loader2, RowsIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { columns } from "./Columns";
import FileCard from "./FileCard";
import { DataTable } from "./FileTable";
import SearchBar from "./SearchBar";
import { UploadButton } from "./UploadButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Doc } from "../../../../convex/_generated/dataModel";
import { Label } from "@/components/ui/label";

function Placeholder() {
  return (
    <section className="flex flex-col gap-8 items-center mt-24">
      <Image
        alt="an image of a picture and directory icon"
        width="300"
        height="300"
        src="/empty.svg"
      />
      <h2 className="text-2xl">You have no files, upload one now</h2>
      <UploadButton />
    </section>
  );
}
export default function FileBrowser({
  title,
  favoritesOnly,
  deletedOnly,
}: {
  title: string;
  favoritesOnly?: boolean;
  deletedOnly?: boolean;
}) {
  const { isLoaded: orgLoaded, organization } = useOrganization();
  const { isLoaded: userLoaded, user } = useUser();
  const [query, setQuery] = useState("");
  const [type, setType] = useState<Doc<"files">["type"] | "all">("all");

  const orgId =
    orgLoaded && userLoaded ? organization?.id ?? user?.id : undefined;

  const favorites = useQuery(
    api.files.getAllFavorites,
    orgId ? { orgId } : "skip"
  );

  const files = useQuery(
    api.files.getFiles,
    orgId
      ? {
          orgId,
          type: type === "all" ? undefined : type,
          query,
          favorites: favoritesOnly,
          deletedOnly,
        }
      : "skip"
  );

  //TODO: Add SSR
  const isLoading = files === undefined;

  const modifiedFiles =
    files?.map((file) => ({
      ...file,
      isFavorited: (favorites ?? []).some(
        (favorite) => favorite.fileId === file._id
      ),
    })) ?? [];

  return (
    <div>
      <section className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">{title}</h1>
        <SearchBar query={query} setQuery={setQuery} />
        <UploadButton />
      </section>

      <Tabs defaultValue="grid">
        <div className="flex justify-between items-center">
          <TabsList className="mb-4">
            <TabsTrigger value="grid" className="flex gap-2 items-center">
              <GridIcon />
              Grid
            </TabsTrigger>
            <TabsTrigger value="table" className="flex gap-2 items-center">
              <RowsIcon />
              Table
            </TabsTrigger>
          </TabsList>
          <div className="flex gap-2 items-center">
            <Label htmlFor="type-select">Type Filter</Label>
            <Select
              value={type}
              onValueChange={(newType) => {
                setType(newType as any);
              }}
            >
              <SelectTrigger
                id="type-select"
                className="w-[180px]"
                defaultValue={"all"}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {isLoading && (
          <section className="flex flex-col gap-8 items-center mt-24">
            <Loader2 className="size-32 animate-spin text-gray-500" />
            <h2 className="text-2xl ">Loading your files... </h2>
          </section>
        )}
        <TabsContent value="grid">
          <div className="grid grid-cols-3 gap-4 mx-auto">
            {modifiedFiles?.map((file) => {
              return <FileCard key={file._id} file={file}></FileCard>;
            })}
          </div>
        </TabsContent>
        <TabsContent value="table">
          <DataTable columns={columns} data={modifiedFiles} />
        </TabsContent>
      </Tabs>

      {files?.length === 0 && <Placeholder />}
    </div>
  );
}
