-- CreateTable
CREATE TABLE "municipalities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "zipcode" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "municipalities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meshis" (
    "id" SERIAL NOT NULL,
    "article_id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'unknown',
    "image_url" TEXT NOT NULL DEFAULT 'unknown',
    "store_name" TEXT NOT NULL DEFAULT 'unknown',
    "address" TEXT NOT NULL DEFAULT 'unknown',
    "site_url" TEXT NOT NULL DEFAULT 'unknown',
    "published_date" TIMESTAMP(3) NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "municipality_meshis" INTEGER,

    CONSTRAINT "meshis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "municipalities_name_key" ON "municipalities"("name");

-- CreateIndex
CREATE UNIQUE INDEX "municipalities_zipcode_key" ON "municipalities"("zipcode");

-- CreateIndex
CREATE UNIQUE INDEX "meshis_article_id_key" ON "meshis"("article_id");

-- AddForeignKey
ALTER TABLE "meshis" ADD CONSTRAINT "meshis_municipality_meshis_fkey" FOREIGN KEY ("municipality_meshis") REFERENCES "municipalities"("id") ON DELETE SET NULL ON UPDATE CASCADE;
