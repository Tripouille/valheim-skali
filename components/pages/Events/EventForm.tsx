import { useEffect, useRef, useState } from 'react';
import { DateTime } from 'luxon';
import { CypressProps, Callback } from 'utils/types';
import { CONTINUOUS_LABEL } from 'utils/constants';
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
import { toInputDatetimeFormat } from 'utils/format';
import EventTagsForm from './EventTagsForm';

const getDefaultEventFormData = (): Partial<CreateEventData> => ({
  continuous: false,
  tags: [],
  startDate: DateTime.now().startOf('day').toISO({ includeOffset: false }),
});

const getEventFormData = (event: Event) => ({
  ...event,
  _id: undefined,
  startDate: toInputDatetimeFormat(event.startDate),
  endDate: event.endDate ? toInputDatetimeFormat(event.endDate) : undefined,
});

export type EventFormProps = CypressProps & {
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
  const { 'data-cy': dataCy, isOpen, onClose, event, onSubmit } = props;

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
      data-cy={dataCy}
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
              data-cy="name"
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
              data-cy="discord_link"
              value={eventFormData.discordLink ?? ''}
              onChange={discordLink => setEventFormData(prev => ({ ...prev, discordLink }))}
              maxLength={EVENT_VALUES_MAX_LENGTH.discordLink}
            />
          </FormElement>
          <FormElement label="Date de début" isRequired>
            <Input
              data-cy="start_date"
              type="datetime-local"
              value={eventFormData.startDate ?? ''}
              onChange={startDate => setEventFormData(prev => ({ ...prev, startDate }))}
            />
          </FormElement>
          <FormElement label="Date de fin">
            <Input
              data-cy="end_date"
              type="datetime-local"
              value={eventFormData.endDate ?? ''}
              onChange={endDate => setEventFormData(prev => ({ ...prev, endDate }))}
              ref={endDateInputRef}
            />
          </FormElement>
          <FormElement label={`${CONTINUOUS_LABEL} ?`}>
            <Switch
              data-cy="continuous"
              isChecked={eventFormData.continuous}
              onChange={continuous => setEventFormData(prev => ({ ...prev, continuous }))}
              w="full"
              size="lg"
            />
          </FormElement>
          <FormElement label="Lieu">
            <Input
              data-cy="location"
              value={eventFormData.location ?? ''}
              onChange={location => setEventFormData(prev => ({ ...prev, location }))}
              maxLength={EVENT_VALUES_MAX_LENGTH.location}
            />
          </FormElement>
          <FormElement label="Tags">
            <EventTagsForm
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
              data-cy="RPDescription"
              value={eventFormData.RPDescription ?? ''}
              onChange={RPDescription => setEventFormData(prev => ({ ...prev, RPDescription }))}
              maxLength={EVENT_VALUES_MAX_LENGTH.RPDescription}
            />
          </FormElement>
          <FormElement label="Description" isRequired>
            <Textarea
              data-cy="description"
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
