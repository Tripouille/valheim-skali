import React, { RefObject, useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { ListItem } from 'components/core/DataDisplay/List';
import Tag from 'components/core/DataDisplay/Tag';
import Combobox from 'components/core/Form/Combobox';
import { FormControl } from 'components/core/Form/FormControl';
import Input from 'components/core/Form/Input';
import IconButton from 'components/core/Interactive/IconButton';
import { EVENT_TAG_MAX_LENGTH } from 'data/event';
import useFilteredTags from 'hooks/events/useFilteredTags';
import { CONTINUOUS_LABEL } from 'utils/constants';

export interface EventNewTagFormProps {
  tags: string[];
  onTagsChange: (fn: (oldTags: string[]) => string[]) => void;
  continuous: boolean;
  onContinuousChange: (continuous: boolean) => void;
  newTagInputRef: RefObject<HTMLInputElement>;
}

const EventNewTagForm: React.FC<EventNewTagFormProps> = ({
  tags,
  onTagsChange,
  continuous,
  onContinuousChange,
  newTagInputRef,
}) => {
  /** Use entry in new tag input to get tag suggestions */
  const [tagEntry, setTagEntry] = useState('');
  const filteredTags = useFilteredTags(tags, tagEntry);

  const isValidTag = (value: string) => {
    return (
      value.trim().length > 0 &&
      !tags.some(tag => tag.trim().toLowerCase() === value.trim().toLowerCase()) &&
      (value.trim().toLowerCase() !== CONTINUOUS_LABEL.toLowerCase() || !continuous)
    );
  };

  /** Action to add tag */
  const onNewTagSelection = (value: string) => {
    if (!isValidTag(value)) return;
    if (value.toLowerCase() === CONTINUOUS_LABEL.toLowerCase()) {
      onContinuousChange(true);
    } else {
      onTagsChange(oldTags => [...oldTags, value]);
    }
    setTagEntry('');
    newTagInputRef.current?.focus();
  };

  return (
    <FormControl display="flex">
      <Combobox
        id="event-tags-combobox"
        inputRef={newTagInputRef}
        suggestions={filteredTags}
        onItemValidation={onNewTagSelection}
        onEnterWithNoItemSelected={() => onNewTagSelection(tagEntry)}
        scrollContainerId="event-form-modal-body"
        listItemComponent={(listItemProps, tag) => (
          <ListItem key={tag} {...listItemProps}>
            <Tag label={tag} m="1" />
          </ListItem>
        )}
      >
        {inputProps => (
          <Input
            data-cy="new-tag"
            w="36"
            showInvalidOverFocus
            maxLength={EVENT_TAG_MAX_LENGTH}
            value={tagEntry}
            onChange={setTagEntry}
            {...inputProps}
          />
        )}
      </Combobox>
      <IconButton
        data-cy="submit-new-tag"
        aria-label="Ajouter le tag"
        icon={<BsPlusLg />}
        colorScheme="green"
        ms="1"
        onClick={() => onNewTagSelection(tagEntry)}
        disabled={!isValidTag(tagEntry)}
      />
    </FormControl>
  );
};

export default EventNewTagForm;
