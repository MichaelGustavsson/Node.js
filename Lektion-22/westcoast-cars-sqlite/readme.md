# Lektion 22 - Nodejs och relationsdatabaser

## Beskrivning

I detta projektet har vi använt en filbaserad relationsdatabashanterare _Sqlite_ för att spara ner bilar i systemet.

Vi har skapat två filer i db mappen en för hantering av öppna eller skapa databasen samt en fil för att skapa vår tabell och fylla på tabellen med lite dummy data.

- database.mjs
- createTables.mjs

### Installation

Öppna upp projektet i vscode och öppna terminalen i vscode och skriv in kommandot:
`npm i`för att installera npm paketen.

Sedan är det bara att köra npm run dev eller npm start för att starta rest api:et

Använd sedan postman för att testa de olika enpoints som finns i applikationen.
