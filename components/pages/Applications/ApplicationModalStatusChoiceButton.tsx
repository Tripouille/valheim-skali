import { ReactElement } from 'react';
import { Radio, RadioGroup, Stack, useDisclosure } from '@chakra-ui/react';
import Tag from 'components/core/DataDisplay/Tag';
import IconButton from 'components/core/Interactive/IconButton';
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from 'components/core/Overlay/Popover';
import {
  Application,
  ApplicationStatus,
  APPLICATION_STATUS_TO_LABEL,
  APPLICATION_STATUS_CHANGE_TO_PERMISSIONS,
  WithDiscordInfos,
} from 'data/application';
import useSetApplicationStatus from 'hooks/applications/useSetApplicationStatus';
import useSession from 'hooks/useSession';

interface ApplicationModalStatusChoiceButtonProps {
  application: WithDiscordInfos<Application>;
  icon: ReactElement;
}

const ApplicationModalStatusChoiceButton: React.FC<ApplicationModalStatusChoiceButtonProps> = ({
  application,
  icon,
}) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { hasRequiredPermissions } = useSession();
  const setApplicationStatus = useSetApplicationStatus(application);

  const onChangeStatus = (status: ApplicationStatus) => {
    setApplicationStatus(status);
    onClose();
  };

  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} isLazy placement="right">
      <PopoverTrigger>
        <IconButton
          data-cy="choose-another-status"
          aria-label="Choisir un autre statut"
          title="Choisir un autre statut"
          icon={icon}
        />
      </PopoverTrigger>
      <PopoverContent data-cy="choose-another-status-popover" bgColor="blue.800">
        <PopoverArrow />
        <PopoverHeader textAlign="center" fontWeight="bold">
          Choisir un autre statut
        </PopoverHeader>
        <PopoverBody>
          <RadioGroup defaultValue={application.status} onChange={onChangeStatus}>
            <Stack>
              {Object.values(ApplicationStatus).map(status => {
                const hasPermission = hasRequiredPermissions(
                  APPLICATION_STATUS_CHANGE_TO_PERMISSIONS[status],
                );
                return (
                  <Radio key={status} value={status} isDisabled={!hasPermission}>
                    <Tag label={APPLICATION_STATUS_TO_LABEL[status]} />
                  </Radio>
                );
              })}
            </Stack>
          </RadioGroup>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default ApplicationModalStatusChoiceButton;
