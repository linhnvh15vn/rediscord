import React from "react";

import DeleteServerModal from "~/components/modals/delete-server-modal";
import ServerModal from "~/components/modals/server-modal";

export default function ModalProvider() {
  return (
    <>
      <ServerModal />
      <DeleteServerModal />
    </>
  );
}
