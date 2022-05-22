import Box from 'components/core/Containers/Box';
import Heading from 'components/core/Typography/Heading';
import Text from 'components/core/Typography/Text';

export interface WikiLinksGroupProps {
  title: string;
}

const WikiLinksGroup: React.FC<WikiLinksGroupProps> = ({ title }) => {
  return (
    <Box border="2px silver solid" borderRadius="md" p="3">
      <Heading size="sm" textAlign="center" mb="5">
        {title}
      </Heading>
      <Text>Aucune page ne correspond à cette section pour le moment.</Text>
    </Box>
  );
};

export default WikiLinksGroup;
