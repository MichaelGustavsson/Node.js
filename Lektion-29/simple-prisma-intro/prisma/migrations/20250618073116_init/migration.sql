-- CreateTable
CREATE TABLE "Manufacturer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Manufacturer_name_key" ON "Manufacturer"("name");
