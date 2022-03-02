import Center from '@packages/components/core/Containers/Center';
import Spinner from '@packages/components/core/Feedback/Spinner';

const Loading = () => (
  <Center p={3}>
    <Spinner />
  </Center>
);

export default Loading;
