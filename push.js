const webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BLOBW7Y-HSn3u-i5QSh_ENl0jmvoMDSCl3TZ2izqY3naFb531HnWSsN_Zj7ozEZnXFXfteTpB_-gZfGfrZzUf-I","privateKey":"T0KWbILu9dMx3BdFN_9CWprqoll33xDZVEdktfjTqMs",
   "privateKey": "T0KWbILu9dMx3BdFN_9CWprqoll33xDZVEdktfjTqMs"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
const pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/dgkjfKbnuW4:APA91bG6owAzyYjpHgt3h13uik8bsAWORhVg_ihbuB339MSQOCZrKW2IhKKHrME0uWK7GNs6dDSVOBBtqBE-K2mQQhz5IUyYTWDkKJWDytCJAkeWBdgnpAhl-2aYDNdtzDc_8EBdoVw9",
   "keys": {
       "p256dh": "BDDK421FFNhK5bEHBRuh028Q4gA3fSQdcd7HAqTgAffTtBq1Ji/WqTkhMSy7pbAqvJuywU/fiVsPcmDiPdj0ROM=",
       "auth": "cgW5KKbrf7Qwl7N50mKQWw=="
   }
};
const payload = 'Notifikasi terbaru dari Aplikasi Balbalan';
 
const options = {
   gcmAPIKey: 'AAAAX26WRhc:APA91bHLAtJ4Q8ddJDYcRnDUdIdw6sGZBtoNnSwsXc6klsPR0bVEvq77Jvw76YtMV7akiVkJDpEhhqzec1LkKrPoGr9mYbNEsa3mg5BH_37KtDpLYhuR8SJ6VYQ995deYadxI9CCNhtk',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);