import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "convex/react";
import { formatRelative } from "date-fns";
import { ReactNode } from "react";
import { api } from "../../../../convex/_generated/api";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import CsvIcon from "../../icons/csvIcon";
import ImageIcon from "../../icons/imageIcon";
import PdfIcon from "../../icons/pdfIcon";
import { FileCardActions } from "./FileActions";

const FileCard = ({
  file,
}: {
  file: Doc<"files"> & { isFavorited: boolean };
}) => {
  const userProfile = useQuery(api.users.getUserProfile, {
    userId: file.userId,
  });

  const typesIcons = {
    image: <ImageIcon size={40} />,
    pdf: <PdfIcon size={40} />,
    csv: <CsvIcon size={40} />,
  } as Record<Doc<"files">["type"], ReactNode>;

  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle className="flex gap-2 text-base font-normal">
          <div className="flex justify-center items-center ">
            {typesIcons[file.type]}
          </div>
          <span className="mt-1">{file.name}</span>
        </CardTitle>
        <div className="absolute top-2 right-2">
          <FileCardActions isFavorited={file.isFavorited} file={file} />
        </div>

        {/* <CardDescription>{file.name}</CardDescription> */}
      </CardHeader>
      <CardContent className="h-[200px] flex justify-center items-center">
        {file.type === "image" && (
          <img
            alt={file.name}
            height="90px"
            width="170px"
            src={file.url}
            className="object-cover"
          />
        )}
        {file.type === "csv" && <CsvIcon size={100} />}
        {file.type === "pdf" && <PdfIcon size={100} />}
      </CardContent>
      <CardFooter className="flex justify-between ">
        <div className="flex items-center gap-2 text-xs text-gray-700 w-60 ">
          <Avatar className="size-6">
            <AvatarImage src={userProfile?.image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {userProfile?.name}
        </div>
        <div className="text-xs text-gray-700">
          Uploaded on {formatRelative(new Date(file._creationTime), new Date())}
        </div>
      </CardFooter>
    </Card>
  );
};

export default FileCard;
