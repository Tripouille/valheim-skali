import React, { useEffect, useState } from 'react';
import { Stack } from 'components/core/Containers/Stack';
import FormElement from 'components/core/Form/FormElement';
import FormModal from 'components/core/Form/FormModal';
import Input from 'components/core/Form/Input';
import Textarea from 'components/core/Form/Textarea';
import { ModalBody, ModalHeader } from 'components/core/Overlay/Modal';
import {
  ApplicationFormAnswer,
  applicationFormKeys,
  APPLICATION_FORM_KEYS_TO_FORM_PROPERTIES,
  APPLICATION_FORM_KEY_TO_LABEL,
  CreateApplicationData,
  APPLICATION_DISCORD_NAME_MAX_LENGTH,
  getApplicationValidationError,
  WithDiscordInfos,
  Application,
} from 'data/application';
import { Callback } from 'utils/types';

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
  discordName: application.discordName,
  applicationFormAnswer: application.applicationFormAnswer,
});

type ApplicationFormProps = {
  /** Modal is open */
  isOpen: boolean;
  /** Function to close the modal */
  onClose: Callback;
  /** Function to create or update application */
  onSubmit: (newApplication: CreateApplicationData) => void;
} & (
  | {
      /** If no application, this is a creation modal */
      application: WithDiscordInfos<Application>;
      onDelete: Callback;
    }
  | { application?: never; onDelete?: never }
);

const ApplicationForm: React.FC<ApplicationFormProps> = props => {
  const { isOpen, onClose, application, onSubmit } = props;

  const isEdition = !!application;
  const [applicationFormData, setApplicationFormData] = useState<CreateApplicationData>(
    isEdition ? getApplicationFormData(application) : initialFormApplicationData,
  );

  useEffect(
    function prefillFormData() {
      if (isOpen)
        setApplicationFormData(
          application ? getApplicationFormData(application) : initialFormApplicationData,
        );
    },
    [application, isOpen],
  );

  const setApplicationFormAnswerValue = (key: keyof ApplicationFormAnswer) => (value: string) =>
    setApplicationFormData({
      ...applicationFormData,
      applicationFormAnswer: {
        ...applicationFormData.applicationFormAnswer,
        [key]: value,
      },
    });

  return (
    <FormModal
      data-cy={isEdition ? 'edit-application-modal' : 'create-application-modal'}
      isOpen={isOpen}
      onClose={onClose}
      formData={applicationFormData}
      getValidationError={getApplicationValidationError}
      onSubmit={onSubmit}
      {...(isEdition
        ? {
            isEdition: true,
            onDelete: props.onDelete,
            deleteLabel: 'Supprimer la candidature',
            deletePopoverBody:
              'Êtes-vous sûr de vouloir supprimer cette candidature ? Vous pouvez la refuser et la garder pour archive.',
          }
        : { isEdition: false })}
    >
      <ModalHeader textAlign="center">
        {isEdition ? 'Modifier la candidature' : 'Nouvelle candidature'}
      </ModalHeader>
      <ModalBody id="application-form-modal-body">
        <Stack spacing="5">
          <FormElement label="Quel est ton pseudo Discord ?" isRequired vertical>
            <Input
              data-cy="discord_name"
              value={applicationFormData.discordName}
              onChange={value => setApplicationFormData(prev => ({ ...prev, discordName: value }))}
              maxLength={APPLICATION_DISCORD_NAME_MAX_LENGTH}
            />
          </FormElement>
          {applicationFormKeys.map(key => (
            <FormElement
              key={key}
              label={APPLICATION_FORM_KEY_TO_LABEL[key]}
              hint={APPLICATION_FORM_KEYS_TO_FORM_PROPERTIES[key].hint}
              isRequired
              vertical
            >
              {React.createElement(
                APPLICATION_FORM_KEYS_TO_FORM_PROPERTIES[key].inputType === 'input'
                  ? Input
                  : Textarea,
                {
                  'data-cy': key,
                  value: applicationFormData.applicationFormAnswer[key],
                  onChange: setApplicationFormAnswerValue(key),
                  maxLength: APPLICATION_FORM_KEYS_TO_FORM_PROPERTIES[key].maxLength,
                  rows:
                    APPLICATION_FORM_KEYS_TO_FORM_PROPERTIES[key].inputType === 'textarea' &&
                    APPLICATION_FORM_KEYS_TO_FORM_PROPERTIES[key].maxLength < 200
                      ? 1
                      : 5,
                },
              )}
            </FormElement>
          ))}
        </Stack>
      </ModalBody>
    </FormModal>
  );
};

export default ApplicationForm;
