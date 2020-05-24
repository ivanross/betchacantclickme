import * as firebase from 'firebase/app'
import 'firebase/database'
import { IS_DEVELOPMENT, SHOULD_CLEANUP } from './contants'

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
}

firebase.initializeApp(config)

// Get a reference to the database service
const database = firebase.database()

const scoresRef = database.ref('scores')

export async function readScores() {
  const res = await scoresRef.orderByChild('time').once('value')
  const values = res.val()
  if (!values) return []
  return Object.entries(values)
    .map(([id, v]) => ({ ...v, id }))
    .filter((el) => !el.dev || IS_DEVELOPMENT)
    .sort((a, b) => a.time - b.time)
}

export async function writeScore(time, nickname, level) {
  const newScoreRef = await scoresRef.push()

  await newScoreRef.set({
    time,
    nickname,
    level,
    timestamp: Date.now(),
    dev: IS_DEVELOPMENT,
  })

  return newScoreRef.key
}

SHOULD_CLEANUP &&
  (async () => {
    const res = await database.ref('scores').once('value')
    const value = res.val()
    if (!value) return

    // eslint-disable-next-line no-unused-vars
    for (const [key, v] of Object.entries(res.val())) {
      if (v.dev) {
        database.ref(`scores/${key}`).remove()
        console.log(key, v)
      }
    }
  })()
