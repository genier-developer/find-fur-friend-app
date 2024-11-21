import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

export const firebaseConfig = {
  apiKey: 'AIzaSyAVxBJijswcwsg4DNsGtr53hdH07uAcxtA',
  appId: '1:531819954511:web:c1805dddcc60457c3f853a',
  authDomain: 'pet-shelter-fa4be.firebaseapp.com',
  databaseURL: 'https://pet-shelter-fa4be-default-rtdb.firebaseio.com',
  messagingSenderId: '531819954511',
  projectId: 'pet-shelter-fa4be',
  storageBucket: 'pet-shelter-fa4be.appspot.com',
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const auth = getAuth()

export { app, auth, database }
