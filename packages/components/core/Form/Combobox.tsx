import { RefObject, useCallback, useEffect, useState } from 'react';
import { PopoverAnchor } from '@chakra-ui/react'; //TODO
import { Children } from '@packages/utils/types';
import { positiveModulo } from '@packages/utils/number';
import { scrollIntoViewIfNeeded } from '@packages/utils/window';
import { Popover, PopoverBody, PopoverContent } from '@packages/components/core/Overlay/Popover';
import { ListItem, UnorderedList } from '@packages/components/core/DataDisplay/List';
import Tag from '@packages/components/core/DataDisplay/Tag';
import { InputProps } from '@packages/components/core/Form/Input';

interface ComboboxChildrenProps {
  getInputProps: Partial<InputProps> & { ref: RefObject<HTMLInputElement> };
}

export interface ComboboxProps {
  children: (props: ComboboxChildrenProps) => Children;
  id?: string;
  inputRef: RefObject<HTMLInputElement>;
  entry: string;
  setEntry: (value: string) => void;
  suggestions: string[];
  maxSuggestionsNb?: number;
  onItemSelection: (value: string) => void;
  scrollContainerId?: string;
}

const Combobox: React.FC<ComboboxProps> = ({
  children,
  id = 'combobox',
  inputRef,
  entry,
  setEntry,
  suggestions,
  maxSuggestionsNb = 3,
  onItemSelection,
  scrollContainerId,
}) => {
  /** Control popover opening */
  const [isPopoverOpen, setPopoverOpen] = useState<boolean>(false);

  /** Length of suggestions list in popover */
  const listLength = Math.min(maxSuggestionsNb, suggestions.length);

  /** Keyboard selection of suggestion item */
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>();

  useEffect(() => {
    setSelectedItemIndex(undefined);
    if (listLength > 0) setPopoverOpen(true);
    else setPopoverOpen(false);
  }, [listLength]);

  const select = useCallback(
    (value: string) => {
      onItemSelection(value);
      setSelectedItemIndex(undefined);
    },
    [onItemSelection],
  );

  /** Keyboard events */
  const onInputKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Enter':
          select(selectedItemIndex !== undefined ? suggestions[selectedItemIndex] : entry);
          break;
        case 'ArrowDown':
          setPopoverOpen(true);
          if (listLength)
            setSelectedItemIndex(prev =>
              prev === undefined ? 0 : positiveModulo(prev + 1, listLength),
            );
          break;
        case 'ArrowUp':
          setPopoverOpen(true);
          if (listLength)
            setSelectedItemIndex(prev =>
              prev === undefined ? listLength - 1 : positiveModulo(prev - 1, listLength),
            );
          break;
        case 'Escape':
          setSelectedItemIndex(undefined);
          setPopoverOpen(false);
          break;
        case 'Tab':
          break; // don't make popup reappear on tab
        default:
          setPopoverOpen(true);
      }
    },
    [listLength, entry, selectedItemIndex, suggestions, select],
  );

  /** Make popover width match input width */
  const [inputWidth, setInputWidth] = useState<number>();

  useEffect(() => {
    if (inputRef.current) {
      const input = inputRef.current;
      setInputWidth(input.offsetWidth);
      input.addEventListener('keydown', onInputKeyDown as EventListenerOrEventListenerObject);
      return () => {
        input.removeEventListener('keydown', onInputKeyDown as EventListenerOrEventListenerObject);
      };
    }
  }, [inputRef, onInputKeyDown]);

  const onInputBlur = () => {
    setPopoverOpen(false);
  };

  const onInputFocus = () => {
    setPopoverOpen(true);
  };

  const listboxId = `${id}-listbox`;
  const getItemId = (index: number) => `suggestion-${index}`;

  /** Scroll suggestions list into view if needed */
  useEffect(() => {
    if (isPopoverOpen) {
      const listbox = document.getElementById(listboxId);
      const scrollContainer = scrollContainerId
        ? document.getElementById(scrollContainerId)
        : undefined;
      if (listbox) scrollIntoViewIfNeeded(listbox, scrollContainer);
    }
  }, [isPopoverOpen, listboxId, scrollContainerId, listLength]);

  return (
    <Popover
      isLazy
      isOpen={isPopoverOpen}
      gutter={0}
      placement="bottom-start"
      initialFocusRef={inputRef}
    >
      <PopoverAnchor>
        <div
          id={id}
          role="combobox"
          aria-controls={isPopoverOpen ? listboxId : undefined}
          aria-expanded={isPopoverOpen}
          aria-owns={listboxId}
          aria-activedescendant={
            selectedItemIndex !== undefined ? getItemId(selectedItemIndex) : undefined
          }
        >
          {children({
            getInputProps: {
              ref: inputRef,
              autoComplete: 'off',
              'aria-autocomplete': 'list',
              value: entry,
              onChange: setEntry,
              onFocus: onInputFocus,
              onBlur: onInputBlur,
            },
          })}
        </div>
      </PopoverAnchor>
      {isPopoverOpen && (
        <PopoverContent w={inputWidth} tabIndex={-1}>
          <PopoverBody p="0">
            <UnorderedList styleType="none" m="0" id={listboxId} role="listbox">
              {suggestions.slice(0, maxSuggestionsNb).map((tag, index) => (
                <ListItem
                  key={tag}
                  id={getItemId(index)}
                  role="option"
                  aria-selected={selectedItemIndex === index ? 'true' : undefined}
                  bgColor={selectedItemIndex === index ? 'whiteAlpha.200' : ''}
                  _hover={{ backgroundColor: 'whiteAlpha.200' }}
                  onMouseDown={e => {
                    e.preventDefault();
                    select(tag);
                  }}
                >
                  <Tag label={tag} m="1" />
                </ListItem>
              ))}
            </UnorderedList>
          </PopoverBody>
        </PopoverContent>
      )}
    </Popover>
  );
};

export default Combobox;
