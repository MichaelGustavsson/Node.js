import { PrismaClient } from './generated/prisma/index';

const connection = new PrismaClient();

async function main() {
  // const manufacturer = await connection.manufacturer.create({
  //   data: { name: 'Ford' },
  // });
  // console.log(manufacturer);
  // const manufacturers = await connection.manufacturer.createMany({
  //   data: [{ name: 'Volvo' }, { name: 'Kia' }, { name: 'Fiat' }],
  // });
  // console.log(manufacturers);
  // const manufacturers = await connection.manufacturer.findMany();
  // console.log(manufacturers);
  // const manufacturer = await connection.manufacturer.findFirst({
  //   where: { name: 'Fiat' },
  // });
  // console.log(manufacturer);
  // const manufacturer = await connection.manufacturer.findUnique({
  //   where: { id: 'ac02e3aa-1f66-45b7-87cc-39e13cf9f47b' },
  // });
  // console.log(manufacturer);
  // await connection.manufacturer.deleteMany();
  // await connection.manufacturer.createMany({
  //   data: [
  //     { name: 'Volvo' },
  //     { name: 'Kia' },
  //     { name: 'Fiat' },
  //     { name: 'Ford' },
  //   ],
  // });
  // await connection.fueltype.createMany({
  //   data: [{ name: 'Bensin' }, { name: 'Diesel' }, { name: 'Hybrid' }],
  // });
  // const manufacturers = await connection.manufacturer.findMany();
  // const fueltypes = await connection.fueltype.findMany();
  // console.log(manufacturers);
  // console.log(fueltypes);
  // await connection.vehicle.deleteMany();
  // const vehicle = await connection.vehicle.create({
  //   data: {
  //     registrationNumber: 'AAA111',
  //     model: 'V40',
  //     modelYear: 2016,
  //     mileage: 105000,
  //     color: 'Darkblue',
  //     manufacturerId: '8d52fb1b-a9a2-4711-933e-9099d46a45d9',
  //     fueltypeId: '22c288af-a96b-41a2-82d7-6ca9167e95c6',
  //   },
  // });
  // console.log(vehicle);
  // const vehicles = await connection.vehicle.findMany({
  //   select: {
  //     registrationNumber: true,
  //     model: true,
  //     manufacturer: {
  //       select: {
  //         name: true,
  //       },
  //     },
  //     fueltype: {
  //       select: {
  //         name: true,
  //       },
  //     },
  //   },
  // });
  // const vehicles = await connection.vehicle.findMany({
  //   include: {
  //     manufacturer: { select: { name: true } },
  //     fueltype: { select: { name: true } },
  //   },
  // });
  // console.log(vehicles);
  // const manufacturer = await connection.manufacturer.findFirst({
  //   where: { name: 'Ford' },
  // });
  // const fueltype = await connection.fueltype.findFirst({
  //   where: { name: 'Hybrid' },
  // });
  // const vehicle = await connection.vehicle.create({
  //   data: {
  //     registrationNumber: 'BBB222',
  //     model: 'Mustang MACH-E',
  //     modelYear: 2022,
  //     mileage: 250000,
  //     color: 'Black',
  //     manufacturer: {
  //       connect: {
  //         id: manufacturer!.id,
  //       },
  //     },
  //     fueltype: {
  //       connect: {
  //         id: fueltype!.id,
  //       },
  //     },
  //   },
  // });
  // console.log(vehicle);

  const vehicles = await connection.vehicle.findMany({
    include: {
      manufacturer: { select: { name: true } },
      fueltype: { select: { name: true } },
    },
  });
  console.log(vehicles);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await connection.$disconnect();
  });
