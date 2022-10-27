import Head from 'next/head';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  chakra,
} from '@chakra-ui/react';
import { Accordion } from 'components/core/Disclosure/Accordion';
import Heading from 'components/core/Typography/Heading';
import { WikiProposalWithAuthor } from 'data/wiki';
import WikiContent from '../WikiContent';
import WikiProposalHeader from './WikiProposalHeader';

export interface WikiProposalComponentProps {
  wikiProposal: WikiProposalWithAuthor;
}

const WikiProposalComponent: React.FC<WikiProposalComponentProps> = ({ wikiProposal }) => {
  return (
    <>
      <Head>
        <title>Skali - {wikiProposal.suggestions[0]?.title}</title>
      </Head>
      <WikiProposalHeader wikiProposal={wikiProposal} />
      {wikiProposal.authorName && (
        <chakra.address textAlign="end">Proposé par {wikiProposal.authorName}</chakra.address>
      )}
      <Accordion defaultIndex={[0]} allowMultiple w="full">
        {wikiProposal.suggestions.map((suggestion, index) => (
          <AccordionItem as="article" key={index}>
            <AccordionButton
              display="grid"
              gridTemplateColumns="1fr 5fr 1fr"
              gridTemplateAreas={{
                base: `". time icon" "title title title"`,
                lg: `"time title icon"`,
              }}
            >
              <chakra.time
                gridArea="time"
                isTruncated
                textAlign={{ base: undefined, lg: 'start' }}
                alignSelf="start"
                fontStyle="italic"
              >
                {new Date(suggestion.date).toLocaleString(undefined, {
                  month: 'numeric',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })}
              </chakra.time>
              <Heading gridArea="title" minWidth={0}>
                {suggestion.title}
              </Heading>
              <AccordionIcon gridArea="icon" justifySelf="end" alignSelf="start" />
            </AccordionButton>
            <AccordionPanel>
              <WikiContent content={suggestion.content} />
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default WikiProposalComponent;
