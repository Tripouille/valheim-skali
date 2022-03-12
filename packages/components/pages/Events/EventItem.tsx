import { DataAttributes, getDataValue } from '@packages/utils/dataAttributes';
import { Event } from '@packages/data/event';
import { formatDateInterval } from '@packages/utils/format';
import { CONTINUOUS_LABEL } from '@packages/utils/constants';
import Box from '@packages/components/core/Containers/Box';
import Flex from '@packages/components/core/Containers/Flex';
import Heading from '@packages/components/core/Typography/Heading';
import Text from '@packages/components/core/Typography/Text';
import { Stack } from '@packages/components/core/Containers/Stack';
import { Wrap } from '@packages/components/core/Containers/Wrap';
import Tag from '@packages/components/core/DataDisplay/Tag';
import DiscordButton from '@packages/components/core/Interactive/DiscordButton';
import { EventContext } from './utils';

export interface EventItemProps extends DataAttributes {
  event: Event;
  context: EventContext;
  eventIsClosed: boolean;
}

const EventItem: React.FC<EventItemProps> = ({ dataCy, event, context, eventIsClosed }) => {
  const getContextualTextProps = (maxLineNb: number, maxHeight: string) =>
    context === EventContext.LIST
      ? {
          sx: { WebkitLineClamp: maxLineNb, WebkitBoxOrient: 'vertical' },
          maxH: maxHeight,
        }
      : {};

  return (
    <Stack>
      <Flex direction={{ base: 'column', md: 'row' }}>
        <Box flex="1" textAlign="left">
          {event.discordLink && (
            <DiscordButton
              dataCy={getDataValue(dataCy, 'discord_button')}
              href={event.discordLink}
            />
          )}
        </Box>
        <Heading
          flex="2.5"
          size="lg"
          textAlign="center"
          variant="limitedWidth"
          whiteSpace={context === EventContext.LIST ? 'nowrap' : 'initial'}
          order={{ base: 1, md: 0 }}
        >
          {event.name} {eventIsClosed && '(terminé)'}
        </Heading>
        <Box flex="1" my={{ base: 2, md: 0 }}>
          <Wrap
            justify={{ base: 'center', md: 'flex-end' }}
            /** Give space to modal close button */
            pe={context === EventContext.MODAL ? { base: 0, md: 6 } : 0}
          >
            {event.tags.map(tag => (
              <Tag key={tag} label={tag} />
            ))}
            {event.continuous && <Tag label={CONTINUOUS_LABEL} />}
          </Wrap>
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
