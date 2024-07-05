import type {
  Server as _Server,
  Channel as _Channel,
  Member as _Member,
  Profile as _Profile,
  MemberRole as _MemberRole,
} from "@prisma/client";

export type Member = _Member & {
  profile?: _Profile;
};

export type Channel = _Channel;

export type Server = _Server & {
  members: Member[];
};

export type MemberRole = _MemberRole;
