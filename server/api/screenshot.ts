import puppeteer from 'puppeteer'
import fs from 'fs'

import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3'

const runtimeConfig = useRuntimeConfig()

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
  const browser = await puppeteer.launch({ headless: 'shell' })
  const page = await browser.newPage()
  await page.goto(
    `http://localhost:3000?artist=${artist}&album=${album}&date=${date}&cover=${cover}&rating=${rating}&notes=${notes}`,
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
