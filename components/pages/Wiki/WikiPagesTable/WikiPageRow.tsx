import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { IoIosEye } from 'react-icons/io';
import Box from 'components/core/Containers/Box';
import { Wrap } from 'components/core/Containers/Wrap';
import { Td, Tr } from 'components/core/DataDisplay/Table';
import Tag from 'components/core/DataDisplay/Tag';
import IconButton from 'components/core/Interactive/IconButton';
import { Menu, MenuButton, MenuItem, MenuList } from 'components/core/Overlay/Menu';
import { WikiPage, WikiPageTag, wikiPageTags, WIKI_PAGE_TAG_TO_LABEL } from 'data/wiki';
import useUpdateWikiPageTags from 'hooks/wiki/useUpdateWikiPageTags';
import { rowIconSize } from 'theme/admin';
import { NavRoute, serverName } from 'utils/routes';
import { CypressProps } from 'utils/types';

export interface WikiPageRowProps extends CypressProps {
  wikiPage: WikiPage;
}

const WikiPageRow: React.FC<WikiPageRowProps> = ({ 'data-cy': dataCy, wikiPage }) => {
  const router = useRouter();
  const { addWikiPageTag, removeWikiPageTag } = useUpdateWikiPageTags(wikiPage);

  const navigateToWikiPage = () => {
    router.push(`/${serverName}${NavRoute.WIKI}/${wikiPage.slug}`);
  };

  const addableTags = useMemo(
    () => wikiPageTags.filter(tag => !wikiPage.tags?.includes(tag)),
    [wikiPage.tags],
  );

  const addTag =
    (tag: WikiPageTag): React.MouseEventHandler<HTMLButtonElement> =>
    e => {
      e.stopPropagation();
      addWikiPageTag(tag);
    };

  const removeTag =
    (tag: WikiPageTag): React.MouseEventHandler<HTMLButtonElement> =>
    e => {
      e.stopPropagation();
      removeWikiPageTag(tag);
    };

  return (
    <Tr cursor="pointer" onClick={navigateToWikiPage} data-cy={dataCy}>
      <Td>{wikiPage.title}</Td>
      <Td>
        <Wrap data-cy="roles-form">
          {wikiPage.tags?.map(tag => (
            <Tag
              data-cy={tag}
              key={tag}
              label={WIKI_PAGE_TAG_TO_LABEL[tag]}
              onClose={removeTag(tag)}
            />
          ))}
          {addableTags.length > 0 && (
            <Box>
              <Menu placement="bottom" gutter={0}>
                <MenuButton
                  data-cy="add-tag"
                  as={IconButton}
                  icon={<BsPlusLg />}
                  title="Ajouter un tag"
                  colorScheme="green"
                  size="xs"
                  onClick={e => e.stopPropagation()}
                />
                <MenuList minW="min-content">
                  {addableTags.map(tag => (
                    <MenuItem
                      key={tag}
                      data-cy={`add-tag-${tag}`}
                      justifyContent="center"
                      onClick={addTag(tag)}
                    >
                      <Tag label={WIKI_PAGE_TAG_TO_LABEL[tag]} size="lg" />
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Box>
          )}
        </Wrap>
      </Td>
      <Td>{wikiPage.views}</Td>
      <Td>
        <IconButton
          data-cy="see"
          aria-label="Voir la page"
          title="Voir la page"
          icon={<IoIosEye size="30" />}
          variant="ghost"
          size={rowIconSize}
          onClick={navigateToWikiPage}
        />
      </Td>
    </Tr>
  );
};

export default WikiPageRow;
