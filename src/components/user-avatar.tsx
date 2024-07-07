import React, { type HTMLAttributes } from "react";

import { Avatar, AvatarImage } from "~/components/ui/avatar";
import { cn } from "~/lib/utils";

interface Props extends HTMLAttributes<HTMLDivElement> {
  src?: string;
}

export default function UserAvatar({ src, className, ...props }: Props) {
  return (
    <Avatar className={cn("size-7 md:size-10", className)} {...props}>
      <AvatarImage src={src} />
    </Avatar>
  );
}
