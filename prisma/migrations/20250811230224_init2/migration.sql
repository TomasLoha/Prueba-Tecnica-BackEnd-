/*
  Warnings:

  - The primary key for the `Factura` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `detalleFactura` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "public"."Factura" DROP CONSTRAINT "Factura_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "public"."detalleFactura" DROP CONSTRAINT "detalleFactura_facturaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."detalleFactura" DROP CONSTRAINT "detalleFactura_productoId_fkey";

-- AlterTable
ALTER TABLE "public"."Factura" DROP CONSTRAINT "Factura_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "usuarioId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Factura_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Factura_id_seq";

-- AlterTable
ALTER TABLE "public"."Product" DROP CONSTRAINT "Product_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Product_id_seq";

-- AlterTable
ALTER TABLE "public"."User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "public"."detalleFactura" DROP CONSTRAINT "detalleFactura_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "productoId" SET DATA TYPE TEXT,
ALTER COLUMN "facturaId" SET DATA TYPE TEXT,
ADD CONSTRAINT "detalleFactura_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "detalleFactura_id_seq";

-- AddForeignKey
ALTER TABLE "public"."Factura" ADD CONSTRAINT "Factura_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."detalleFactura" ADD CONSTRAINT "detalleFactura_facturaId_fkey" FOREIGN KEY ("facturaId") REFERENCES "public"."Factura"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."detalleFactura" ADD CONSTRAINT "detalleFactura_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
