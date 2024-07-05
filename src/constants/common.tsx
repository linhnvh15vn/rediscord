import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";

export const ROLE_ICON = {
  GUEST: null,
  MODERATOR: <ShieldCheck />,
  ADMIN: <ShieldAlert className="text-destructive" />,
};

export const CHANNEL_ICON = {
  TEXT: <Hash />,
  VOICE: <Mic />,
  VIDEO: <Video />,
};
