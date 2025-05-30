# Lektion 17 (dag 17)

Idag ska vi avsluta vårt projekt smartchain som simulerar en kryptovaluta.
Vi kommer idag att avslutningsvis lägga till validering av transaktionerna som vi placerar i blocken i vår blockkedja

### Validering av blockkedjan
Vi har redan implementerat validering av varje block i blockkedjan där vi kan kontrollera så att blocken är korrekta enligt följande regelverk:

#### isValid()

- ✅ Genesis blocke är OK och är det första blocket i vår blockkedja
- ✅ Föregående blocks hash är kopplat till nästa blocks lasthash
- ✅ Svårighetsgraden av framtagning av ett block fungerar, dvs att tiden den tar att skapa ett block sköts dynamiskt baserat på tiden som vi satt upp.
- ✅ Genererad hash är validerad

### Validering av transaktionerna som finns i blocken
Vi kommer att skapa en metod validateTransactionData() i vår klass Blockchain som kommer att se till att regler följs för transaktionerna

- ❗️Varje transaktion måste vara korrekt formaterat
- ❗️Endast en belöningstransaktion får finnas per block
- ❗️Balansen ska vara korrekt baserat på vår input struktur och dess värden i blockkedjan
- ❗️Varje transaktion måste vara unik i varje block, det vill säga det får inte finnas några dubbletter av transaktioner

### Uppgifter

#### Uppgift 1.

Under eftermiddagen så kommer ni att få till uppgift att göra en *refactoring* av koden i blockchain.mjs.
Vi har använt **console.error()** för att indikera att något inte stämmer överens med ovanstående regler.

Detta är *bad practice* i en produktionsapplikation bör vi kasta fel uppåt i kedjan. Så uppgiften är att byta ut varje **console.error()** till att istället kasta ett fel.

Detta innebär också att ni måste uppdatera/ändra testerna så att de även kontrollerar att vi kastar fel(Error) vid rätt tillfälle.

#### Uppgift 2.
Denna uppgift är för att förbereda nästa veckas nya projekt.

Nästa vecka ska vi börja ett nytt blockchain projekt **westcoast-cars**. Westcoast-cars är en återförsäljar kedjan av begagnade bilar som har etablerat sig i stora delar av Sverige. De ska nu börja med att distribuera försäljningsobjekt via en blockkedja till alla som är medlemmar i westcoast-cars blockchain.

Så er uppgift är att skapa ett startprojekt i Node.js enligt den struktur som vi har gått igenom. Dessutom behöver vi installera några npm paket som kommer att behövas.
- express
- nodemon
- dotenv