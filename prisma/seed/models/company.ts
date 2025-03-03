import { faker } from '@faker-js/faker';
import { emphasis, prisma } from 'prisma/seed/utils';

export async function createCompanies() {
  console.log(`⏳ Seeding companies`);

  let createdCounter = 0;
  const existingCount = await prisma.company.count();

  // Create dummy companies
  await Promise.all(
    Array.from({ length: Math.max(0, 98 - existingCount) }, async () => {
      await prisma.company.create({
        data: {
          name: faker.company.name(),
          siret: faker.string.numeric({length: 14}) // TODO: Check how to use Faker
        },
      });
      createdCounter += 1;
    })
  );

  // Create BBM SARL
  if (!(await prisma.company.findUnique({ where: { siret: '53918535500010' } }))) {
    await prisma.company.create({
      data: {
        name: 'BBM SARL',
        siret: '53918535500010',
      },
    });
    createdCounter += 1;
  }

  console.log(
    `✅ ${existingCount} existing Company 👉 ${createdCounter} companies created`
  );
}
