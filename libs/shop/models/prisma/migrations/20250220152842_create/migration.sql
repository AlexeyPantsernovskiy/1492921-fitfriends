-- CreateEnum
CREATE TYPE "GuitarType" AS ENUM ('acoustic', 'electric', 'ukulele');

-- CreateTable
CREATE TABLE "guitars" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "create_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "photo" TEXT NOT NULL,
    "type_code" "GuitarType" NOT NULL,
    "count_strings" INTEGER NOT NULL,
    "barcode" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "guitars_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "guitars_type_code_idx" ON "guitars"("type_code");

-- CreateIndex
CREATE INDEX "guitars_create_date_idx" ON "guitars"("create_date");

-- CreateIndex
CREATE INDEX "guitars_price_idx" ON "guitars"("price");
