# Lektion 6

I denna lektion ska vi fortsätta med att arbeta med ett node.js baserat REST-API. Men nu ska vi använda en MongoDB databas med hjälp av ett modell bibliotek *Mongoose*
Så istället för att jobba med vårt textbaserade json fil ska vi nu skifta över till en mer beständig datalagring.

### Installation
När start projektet är nedladdat öppna upp det i VS Code och öppna terminalfönstret i VS Code och navigera till samma katalog som filen package.json finns.
Skriv in följande kommando för att installera alla beroenden som behövs.
`npm i`

I katalogen config skapa en fil *settings.env* lägg till följande rader:

PORT=3000

NODE_ENV=development