import Center from 'components/core/Containers/Center';
import { Wrap, WrapProps, WrapItem } from 'components/core/Containers/Wrap';
import { StoryCategory } from 'storybook/config/constants';
import { storybookSetup } from 'storybook/config/setup';

const { defaultExport, StoryFactory } = storybookSetup<WrapProps>(
  Wrap,
  StoryCategory.CORE_CONTAINERS,
);

export default defaultExport;

export const Default = StoryFactory({
  align: 'center',
  direction: 'row',
  justify: 'start',
  shouldWrapChildren: false,
  spacing: 3,
  children: (
    <>
      <WrapItem>
        <Center w="180px" h="80px" bg="red.200">
          Box 1
        </Center>
      </WrapItem>
      <WrapItem>
        <Center w="180px" h="40px" bg="green.200">
          Box 2
        </Center>
      </WrapItem>
      <WrapItem>
        <Center w="120px" h="80px" bg="tomato">
          Box 3
        </Center>
      </WrapItem>
      <WrapItem>
        <Center w="180px" h="40px" bg="blue.200">
          Box 4
        </Center>
      </WrapItem>
      <WrapItem>
        <Center w="180px" h="80px" bg="blackAlpha.500">
          Box 5
        </Center>
      </WrapItem>
    </>
  ),
});
