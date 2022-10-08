import { FocusEventHandler, useEffect, useRef, useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { Wrap, WrapItem } from 'components/core/Containers/Wrap';
import Tag from 'components/core/DataDisplay/Tag';
import Button from 'components/core/Interactive/Button';
import { CONTINUOUS_LABEL } from 'utils/constants';
import EventNewTagForm from './EventNewTagForm';

export interface EventTagsFormProps {
  tags?: string[];
  onTagsChange: (fn: (oldTags: string[]) => string[]) => void;
  continuous?: boolean;
  onContinuousChange: (continuous: boolean) => void;
}

const EventTagsForm: React.FC<EventTagsFormProps> = ({
  tags = [],
  onTagsChange,
  continuous = false,
  onContinuousChange,
}) => {
  /** Dislay "Add a tag" button OR new tag input (and submit button) */
  const [showTagInput, setShowTagInput] = useState(false);
  const newTagInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showTagInput) newTagInputRef.current?.focus();
  }, [showTagInput, newTagInputRef]);

  const onEventTagsFormBlur: FocusEventHandler<HTMLDivElement> = e => {
    if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) setShowTagInput(false);
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
            data-cy="tag-continuous"
            label={CONTINUOUS_LABEL}
            size="lg"
            onClose={removeTag(CONTINUOUS_LABEL)}
          />
        </WrapItem>
      )}
      {tags.map((tag, index) => (
        <WrapItem key={tag}>
          <Tag label={tag} size="lg" onClose={removeTag(tag)} data-cy={`tag-${index}`} />
        </WrapItem>
      ))}
      <WrapItem>
        {showTagInput ? (
          <EventNewTagForm
            newTagInputRef={newTagInputRef}
            tags={tags}
            continuous={continuous}
            onContinuousChange={onContinuousChange}
            onTagsChange={onTagsChange}
          />
        ) : (
          <Button
            data-cy="add-tag"
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
