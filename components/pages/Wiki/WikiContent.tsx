import { ReactElement, useMemo } from 'react';
import reactStringReplace from 'react-string-replace';
import { chakra, Grid } from '@chakra-ui/react';
import Box from 'components/core/Containers/Box';
import Icon from 'components/core/Images/Icon';
import ZoomableImage from 'components/core/Images/ZoomableImage';
import Spoiler from 'components/core/Typography/Spoiler';
import Heading from 'components/core/Typography/Heading';
import {
  getMarkupGridContent,
  getMarkupIconComponent,
  getMarkupImageProperties,
  getMarkupTitleProperties,
} from 'utils/markup';
import { StrictReactNode } from 'utils/types';

type ConvertMarkupFunction = (
  markupString: string | StrictReactNode[],
  key: { value: number },
) => string | StrictReactNode[];

interface SimpleMarkupProperties {
  wrappingSymbol: string;
  getComponent: (
    content: string,
    convertMarkup: ConvertMarkupFunction,
    key: { value: number },
  ) => ReactElement;
}

const simpleMarkups: SimpleMarkupProperties[] = [
  {
    wrappingSymbol: '\\*\\*\\*',
    getComponent: (content, convertMarkup, key) => (
      <strong key={++key.value}>
        <em>{convertMarkup(content, key)}</em>
      </strong>
    ),
  },
  {
    wrappingSymbol: '\\*\\*',
    getComponent: (content, convertMarkup, key) => (
      <strong key={++key.value}>{convertMarkup(content, key)}</strong>
    ),
  },
  {
    wrappingSymbol: '\\*',
    getComponent: (content, convertMarkup, key) => (
      <em key={++key.value}>{convertMarkup(content, key)}</em>
    ),
  },
  {
    wrappingSymbol: '~~',
    getComponent: (content, convertMarkup, key) => (
      <chakra.span key={++key.value} textDecoration="line-through">
        {convertMarkup(content, key)}
      </chakra.span>
    ),
  },
  {
    wrappingSymbol: '\\|\\|',
    getComponent: (content, convertMarkup, key) => (
      <Spoiler key={++key.value}>{convertMarkup(content, key)}</Spoiler>
    ),
  },
];

const simpleMarkupsRegex = new RegExp(
  `(${simpleMarkups
    .map(markup => `(?:${markup.wrappingSymbol}.+?${markup.wrappingSymbol})`)
    .join('|')})`,
  'g',
);

const convertMarkup: ConvertMarkupFunction = (markupContent, key) => {
  let component: string | StrictReactNode[] = markupContent;

  component = reactStringReplace(component, /(<Grille (?:.*)>[\s\S]*?<\/Grille>)/g, match => {
    const { dimensions, columns } = getMarkupGridContent(match);

    return (
      <Grid key={++key.value} gridTemplateColumns={dimensions} overflowX="hidden">
        {columns.map((column, index) => (
          <Box key={index}>{convertMarkup(column, key)}</Box>
        ))}
      </Grid>
    );
  }) as StrictReactNode[];

  component = reactStringReplace(component, simpleMarkupsRegex, match => {
    for (let i = 0; i < simpleMarkups.length; ++i) {
      const markup = simpleMarkups[i];
      const matchResult = match.match(
        new RegExp(`^${markup.wrappingSymbol}(?<content>.+?)${markup.wrappingSymbol}$`),
      );
      if (matchResult)
        return markup.getComponent(matchResult.groups?.content as string, convertMarkup, key);
    }
    console.error("Couldn't find simple markup");
  }) as StrictReactNode[];

  component = reactStringReplace(component, /(\r\n|\r|\n)/g, () => (
    <br key={++key.value} />
  )) as StrictReactNode[];

  component = reactStringReplace(component, /{{(.+?)}}/g, match => {
    const IconComponent = getMarkupIconComponent(match);
    return IconComponent ? (
      <Icon key={++key.value} as={IconComponent} />
    ) : (
      <chakra.span key={++key.value} fontSize="xs">
        [Icône non trouvée : {match}]
      </chakra.span>
    );
  }) as StrictReactNode[];

  component = reactStringReplace(component, /(==(?:.+?)==(?:#[\S]+)?)/g, match => {
    const { title, anchor } = getMarkupTitleProperties(match);
    return (
      <Heading key={++key.value} id={anchor?.slice(1)}>
        {title}
      </Heading>
    );
  }) as StrictReactNode[];

  component = reactStringReplace(
    component,
    /(<<.+?>>(?:[0-9]+x[0-9]+)?(?:t|r|h|b|g|d)*(?:\[.*\])?)/g,
    match => {
      const { url, width, height, display, objectFit, objectPosition, legend } =
        getMarkupImageProperties(match);
      return (
        <Box key={++key.value} width="min-content" display={display} margin="auto">
          <ZoomableImage
            data-cy="image"
            src={url}
            alt="Image"
            width={width ? Number(width) : 200}
            height={height ? Number(height) : 200}
            objectFit={objectFit}
            objectPosition={objectPosition}
            legend={legend}
          />
        </Box>
      );
    },
  ) as StrictReactNode[];

  return component;
};

interface WikiContentProps {
  content: string;
}

const WikiContent: React.FC<WikiContentProps> = ({ content }) => {
  const replacedContent = useMemo(() => convertMarkup(content, { value: 0 }), [content]);

  return <>{replacedContent}</>;
};

export default WikiContent;
