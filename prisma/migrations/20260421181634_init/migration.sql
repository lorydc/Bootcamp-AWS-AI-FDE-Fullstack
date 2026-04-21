-- CreateTable
CREATE TABLE "Director" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Movie" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "releaseYear" INTEGER NOT NULL,
    "genre" TEXT NOT NULL,
    "directorId" INTEGER NOT NULL,
    CONSTRAINT "Movie_directorId_fkey" FOREIGN KEY ("directorId") REFERENCES "Director" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Director_name_key" ON "Director"("name");
