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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation } from "convex/react";
import { MoreVertical, TrashIcon } from "lucide-react";
import { useState } from "react";
import { api } from "../../convex/_generated/api";
import { Doc } from "../../convex/_generated/dataModel";
import { useToast } from "@/components/ui/use-toast";

const FileCardActions = ({ file }: { file: Doc<"files"> }) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const deleteFile = useMutation(api.files.deleteFile);
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
            className="flex gap-1 text-red-600 items-center cursor-pointer"
            onClick={() => setIsConfirmOpen(true)}
          >
            <TrashIcon className="size-5" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

const FileCard = ({ file }: { file: Doc<"files"> }) => {
  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle>{file.name}</CardTitle>
        <div className="absolute top-2 right-2">
          <FileCardActions file={file} />
        </div>
        {/* <CardDescription>{file.name}</CardDescription> */}
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <Button>Download</Button>
      </CardFooter>
    </Card>
  );
};

export default FileCard;
