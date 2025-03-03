import { faker } from '@faker-js/faker';
import { emphasis, prisma } from 'prisma/seed/utils';

export async function createDocuments() {
  console.log(`⏳ Seeding documents`);

  let createdCounter = 0;
  const existingCount = await prisma.document.count();

  const user = await prisma.user.findUnique({ where: { email: 'user@user.com' } })

  // Create dummy documents
  const userAdmin = await prisma.user.findUnique({ where: { email: 'admin@admin.com' } });

  await Promise.all(
    Array.from({ length: Math.max(0, 98 - existingCount) }, async () => {
      await prisma.document.create({
        data: {
          docType: "ATTESTATION_RGE",
        },

      });
      createdCounter += 1;
    })
  );

  // Create attestation RGE - Qualibat
  const uri1 = "https://entreprise.api.gouv.fr/files/exemple-ademe-rge-certificat_qualibat.pdf";
  const operation = await prisma.operation.findFirstOrThrow({ where: { ademeCode: 'BAR-EN-102' }});

  await prisma.document.create({
    data: {
      docType: 'ATTESTATION_RGE',
      fileName: 'rge-qualibat.pdf',
      uri: uri1,
      startDate: new Date('2022-10-25'),
      endDate: new Date('2023-10-25'),
      uploadedById: userAdmin?.id,
      operations: {
        connect: {id: operation.id}, // This document is already linked to an operation
      }
    },
  });
  createdCounter += 1;

  // Create attestation RGE - Qualibois
  const uri2 = "https://chemineelagourgue.fr/wp-content/uploads/2023/01/RGE-QUALIBOIS-2023-2024.png";

  await prisma.document.create({
    data: {
      docType: 'ATTESTATION_RGE',
      fileName: 'rge-qualibois.pdf',
      uri: uri2,
      startDate: new Date('2022-10-25'),
      endDate: new Date('2023-10-25'),
      uploadedById: userAdmin?.id,
    },
  });
  createdCounter += 1;

  console.log(
    `✅ ${existingCount} existing Document 👉 ${createdCounter} documents created`
  );
}
