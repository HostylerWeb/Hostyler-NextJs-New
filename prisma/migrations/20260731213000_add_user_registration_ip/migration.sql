-- AlterTable
ALTER TABLE "users" ADD COLUMN "registration_ip" VARCHAR(45);

-- CreateIndex
CREATE UNIQUE INDEX "users_registration_ip_key" ON "users"("registration_ip");
