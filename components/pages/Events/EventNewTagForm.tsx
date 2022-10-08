import React, { KeyboardEventHandler, RefObject, useEffect, useRef, useState } from 'react';
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

  /** Briefly style input on error (adding a tag already chosen) */
  const tagInputErrorTimeoutId = useRef<number>();
  const [showInvalidTagInput, setShowInvalidTagInput] = useState(false);

  useEffect(() => {
    return () => {
      const timeoutId = tagInputErrorTimeoutId.current;
      clearTimeout(timeoutId);
    };
  }, []);

  const startInvalidTagInputTimeout = () => {
    clearTimeout(tagInputErrorTimeoutId.current);
    setShowInvalidTagInput(true);
    tagInputErrorTimeoutId.current = window.setTimeout(() => setShowInvalidTagInput(false), 400);
  };

  /** Action to add tag */
  const resetNewTagInput = () => {
    setTagEntry('');
    newTagInputRef.current?.focus();
  };

  const onNewTagSelection = (value: string) => {
    if (!value) return;
    if (value === CONTINUOUS_LABEL) {
      if (continuous) {
        startInvalidTagInputTimeout();
      } else {
        onContinuousChange(true);
        resetNewTagInput();
      }
    } else {
      onTagsChange(oldTags => {
        if (!oldTags.includes(value)) {
          resetNewTagInput();
          return [...oldTags, value];
        } else {
          startInvalidTagInputTimeout();
          newTagInputRef.current?.focus();
          return oldTags;
        }
      });
    }
  };

  /** Prevent closing the global event form modal */
  const onNewTagInputKeyDown: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Escape') e.stopPropagation();
  };

  return (
    <FormControl display="flex" isInvalid={showInvalidTagInput}>
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
            onKeyDown={onNewTagInputKeyDown}
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
      />
    </FormControl>
  );
};

export default EventNewTagForm;
