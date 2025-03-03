import { faker } from '@faker-js/faker';
import { emphasis, prisma } from 'prisma/seed/utils';

export async function createProjects() {
  console.log(`⏳ Seeding projects`);

  let createdCounter = 0;
  const existingCount = await prisma.company.count();

  // Create dummy projects
  const company = await prisma.company.findUnique({ where: { siret: '53918535500010' } });
  if (!company) {
    throw new Error("❌ Couldn't find company")
  }

  await Promise.all(
    Array.from({ length: Math.max(0, 5 - existingCount) }, async () => {
      await prisma.project.create({
        data: {
          status: 'PUBLISHED',
          companyId: company?.id,
        },
      });
      createdCounter += 1;
    })
  );

  // Create company projects
  await prisma.project.create({
    data: {
      status: 'DRAFT',
      signedAt: new Date('2023-01-01'),
      companyId: company?.id,
    },
  });
  createdCounter += 1;

  console.log(
    `✅ ${existingCount} existing Project 👉 ${createdCounter} projects created`
  );
}
