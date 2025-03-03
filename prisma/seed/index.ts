import { createRepositories } from 'prisma/seed/models/repository';
import { createUsers } from 'prisma/seed/models/user';
import { prisma } from 'prisma/seed/utils';
import { createCompanies } from 'prisma/seed/models/company';
import { createProjects } from 'prisma/seed/models/project';
import { createDocuments } from 'prisma/seed/models/document';
import { createOperations } from 'prisma/seed/models/operation';

async function main() {
  await createRepositories();
  await createCompanies();
  await createUsers();
  await createProjects();
  await createOperations();
  await createDocuments();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
