import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import React from "react";
import { UseFormRegisterReturn, UseFormReturn } from "react-hook-form";

type FormValues = {
  title: string;
  file: FileList;
};

interface FileUploadFormProps {
  form: UseFormReturn<FormValues>;
  fileRef: UseFormRegisterReturn<"file">;
  onSubmit: (values: FormValues) => void;
}

const FileUploadForm: React.FC<FileUploadFormProps> = ({
  form,
  fileRef,
  onSubmit,
}) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">Title</FormLabel>
              <FormControl>
                <Input {...field} className="text-black" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={() => (
            <FormItem>
              <FormLabel className="text-black">File</FormLabel>
              <FormControl>
                <Input type="file" {...fileRef} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="flex gap-1"
        >
          {form.formState.isSubmitting && (
            <Loader2 className="size-4 animate-spin" />
          )}
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default FileUploadForm;
