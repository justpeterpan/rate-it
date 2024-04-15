import puppeteer from 'puppeteer-core'
import fs from 'fs'
import chrome from '@sparticuz/chromium'

import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3'

const runtimeConfig = useRuntimeConfig()
const exePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const S3 = new S3Client({
  region: 'auto',
  endpoint: runtimeConfig.cloudflare.endpoint,
  credentials: {
    accessKeyId: runtimeConfig.cloudflare.credentials.key,
    secretAccessKey: runtimeConfig.cloudflare.credentials.secret,
  },
})

export default defineEventHandler(async (event) => {
  const { artist, album, date, cover, rating, notes } = getQuery(event)

  console.log('taking screenshot')
  const browser = await puppeteer.launch({
    args: runtimeConfig.dev ? [] : chrome.args,
    executablePath: runtimeConfig.dev ? exePath : await chrome.executablePath(),
    headless: true,
  })
  const page = await browser.newPage()
  await page.goto(
    `${runtimeConfig.url}/?artist=${encodeURIComponent(
      artist
    )}&album=${encodeURIComponent(album)}&date=${encodeURIComponent(
      date
    )}&cover=${encodeURIComponent(cover)}&rating=${encodeURIComponent(
      rating
    )}&notes=${encodeURIComponent(notes)}`,
    { waitUntil: 'networkidle2' }
  )
  await page.emulateMediaFeatures([
    { name: 'prefers-color-scheme', value: 'dark' },
  ])
  const fileName = `${artist}-${album}-${new Date().toISOString()}.png`
  const element = await page.waitForSelector('#screenshot')
  await element.screenshot({ path: fileName })
  const fileStream = fs.readFileSync(fileName)
  const uploadParams: PutObjectCommandInput = {
    Bucket: 'rate',
    Key: fileName,
    Body: fileStream,
    ContentLength: fs.statSync(fileName).size,
    ContentType: 'application/octet-stream',
  }

  const cmd = new PutObjectCommand(uploadParams)
  await S3.send(cmd)
  await browser.close()

  return `${runtimeConfig.cloudflare.download}/${fileName}`
})

// https://rate-it-rho.vercel.app/?artist=Crosby, Stills & Nash&album=Crosby, Stills & Nash&date=23.01.2006&cover=https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/a0/ad/8a/a0ad8a5f-6805-b41a-c076-ee1f779d2a42/603497928323.jpg/600x600bb.jpg&rating=2&notes=
