import React, { useState } from 'react';

import { Flex, Heading, NativeSelect, Select, Spacer, Stack, Table, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { Logo } from '@/components/Logo';
import { AppLayoutPage } from '@/features/app/AppLayoutPage';
import { trpc } from '@/lib/trpc/client';
import { LoaderFull } from '@/components/LoaderFull';
import { ErrorPage } from '@/components/ErrorPage';
import { Button } from '@/components/ui/button';

import { Operation } from '../operations/schemas';
import { Document } from '../documents/schemas';

export default function PageHome() {
  const { t } = useTranslation(['appHome', 'account']);

  const { data: projects, isLoading: areProjectsLoading, isError: areProjectsError } = trpc.projects.getProjectsForCurrentUser.useQuery();
  const { data: documentOptions, isLoading: areDocumentsLoading, isError: areDocumentsError } = trpc.documents.getDocumentsForCurrentUser.useQuery();
  
  const isLoading = areProjectsLoading || areDocumentsLoading;
  const isError = areProjectsError || areDocumentsError;

  const currentProject = projects? projects[0] : null;  // TODO: Implement Select project
  
  // We build the mapping between an Operation and its Document

  const [selectedDocuments, setSelectedDocuments] = useState(currentProject?.operations?.reduce(
    (acc, operation) => { 
      acc[operation.id] = getAttestationRgeForOperation(operation);
      return acc;
    }, {}
  ));

  // Handle selection change
  const handleChange = (operationId: string, documentId: string) => {
    const selectedDocument = documentOptions.find((document) => document.id === documentId);
    setSelectedDocuments((prev) => ({
      ...prev,
      [operationId]: selectedDocument,
    }));
  };
  

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
          {/* OPERATIONS TABLE */}
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
                  
                  const attestationRge = getAttestationRgeForOperation(operation);
                  
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
                        <NativeSelect.Root>
                          <NativeSelect.Field
                            value={selectedDocuments ? selectedDocuments[operation?.id]?.id : ""}
                            onChange={(e) => handleChange(operation.id, e.target.value)}
                          >
                            { documentOptions.map((documentOption) => {
                              return (<option value={documentOption.id}>{documentOption.uri}</option>)
                            })}
                          </NativeSelect.Field>
                        </NativeSelect.Root>
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

function getAttestationRgeForOperation(operation: Operation) {
  return operation.documents?.find((document: Document) => document.docType === 'ATTESTATION_RGE');
}