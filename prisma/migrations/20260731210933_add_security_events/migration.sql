-- CreateEnum
CREATE TYPE "security_event_kind" AS ENUM ('password_reset_request', 'password_reset_blocked', 'password_reset_otp_failed', 'password_reset_otp_verified', 'password_reset_password_failed', 'password_reset_completed');

-- CreateTable
CREATE TABLE "security_ip_blocks" (
    "ip_address" VARCHAR(45) NOT NULL,
    "reason" VARCHAR(255) NOT NULL,
    "blocked_until" TIMESTAMPTZ(6) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "security_ip_blocks_pkey" PRIMARY KEY ("ip_address")
);

-- CreateTable
CREATE TABLE "security_events" (
    "id" UUID NOT NULL,
    "kind" "security_event_kind" NOT NULL,
    "ip_address" VARCHAR(45) NOT NULL,
    "email" VARCHAR(255),
    "attempted_value" VARCHAR(255),
    "device_fingerprint" VARCHAR(255),
    "user_agent" TEXT,
    "browser_details" TEXT,
    "is_incident" BOOLEAN NOT NULL DEFAULT false,
    "blocked_until" TIMESTAMPTZ(6),
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "security_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "security_ip_blocks_blocked_until_idx" ON "security_ip_blocks"("blocked_until");

-- CreateIndex
CREATE INDEX "security_events_kind_created_at_idx" ON "security_events"("kind", "created_at");

-- CreateIndex
CREATE INDEX "security_events_ip_address_created_at_idx" ON "security_events"("ip_address", "created_at");

-- CreateIndex
CREATE INDEX "security_events_is_incident_created_at_idx" ON "security_events"("is_incident", "created_at");
