import React, { useEffect, useState } from 'react';
import Flex from 'components/core/Containers/Flex';
import { Stack } from 'components/core/Containers/Stack';
import FormElement from 'components/core/Form/FormElement';
import FormModal from 'components/core/Form/FormModal';
import Input from 'components/core/Form/Input';
import Textarea from 'components/core/Form/Textarea';
import { ModalBody, ModalHeader } from 'components/core/Overlay/Modal';
import Text from 'components/core/Typography/Text';
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
  isCreateApplicationDataWithUserId,
} from 'data/application';
import { Callback } from 'utils/types';
import Select from 'components/core/Form/Select';
import { Grid } from 'components/core/Containers/Grid';
import useApplicationAssociableUsers from 'hooks/applications/useApplicationAssociableUsers';
import UserAvatar from '../Users/UserAvatar';

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

  const applicationAssociableUsersQuery = useApplicationAssociableUsers(application?.userId);
  const [associatedUserId, setAssociatedUserId] = useState<string>('');
  const associatedUser =
    associatedUserId &&
    applicationAssociableUsersQuery.data?.find(user => user._id === associatedUserId);

  useEffect(
    function prefillFormData() {
      if (isOpen) {
        setApplicationFormData(
          application ? getApplicationFormData(application) : initialFormApplicationData,
        );
        setAssociatedUserId(application?.userId ? application.userId : '');
      }
    },
    [application, isOpen],
  );

  useEffect(
    function fillOnUserAssociation() {
      if (associatedUser)
        setApplicationFormData(prev => ({
          ...prev,
          discordName: associatedUser.name,
          userId: associatedUser._id,
          applicationFormAnswer: {
            ...prev.applicationFormAnswer,
            nameInGame: associatedUser.nameInGame ?? prev.applicationFormAnswer.nameInGame,
          },
        }));
      else
        setApplicationFormData(prev => ({
          applicationFormAnswer: prev.applicationFormAnswer,
          discordName: 'discordName' in prev ? prev.discordName : '',
        }));
    },
    [associatedUser],
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
          <Grid templateColumns="2fr 1fr" gap="3" overflow="hidden">
            {isCreateApplicationDataWithUserId(applicationFormData) ? (
              associatedUser && (
                <Flex align="center">
                  {associatedUser.image && <UserAvatar src={associatedUser.image} size="50px" />}
                  <Text px="3" noOfLines={1}>
                    {associatedUser.name}
                  </Text>
                </Flex>
              )
            ) : (
              <FormElement label="Quel est ton pseudo Discord ?" isRequired vertical>
                <Input
                  data-cy="discord_name"
                  value={applicationFormData.discordName}
                  onChange={value =>
                    setApplicationFormData(prev => ({ ...prev, discordName: value }))
                  }
                  maxLength={APPLICATION_DISCORD_NAME_MAX_LENGTH}
                />
              </FormElement>
            )}
            <FormElement label="Associer à un utilisateur" vertical>
              <Select
                data-cy="associate-to-user"
                value={associatedUserId}
                onChange={setAssociatedUserId}
              >
                <option></option>
                {applicationAssociableUsersQuery.data?.map(user => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </Select>
            </FormElement>
          </Grid>
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
