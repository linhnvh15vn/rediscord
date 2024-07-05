"use client";

import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import FileUpload from "~/components/file-upload";
import { schema } from "~/components/schemas/server.schema";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";

interface Props {
  // Add your component props here
}

const defaultValues: z.infer<typeof schema> = {
  name: "",
  imageUrl: "",
};

export default function ServerForm(props: Props) {
  const form = useForm<z.infer<typeof schema>>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const isLoading = form.formState.isSubmitting;

  const { mutate: createServer } = api.server.create.useMutation({});

  const onSubmit = async (data: z.infer<typeof schema>) => {
    createServer(data);
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
