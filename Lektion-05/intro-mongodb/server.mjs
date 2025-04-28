import mongodb, { ObjectId } from 'mongodb';

const MongoClient = mongodb.MongoClient;
const database = 'westcoast-cars';
const uri = 'mongodb://localhost:27017/' + database;
// mongodb://localhost:27017/westcoast-cars
// const uri = 'mongodb://127.0.0.1:27017/' + database;

// Anslut till databasen och servern...
const client = await MongoClient.connect(uri);

if (!client) {
  console.log('Hoppsan det gick inte att ansluta!');
}

console.log(`Ansluten till databasen ${client.options.dbName}`);

// Koppla mig till min databas...
const db = client.db(database);

/* INSERT DOCUMENTS */
// insertOne...
// const vehicle = await db.collection('vehicles').insertOne({
//   manufacturer: 'Ford',
//   model: 'Fusion',
//   modelYear: 2011,
// });

// if (!vehicle) {
//   console.log('Det gick snett!');
// }

// console.log(vehicle);

// insertMany...
// const result = await db.collection('vehicles').insertMany([
//   {
//     registrationNo: 'ABC123',
//     make: 'Chevrolet',
//     model: 'Corvette',
//     modelYear: '2015',
//     imageUrl: 'https://i.postimg.cc/N09fbtKZ/car1.jpg',
//     mileage: 25000,
//     value: 17500,
//   },
//   {
//     registrationNo: 'DEF345',
//     make: 'Ford',
//     model: 'Mustang',
//     modelYear: '2017',
//     imageUrl: 'https://i.postimg.cc/Fsy2yyh8/car2.jpg',
//     mileage: 48500,
//     value: 175000,
//   },
//   {
//     registrationNo: 'GHI678',
//     make: 'Porsche',
//     model: 'Alpine',
//     modelYear: '1967',
//     imageUrl: 'https://i.postimg.cc/85xqHwJQ/car3.jpg',
//     mileage: 89000,
//     value: 175000,
//   },
// ]);

// console.log(result);

/* LÄSA OCH SÖKA UT INFORMATION */
// findOne...
// const vehicle = await db
//   .collection('vehicles')
//   .findOne({ manufacturer: 'Ford' });
// console.log(vehicle);

// find by id...
// const vehicle = await db
//   .collection('vehicles')
//   .findOne({ _id: new ObjectId('680f77b0001acfab0f0093e6') });

// console.log(vehicle);

// Hämta ut bilar enligt villkor...
// const vehicles = await db
//   .collection('vehicles')
//   .find({ modelYear: '2015' })
//   .toArray();
// console.log(vehicles);

// Hämta ut bilar med olika villkor...
// const vehicles = await db
//   .collection('vehicles')
//   .find({ $and: [{ modelYear: 2011 }, { manufacturer: 'Ford' }] })
//   .toArray();

// console.log(vehicles);

/* UPPDATERA DOKUMENT */
// const updated = await db.collection('vehicles').updateOne(
//   { _id: new ObjectId('680f77b0001acfab0f0093e6') },
//   {
//     $set: { modelYear: 2025 },
//   }
// );

// console.log(updated);

/* TA BORT DOKUMENT */
// deleteOne...
// await db
//   .collection('vehicles')
//   .deleteOne({ _id: new ObjectId('680f77b0001acfab0f0093e6') });

// deleteMany...
// await db.collection('vehicles').deleteMany({ make: 'Ford' });
// await db.collection('vehicles').deleteMany();
