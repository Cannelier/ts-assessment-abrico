import { faker } from '@faker-js/faker';
import { emphasis, prisma } from 'prisma/seed/utils';

export async function createOperations() {
  console.log(`⏳ Seeding operations`);

  let createdCounter = 0;
  const existingCount = await prisma.operation.count();

  // Create dummy operations linked to project
  const project = await prisma.project.findFirstOrThrow({ where: { signedAt: new Date('2023-01-01') }});
  await prisma.operation.create({
    data: {
      name: "Isolation des murs",
      projectId: project.id,
      ademeCode: 'BAR-EN-102'
    },
  });
  createdCounter += 1;

  await prisma.operation.create({
    data: {
      name: "Isolation des combles",
      projectId: project.id,
      ademeCode: 'BAR-EN-101',
    },
  });
  createdCounter += 1;

  console.log(
    `✅ ${existingCount} existing Operation 👉 ${createdCounter} operations created`
  );
}
