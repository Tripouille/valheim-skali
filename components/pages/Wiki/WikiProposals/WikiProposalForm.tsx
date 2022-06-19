import NextLink from 'next/link';
import React, { useEffect, useState } from 'react';
import { Grid } from '@chakra-ui/react';
import Background from 'components/core/Containers/Background';
import { Stack } from 'components/core/Containers/Stack';
import Center from 'components/core/Containers/Center';
import PageTitle from 'components/core/Typography/PageTitle';
import FormElement from 'components/core/Form/FormElement';
import Input from 'components/core/Form/Input';
import Textarea from 'components/core/Form/Textarea';
import Button from 'components/core/Interactive/Button';
import Link from 'components/core/Interactive/Link';
import {
  WikiPageContent,
  getWikiPageValidationError,
  WIKI_PAGE_VALUES_MAX_LENGTH,
  WikiProposal,
  WikiSuggestion,
  WikiPage,
} from 'data/wiki';
import { NavRoute, serverName } from 'utils/routes';

const getFormDataFromWikiProposal = (wikiProposal: WikiProposal): WikiPageContent => {
  const lastSuggestion = wikiProposal.suggestions.at(-1) as WikiSuggestion;
  return { title: lastSuggestion.title, content: lastSuggestion.content };
};

const getFormDataFromWikiPage = (wikiPage: WikiPage): WikiPageContent => {
  return { title: wikiPage.title, content: wikiPage.content };
};

export interface WikiFormProps {
  wikiPage?: WikiPage;
  wikiProposal?: WikiProposal;
  onSubmit: (formData: WikiPageContent) => void;
}

const WikiForm: React.FC<WikiFormProps> = ({ wikiPage, wikiProposal, onSubmit }) => {
  const [formData, setFormData] = useState<Partial<WikiPageContent>>(
    wikiProposal
      ? getFormDataFromWikiProposal(wikiProposal)
      : wikiPage
      ? getFormDataFromWikiPage(wikiPage)
      : {},
  );
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => setValidationError(getWikiPageValidationError(formData)), [formData]);

  const handleSubmit = () => {
    if (validationError === null) onSubmit(formData as WikiPageContent);
  };

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
              <Link>&larr; Retour à mes propositions</Link>
            </NextLink>
          )}
        </nav>

        <PageTitle
          title={wikiProposal ? 'Modifier une proposition wiki' : 'Proposer une nouvelle page wiki'}
        />
      </Grid>
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
  );
};

export default WikiForm;
