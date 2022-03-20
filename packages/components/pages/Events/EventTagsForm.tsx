import { FocusEventHandler, useEffect, useRef, useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { DataAttributes, getDataValue } from '@packages/utils/dataAttributes';
import { CONTINUOUS_LABEL } from '@packages/utils/constants';
import { Wrap, WrapItem } from '@packages/components/core/Containers/Wrap';
import Tag from '@packages/components/core/DataDisplay/Tag';
import Button from '@packages/components/core/Interactive/Button';
import EventNewTagForm from './EventNewTagForm';

export interface EventTagsFormProps extends DataAttributes {
  tags?: string[];
  onTagsChange: (fn: (oldTags: string[]) => string[]) => void;
  continuous?: boolean;
  onContinuousChange: (continuous: boolean) => void;
}

const EventTagsForm: React.FC<EventTagsFormProps> = ({
  dataCy,
  tags = [],
  onTagsChange,
  continuous = false,
  onContinuousChange,
}) => {
  const newTagInputRef = useRef<HTMLInputElement>(null);

  /** Dislay "Add a tag" button OR new tag input (and submit button) */
  const [showTagInput, setShowTagInput] = useState(false);

  useEffect(() => {
    if (showTagInput) newTagInputRef.current?.focus();
  }, [showTagInput, newTagInputRef]);

  const onEventTagsFormBlur: FocusEventHandler<HTMLDivElement> = e => {
    if (!e.currentTarget.contains(e.relatedTarget)) setShowTagInput(false);
  };

  /** Action to remove tag */
  const removeTag = (removedTag: string) => () => {
    if (removedTag === CONTINUOUS_LABEL) onContinuousChange(false);
    else onTagsChange(oldTags => oldTags.filter(tag => tag !== removedTag));
    if (showTagInput) newTagInputRef.current?.focus();
  };

  return (
    <Wrap w="full" shouldWrapChildren={false} onBlur={onEventTagsFormBlur}>
      {continuous && (
        <WrapItem>
          <Tag
            dataCy={getDataValue(dataCy, 'tag', 'continuous')}
            label={CONTINUOUS_LABEL}
            size="lg"
            onClose={removeTag(CONTINUOUS_LABEL)}
          />
        </WrapItem>
      )}
      {tags.map((tag, index) => (
        <WrapItem key={tag}>
          <Tag
            label={tag}
            size="lg"
            onClose={removeTag(tag)}
            dataCy={getDataValue(dataCy, 'tag', index)}
          />
        </WrapItem>
      ))}
      <WrapItem>
        {showTagInput ? (
          <EventNewTagForm
            dataCy={getDataValue(dataCy, 'new_tag')}
            newTagInputRef={newTagInputRef}
            tags={tags}
            continuous={continuous}
            onContinuousChange={onContinuousChange}
            onTagsChange={onTagsChange}
          />
        ) : (
          <Button
            dataCy={getDataValue(dataCy, 'add_tag_button')}
            leftIcon={<BsPlusLg />}
            colorScheme="green"
            onClick={() => setShowTagInput(true)}
          >
            Ajouter un tag
          </Button>
        )}
      </WrapItem>
    </Wrap>
  );
};

export default EventTagsForm;
