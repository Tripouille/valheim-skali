import { DateTime } from 'luxon';
import { useRef, useState } from 'react';
import { Stack } from 'components/core/Containers/Stack';
import FormElement from 'components/core/Form/FormElement';
import FormFullPage from 'components/core/Form/FormFullPage';
import FormPreviewLayout from 'components/core/Form/FormPreviewLayout';
import Input from 'components/core/Form/Input';
import Switch from 'components/core/Form/Switch';
import Textarea from 'components/core/Form/Textarea';
import {
  CreateEventData,
  Event,
  EVENT_VALUES_MAX_LENGTH,
  getEventValidationError,
  isEventClosed,
} from 'data/event';
import { CONTINUOUS_LABEL } from 'utils/constants';
import { toInputDatetimeFormat } from 'utils/format';
import { Callback } from 'utils/types';
import EventItem from './EventItem';
import EventTagsForm from './EventTagsForm';
import { EventContext } from './utils';

const getDefaultEventFormData = () => ({
  continuous: false,
  tags: [],
  startDate: toInputDatetimeFormat(DateTime.now().startOf('day').toISO()),
});

const getEventFormData = (event: Event) => ({
  ...event,
  _id: undefined,
  startDate: toInputDatetimeFormat(event.startDate),
  endDate: event.endDate ? toInputDatetimeFormat(event.endDate) : undefined,
});

export type EventFormProps = {
  /** Function to create or update event */
  onSubmit: (newEvent: CreateEventData) => void;
} & ({ event: Event; onDelete: Callback } | { event?: never });

const EventForm: React.FC<EventFormProps> = (props: EventFormProps) => {
  const { event, onSubmit } = props;
  const isEdition = !!event;

  const endDateInputRef = useRef<HTMLInputElement>(null);

  const [eventFormData, setEventFormData] = useState<Partial<CreateEventData>>(
    isEdition ? getEventFormData(event) : getDefaultEventFormData(),
  );

  const handleSubmit = (data: CreateEventData) => {
    if (!eventFormData.endDate && endDateInputRef.current) endDateInputRef.current.value = '';
    onSubmit(data);
  };

  const setFormDataValue =
    <K extends keyof CreateEventData>(key: K) =>
    (value: CreateEventData[K]) =>
      setEventFormData(prev => ({ ...prev, [key]: value }));

  const fakeEventForPreview = {
    _id: 'new',
    ...getDefaultEventFormData(),
    ...eventFormData,
    name: eventFormData.name ?? '',
    description: eventFormData.description ?? '',
  };

  return (
    <>
      <FormFullPage
        formData={eventFormData}
        getValidationError={getEventValidationError}
        onSubmit={handleSubmit}
        {...(isEdition
          ? {
              isEdition: true,
              onDelete: props.onDelete,
              deleteLabel: "Supprimer l'événement",
              deletePopoverBody: "Êtes-vous sûr de vouloir supprimer l'événement ?",
            }
          : { isEdition: false })}
      >
        <Stack spacing="5">
          <FormElement label="Nom" isRequired>
            <Input
              data-cy="name"
              value={eventFormData.name ?? ''}
              onChange={setFormDataValue('name')}
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
              onChange={setFormDataValue('discordLink')}
              maxLength={EVENT_VALUES_MAX_LENGTH.discordLink}
            />
          </FormElement>
          <FormElement label="Date de début" isRequired>
            <Input
              data-cy="start_date"
              type="datetime-local"
              value={eventFormData.startDate ?? ''}
              onChange={setFormDataValue('startDate')}
            />
          </FormElement>
          <FormElement label="Date de fin">
            <Input
              data-cy="end_date"
              type="datetime-local"
              value={eventFormData.endDate ?? ''}
              onChange={setFormDataValue('endDate')}
              ref={endDateInputRef}
            />
          </FormElement>
          <FormElement label={`${CONTINUOUS_LABEL} ?`}>
            <Switch
              data-cy="continuous"
              isChecked={eventFormData.continuous}
              onChange={setFormDataValue('continuous')}
              w="full"
              size="lg"
            />
          </FormElement>
          <FormElement label="Lieu">
            <Input
              data-cy="location"
              value={eventFormData.location ?? ''}
              onChange={setFormDataValue('location')}
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
              onChange={setFormDataValue('RPDescription')}
              maxLength={EVENT_VALUES_MAX_LENGTH.RPDescription}
              rows={5}
            />
          </FormElement>
          <FormElement label="Description" isRequired>
            <Textarea
              data-cy="description"
              value={eventFormData.description ?? ''}
              onChange={setFormDataValue('description')}
              maxLength={EVENT_VALUES_MAX_LENGTH.description}
              rows={10}
            />
          </FormElement>
        </Stack>
      </FormFullPage>
      {eventFormData.name && eventFormData.startDate && (
        <FormPreviewLayout>
          {({ previewHasRestrictedHeight }) => (
            <EventItem
              event={fakeEventForPreview}
              context={previewHasRestrictedHeight ? EventContext.LIST : EventContext.MODAL}
              eventIsClosed={isEventClosed(fakeEventForPreview, new Date())}
            />
          )}
        </FormPreviewLayout>
      )}
    </>
  );
};

export default EventForm;
