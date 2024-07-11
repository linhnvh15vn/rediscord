"use client";

import * as PushNotificationsClient from "@pusher/push-notifications-web";

export const beamsClient = new PushNotificationsClient.Client({
  instanceId: process.env.NEXT_PUBLIC_BEAMS_INSTANCE_ID!,
});
