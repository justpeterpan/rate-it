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
  const { artist, album, date, cover, rating, notes, theme } = getQuery(event)

  console.log('taking screenshot')
  const browser = await puppeteer.launch({
    args: runtimeConfig.dev ? [] : chrome.args,
    executablePath: runtimeConfig.dev ? exePath : await chrome.executablePath(),
    headless: true,
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 430, height: 932 })
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
    { name: 'prefers-color-scheme', value: `${theme}` },
  ])
  const fileNameWithTmp = `/tmp/${artist}-${album}-${new Date().toISOString()}.png`
  const fileNameWithoutTmp = `${artist}-${album}-${new Date().toISOString()}.png`
  const element = await page.waitForSelector('#screenshot')
  await element.screenshot({ path: fileNameWithTmp })
  const fileStream = fs.readFileSync(fileNameWithTmp)
  const uploadParams: PutObjectCommandInput = {
    Bucket: 'rate',
    Key: fileNameWithoutTmp,
    Body: fileStream,
    ContentLength: fs.statSync(fileNameWithTmp).size,
    ContentType: 'application/octet-stream',
  }

  const cmd = new PutObjectCommand(uploadParams)
  await S3.send(cmd)
  await browser.close()

  return `${runtimeConfig.cloudflare.download}/${fileNameWithoutTmp}`
})
