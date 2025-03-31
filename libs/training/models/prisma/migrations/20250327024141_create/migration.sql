-- CreateEnum
CREATE TYPE "Level" AS ENUM ('beginner', 'amateur', 'professional');

-- CreateEnum
CREATE TYPE "Specialization" AS ENUM ('yoga', 'running', 'boxing', 'stretching', 'crossfit', 'aerobics', 'pilates');

-- CreateEnum
CREATE TYPE "Duration" AS ENUM ('minutes10_30', 'minutes30_50', 'minutes50_80', 'minutes80_100');

-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('man', 'female', 'empty');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('visa', 'mir', 'umoney');

-- CreateTable
CREATE TABLE "trainings" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "level" "Level" NOT NULL,
    "specialization" "Specialization" NOT NULL,
    "duration" "Duration" NOT NULL,
    "price" INTEGER NOT NULL,
    "calories" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "sex" "Sex" NOT NULL,
    "video" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "coach_id" TEXT NOT NULL,
    "is_special_offer" BOOLEAN NOT NULL DEFAULT false,
    "create_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "trainings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "training_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "training_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "payment_type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "comments_training_id_user_id_key" ON "comments"("training_id", "user_id");

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "trainings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "trainings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
