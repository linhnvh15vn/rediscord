import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";

export const ROLE_ICON = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="size-4 text-indigo-500" />,
  ADMIN: <ShieldAlert className="size-4 text-destructive" />,
};

export const CHANNEL_ICON = {
  TEXT: <Hash className="size-4" />,
  VOICE: <Mic className="size-4" />,
  VIDEO: <Video className="size-4" />,
};

export const DATE_FORMAT = "d MMM yyy, HH:mm";
