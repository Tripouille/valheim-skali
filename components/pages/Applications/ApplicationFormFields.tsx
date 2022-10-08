import React, { useEffect, useState } from 'react';
import Secured from 'components/core/Authentication/Secured';
import Flex from 'components/core/Containers/Flex';
import { Grid } from 'components/core/Containers/Grid';
import { Stack } from 'components/core/Containers/Stack';
import FormElement from 'components/core/Form/FormElement';
import Input from 'components/core/Form/Input';
import Select from 'components/core/Form/Select';
import Textarea from 'components/core/Form/Textarea';
import Text from 'components/core/Typography/Text';
import {
  applicationFormKeys,
  APPLICATION_FORM_KEYS_TO_FORM_PROPERTIES,
  APPLICATION_FORM_KEY_TO_LABEL,
  APPLICATION_DISCORD_NAME_MAX_LENGTH,
  isCreateApplicationDataWithUserId,
  CreateApplicationData,
  ApplicationFormAnswer,
} from 'data/application';
import useApplicationAssociableUsers from 'hooks/applications/useApplicationAssociableUsers';
import useSession from 'hooks/useSession';
import { applicationPrivilege, PermissionCategory } from 'utils/permissions';
import UserAvatar from '../Users/UserAvatar';

interface ApplicationFormFieldsProps {
  formData: CreateApplicationData;
  setFormData: React.Dispatch<React.SetStateAction<CreateApplicationData>>;
}

const ApplicationFormFields: React.FC<ApplicationFormFieldsProps> = ({ formData, setFormData }) => {
  const { data: session, hasRequiredPermissions } = useSession();
  const hasManageApplicationsPermission = hasRequiredPermissions({
    [PermissionCategory.APPLICATION]: applicationPrivilege.MANAGE,
  });

  const applicationAssociableUsersQuery = useApplicationAssociableUsers();
  const [associatedUserId, setAssociatedUserId] = useState<string>('');
  const associatedUser =
    associatedUserId &&
    applicationAssociableUsersQuery.data?.find(user => user._id === associatedUserId);

  useEffect(
    function setCurrentUserIfCandidate() {
      if (session?.user._id && !hasManageApplicationsPermission) {
        setAssociatedUserId(session?.user._id);
      }
    },
    [hasManageApplicationsPermission, session?.user._id],
  );

  useEffect(
    function fillOnUserAssociation() {
      if (associatedUser)
        setFormData(prev => ({
          ...prev,
          discordName: associatedUser.name,
          userId: associatedUser._id,
          applicationFormAnswer: {
            ...prev.applicationFormAnswer,
            nameInGame: associatedUser.nameInGame ?? prev.applicationFormAnswer.nameInGame,
          },
        }));
      else
        setFormData(prev => ({
          applicationFormAnswer: prev.applicationFormAnswer,
          discordName: 'discordName' in prev ? prev.discordName : '',
        }));
    },
    [associatedUser, setFormData],
  );

  const setApplicationFormAnswerValue = (key: keyof ApplicationFormAnswer) => (value: string) =>
    setFormData(prev => ({
      ...prev,
      applicationFormAnswer: { ...prev.applicationFormAnswer, [key]: value },
    }));

  return (
    <Stack spacing="5">
      <Secured permissions={{ [PermissionCategory.APPLICATION]: applicationPrivilege.MANAGE }}>
        <Grid templateColumns="2fr 1fr" gap="3" overflow="hidden">
          {isCreateApplicationDataWithUserId(formData) ? (
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
                value={formData.discordName}
                onChange={value => setFormData(prev => ({ ...prev, discordName: value }))}
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
      </Secured>
      {applicationFormKeys.map(key => {
        const inputType = APPLICATION_FORM_KEYS_TO_FORM_PROPERTIES[key].inputType;
        const valueMaxLength = APPLICATION_FORM_KEYS_TO_FORM_PROPERTIES[key].maxLength;
        let rows;
        if (inputType === 'textarea') {
          if (valueMaxLength <= 1000) rows = 1;
          else rows = 5;
        }
        return (
          <FormElement
            key={key}
            label={APPLICATION_FORM_KEY_TO_LABEL[key]}
            hint={APPLICATION_FORM_KEYS_TO_FORM_PROPERTIES[key].hint}
            isRequired
            vertical
          >
            {React.createElement(inputType === 'input' ? Input : Textarea, {
              'data-cy': key,
              value: formData.applicationFormAnswer[key],
              onChange: setApplicationFormAnswerValue(key),
              maxLength: valueMaxLength,
              rows,
            })}
          </FormElement>
        );
      })}
    </Stack>
  );
};

export default ApplicationFormFields;
