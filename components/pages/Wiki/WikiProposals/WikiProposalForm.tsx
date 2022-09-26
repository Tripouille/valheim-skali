import NextLink from 'next/link';
import React, { useEffect, useState } from 'react';
import Background from 'components/core/Containers/Background';
import Center from 'components/core/Containers/Center';
import { Grid } from 'components/core/Containers/Grid';
import { Stack } from 'components/core/Containers/Stack';
import FormElement from 'components/core/Form/FormElement';
import Input from 'components/core/Form/Input';
import Textarea from 'components/core/Form/Textarea';
import Button from 'components/core/Interactive/Button';
import Link from 'components/core/Interactive/Link';
import PageTitle from 'components/core/Typography/PageTitle';
import {
  WikiPageContent,
  getWikiPageValidationError,
  WIKI_PAGE_VALUES_MAX_LENGTH,
  WikiProposal,
  WikiPage,
} from 'data/wiki';
import { NavRoute, serverName } from 'utils/routes';
import WikiProposalFormPreview from './WikiProposalFormPreview';
import { getWikiFormDataLocalStorageKey, saveWikiFormDataToLocalStorage } from './utils';

const getFormDataFromWikiProposal = (wikiProposal: WikiProposal): WikiPageContent => {
  const lastSuggestion = wikiProposal.suggestions[0] as WikiPageContent;
  return { title: lastSuggestion.title, content: lastSuggestion.content };
};

const getFormDataFromWikiPage = (wikiPage: WikiPage): WikiPageContent => {
  return { title: wikiPage.title, content: wikiPage.content };
};

export interface WikiProposalFormProps {
  wikiPage?: WikiPage;
  wikiProposal?: WikiProposal;
  onSubmit: (formData: WikiPageContent) => void;
}

const WikiProposalForm: React.FC<WikiProposalFormProps> = ({
  wikiPage,
  wikiProposal,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Partial<WikiPageContent>>(() => {
    const localStorageData =
      typeof window !== 'undefined'
        ? localStorage.getItem(getWikiFormDataLocalStorageKey({ wikiProposal, wikiPage }))
        : null;
    if (localStorageData) return JSON.parse(localStorageData);
    else if (wikiProposal) return getFormDataFromWikiProposal(wikiProposal);
    else if (wikiPage) return getFormDataFromWikiPage(wikiPage);
    else return {};
  });
  const [validationError, setValidationError] = useState<string | null>(null);

  const onFormDataChange =
    <T extends keyof WikiPageContent>(key: T) =>
    (value: WikiPageContent[T]) =>
      setFormData(prev => ({ ...prev, [key]: value }));

  useEffect(() => {
    setValidationError(getWikiPageValidationError(formData));
    saveWikiFormDataToLocalStorage({ wikiFormData: formData, wikiProposal, wikiPage });
  }, [formData, wikiProposal, wikiPage]);

  const handleSubmit = () => {
    if (validationError === null) onSubmit(formData as WikiPageContent);
  };

  let pageTitle: string;
  if (wikiProposal) pageTitle = 'Modifier une proposition wiki';
  else if (wikiPage) pageTitle = 'Proposer une modification de page wiki';
  else pageTitle = 'Proposer une nouvelle page wiki';

  return (
    <Background data-cy="wiki-creation-form">
      <Grid templateColumns="1fr auto 1fr" gap="5" width="full">
        <nav>
          {wikiPage && (
            <NextLink href={`/${serverName}${NavRoute.WIKI}/${wikiPage.slug}`} passHref>
              <Link display="block">&larr; Retour à la page wiki</Link>
            </NextLink>
          )}
          {wikiProposal ? (
            <NextLink
              href={`/${serverName}${NavRoute.WIKI}/proposals/${wikiProposal?._id}`}
              passHref
            >
              <Link display="block">&larr; Retour à la proposition</Link>
            </NextLink>
          ) : (
            <NextLink href={`/${serverName}${NavRoute.WIKI}/proposals`} passHref>
              <Link data-cy="back-to-my-proposals">&larr; Retour à mes propositions</Link>
            </NextLink>
          )}
        </nav>

        <PageTitle title={pageTitle} />
      </Grid>
      <Stack spacing="5" align="start" mt="10">
        <FormElement label="Titre" isRequired>
          <Input
            data-cy="title"
            value={formData.title ?? ''}
            onChange={onFormDataChange('title')}
            maxLength={WIKI_PAGE_VALUES_MAX_LENGTH.title}
          />
        </FormElement>
        <FormElement label="Contenu" isRequired>
          <Textarea
            data-cy="content"
            value={formData.content ?? ''}
            onChange={onFormDataChange('content')}
            maxLength={WIKI_PAGE_VALUES_MAX_LENGTH.content}
            height="360px"
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
      {formData.title?.length || formData.content?.length ? (
        <WikiProposalFormPreview title={formData.title ?? ''} content={formData.content ?? ''} />
      ) : null}
    </Background>
  );
};

export default WikiProposalForm;
