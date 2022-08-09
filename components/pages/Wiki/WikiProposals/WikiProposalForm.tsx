import NextLink from 'next/link';
import React, { useEffect, useState } from 'react';
import { BiCollapse, BiExpand } from 'react-icons/bi';
import { useBoolean } from '@chakra-ui/react';
import Background from 'components/core/Containers/Background';
import Box from 'components/core/Containers/Box';
import Center from 'components/core/Containers/Center';
import { Grid } from 'components/core/Containers/Grid';
import { Stack } from 'components/core/Containers/Stack';
import FormElement from 'components/core/Form/FormElement';
import Input from 'components/core/Form/Input';
import Textarea from 'components/core/Form/Textarea';
import Button from 'components/core/Interactive/Button';
import IconButton from 'components/core/Interactive/IconButton';
import Link from 'components/core/Interactive/Link';
import Heading from 'components/core/Typography/Heading';
import PageTitle from 'components/core/Typography/PageTitle';
import Text from 'components/core/Typography/Text';
import {
  WikiPageContent,
  getWikiPageValidationError,
  WIKI_PAGE_VALUES_MAX_LENGTH,
  WikiProposal,
  WikiPage,
} from 'data/wiki';
import { NavRoute, serverName } from 'utils/routes';
import WikiContent from '../WikiContent';

const getFormDataFromWikiProposal = (wikiProposal: WikiProposal): WikiPageContent => {
  const lastSuggestion = wikiProposal.suggestions[0];
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
  const [formData, setFormData] = useState<Partial<WikiPageContent>>(
    wikiProposal
      ? getFormDataFromWikiProposal(wikiProposal)
      : wikiPage
      ? getFormDataFromWikiPage(wikiPage)
      : {},
  );
  const [validationError, setValidationError] = useState<string | null>(null);
  const [previewHasRestrictedHeight, setPreviewRestrictedHeight] = useBoolean(false);

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
          title={
            wikiProposal
              ? 'Modifier une proposition wiki'
              : wikiPage
              ? 'Proposer une modification de page wiki'
              : 'Proposer une nouvelle page wiki'
          }
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
      {!!formData.title?.length && !!formData.content?.length && (
        <Box mt="10">
          <Grid templateColumns="1fr auto 1fr" gap="5" width="full">
            <Text alignSelf="center" gridColumnStart="2">
              Aperçu :
            </Text>
            <IconButton
              data-cy="switch-preview-height"
              aria-label={
                previewHasRestrictedHeight
                  ? "Agrandir l'aperçu"
                  : "Restreindre la hauteur de l'aperçu"
              }
              title={
                previewHasRestrictedHeight
                  ? "Agrandir l'aperçu"
                  : "Restreindre la hauteur de l'aperçu"
              }
              icon={previewHasRestrictedHeight ? <BiExpand /> : <BiCollapse />}
              variant="ghost"
              justifySelf="end"
              onClick={setPreviewRestrictedHeight.toggle}
            />
          </Grid>
          <Box
            mt="2"
            maxHeight={previewHasRestrictedHeight ? '455px' : undefined}
            overflow="auto"
            px="1"
          >
            <Heading textAlign="center" fontFamily="Norse" size="2xl" fontWeight="normal" mb="7">
              {formData.title}
            </Heading>
            <WikiContent content={formData.content} />
          </Box>
        </Box>
      )}
    </Background>
  );
};

export default WikiProposalForm;
