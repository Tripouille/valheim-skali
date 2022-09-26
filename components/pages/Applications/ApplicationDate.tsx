import { chakra } from '@chakra-ui/react';

interface ApplicationDateProps {
  date: string;
}

const ApplicationDate: React.FC<ApplicationDateProps> = ({ date }) => {
  return (
    <chakra.time fontWeight="normal" fontStyle="italic">
      {new Date(date).toLocaleString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      })}
    </chakra.time>
  );
};

export default ApplicationDate;
