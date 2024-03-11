"use client";

import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import FileCard from "./FileCard";
import { UploadButton } from "./UploadButton";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { isLoaded: orgLoaded, organization } = useOrganization();
  const { isLoaded: userLoaded, user } = useUser();

  const orgId =
    orgLoaded && userLoaded ? organization?.id ?? user?.id : undefined;

  const files = useQuery(api.files.getFiles, orgId ? { orgId } : "skip");
  //TODO: Add SSR
  const isLoading = files === undefined;

  return (
    <main role="main" className="container mx-auto pt-12">
      {isLoading && (
        <section className="flex flex-col gap-8 items-center mt-24">
          <Loader2 className="size-32 animate-spin text-gray-500" />
          <h2 className="text-2xl ">Loading your images... </h2>
        </section>
      )}
      {files && files.length === 0 && (
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
      )}
      {files && files.length > 0 && (
        <section className="flex justify-between items-center mb-8">
          <h1 id="files" className="text-4xl font-bold">
            Your Files
          </h1>
          <UploadButton />
        </section>
      )}
      <div className="grid grid-cols-4 gap-4 mx-auto">
        {files?.map((file) => {
          return <FileCard key={file._id} file={file}></FileCard>;
        })}
      </div>
    </main>
  );
}
