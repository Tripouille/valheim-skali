import { useRouter } from 'next/router';
import { Box } from '@chakra-ui/layout';

const ServerHomePage = () => {
  const router = useRouter();
  const serverName = router.query.serverName as string;

  // TODO: #2 Check that the server exists

  return (
    <Box bg="blue.800" h="1500px">
      Welcome to {serverName} !
    </Box>
  );
};

export default ServerHomePage;
