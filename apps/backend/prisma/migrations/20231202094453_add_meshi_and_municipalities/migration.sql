-- CreateTable
CREATE TABLE "municipalities" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "municipalities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meshis" (
    "id" BIGSERIAL NOT NULL,
    "article_id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'unknown',
    "image_url" TEXT NOT NULL DEFAULT 'unknown',
    "store_name" TEXT NOT NULL DEFAULT 'unknown',
    "address" TEXT NOT NULL DEFAULT 'unknown',
    "site_url" TEXT NOT NULL DEFAULT 'unknown',
    "published_date" TIMESTAMP(3) NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "municipality_meshis" BIGINT,

    CONSTRAINT "meshis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "municipalities_name_key" ON "municipalities"("name");

-- CreateIndex
CREATE UNIQUE INDEX "meshis_article_id_key" ON "meshis"("article_id");

-- AddForeignKey
ALTER TABLE "meshis" ADD CONSTRAINT "meshis_municipality_meshis_fkey" FOREIGN KEY ("municipality_meshis") REFERENCES "municipalities"("id") ON DELETE SET NULL ON UPDATE CASCADE;
