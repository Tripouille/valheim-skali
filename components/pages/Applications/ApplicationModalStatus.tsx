import { BsPlusLg } from 'react-icons/bs';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { TbArrowBackUp } from 'react-icons/tb';
import { chakra } from '@chakra-ui/react';
import Flex from 'components/core/Containers/Flex';
import Tag from 'components/core/DataDisplay/Tag';
import Button from 'components/core/Interactive/Button';
import ButtonGroup from 'components/core/Interactive/ButtonGroup';
import {
  Application,
  ApplicationStatus,
  APPLICATION_STATUS_TO_LABEL,
  APPLICATION_STATUS_TO_PERMISSIONS,
  WithDiscordInfos,
} from 'data/application';
import { SpecialRoleName } from 'data/role';
import useSetApplicationStatus from 'hooks/applications/useSetApplicationStatus';
import useSession from 'hooks/useSession';
import ApplicationModalStatusChoiceButton from './ApplicationModalStatusChoiceButton';

export const getNextStatus = (status: ApplicationStatus): ApplicationStatus | null => {
  switch (status) {
    case ApplicationStatus.WAITING_FOR_APPOINTMENT:
      return ApplicationStatus.SCHEDULED_APPOINTMENT;
    case ApplicationStatus.SCHEDULED_APPOINTMENT:
      return ApplicationStatus.WAITING_FOR_ANSWER;
    case ApplicationStatus.WAITING_FOR_ANSWER:
      return ApplicationStatus.PROMOTED;
    default:
      return null;
  }
};

interface ApplicationModalStatusProps {
  application: WithDiscordInfos<Application>;
}

const ApplicationModalStatus: React.FC<ApplicationModalStatusProps> = ({ application }) => {
  const { hasRequiredPermissions } = useSession();
  const setApplicationStatus = useSetApplicationStatus(application);

  const canChangeActualStatus = hasRequiredPermissions(
    APPLICATION_STATUS_TO_PERMISSIONS[application.status],
  );
  const nextStatus = getNextStatus(application.status);
  const canUpdateStatusToNext =
    canChangeActualStatus &&
    nextStatus &&
    hasRequiredPermissions(APPLICATION_STATUS_TO_PERMISSIONS[nextStatus]);

  return (
    <Flex align="center" gap="3" marginTop="5">
      <chakra.span color="blue.200">Statut :</chakra.span>
      <Tag label={APPLICATION_STATUS_TO_LABEL[application.status]} />
      {canChangeActualStatus && (
        <ButtonGroup size="sm" isAttached>
          {canUpdateStatusToNext ? (
            <>
              <Button
                size="sm"
                leftIcon={<HiOutlineArrowNarrowRight />}
                onClick={() => setApplicationStatus(nextStatus)}
              >
                {application.status === ApplicationStatus.WAITING_FOR_ANSWER ? (
                  <>
                    Promouvoir comme{' '}
                    <Tag label={SpecialRoleName.MEMBER} marginLeft="1.5" height="1rem" />
                  </>
                ) : (
                  <>
                    Passer en
                    <Tag
                      label={APPLICATION_STATUS_TO_LABEL[nextStatus]}
                      marginLeft="1.5"
                      height="1rem"
                    />
                  </>
                )}
              </Button>
              <ApplicationModalStatusChoiceButton application={application} icon={<BsPlusLg />} />
            </>
          ) : (
            <ApplicationModalStatusChoiceButton
              application={application}
              icon={<TbArrowBackUp />}
            />
          )}
        </ButtonGroup>
      )}
    </Flex>
  );
};

export default ApplicationModalStatus;
