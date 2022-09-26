import { GiNotebook } from 'react-icons/gi';
import { useDisclosure } from '@chakra-ui/react';
import { AccordionItem, AccordionPanel } from 'components/core/Disclosure/Accordion';
import Button from 'components/core/Interactive/Button';
import { Application, WithDiscordInfos } from 'data/application';
import { Entries } from 'utils/types';
import ApplicationHeader from './ApplicationHeader';
import ApplicationAnswerLine from './ApplicationAnswerLine';
import ApplicationModal from './ApplicationModal';

interface ApplicationAccordionItemProps {
  application: WithDiscordInfos<Application>;
}

const ApplicationAccordionItem: React.FC<ApplicationAccordionItemProps> = ({ application }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const applicationFormEntries = Object.entries(application.applicationFormAnswer) as Entries<
    typeof application['applicationFormAnswer']
  >;

  return (
    <AccordionItem key={application._id} id={application._id}>
      <ApplicationHeader application={application} />
      <AccordionPanel pb={4}>
        {applicationFormEntries.map(([questionKey, answer]) => (
          <ApplicationAnswerLine key={questionKey} questionKey={questionKey} answer={answer} />
        ))}
        <Button marginTop="3" leftIcon={<GiNotebook />} onClick={onOpen}>
          Voir la fiche complète
        </Button>
        <ApplicationModal application={application} isOpen={isOpen} onClose={onClose} />
      </AccordionPanel>
    </AccordionItem>
  );
};

export default ApplicationAccordionItem;
