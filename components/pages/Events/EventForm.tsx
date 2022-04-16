import { useEffect, useRef, useState } from 'react';
import { DateTime } from 'luxon';
import { getDataValue, DataAttributes } from 'utils/dataAttributes';
import { CONTINUOUS_LABEL } from 'utils/constants';
import { Callback } from 'utils/types';
import {
  CreateEventData,
  Event,
  EVENT_VALUES_MAX_LENGTH,
  getEventValidationError,
} from 'data/event';
import { ModalBody, ModalHeader } from 'components/core/Overlay/Modal';
import { Stack } from 'components/core/Containers/Stack';
import FormModal from 'components/core/Form/FormModal';
import FormElement from 'components/core/Form/FormElement';
import Input from 'components/core/Form/Input';
import Switch from 'components/core/Form/Switch';
import Textarea from 'components/core/Form/Textarea';
import EventTagsForm from './EventTagsForm';
import { getEventFormData } from './utils';

const getDefaultEventFormData = (): Partial<CreateEventData> => ({
  continuous: false,
  tags: [],
  startDate: DateTime.now().startOf('day').toISO({ includeOffset: false }),
});

export type EventFormProps = DataAttributes & {
  /** Modal is open */
  isOpen: boolean;
  /** Function to close the modal */
  onClose: Callback;
  /** Function to create or update event */
  onSubmit: (newEvent: CreateEventData) => void;
} & (
    | {
        /** If no role, this is a creation modal */
        event: Event;
        /** Function to delete role */
        onDelete: Callback;
      }
    | { event?: never }
  );

const EventForm: React.FC<EventFormProps> = (props: EventFormProps) => {
  const { dataCy, isOpen, onClose, event, onSubmit } = props;

  const endDateInputRef = useRef<HTMLInputElement>(null);

  const [eventFormData, setEventFormData] = useState(
    event ? getEventFormData(event) : getDefaultEventFormData(),
  );

  useEffect(() => {
    if (isOpen) setEventFormData(event ? getEventFormData(event) : getDefaultEventFormData());
  }, [event, isOpen]);

  const handleSubmit = (data: CreateEventData) => {
    if (!eventFormData.endDate && endDateInputRef.current) endDateInputRef.current.value = '';
    onSubmit(data);
  };

  return (
    <FormModal
      dataCy={dataCy}
      isOpen={isOpen}
      onClose={onClose}
      formData={eventFormData}
      getValidationError={getEventValidationError}
      onSubmit={handleSubmit}
      {...(props.event
        ? {
            isEdition: true,
            onDelete: props.onDelete,
            deleteLabel: "Supprimer l'événement",
            deletePopoverBody: "Êtes-vous sûr de vouloir supprimer l'événement ?",
          }
        : { isEdition: false })}
    >
      <ModalHeader textAlign="center">
        {event ? "Modifier l'événement" : 'Créer un événement'}
      </ModalHeader>
      <ModalBody id="event-form-modal-body">
        <Stack spacing="5">
          <FormElement label="Nom" isRequired>
            <Input
              dataCy={getDataValue(dataCy, 'name', 'input')}
              value={eventFormData.name ?? ''}
              onChange={name => setEventFormData(prev => ({ ...prev, name }))}
              maxLength={EVENT_VALUES_MAX_LENGTH.name}
            />
          </FormElement>
          <FormElement
            label="Lien discord associé"
            hint="Exemple: https://discord.com/channels/843826987466227722/885962703330508811/916087663176593458"
          >
            <Input
              dataCy={getDataValue(dataCy, 'discord_link', 'input')}
              value={eventFormData.discordLink ?? ''}
              onChange={discordLink => setEventFormData(prev => ({ ...prev, discordLink }))}
              maxLength={EVENT_VALUES_MAX_LENGTH.discordLink}
            />
          </FormElement>
          <FormElement label="Date de début" isRequired>
            <Input
              dataCy={getDataValue(dataCy, 'start_date', 'input')}
              type="datetime-local"
              value={eventFormData.startDate ?? ''}
              onChange={startDate => setEventFormData(prev => ({ ...prev, startDate }))}
            />
          </FormElement>
          <FormElement label="Date de fin">
            <Input
              dataCy={getDataValue(dataCy, 'end_date', 'input')}
              type="datetime-local"
              value={eventFormData.endDate ?? ''}
              onChange={endDate => setEventFormData(prev => ({ ...prev, endDate }))}
              ref={endDateInputRef}
            />
          </FormElement>
          <FormElement label={`${CONTINUOUS_LABEL} ?`}>
            <Switch
              dataCy={getDataValue(dataCy, 'continuous', 'switch')}
              isChecked={eventFormData.continuous}
              onChange={continuous => setEventFormData(prev => ({ ...prev, continuous }))}
              w="full"
              size="lg"
            />
          </FormElement>
          <FormElement label="Lieu">
            <Input
              dataCy={getDataValue(dataCy, 'location', 'input')}
              value={eventFormData.location ?? ''}
              onChange={location => setEventFormData(prev => ({ ...prev, location }))}
              maxLength={EVENT_VALUES_MAX_LENGTH.location}
            />
          </FormElement>
          <FormElement label="Tags">
            <EventTagsForm
              dataCy={getDataValue(dataCy, 'tags')}
              tags={eventFormData.tags}
              onTagsChange={(fn: (oldTags: string[]) => string[]) =>
                setEventFormData(prev => ({ ...prev, tags: fn(prev.tags ?? []) }))
              }
              continuous={eventFormData.continuous}
              onContinuousChange={continuous => setEventFormData(prev => ({ ...prev, continuous }))}
            />
          </FormElement>
          <FormElement label="Description RP">
            <Textarea
              dataCy={getDataValue(dataCy, 'RPDescription', 'textarea')}
              value={eventFormData.RPDescription ?? ''}
              onChange={RPDescription => setEventFormData(prev => ({ ...prev, RPDescription }))}
              maxLength={EVENT_VALUES_MAX_LENGTH.RPDescription}
            />
          </FormElement>
          <FormElement label="Description" isRequired>
            <Textarea
              dataCy={getDataValue(dataCy, 'description', 'textarea')}
              value={eventFormData.description ?? ''}
              onChange={description => setEventFormData(prev => ({ ...prev, description }))}
              maxLength={EVENT_VALUES_MAX_LENGTH.description}
            />
          </FormElement>
        </Stack>
      </ModalBody>
    </FormModal>
  );
};

export default EventForm;
