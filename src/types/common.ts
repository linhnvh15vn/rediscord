import type {
  Server as _Server,
  Channel as _Channel,
  Member as _Member,
  Profile as _Profile,
  MemberRole as _MemberRole,
  Message as _Message,
  DirectMessage as _DirectMessage,
  Conversation as _Conversation,
} from "@prisma/client";

export type Member = _Member & {
  profile?: _Profile;
};

export type Channel = _Channel;

export type Server = _Server & {
  members?: Member[];
};

export type Message = _Message & {
  member: Member;
};

export type DirectMessage = _DirectMessage & {
  member: Member;
};

export type Conversation = _Conversation & {
  directMessage?: DirectMessage[];
  memberOne: Member;
  memberTwo: Member;
};

export type MemberRole = _MemberRole;
