import { Event } from 'data/event';
import { formatDateInterval } from 'utils/format';
import { CONTINUOUS_LABEL } from 'utils/constants';
import Box from 'components/core/Containers/Box';
import Flex from 'components/core/Containers/Flex';
import Heading from 'components/core/Typography/Heading';
import Text from 'components/core/Typography/Text';
import { Stack } from 'components/core/Containers/Stack';
import { Wrap } from 'components/core/Containers/Wrap';
import Tag from 'components/core/DataDisplay/Tag';
import DiscordButton from 'components/core/Interactive/DiscordButton';
import { EventContext } from './utils';

export interface EventItemProps {
  event: Event;
  context: EventContext;
  eventIsClosed: boolean;
}

const EventItem: React.FC<EventItemProps> = ({ event, context, eventIsClosed }) => {
  const getContextualTextProps = (maxLineNb: number, maxHeight: string) =>
    context === EventContext.LIST
      ? {
          sx: { WebkitLineClamp: maxLineNb, WebkitBoxOrient: 'vertical' },
          maxH: maxHeight,
        }
      : {};

  return (
    <Stack>
      <Flex direction={{ base: 'column', md: 'row' }} align="center" gap={{ base: 2, md: 0 }}>
        <Box w={{ base: '', md: '22%' }} textAlign="left">
          {event.discordLink && <DiscordButton data-cy="discord-link" href={event.discordLink} />}
        </Box>
        <Heading
          w={{ base: 'full', md: '56%' }}
          px="4"
          size="lg"
          textAlign="center"
          variant="limitedWidth"
          whiteSpace={context === EventContext.LIST ? 'nowrap' : 'initial'}
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
