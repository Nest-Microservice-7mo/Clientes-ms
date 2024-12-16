-- CreateTable
CREATE TABLE "Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombreCliente" TEXT NOT NULL,
    "apellidoCliente" TEXT NOT NULL,
    "passwordCliente" TEXT NOT NULL,
    "telefonoCliente" TEXT NOT NULL,
    "correoCliente" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true
);
