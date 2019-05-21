const devConfig = {
  apiKey: 'AIzaSyB_DHvdG-tj2Roh2q5OPKRw4Gvu5ftLXY8',
  authDomain: 'agoraexpo-dev.firebaseapp.com',
  databaseURL: 'https://agoraexpo-dev.firebaseio.com',
  projectId: 'agoraexpo-dev',
  storageBucket: 'agoraexpo-dev.appspot.com',
  messagingSenderId: '616937133910',
}

const prodConfig = {
  apiKey: "AIzaSyCTFrtDok38C-eyGZqDCzlk8oD8Hkmahz8",
  authDomain: "agoraexpo-prod.firebaseapp.com",
  databaseURL: "https://agoraexpo-prod.firebaseio.com",
  projectId: "agoraexpo-prod",
  storageBucket: "agoraexpo-prod.appspot.com",
  messagingSenderId: "922341394029",
  appId: "1:922341394029:web:518fc1159f23a565"
}

export default process.env.NODE_ENV=='production' ? prodConfig : devConfig
