import { useEffect, useRef, useState } from 'react';
import { DateTime } from 'luxon';
import { getDataValue, DataAttributes } from '@packages/utils/dataAttributes';
import { CONTINUOUS_LABEL } from '@packages/utils/constants';
import { Callback } from '@packages/utils/types';
import {
  CreateEventData,
  Event,
  EVENT_VALUES_MAX_LENGTH,
  getEventValidationError,
} from '@packages/data/event';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@packages/components/core/Overlay/Modal';
import { Stack } from '@packages/components/core/Containers/Stack';
import FormElement from '@packages/components/core/Form/FormElement';
import Input from '@packages/components/core/Form/Input';
import Switch from '@packages/components/core/Form/Switch';
import Textarea from '@packages/components/core/Form/Textarea';
import EventTagsForm from './EventTagsForm';
import EventFormFooter from './EventFormFooter';
import { getEventFormData } from './utils';

const defaultEventData: Partial<CreateEventData> = {
  continuous: false,
  tags: [],
};

export interface EventFormProps extends DataAttributes {
  /** Modal is open */
  isOpen: boolean;
  /** Function to close the modal */
  onClose: Callback;
  /** If no event, this is a creation modal */
  event?: Event;
  /** Function to create or update event */
  onSubmit: (newEvent: CreateEventData) => void;
  /** Function to delete event */
  onDelete?: Callback;
}

const EventForm: React.FC<EventFormProps> = ({
  dataCy,
  isOpen,
  onClose,
  event,
  onSubmit,
  onDelete,
}: EventFormProps) => {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const firstPostTagsInputRef = useRef<HTMLInputElement>(null);
  const endDateInputRef = useRef<HTMLInputElement>(null);

  const [eventData, setEventData] = useState(event ? getEventFormData(event) : defaultEventData);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setEventData(
        event
          ? getEventFormData(event)
          : {
              ...defaultEventData,
              startDate: DateTime.now().startOf('day').toISO({ includeOffset: false }),
            },
      );
    }
  }, [event, isOpen]);

  /** Sets error state and returns wether the data is valid  */
  const validate = (data: Partial<CreateEventData>): data is CreateEventData => {
    const error = getEventValidationError(data);
    setValidationError(error);
    return !error;
  };

  useEffect(() => {
    validate(eventData);
  }, [eventData]);

  const handleSubmit = () => {
    if (validate(eventData)) onSubmit(eventData);
    /** Clear date input that was (partially) erased */
    if (!eventData.endDate && endDateInputRef.current) endDateInputRef.current.value = '';
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={firstInputRef}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton dataCy={getDataValue(dataCy, 'close_button')} />
        <ModalHeader textAlign="center">Créer un événement</ModalHeader>
        <ModalBody>
          <Stack spacing="5">
            <FormElement label="Nom" isRequired>
              <Input
                dataCy={getDataValue(dataCy, 'name', 'input')}
                value={eventData.name ?? ''}
                onChange={name => setEventData(prev => ({ ...prev, name }))}
                maxLength={EVENT_VALUES_MAX_LENGTH.name}
                ref={firstInputRef}
              />
            </FormElement>
            <FormElement
              label="Lien discord associé"
              hint="Exemple: https://discord.com/channels/843826987466227722/885962703330508811/916087663176593458"
            >
              <Input
                dataCy={getDataValue(dataCy, 'discord_link', 'input')}
                value={eventData.discordLink ?? ''}
                onChange={discordLink => setEventData(prev => ({ ...prev, discordLink }))}
                maxLength={EVENT_VALUES_MAX_LENGTH.discordLink}
              />
            </FormElement>
            <FormElement label="Date de début" isRequired>
              <Input
                dataCy={getDataValue(dataCy, 'start_date', 'input')}
                type="datetime-local"
                value={eventData.startDate ?? ''}
                onChange={startDate => setEventData(prev => ({ ...prev, startDate }))}
              />
            </FormElement>
            <FormElement label="Date de fin">
              <Input
                dataCy={getDataValue(dataCy, 'end_date', 'input')}
                type="datetime-local"
                value={eventData.endDate ?? ''}
                onChange={endDate => setEventData(prev => ({ ...prev, endDate }))}
                ref={endDateInputRef}
              />
            </FormElement>
            <FormElement label={`${CONTINUOUS_LABEL} ?`}>
              <Switch
                dataCy={getDataValue(dataCy, 'continuous', 'switch')}
                isChecked={eventData.continuous}
                onChange={continuous => setEventData(prev => ({ ...prev, continuous }))}
                w="full"
                size="lg"
              />
            </FormElement>
            <FormElement label="Lieu">
              <Input
                dataCy={getDataValue(dataCy, 'location', 'input')}
                value={eventData.location ?? ''}
                onChange={location => setEventData(prev => ({ ...prev, location }))}
                maxLength={EVENT_VALUES_MAX_LENGTH.location}
              />
            </FormElement>
            <FormElement label="Tags">
              <EventTagsForm
                dataCy={getDataValue(dataCy, 'tags')}
                tags={eventData.tags}
                onChange={(fn: (oldTags: string[]) => string[]) =>
                  setEventData(prev => ({ ...prev, tags: fn(prev.tags ?? []) }))
                }
                continuous={eventData.continuous}
                nextInputRef={firstPostTagsInputRef}
              />
            </FormElement>
            <FormElement label="Description RP">
              <Textarea
                dataCy={getDataValue(dataCy, 'RPDescription', 'textarea')}
                value={eventData.RPDescription ?? ''}
                onChange={RPDescription => setEventData(prev => ({ ...prev, RPDescription }))}
                maxLength={EVENT_VALUES_MAX_LENGTH.RPDescription}
                ref={firstPostTagsInputRef}
              />
            </FormElement>
            <FormElement label="Description" isRequired>
              <Textarea
                dataCy={getDataValue(dataCy, 'description', 'textarea')}
                value={eventData.description ?? ''}
                onChange={description => setEventData(prev => ({ ...prev, description }))}
                maxLength={EVENT_VALUES_MAX_LENGTH.description}
              />
            </FormElement>
          </Stack>
        </ModalBody>
        <EventFormFooter
          dataCy={dataCy}
          event={event}
          onSubmit={handleSubmit}
          onDelete={onDelete}
          error={validationError}
        />
      </ModalContent>
    </Modal>
  );
};

export default EventForm;
