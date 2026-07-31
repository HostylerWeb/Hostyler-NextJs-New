-- CreateEnum
CREATE TYPE "testimonial_tint" AS ENUM ('violet', 'coral', 'lime');

-- CreateTable
CREATE TABLE "testimonials" (
    "id" UUID NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "role" VARCHAR(255) NOT NULL,
    "quote" TEXT NOT NULL,
    "avatar_url" VARCHAR(500) NOT NULL,
    "tint" "testimonial_tint" NOT NULL DEFAULT 'violet',
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "testimonials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "testimonials_slug_key" ON "testimonials"("slug");

-- CreateIndex
CREATE INDEX "testimonials_published_sort_order_idx" ON "testimonials"("published", "sort_order");
