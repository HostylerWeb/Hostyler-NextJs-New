-- Align contact form budget options with homepage pricing tiers.
ALTER TYPE "budget_range" ADD VALUE IF NOT EXISTS 'web_from_3500';
ALTER TYPE "budget_range" ADD VALUE IF NOT EXISTS 'app_from_6000';
ALTER TYPE "budget_range" ADD VALUE IF NOT EXISTS 'ai_from_7500';
ALTER TYPE "budget_range" ADD VALUE IF NOT EXISTS '10_25k';
ALTER TYPE "budget_range" ADD VALUE IF NOT EXISTS '25k_plus';
