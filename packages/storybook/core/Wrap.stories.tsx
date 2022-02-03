import { storybookSetup } from '@packages/utils/Storybook/storybookSetup';
import { Wrap, WrapProps, WrapItem } from '@packages/components/core/Containers/Wrap';
import Center from '@packages/components/core/Containers/Center';

const { defaultExport, StoryFactory } = storybookSetup<WrapProps>(Wrap);

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
