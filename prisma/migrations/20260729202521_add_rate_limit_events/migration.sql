-- CreateTable
CREATE TABLE "rate_limit_events" (
    "id" UUID NOT NULL,
    "bucket_key" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rate_limit_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "rate_limit_events_bucket_key_created_at_idx" ON "rate_limit_events"("bucket_key", "created_at");
