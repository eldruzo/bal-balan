const webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "public-key",
   "privateKey": "private-key"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
const pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/dgkjfKbnuW4:APA91bG6owAzyYjpHgt3h13uik8bsAWORhVg_ihbuB339MSQOCZrKW2IhKKHrME0uWK7GNs6dDSVOBBtqBE-K2mQQhz5IUyYTWDkKJWDytCJAkeWBdgnpAhl-2aYDNdtzDc_8EBdoVw9",
   "keys": {
       "p256dh": "p256dh-key",
       "auth": "auth-key"
   }
};
const payload = 'Notifikasi terbaru dari Aplikasi Balbalan';
 
const options = {
   gcmAPIKey: 'gcmaAPIKey',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);
