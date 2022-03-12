import { FormEventHandler, useEffect, useRef, useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { EVENT_TAG_MAX_LENGTH } from '@packages/data/event';
import { DataAttributes, getDataValue } from '@packages/utils/dataAttributes';
import { CONTINUOUS_LABEL } from '@packages/utils/constants';
import { Wrap } from '@packages/components/core/Containers/Wrap';
import Tag from '@packages/components/core/DataDisplay/Tag';
import Button from '@packages/components/core/Interactive/Button';
import Input from '@packages/components/core/Form/Input';
import { FormControl } from '@packages/components/core/Form/FormControl';
import IconButton from '@packages/components/core/Interactive/IconButton';

export interface EventTagsFormProps extends DataAttributes {
  tags?: string[];
  onChange: (fn: (oldTags: string[]) => string[]) => void;
  continuous?: boolean;
}

const EventTagsForm: React.FC<EventTagsFormProps> = ({
  dataCy,
  tags = [],
  onChange,
  continuous = false,
}) => {
  const newTagInput = useRef<HTMLInputElement>(null);
  const tagInputErrorTimeoutId = useRef<number | undefined>();
  const [showTagInput, setShowTagInput] = useState(false);
  const [showInvalidTagInput, setShowInvalidTagInput] = useState(false);

  useEffect(() => {
    if (showTagInput) newTagInput.current?.focus();
  }, [showTagInput]);

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

  const submitTagForm: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    onChange(oldTags => {
      const newTag = newTagInput.current?.value;
      if (newTag) {
        if (!oldTags.includes(newTag) && newTag !== CONTINUOUS_LABEL) {
          newTagInput.current.value = '';
          return [...oldTags, newTag];
        } else {
          startInvalidTagInputTimeout();
        }
      }
      return oldTags;
    });
  };

  const removeTag = (removedTag: string) => () => {
    onChange(oldTags => oldTags.filter(tag => tag !== removedTag));
  };

  return (
    <Wrap w="full">
      {continuous && <Tag label={CONTINUOUS_LABEL} size="lg" />}
      {tags.map((tag, index) => (
        <Tag
          key={tag}
          label={tag}
          size="lg"
          onClose={removeTag(tag)}
          dataCy={getDataValue(dataCy, 'tag', index.toString())}
        />
      ))}
      {showTagInput ? (
        <form onSubmit={submitTagForm} onReset={() => setShowTagInput(false)}>
          <FormControl display="flex" isInvalid={showInvalidTagInput}>
            <Input
              dataCy={getDataValue(dataCy, 'add_tag', 'input')}
              w="36"
              ref={newTagInput}
              showInvalidOverFocus
              maxLength={EVENT_TAG_MAX_LENGTH}
              onKeyUp={e => {
                if (e.key === 'Escape') setShowTagInput(false);
              }}
            />
            {/* Display autocomplete popover with previous event tags */}
            <IconButton
              dataCy={getDataValue(dataCy, 'add_tag', 'submit')}
              type="submit"
              aria-label="Ajouter le tag"
              icon={<BsPlusLg />}
              colorScheme="green"
              ms="1"
            />
          </FormControl>
        </form>
      ) : (
        <Button
          dataCy={getDataValue(dataCy, 'add_tag', 'button')}
          leftIcon={<BsPlusLg />}
          colorScheme="green"
          onClick={() => setShowTagInput(true)}
        >
          Ajouter un tag
        </Button>
      )}
    </Wrap>
  );
};

export default EventTagsForm;
