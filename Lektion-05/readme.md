# Lektion 5

Idag ska vi gå igenom vad TDD(Test Driven Development) är för något och varför vi ska bry oss om det.

Vi kommer även att ändra i vårt Vehicles API och istället för att använda en json fil ska vi installera och använda MongoDb som är en NO-SQL databas.
Kallas även för dokument databas på grund av att allt data lagras som en variant av Json data(Bson).

### TDD
Vi kommer att Använda **Vitest** istället för Jest. Anledningen är att Vitest har kommit väldigt starkt de senaste åren och är framförallt standard testmotorn för React.
Jest har inte fullständigt inbyggt stöd för ES6 Moduler ännu utan förlitar sig på CommonJS moduler.
Vi kommer att använda uteslutande E6 Moduler i våra projekt. Det är möjligt att använda Jest men det kräver ganska mycket och krånglig konfiguration.

Dessutom kommer vi att använda **SuperTest** för att kunna skriva tester för vår endpoints och deras metoder.

### Installation av MongoDB
Här är 3 länkar till installationsanvisningar för Windows, MacOS samt Linux.
- [Windows] (https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/)
- [MacOS] (https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#run-mongodb-community-edition)
- [Linux] (https://www.mongodb.com/docs/manual/administration/install-on-linux/)

### Installation av MongoDB Compass
MongoDB Compass är ett grafiskt verktyg som låter oss arbeta, lista, ställa frågor med mera.

Här finns länken till installation av MongoDB Compass
- [MongoDB Compass](https://www.mongodb.com/products/tools/compass)