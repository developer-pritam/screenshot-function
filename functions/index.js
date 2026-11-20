const functions = require("firebase-functions");
const puppeteer = require("puppeteer");
const validURL = str => {
    let pattern = new RegExp('^(https?:\\/\\/)?' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$', 'i');
    return !!pattern.test(str);
};

exports.screenshot = functions
    .runWith({ memory: "1GB", timeoutSeconds: 300 })
    .https.onRequest(async (req, res) => {
        functions.logger.info("Hello logs!", { structuredData: true });

        const isMobile = req.query.mobile === "true";
        const url = req.query.url;

        if (!validURL(url)) {
            res.status(400).send("Invalid URL");
            return;
        }

        const browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
            headless: true,
            defaultViewport: {
                width: isMobile ? 375 : 1200,
                height: isMobile ? 812 : 800,
                deviceScaleFactor: 1,
            },
            ignoreHTTPSErrors: true,
        });
        const page = await browser.newPage();
        if (isMobile) {
            await page.setViewport({
                width: 375,
                height: 812,
                deviceScaleFactor: 3,
                isMobile: true,
                hasTouch: true,
                isLandscape: false,
            });

            await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1')
        } else {
            await page.setViewport({
                height: 800,
                width: 1440,
                deviceScaleFactor: 2
            });
        }
        await page.goto(url);
        const file = await page.screenshot({ encoding: "base64" });
        await browser.close();
        // res.set("Content-Type", "image/png");
        // res.send(file);
        res.status(200).send(file);

    });
