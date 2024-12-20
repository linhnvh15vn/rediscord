import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main>{children}</main>
    </div>
  );
}
