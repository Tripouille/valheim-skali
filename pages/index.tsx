import { Button } from '@chakra-ui/react';
import { useColorMode } from '@chakra-ui/color-mode';
import UserList from 'components/UserList';

const HomePage: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <UserList />
      <Button onClick={toggleColorMode}>Toggle {colorMode === 'light' ? 'Dark' : 'Light'}</Button>
    </>
  );
};

export default HomePage;
