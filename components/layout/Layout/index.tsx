import { Box } from '@chakra-ui/layout';
import Header from '../Header';

const Layout: React.FC = ({ children }) => {
  return (
    <Box bgImage="/images/valheim-background.png" bgAttachment="fixed" bgPos="bottom">
      <Header />
      <Box h="calc(100vh - var(--chakra-sizes-header))" overflow="auto">
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
