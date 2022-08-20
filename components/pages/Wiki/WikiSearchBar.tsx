import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useRef, useState } from 'react';
import { GiArchiveResearch } from 'react-icons/gi';
import { InputGroup, InputLeftElement } from '@chakra-ui/react';
import { ListItem } from 'components/core/DataDisplay/List';
import Combobox from 'components/core/Form/Combobox';
import Input from 'components/core/Form/Input';
import Icon from 'components/core/Images/Icon';
import { WikiPage, WIKI_SEARCH_MAX_RESULTS_NB } from 'data/wiki';
import useFindWikiPages from 'hooks/wiki/useFindWikiPages';
import { serverName } from 'utils/routes';

const WikiSearchBar = () => {
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  const [searchString, setSearchString] = useState<string>('');

  const findWikiPagesQuery = useFindWikiPages(searchString);

  const navigateToWikiPage = useCallback(
    (wikiPage: WikiPage) => router.push(`/${serverName}/wiki/${wikiPage.slug}`),
    [router],
  );

  return (
    <Combobox
      id="wiki-search-combobox"
      inputRef={inputRef}
      suggestions={findWikiPagesQuery.data ?? []}
      maxSuggestionsNb={WIKI_SEARCH_MAX_RESULTS_NB}
      selectFirstItemOnPopoverOpening
      onItemValidation={navigateToWikiPage}
      popoverStyle={{ width: inputWidth => inputWidth - 40, ml: 10 }}
      listItemComponent={(listItemProps, wikiPage, isSelected) => (
        <ListItem
          {...listItemProps}
          paddingX={2}
          paddingY={3}
          textDecoration={isSelected ? 'underline' : 'none'}
          _hover={{ ...listItemProps._hover, textDecoration: 'underline' }}
        >
          <NextLink href={`/${serverName}/wiki/${wikiPage.slug}`}>{wikiPage.title}</NextLink>
        </ListItem>
      )}
    >
      {inputProps => (
        <InputGroup>
          <InputLeftElement pointerEvents="none" w="12" h="full">
            <Icon as={GiArchiveResearch} fontSize="3xl" />
          </InputLeftElement>
          <Input
            pl="12"
            size="lg"
            variant="filled"
            bgColor="whiteAlpha.100"
            onChange={setSearchString}
            {...inputProps}
          />
        </InputGroup>
      )}
    </Combobox>
  );
};

export default WikiSearchBar;
