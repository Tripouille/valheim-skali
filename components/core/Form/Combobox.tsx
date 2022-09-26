import { RefObject, useCallback, useEffect, useState } from 'react';
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverAnchor,
  PopoverContentProps,
} from 'components/core/Overlay/Popover';
import { ListItemProps, UnorderedList } from 'components/core/DataDisplay/List';
import { InputProps } from 'components/core/Form/Input';
import useCircularCounter from 'hooks/useCircularCounter';
import { Children } from 'utils/types';
import { scrollIntoViewIfNeeded } from 'utils/window';

type ComboboxInputProps = Partial<InputProps> & { ref: RefObject<HTMLInputElement> };
type ComboboxListItemProps = Partial<ListItemProps>;
export interface ComboboxProps<T> {
  id?: string;
  inputRef: RefObject<HTMLInputElement>;
  suggestions: T[];
  maxSuggestionsNb?: number;
  selectFirstItemOnPopoverOpening?: boolean;
  onItemValidation: (value: T) => void;
  onEnterWithNoItemSelected?: () => void;
  scrollContainerId?: string;
  popoverStyle?: Omit<PopoverContentProps, 'width'> & { width: (inputWidth: number) => number };
  children: (props: ComboboxInputProps) => Children;
  listItemComponent: (props: ComboboxListItemProps, item: T, isSelected: boolean) => Children;
}

const Combobox = <T,>({
  id = 'combobox',
  inputRef,
  suggestions,
  maxSuggestionsNb = 3,
  selectFirstItemOnPopoverOpening = false,
  onItemValidation,
  onEnterWithNoItemSelected,
  scrollContainerId,
  popoverStyle,
  children,
  listItemComponent,
}: ComboboxProps<T>) => {
  /** Control popover opening */
  const [isPopoverOpen, setPopoverOpen] = useState<boolean>(false);

  /** Length of suggestions list in popover */
  const listLength = Math.min(maxSuggestionsNb, suggestions.length);

  /** Keyboard selection of suggestion item */
  const [selectedItemIndex, selectNextItem, selectPrevItem, unselectItem, selectFirstItem] =
    useCircularCounter(listLength);

  /** Control opening/closing of popover and item selection arising from it */
  const closePopover = useCallback(() => {
    setPopoverOpen(false);
    unselectItem();
  }, [unselectItem]);

  const togglePopoverDependingOnList = useCallback(() => {
    if (listLength) {
      setPopoverOpen(true);
      if (selectedItemIndex) selectFirstItem();
    } else closePopover();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listLength]);

  useEffect(togglePopoverDependingOnList, [listLength, togglePopoverDependingOnList, unselectItem]);

  useEffect(() => {
    if (isPopoverOpen && selectFirstItemOnPopoverOpening) selectFirstItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPopoverOpen]);

  /** When pressing enter or clicking on an item */
  const validate = useCallback(
    (value: T) => {
      onItemValidation(value);
      unselectItem();
    },
    [onItemValidation, unselectItem],
  );

  /** Keyboard events */
  const onInputKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Enter':
          if (selectedItemIndex !== undefined && suggestions.length)
            validate(suggestions[selectedItemIndex] as T);
          else if (onEnterWithNoItemSelected) onEnterWithNoItemSelected();
          break;
        case 'ArrowDown':
          if (listLength) {
            setPopoverOpen(true);
            if (isPopoverOpen) selectNextItem();
            else if (!selectFirstItemOnPopoverOpening) selectFirstItem();
          }
          break;
        case 'ArrowUp':
          if (listLength) {
            setPopoverOpen(true);
            selectPrevItem();
            e.preventDefault(); // prevent from going back to input start
          }
          break;
        case 'Escape':
          closePopover();
          break;
        case 'Tab':
          break; // don't make popup reappear on tab
        default:
          togglePopoverDependingOnList();
      }
    },
    [
      selectedItemIndex,
      validate,
      suggestions,
      onEnterWithNoItemSelected,
      listLength,
      closePopover,
      togglePopoverDependingOnList,
      isPopoverOpen,
      selectNextItem,
      selectFirstItemOnPopoverOpening,
      selectFirstItem,
      selectPrevItem,
    ],
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
            ref: inputRef,
            autoComplete: 'off',
            'aria-autocomplete': 'list',
            onFocus: togglePopoverDependingOnList,
            onClick: togglePopoverDependingOnList,
            onBlur: closePopover,
            spellCheck: false,
          })}
        </div>
      </PopoverAnchor>
      {isPopoverOpen && (
        <PopoverContent
          tabIndex={-1}
          bgColor="blue.800"
          borderTopRadius={0}
          {...popoverStyle}
          width={inputWidth && popoverStyle?.width ? popoverStyle.width(inputWidth) : inputWidth}
        >
          <PopoverBody p="0">
            <UnorderedList styleType="none" m="0" id={listboxId} role="listbox">
              {suggestions.slice(0, maxSuggestionsNb).map((item, index) =>
                listItemComponent(
                  {
                    key: index,
                    id: getItemId(index),
                    role: 'option',
                    'aria-selected': selectedItemIndex === index ? 'true' : undefined,
                    cursor: 'pointer',
                    bgColor: selectedItemIndex === index ? 'whiteAlpha.200' : '',
                    _hover: { backgroundColor: 'whiteAlpha.200' },
                    onMouseDown: e => {
                      e.preventDefault();
                      validate(item);
                    },
                  },
                  item,
                  selectedItemIndex === index,
                ),
              )}
            </UnorderedList>
          </PopoverBody>
        </PopoverContent>
      )}
    </Popover>
  );
};

export default Combobox;
