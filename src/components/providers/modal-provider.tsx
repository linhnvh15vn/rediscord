import React from "react";

import ChannelModal from "~/components/modals/channel-modal";
import DeleteChannelModal from "~/components/modals/delete-channel-modal";
import DeleteServerModal from "~/components/modals/delete-server-modal";
import InviteModal from "~/components/modals/invite-modal";
import LeaveModal from "~/components/modals/leave-modal";
import MemberModal from "~/components/modals/member-modal";
import ServerModal from "~/components/modals/server-modal";

export default function ModalProvider() {
  return (
    <>
      <ServerModal />
      <DeleteServerModal />
      <InviteModal />
      <MemberModal />
      <ChannelModal />
      <DeleteChannelModal />
      <LeaveModal />
    </>
  );
}
