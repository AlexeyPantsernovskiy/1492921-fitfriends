/*
  Warnings:

  - You are about to drop the column `created_at` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `orders` table. All the data in the column will be lost.
  - Added the required column `amount` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `done_count` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_done` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_started` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `payment_type` on the `orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('ticket', 'promo');

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "created_at",
ADD COLUMN     "create_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "created_at",
ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "create_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "done_count" INTEGER NOT NULL,
ADD COLUMN     "is_done" BOOLEAN NOT NULL,
ADD COLUMN     "is_started" BOOLEAN NOT NULL,
ADD COLUMN     "type" "OrderType" NOT NULL,
DROP COLUMN "payment_type",
ADD COLUMN     "payment_type" "PaymentType" NOT NULL;
