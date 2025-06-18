-- CreateTable
CREATE TABLE "Fueltype" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "registrationNumber" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "modelYear" INTEGER NOT NULL,
    "mileage" INTEGER NOT NULL,
    "color" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Fueltype_name_key" ON "Fueltype"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_registrationNumber_key" ON "Vehicle"("registrationNumber");
