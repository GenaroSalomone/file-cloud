"use client";

import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";

import Image from "next/image";
import { FileIcon, Loader2, StarIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { api } from "../../../../convex/_generated/api";
import { UploadButton } from "./UploadButton";
import FileCard from "./FileCard";
import SearchBar from "./SearchBar";

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
export default function FileBrowser({ title }: { title: string }) {
  const { isLoaded: orgLoaded, organization } = useOrganization();
  const { isLoaded: userLoaded, user } = useUser();
  const [query, setQuery] = useState("");

  const orgId =
    orgLoaded && userLoaded ? organization?.id ?? user?.id : undefined;

  const files = useQuery(api.files.getFiles, orgId ? { orgId, query } : "skip");
  //TODO: Add SSR
  const isLoading = files === undefined;

  return (
    <div>
      {isLoading && (
        <section className="flex flex-col gap-8 items-center mt-24">
          <Loader2 className="size-32 animate-spin text-gray-500" />
          <h2 className="text-2xl ">Loading your images... </h2>
        </section>
      )}
      {!isLoading && (
        <>
          <section className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">{title}</h1>
            <SearchBar query={query} setQuery={setQuery} />
            <UploadButton />
          </section>

          {files.length === 0 && <Placeholder />}
          <div className="grid grid-cols-3 gap-4 mx-auto">
            {files?.map((file) => {
              return <FileCard key={file._id} file={file}></FileCard>;
            })}
          </div>
        </>
      )}
    </div>
  );
}
