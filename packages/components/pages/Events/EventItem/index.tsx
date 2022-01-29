import { Event } from '@packages/store/events/type';
import Box from '@packages/components/core/Box';
import Flex from '@packages/components/core/Flex';
import Heading from '@packages/components/core/Heading';
import Text from '@packages/components/core/Text';
import { Stack, HStack } from '@packages/components/core/Stack';
import Tag from '@packages/components/core/Tag';
import DiscordButton from '@packages/components/core/DiscordButton';
import { formatDateInterval } from '@packages/utils/format';
import { ElementCategoriesProps } from '@packages/utils/types';
import { EventContext } from '../utils';

export interface EventItemProps extends ElementCategoriesProps {
  event: Event;
  context: EventContext;
  eventIsClosed: boolean;
}

const EventItem: React.FC<EventItemProps> = ({
  event,
  context,
  eventIsClosed,
  elementCategories,
}) => {
  const getContextualTextProps = (maxLineNb: number, maxHeight: string) =>
    context === EventContext.LIST
      ? {
          sx: { WebkitLineClamp: maxLineNb, WebkitBoxOrient: 'vertical' },
          maxH: maxHeight,
        }
      : {};

  return (
    <Stack>
      <Flex>
        <Box flex="1" textAlign="left">
          {event.href && (
            <DiscordButton
              href={event.href}
              elementCategories={elementCategories.concat(['discord-button'])}
            />
          )}
        </Box>
        <Heading
          flex="2.5"
          size="lg"
          textAlign="center"
          whiteSpace={context === EventContext.LIST ? 'nowrap' : undefined}
          textOverflow="ellipsis"
          overflow="hidden"
        >
          {event.name} {eventIsClosed && '(terminé)'}
        </Heading>
        <Box flex="1">
          <HStack
            justifyContent="flex-end"
            wrap="wrap"
            minH="full"
            /** Give space to modal close button */
            pe={context === EventContext.MODAL ? 6 : 0}
            shouldWrapChildren
          >
            {event.tags.map(tag => (
              <Tag key={tag} label={tag} />
            ))}
            {event.continuous && <Tag label="Continu" />}
          </HStack>
        </Box>
      </Flex>
      <Text textAlign="center" fontStyle="italic" pb="2">
        {formatDateInterval(event.startDate, event.endDate, !event.continuous)}
        {event.location && ` - ${event.location}`}
      </Text>
      <Box>
        {event.RPDescription && (
          <Text
            display="-webkit-box"
            whiteSpace="pre-wrap"
            textAlign="justify"
            fontStyle="italic"
            overflow="hidden"
            {...getContextualTextProps(4, '100px')}
            mb="5"
          >
            {event.RPDescription}
          </Text>
        )}
        <Text
          display="-webkit-box"
          whiteSpace="pre-wrap"
          textAlign="justify"
          overflow="hidden"
          {...getContextualTextProps(6, '155px')}
        >
          {event.description}
        </Text>
      </Box>
    </Stack>
  );
};

export default EventItem;
