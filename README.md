# Marvel United Game Randomizer

---

## Installation

> npm install

### Firebase Settings

**Add the Firebase Config file with your config settings:**

> services/fb-config.js

**Content**

> const fbConfig = {\
> apiKey: "<-- API KEY -->",\
> authDomain: "<-- AUTH DOMAIN -->",\
> databaseURL: "<-- DATABASE URL -->",\
> projectId: "<-- PROJECT ID -->",\
> storageBucket: "<-- STORAGE BUCKET -->",\
> messagingSenderId: "<-- MESSAGING SENDER ID -->",\
> appId: "<-- APP ID -->",\
> }\
> module.exports = fbConfig

**Add the Firebase Collection file with your collection name:**

> services/fb-collection.js

**Content**

> const fbCollection = "<-- NAME OF COLLECTION -->"\
> module.exports = fbCollection

### Development

> npm run start

### Build

> npm run build