import {
  Grid as ChakraGrid,
  GridProps as ChakraGridProps,
  GridItem as ChakraGridItem,
  GridItemProps as ChakraGridItemProps,
  forwardRef,
} from '@chakra-ui/react';

export type GridProps = ChakraGridProps;

export const Grid = forwardRef<GridProps, 'div'>((chakraGridProps, ref) => (
  <ChakraGrid {...chakraGridProps} ref={ref}></ChakraGrid>
));
Grid.displayName = 'Grid';

export type GridItemProps = ChakraGridItemProps;

export const GridItem = forwardRef<GridItemProps, 'div'>((chakraGridItemProps, ref) => (
  <ChakraGridItem {...chakraGridItemProps} ref={ref}></ChakraGridItem>
));
GridItem.displayName = 'GridItem';
