import PushNotificationsServer from "@pusher/push-notifications-server";

export const pushNotifications = new PushNotificationsServer({
  instanceId: process.env.NEXT_PUBLIC_BEAMS_INSTANCE_ID!,
  secretKey: process.env.BEAMS_SECRET_KEY!,
});
