const express = require('express')
const webpush = require('web-push')
const cors = require('cors')
const bodyParser = require('body-parser')

const PUBLIC_VAPID = 'BBSR-UGUiP7fnpm5hYXaXRRKO5ASdRZs1F-Au5mcmW8fbci-jHgbAKMV1ZWPDPajIoLkjZsWCQ7zH5wYWartwZc'
const PRIVATE_VAPID = '9SNLG0Rky7GQ0Nsv6kWCCShicgUrIfbE2NWfWiUe12o'

const fakeDatabase = []

const app = express()

app.use(cors())
//Parse Json
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

webpush.setVapidDetails('mailto:you@domain.com', PUBLIC_VAPID, PRIVATE_VAPID)

//Test
app.get('', (req, res) => {
  console.log("Server On");
});


app.post('/subscription', (req, res) => {
    const subscription = req.body
    fakeDatabase.push(subscription)
    console.log(fakeDatabase)
    console.log(req.body)
})

app.post('/sendNotification', (req, res) => {
    const notificationPayload = {
        notification: {
            title: 'Probando Notificacion',
            body: 'THIS IS SPARTAAAAA',
            icon: 'icon-512x512.png'
        },
    }

    const promises = []
    fakeDatabase.forEach(subscription => {
    promises.push(
      webpush.sendNotification(
        subscription,
        JSON.stringify(notificationPayload)
      )
    )
  })
  Promise.all(promises).then(() => res.sendStatus(200))

})

app.listen(process.env.PORT || 3000, () => {
    console.log('Server started on port 3000')
  })