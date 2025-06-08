# Node Express API mall

## Beskrivning

Här är en basmall för att att snabbt komma igång med att bygga ett Node och Express baserat REST API projekt.

### Struktur

Projektet har följande _Best Practice_ struktur:

- 📁 root
  - 📁 config
    - 📄 config.env
  - 📁 src
    - 📁 controllers
      📁 db
      📁 logs
      📁 middleware
      📁 models
      📁 repositories
      📁 routes
      📁 utilities
      📄 app.mjs
      📄 server.mjs
  - 📄 .gitignore
  - 📄 package.json

### Installation

Öppna upp projektet i vscode och öppna terminalen i vscode och skriv in kommandot:
`npm i`för att installera npm paketen.

#### Testa projektet

I package.json filen finns två skript:

1. start
2. dev

I terminalfönstret skriv in följande kommando för att testa så att projektet startar i produktionsläge:
`npm start`

I terminalfönstret bör följande utskrift synas:
Server is up and running on http://localhost:5001 in production mode

tryck Ctrl+c för att avsluta applikationen

Skriv nu följande kommando för att test utveclingsmiljön

`npm run dev`
Nu bör följande utskrift synas:
[nodemon] 3.1.10
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): _._
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node src/server.mjs`
Server is up and running on http://localhost:5001 in development mode

Nu är allt klart, projektmallen fungerar🎉
