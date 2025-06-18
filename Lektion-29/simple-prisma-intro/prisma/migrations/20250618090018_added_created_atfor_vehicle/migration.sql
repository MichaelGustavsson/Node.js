-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Vehicle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "registrationNumber" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "model" TEXT NOT NULL,
    "modelYear" INTEGER NOT NULL,
    "mileage" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "manufacturerId" TEXT,
    "fueltypeId" TEXT,
    CONSTRAINT "Vehicle_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Vehicle_fueltypeId_fkey" FOREIGN KEY ("fueltypeId") REFERENCES "Fueltype" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Vehicle" ("color", "fueltypeId", "id", "manufacturerId", "mileage", "model", "modelYear", "registrationNumber") SELECT "color", "fueltypeId", "id", "manufacturerId", "mileage", "model", "modelYear", "registrationNumber" FROM "Vehicle";
DROP TABLE "Vehicle";
ALTER TABLE "new_Vehicle" RENAME TO "Vehicle";
CREATE UNIQUE INDEX "Vehicle_registrationNumber_key" ON "Vehicle"("registrationNumber");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
