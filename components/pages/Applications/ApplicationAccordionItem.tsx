import { GiNotebook } from 'react-icons/gi';
import { useDisclosure } from '@chakra-ui/react';
import { AccordionItem, AccordionPanel } from 'components/core/Disclosure/Accordion';
import Button from 'components/core/Interactive/Button';
import { Application, WithDiscordInfos } from 'data/application';
import ApplicationAnswers from './ApplicationAnswers';
import ApplicationHeader from './ApplicationHeader';
import ApplicationModal from './ApplicationModal';

interface ApplicationAccordionItemProps {
  application: WithDiscordInfos<Application>;
}

const ApplicationAccordionItem: React.FC<ApplicationAccordionItemProps> = ({ application }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <AccordionItem key={application._id} data-cy="application" id={application._id}>
      <ApplicationHeader application={application} />
      <AccordionPanel pb={4}>
        <ApplicationAnswers application={application} />
        <Button data-cy="see" marginTop="3" leftIcon={<GiNotebook />} onClick={onOpen}>
          Voir la fiche complète
        </Button>
        <ApplicationModal application={application} isOpen={isOpen} onClose={onClose} />
      </AccordionPanel>
    </AccordionItem>
  );
};

export default ApplicationAccordionItem;
