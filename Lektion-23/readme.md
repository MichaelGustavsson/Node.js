# Dag 23

### Dokument databaser (NoSQL databaser) med Node.js

Idag går vi igenom hur använder NoSQL databaser tillsammans med Node.js

NoSQL databaser eller ibland kallade Dokumentdatabaser är ett alternativ till det mer traditionella sättet att lagra information på, relationshanterat data. I en NoSQL databas lagras all information ett JSON liknade format, ett så kallat dokument. Som oftast innehåller all information som är nödvändig. Det finns oftast inget behov av att hämta information ifrån något annat dokument.

#### MongoDB

Vi kommer att använda MongoDB som NoSQL databas i vårt exempel.

#### MongoDB Community Edition eller MongoDB Atlas

Det finns två olika sätt att använda MongoDB på.

- Lokalt installerat på maskinen(MongoDB Community Edition)
- MongoDB Atlas som är en molntjänst (Pay As You Go)

Vi kommer att använda MongoDb Community Edition i våra exempel.

Finns att ladda ner för olika operativsystem
[MongoDB Community Edition](https://www.mongodb.com/try/download/community)

Vi kommer även att använda ett visuellt verktyg för att titta på våra dokument.
[MongoDB Compass](https://www.mongodb.com/products/tools/compass)

För modellering av våra dokument kommer vi att använda ett mycket populärt bibliotek
[mongoose](https://mongoosejs.com/)
