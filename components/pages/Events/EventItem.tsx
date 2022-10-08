import { forwardRef } from 'react';
import Box from 'components/core/Containers/Box';
import Flex from 'components/core/Containers/Flex';
import { Stack } from 'components/core/Containers/Stack';
import { Wrap } from 'components/core/Containers/Wrap';
import Tag from 'components/core/DataDisplay/Tag';
import DiscordButton from 'components/core/Interactive/DiscordButton';
import Heading from 'components/core/Typography/Heading';
import Text from 'components/core/Typography/Text';
import { Event } from 'data/event';
import { CONTINUOUS_LABEL } from 'utils/constants';
import { formatDateInterval } from 'utils/format';
import { EventContext } from './utils';

export interface EventItemProps {
  event: Event;
  context: EventContext;
  eventIsClosed: boolean;
}

const EventItem = forwardRef<HTMLDivElement, EventItemProps>(
  ({ event, context, eventIsClosed }, ref) => {
    const getContextualTextProps = (maxLineNb: number, maxHeight: string) =>
      context === EventContext.LIST
        ? {
            sx: { WebkitLineClamp: maxLineNb, WebkitBoxOrient: 'vertical' },
            maxH: maxHeight,
          }
        : {};

    return (
      <Stack ref={ref}>
        <Flex direction={{ base: 'column', md: 'row' }} align="center" gap={{ base: 2, md: 0 }}>
          <Box w={{ base: '', md: '22%' }} textAlign="left">
            {event.discordLink && <DiscordButton data-cy="discord-link" href={event.discordLink} />}
          </Box>
          <Heading
            w={{ base: 'full', md: '56%' }}
            px="4"
            size="lg"
            textAlign="center"
            noOfLines={context === EventContext.LIST ? 1 : undefined}
          >
            {event.name} {eventIsClosed && '(terminé)'}
          </Heading>
        </Flex>
        {event.tags.length && (
          <Wrap justify="center">
            {event.tags.map(tag => (
              <Tag key={tag} label={tag} />
            ))}
            {event.continuous && <Tag label={CONTINUOUS_LABEL} />}
          </Wrap>
        )}
        <Text textAlign="center" fontStyle="italic" pb="2" suppressHydrationWarning>
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
  },
);

EventItem.displayName = 'EventItem';
export default EventItem;
