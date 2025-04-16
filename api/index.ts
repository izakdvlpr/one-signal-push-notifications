import 'dotenv/config'

import express from 'express'
import * as OneSignal from '@onesignal/node-onesignal';

const app = express()

const oneSignalClient = new OneSignal.DefaultApi(
  OneSignal.createConfiguration({
    authMethods: {
      rest_api_key: { tokenProvider: { getToken: () => process.env.ONESIGNAL_API_KEY! } }
    }
  })
);

app.post('/notify', async (_req, res) => {
  try {
    const notification = new OneSignal.Notification();
    
    notification.app_id = process.env.ONESIGNAL_APP_ID!;
    notification.target_channel = "push"
    notification.name = "hello world from nodejs";
    notification.included_segments = ['Active Subscriptions'];
    notification.headings = { en: "From Nodejs" };
    notification.contents = { en: "tirin com trinta" };
    notification.android_sound = "default"
    notification.large_icon = "https://avatars.githubusercontent.com/u/11823027?s=200&v=4"
    
    const data = await oneSignalClient.createNotification(notification);

    res.status(200).json({ message: 'Notification sent successfully', data })
  } catch (error) {
    console.log(error)
    
    res.status(500).json({ message: 'Error sending notification', error })
  }
})

app.listen(3333, () => {
  console.log('Server is running on port 3333')
})