import React, { useEffect, useState } from 'react';
import {
  WikiPageContent,
  getWikiPageValidationError,
  WIKI_PAGE_VALUES_MAX_LENGTH,
} from 'data/wiki';
import Secured from 'components/core/Authentication/Secured';
import Background from 'components/core/Containers/Background';
import { Stack } from 'components/core/Containers/Stack';
import Center from 'components/core/Containers/Center';
import PageTitle from 'components/core/Typography/PageTitle';
import FormElement from 'components/core/Form/FormElement';
import Input from 'components/core/Form/Input';
import Textarea from 'components/core/Form/Textarea';
import { PermissionCategory, wikiPrivilege } from 'utils/permissions';
import Button from 'components/core/Interactive/Button';
import useCreateWikiPage from './hooks/useCreateWikiPage';

const WikiForm = () => {
  const createWikiPage = useCreateWikiPage();

  const [formData, setFormData] = useState<Partial<WikiPageContent>>({});
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => setValidationError(getWikiPageValidationError(formData)), [formData]);

  const handleSubmit = () => {
    if (validationError === null) createWikiPage(formData);
  };

  return (
    <Secured permissions={{ [PermissionCategory.WIKI]: wikiPrivilege.PROPOSE }}>
      <Background data-cy="wiki-creation-form">
        <PageTitle title="Proposer une nouvelle page wiki" />
        <Stack spacing="5" align="start" mt="10">
          <FormElement label="Titre" isRequired>
            <Input
              data-cy="title"
              value={formData.title ?? ''}
              onChange={title => setFormData(prev => ({ ...prev, title }))}
              maxLength={WIKI_PAGE_VALUES_MAX_LENGTH.title}
            />
          </FormElement>
          <FormElement label="Contenu" isRequired>
            <Textarea
              data-cy="content"
              value={formData.content ?? ''}
              onChange={content => setFormData(prev => ({ ...prev, content }))}
              maxLength={WIKI_PAGE_VALUES_MAX_LENGTH.content}
            />
          </FormElement>
          <Center w="full">
            <Button
              data-cy="submit"
              colorScheme="green"
              mt="5"
              onClick={handleSubmit}
              isDisabled={!!validationError}
              title={validationError ?? undefined}
            >
              Proposer la page
            </Button>
          </Center>
        </Stack>
      </Background>
    </Secured>
  );
};

export default WikiForm;
