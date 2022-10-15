import React, { useEffect, useState } from 'react';
import FormFullPage from 'components/core/Form/FormFullPage';
import FormModal from 'components/core/Form/FormModal';
import { ModalBody, ModalHeader } from 'components/core/Overlay/Modal';
import {
  Application,
  ApplicationFormAnswer,
  applicationFormKeys,
  CreateApplicationData,
  getApplicationValidationError,
  WithDiscordInfos,
} from 'data/application';
import useSession from 'hooks/useSession';
import { applicationPrivilege, PermissionCategory } from 'utils/permissions';
import { Callback } from 'utils/types';
import ApplicationFormFields from './ApplicationFormFields';

const initialFormApplicationData: CreateApplicationData = {
  discordName: '',
  applicationFormAnswer: applicationFormKeys.reduce(
    (acc, key) => ({ ...acc, [key]: '' }),
    {} as ApplicationFormAnswer,
  ),
};

const getApplicationFormData = (
  application: WithDiscordInfos<Application>,
): CreateApplicationData => ({
  applicationFormAnswer: application.applicationFormAnswer,
  ...('userId' in application
    ? { userId: application.userId as string }
    : { discordName: application.discordName }),
});

type ApplicationFormProps = { onSubmit: (newApplication: CreateApplicationData) => void } & (
  | { application: WithDiscordInfos<Application>; onDelete: Callback }
  | { application?: never; onDelete?: never }
) &
  (
    | {
        display: 'modal';
        isOpen: boolean;
        onClose: Callback;
      }
    | { display: 'fullPage'; isOpen?: never; onClose?: never }
  );

const ApplicationForm: React.FC<ApplicationFormProps> = props => {
  const { application, onSubmit } = props;
  const isEdition = !!application;

  const { hasRequiredPermissions } = useSession();
  const hasManageApplicationsPermission = hasRequiredPermissions({
    [PermissionCategory.APPLICATION]: applicationPrivilege.MANAGE,
  });
  const isOwnApplication = !hasManageApplicationsPermission;

  const [applicationFormData, setApplicationFormData] = useState<CreateApplicationData>(
    isEdition ? getApplicationFormData(application) : initialFormApplicationData,
  );

  useEffect(() => {
    if (props.display === 'modal' && props.isOpen)
      setApplicationFormData(
        isEdition ? getApplicationFormData(application) : initialFormApplicationData,
      );
  }, [application, isEdition, props.display, props.isOpen]);

  const deleteLabel = isOwnApplication ? 'Supprimer ma candidature' : 'Supprimer la candidature';
  const deletePopoverBody = isOwnApplication
    ? "Êtes-vous sûr de vouloir supprimer votre candidature ? Si vous avez été refusé, ce n'est pas nécessaire. Sinon, n'hésitez pas à venir nous parler de ce qui vous dérange. Vous devrez recommencer tout le processus de recrutement si vous souhaitez nous rejoindre."
    : 'Êtes-vous sûr de vouloir supprimer cette candidature ? Vous pouvez la refuser et la garder pour archive.';

  if (props.display === 'modal')
    return (
      <FormModal
        data-cy={isEdition ? 'edit-application-modal' : 'create-application-modal'}
        isOpen={props.isOpen}
        onClose={props.onClose}
        formData={applicationFormData}
        getValidationError={getApplicationValidationError}
        onSubmit={onSubmit}
        {...(isEdition
          ? { isEdition: true, onDelete: props.onDelete, deleteLabel, deletePopoverBody }
          : { isEdition: false })}
      >
        <ModalHeader textAlign="center">
          {isEdition ? 'Modifier la candidature' : 'Nouvelle candidature'}
        </ModalHeader>
        <ModalBody id="application-form-modal-body">
          <ApplicationFormFields
            formData={applicationFormData}
            setFormData={setApplicationFormData}
          />
        </ModalBody>
      </FormModal>
    );
  // props.display === 'fullPage'
  else
    return (
      <FormFullPage
        formData={applicationFormData}
        getValidationError={getApplicationValidationError}
        onSubmit={onSubmit}
        {...(isEdition
          ? { isEdition: true, onDelete: props.onDelete, deleteLabel, deletePopoverBody }
          : { isEdition: false })}
      >
        <ApplicationFormFields
          formData={applicationFormData}
          setFormData={setApplicationFormData}
        />
      </FormFullPage>
    );
};

export default ApplicationForm;
