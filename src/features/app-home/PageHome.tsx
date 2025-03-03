import React from 'react';

import { Flex, Heading, Spacer, Stack, Table, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { Logo } from '@/components/Logo';
import { AppLayoutPage } from '@/features/app/AppLayoutPage';
import { trpc } from '@/lib/trpc/client';
import { LoaderFull } from '@/components/LoaderFull';
import { ErrorPage } from '@/components/ErrorPage';
import { Button } from '@/components/ui/button';

export default function PageHome() {
  const { t } = useTranslation(['appHome', 'account']);

  const { data: projects, isLoading, isError } = trpc.projects.getProjectsForCurrentUser.useQuery()
  const currentProject = projects? projects[0] : null;  // TODO: Implement Select project

  if (isLoading) {
    return <LoaderFull />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <AppLayoutPage>
      <Stack flex={1} gap={6}>
        <Flex
          display={{ base: 'flex', md: 'none' }}
          py={2}
          alignItems="center"
          justifyContent="center"
        >
          <Logo />
        </Flex>

        <Stack>
          <Heading fontSize="4xl">{t('appHome:projectTab:title')}</Heading>
          <Spacer/>
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>{t('appHome:projectTab:operationsTable.nameHeader')}</Table.ColumnHeader>
                <Table.ColumnHeader>{t('appHome:projectTab:operationsTable.ademeCodeHeader')}</Table.ColumnHeader>
                <Table.ColumnHeader>{t('appHome:projectTab:operationsTable.statusHeader')}</Table.ColumnHeader>
                <Table.ColumnHeader>{t('appHome:projectTab:operationsTable.attestationRgeHeader')}</Table.ColumnHeader>
                <Table.ColumnHeader></Table.ColumnHeader>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                currentProject?.operations?.map((operation) => {
                  
                  const attestationRge = operation.documents?.find((document) => document.docType === 'ATTESTATION_RGE');
                  
                  return (
                    <Table.Row>

                    {/* OPERATION NAME */}
                    <Table.Cell>
                      <Text display="block">{operation.name}</Text>
                    </Table.Cell>

                      {/* CODE ADEME */}
                      <Table.Cell>
                        <Text display="block">{operation.ademeCode}</Text>
                      </Table.Cell>

                      {/* STATUT */}
                      <Table.Cell>
                        {attestationRge ? "✅" : "❌"}
                      </Table.Cell>

                      {/* ATTESTATION */}
                      <Table.Cell>
                      {/* TODO: Dropdown list */}
                      </Table.Cell>

                      {/* PREVIEW */}
                      <Table.Cell>
                        <Button onClick={()=> {/* TODO: Preview PDF */}}>
                          Voir
                        </Button>
                      </Table.Cell>
                    </Table.Row>)
                })}
            </Table.Body>
          </Table.Root>
          <Spacer />
        </Stack>
      </Stack>
    </AppLayoutPage>
  );
}
