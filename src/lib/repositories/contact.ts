import {
  budget_range,
  contact_submissions,
  Prisma,
  project_type,
} from "@/generated/prisma/client";
import { prisma } from "@/lib/db";

export type CreateContactSubmissionInput = {
  name: string;
  email: string;
  project_type: project_type;
  budget: budget_range;
  message?: string | null;
  ip_address?: string | null;
  user_agent?: string | null;
  user_id?: string | null;
};

export async function createContactSubmission(
  data: CreateContactSubmissionInput,
): Promise<contact_submissions> {
  return prisma.contact_submissions.create({ data });
}

export async function markContactEmailSent(id: string): Promise<contact_submissions> {
  return prisma.contact_submissions.update({
    where: { id },
    data: {
      email_sent_at: new Date(),
      email_error: null,
    },
  });
}

export async function markContactEmailFailed(
  id: string,
  error: string,
): Promise<contact_submissions> {
  return prisma.contact_submissions.update({
    where: { id },
    data: { email_error: error },
  });
}

export async function countRecentContactSubmissionsByIp(
  ipAddress: string,
  since: Date,
): Promise<number> {
  return prisma.contact_submissions.count({
    where: {
      ip_address: ipAddress,
      created_at: { gte: since },
    },
  });
}

export async function listContactSubmissions(
  args?: Prisma.contact_submissionsFindManyArgs,
) {
  return prisma.contact_submissions.findMany({
    orderBy: { created_at: "desc" },
    ...args,
  });
}
