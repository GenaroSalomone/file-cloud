import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation } from "convex/react";
import { MoreVertical, StarHalf, StarIcon, TrashIcon } from "lucide-react";
import { ReactNode, useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import { useToast } from "@/components/ui/use-toast";
import ImageIcon from "../../icons/imageIcon";
import PdfIcon from "../../icons/pdfIcon";
import CsvIcon from "../../icons/csvIcon";
import StarFilled from "../../icons/starFilled";

import { fileTypes } from "../../../../convex/schema";
import { Protect } from "@clerk/nextjs";

const FileCardActions = ({
  file,
  isFavorited,
}: {
  file: Doc<"files">;
  isFavorited: boolean;
}) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const deleteFile = useMutation(api.files.deleteFile);
  const toggleFavorite = useMutation(api.files.toggleFavorite);
  const { toast } = useToast();

  return (
    <>
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteFile({ fileId: file._id });
                toast({
                  variant: "destructive",
                  title: "File Deleted",
                  description: "Your file is now gone from the system",
                });
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="flex gap-1 items-center cursor-pointer"
            onClick={() =>
              toggleFavorite({
                fileId: file._id,
              })
            }
          >
            {isFavorited ? (
              <div className="flex gap-1 items-center">
                <StarFilled size={20} /> Unfavorite
              </div>
            ) : (
              <div className="flex gap-1 items-center">
                <StarIcon className="size-5" />
                Favorite
              </div>
            )}
          </DropdownMenuItem>
          {/* <Protect role="org:admin" fallback={<></>}> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex gap-1 text-red-600 items-center cursor-pointer"
              onClick={() => setIsConfirmOpen(true)}
            >
              <TrashIcon className="size-5" />
              Delete
            </DropdownMenuItem>
          {/* </Protect> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

function getFileUrl(fileId: Id<"_storage">): string {
  return `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${fileId}`;
}

const FileCard = ({
  file,
  favorites,
}: {
  file: Doc<"files">;
  favorites: Doc<"favorites">[];
}) => {
  const typesIcons = {
    image: <ImageIcon size={40} />,
    pdf: <PdfIcon size={40} />,
    csv: <CsvIcon size={40} />,
  } as Record<Doc<"files">["type"], ReactNode>;

  const isFavorited = favorites.some(
    (favorite) => favorite.fileId === file._id
  );

  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle className="flex gap-2">
          <div className="flex justify-center items-center">
            {typesIcons[file.type]}
          </div>
          <span className="mt-1">{file.name}</span>
        </CardTitle>
        <div className="absolute top-2 right-2">
          <FileCardActions isFavorited={isFavorited} file={file} />
        </div>

        {/* <CardDescription>{file.name}</CardDescription> */}
      </CardHeader>
      <CardContent className="h-[200px] flex justify-center items-center">
        {file.type === "image" && (
          <img
            alt={file.name}
            height="90px"
            width="170px"
            src={getFileUrl(file.fileId)}
            className="object-cover"
          />
        )}
        {file.type === "csv" && <CsvIcon size={100} />}
        {file.type === "pdf" && <PdfIcon size={100} />}
      </CardContent>
      <CardFooter className="flex justify-center items-center">
        <Button
          onClick={() => {
            window.open(getFileUrl(file.fileId), "_blank");
          }}
        >
          Download
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FileCard;
