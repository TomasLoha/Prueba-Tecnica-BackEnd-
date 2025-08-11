-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "disponible" BOOLEAN NOT NULL,
    "fechaNacimiento" TIMESTAMP(3) NOT NULL,
    "dni" TEXT NOT NULL,
    "nombreCompleto" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "estadoCivil" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Factura" (
    "id" SERIAL NOT NULL,
    "disponible" BOOLEAN NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "nombreFantasia" TEXT NOT NULL,
    "fechaFundacion" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "Factura_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."detalleFactura" (
    "id" SERIAL NOT NULL,
    "disponible" BOOLEAN NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "productoId" INTEGER NOT NULL,
    "facturaId" INTEGER NOT NULL,

    CONSTRAINT "detalleFactura_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Product" (
    "id" SERIAL NOT NULL,
    "disponible" BOOLEAN NOT NULL,
    "nombre" TEXT NOT NULL,
    "precioUnitario" DOUBLE PRECISION NOT NULL,
    "descripcion" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_dni_key" ON "public"."User"("dni");

-- AddForeignKey
ALTER TABLE "public"."Factura" ADD CONSTRAINT "Factura_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."detalleFactura" ADD CONSTRAINT "detalleFactura_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."detalleFactura" ADD CONSTRAINT "detalleFactura_facturaId_fkey" FOREIGN KEY ("facturaId") REFERENCES "public"."Factura"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
