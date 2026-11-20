# screenshot-function

A Firebase Cloud Function that takes a **screenshot of any web page** with Puppeteer and returns it as a base64 PNG.

## API

```
GET https://<region>-<project>.cloudfunctions.net/screenshot?url=https://example.com
GET …/screenshot?url=https://example.com&mobile=true
```

| Query | Meaning |
|---|---|
| `url` | Page to capture (required, validated) |
| `mobile=true` | iPhone-sized viewport (375×812, 3× scale, mobile user agent). Default is desktop 1440×800 at 2× |

Response: the screenshot as a base64 string (`400 Invalid URL` for a bad URL).

Runs with 1 GB memory and a 300 s timeout.

## Deploy

```bash
cd functions && npm install && cd ..
# set your project in .firebaserc (or: firebase use --add)
firebase deploy --only functions:screenshot
```

Run locally with the emulator: `firebase emulators:start --only functions`.

## License

MIT
