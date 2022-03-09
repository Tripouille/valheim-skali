import React from 'react';
import {
  Table as ChakraTable,
  TableProps as ChakraTableProps,
  Thead as ChakraThead,
  TableHeadProps as ChakraTheadProps,
  Tbody as ChakraTbody,
  TableBodyProps as ChakraTbodyProps,
  Tfoot as ChakraTfoot,
  TableFooterProps as ChakraTfootProps,
  Tr as ChakraTr,
  TableRowProps as ChakraTrProps,
  Th as ChakraTh,
  TableColumnHeaderProps as ChakraThProps,
  Td as ChakraTd,
  TableCellProps as ChakraTdProps,
  TableCaption as ChakraTableCaption,
  TableCaptionProps as ChakraTableCaptionProps,
} from '@chakra-ui/react';

export type TableProps = ChakraTableProps;

export const Table: React.FC<TableProps> = chakraTableProps => (
  <ChakraTable colorScheme="blue" size="sm" {...chakraTableProps}></ChakraTable>
);

export type TheadProps = ChakraTheadProps;

export const Thead: React.FC<TheadProps> = chakraTheadProps => (
  <ChakraThead {...chakraTheadProps}></ChakraThead>
);

export type TbodyProps = ChakraTbodyProps;

export const Tbody: React.FC<TbodyProps> = chakraTbodyProps => (
  <ChakraTbody {...chakraTbodyProps}></ChakraTbody>
);

export type TfootProps = ChakraTfootProps;

export const Tfoot: React.FC<TfootProps> = chakraTfootProps => (
  <ChakraTfoot {...chakraTfootProps}></ChakraTfoot>
);

export type TrProps = ChakraTrProps;

export const Tr: React.FC<TrProps> = chakraTrProps => <ChakraTr {...chakraTrProps}></ChakraTr>;

export type ThProps = ChakraThProps;

export const Th: React.FC<ThProps> = chakraThProps => <ChakraTh {...chakraThProps}></ChakraTh>;

export type TdProps = ChakraTdProps;

export const Td: React.FC<TdProps> = chakraTdProps => <ChakraTd {...chakraTdProps}></ChakraTd>;

export type TableCaptionProps = ChakraTableCaptionProps;

export const TableCaption: React.FC<TableCaptionProps> = chakraTableCaptionProps => (
  <ChakraTableCaption {...chakraTableCaptionProps}></ChakraTableCaption>
);
