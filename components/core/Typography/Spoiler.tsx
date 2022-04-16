import { useDisclosure } from '@chakra-ui/react';
import Text from 'components/core/Typography/Text';
import { Children } from 'utils/types';

export interface SpoilerProps {
  children: Children;
}

const Spoiler: React.FC<SpoilerProps> = ({ children }) => {
  const { isOpen: isVisible, onToggle } = useDisclosure();

  const textColor = isVisible ? 'inherit' : 'transparent';
  const title = isVisible ? undefined : 'Spoiler - Cliquez pour voir';
  const rectColor = isVisible ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.5)';
  const hoverColor = isVisible ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.4)';

  return (
    <Text
      as="span"
      title={title}
      p="1"
      color={textColor}
      bgColor={rectColor}
      borderRadius="sm"
      cursor="pointer"
      _hover={{ backgroundColor: hoverColor }}
      onClick={onToggle}
    >
      {children}
    </Text>
  );
};

export default Spoiler;
