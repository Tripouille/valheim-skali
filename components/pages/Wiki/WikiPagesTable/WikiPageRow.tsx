import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { IoIosEye, IoIosTrash } from 'react-icons/io';
import Box from 'components/core/Containers/Box';
import { Wrap } from 'components/core/Containers/Wrap';
import { Td, Tr } from 'components/core/DataDisplay/Table';
import Tag from 'components/core/DataDisplay/Tag';
import IconButton from 'components/core/Interactive/IconButton';
import { Menu, MenuButton, MenuItem, MenuList } from 'components/core/Overlay/Menu';
import { ActionPopover } from 'components/core/Overlay/Popover';
import { WikiPage, WikiPageTag, wikiPageTags, WIKI_PAGE_TAG_TO_LABEL } from 'data/wiki';
import useDeleteWikiPage from 'hooks/wiki/useDeleteWikiPage';
import useUpdateWikiPageTags from 'hooks/wiki/useUpdateWikiPageTags';
import { rowIconSize } from 'theme/admin';
import { getRoute, NavRoute } from 'utils/routes';
import { CypressProps } from 'utils/types';

export interface WikiPageRowProps extends CypressProps {
  wikiPage: WikiPage;
}

const WikiPageRow: React.FC<WikiPageRowProps> = ({ 'data-cy': dataCy, wikiPage }) => {
  const router = useRouter();

  const { addWikiPageTag, removeWikiPageTag } = useUpdateWikiPageTags(wikiPage);
  const deleteWikiPage = useDeleteWikiPage(wikiPage);

  const navigateToWikiPage = () => {
    router.push(getRoute(`${NavRoute.WIKI}/${wikiPage.slug}`));
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
        <Wrap data-cy="tags-form">
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
      <Td data-cy="views">{wikiPage.views}</Td>
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
      <Td>
        <ActionPopover
          data-cy="delete"
          action={deleteWikiPage}
          label="Supprimer la page wiki"
          confirmLabel="Confirmer la suppression"
          confirmBody="Êtes-vous sûr de vouloir supprimer cette page wiki ? La page et toutes ses propositions associées seront supprimées."
          colorScheme="red"
          leftIcon={<IoIosTrash size="30" />}
          inPortal
        >
          {({ children, onClick }) => (
            <IconButton
              data-cy="delete"
              aria-label={children}
              title={children}
              icon={<IoIosTrash size="30" />}
              variant="ghost"
              color="orange.700"
              size={rowIconSize}
              onClick={onClick}
            />
          )}
        </ActionPopover>
      </Td>
    </Tr>
  );
};

export default WikiPageRow;
