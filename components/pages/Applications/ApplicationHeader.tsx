import { AccordionIcon } from '@chakra-ui/react';
import Flex from 'components/core/Containers/Flex';
import Tag from 'components/core/DataDisplay/Tag';
import { AccordionButton } from 'components/core/Disclosure/Accordion';
import Heading from 'components/core/Typography/Heading';
import { Application, APPLICATION_STATUS_TO_LABEL, WithDiscordInfos } from 'data/application';
import ApplicationDate from './ApplicationDate';
import ApplicationIdentity from './ApplicationIdentity';

interface ApplicationHeaderProps {
  application: WithDiscordInfos<Application>;
}

const ApplicationHeader: React.FC<ApplicationHeaderProps> = ({ application }) => (
  <AccordionButton gap="5">
    <Flex
      maxWidth="full"
      flex="1"
      direction={['column', null, 'row']}
      justify="space-between"
      align="center"
      gap="3"
    >
      <Heading minWidth="0" size="l" display="flex" alignItems="center">
        <ApplicationIdentity application={application} />
        <ApplicationDate date={application.createdAt} />
      </Heading>
      <Tag label={APPLICATION_STATUS_TO_LABEL[application.status]} />
    </Flex>
    <AccordionIcon />
  </AccordionButton>
);

export default ApplicationHeader;
