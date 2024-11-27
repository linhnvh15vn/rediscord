import React from "react";

import ServerNav from "~/components/server-nav";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden md:block">
        <ServerNav />
      </div>
      <main className="flex-1">{children}</main>
    </div>
  );
}
