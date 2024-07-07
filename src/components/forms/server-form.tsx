"use client";

import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import FileUpload from "~/components/file-upload";
import {
  type InferredServerSchema,
  serverSchema,
} from "~/components/schemas/server.schema";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useModalStore } from "~/store/use-modal-store";
import { api } from "~/trpc/react";

interface Props {
  // Add your component props here
}

const defaultValues: InferredServerSchema = {
  name: "",
  imageUrl: "",
};

export default function ServerForm(props: Props) {
  const { data } = useModalStore();

  const form = useForm<InferredServerSchema>({
    defaultValues: data.server ?? defaultValues,
    resolver: zodResolver(serverSchema),
  });

  const isLoading = form.formState.isSubmitting;

  const { mutate: createServer } = api.server.create.useMutation({});
  const { mutate: updateServer } = api.server.update.useMutation({});

  const onSubmit = async (formData: InferredServerSchema) => {
    data.server
      ? updateServer({ ...formData, id: data.server.id })
      : createServer(formData);
  };

  return (
    <Form {...form}>
      <form
        id="server-form"
        name="server-form"
        className="space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem className="flex justify-center">
              <FormControl>
                <FileUpload
                  value={field.value}
                  endpoint="serverImage"
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-bold">TÊN MÁY CHỦ</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isLoading}
                  placeholder="Nhập tên máy chủ"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
