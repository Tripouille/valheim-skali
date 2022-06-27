import { ReactElement, useMemo } from 'react';
import reactStringReplace from 'react-string-replace';
import { chakra, Grid } from '@chakra-ui/react';
import Box from 'components/core/Containers/Box';
import Icon from 'components/core/Images/Icon';
import ZoomableImage from 'components/core/Images/ZoomableImage';
import Link from 'components/core/Interactive/Link';
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
  startSymbol: string;
  endSymbol: string;
  getComponent: (
    content: string,
    convertMarkup: ConvertMarkupFunction,
    key: { value: number },
  ) => ReactElement;
}

const simpleMarkups: SimpleMarkupProperties[] = [
  {
    startSymbol: '\\*\\*\\*',
    endSymbol: '\\*\\*\\*',
    getComponent: (content, convertMarkup, key) => (
      <strong key={++key.value}>
        <em>{convertMarkup(content, key)}</em>
      </strong>
    ),
  },
  {
    startSymbol: '\\*\\*',
    endSymbol: '\\*\\*',
    getComponent: (content, convertMarkup, key) => (
      <strong key={++key.value}>{convertMarkup(content, key)}</strong>
    ),
  },
  {
    startSymbol: '\\*',
    endSymbol: '\\*',
    getComponent: (content, convertMarkup, key) => (
      <em key={++key.value}>{convertMarkup(content, key)}</em>
    ),
  },
  {
    startSymbol: '~~',
    endSymbol: '~~',
    getComponent: (content, convertMarkup, key) => (
      <chakra.span key={++key.value} textDecoration="line-through">
        {convertMarkup(content, key)}
      </chakra.span>
    ),
  },
  {
    startSymbol: '\\|\\|',
    endSymbol: '\\|\\|',
    getComponent: (content, convertMarkup, key) => (
      <Spoiler key={++key.value}>{convertMarkup(content, key)}</Spoiler>
    ),
  },
  {
    startSymbol: '{{',
    endSymbol: '}}',
    getComponent: (content, _, key) => {
      const IconComponent = getMarkupIconComponent(content);
      return IconComponent ? (
        <Icon key={++key.value} as={IconComponent} verticalAlign="text-bottom" />
      ) : (
        <chakra.span key={++key.value} fontSize="xs">
          [Icône non trouvée : {content}]
        </chakra.span>
      );
    },
  },
  {
    startSymbol: '\\[',
    endSymbol: '\\]',
    getComponent: (content, convertMarkup, key) => (
      <Link key={++key.value} href={content} isExternal>
        {content}
      </Link>
    ),
  },
];

const simpleMarkupsRegex = new RegExp(
  `(${simpleMarkups.map(markup => `(?:${markup.startSymbol}.+?${markup.endSymbol})`).join('|')})`,
  'g',
);

const convertMarkup: ConvertMarkupFunction = (markupContent, key) => {
  let component: string | StrictReactNode[] = markupContent;

  component = reactStringReplace(component, /(```[\s\S]*?```)/g, match => {
    return <chakra.pre backgroundColor="blue.900">{match.slice(3, -3)}</chakra.pre>;
  });

  component = reactStringReplace(component, /(<Grille (?:.*)>[\s\S]*?<\/Grille>)/g, match => {
    const { dimensions, columns } = getMarkupGridContent(match);

    return (
      <Grid key={++key.value} gridTemplateColumns={dimensions}>
        {columns.map((column, index) => (
          <Box key={index}>{convertMarkup(column, key)}</Box>
        ))}
      </Grid>
    );
  });

  component = reactStringReplace(component, /(`(?:.+?)`)/g, match => {
    return (
      <chakra.pre display="inline" backgroundColor="blue.900">
        {match.slice(1, -1)}
      </chakra.pre>
    );
  });

  component = reactStringReplace(component, /(==(?:.+?)==(?:#[\S]+)?)(?:\r\n|\r|\n)?/g, match => {
    const { title, anchor } = getMarkupTitleProperties(match);
    console.log({ match, title });
    return (
      <Heading key={++key.value} id={anchor?.slice(1)} marginTop="5" marginBottom="2">
        {convertMarkup(title, key)}
      </Heading>
    );
  });

  component = reactStringReplace(component, simpleMarkupsRegex, match => {
    for (let i = 0; i < simpleMarkups.length; ++i) {
      const markup = simpleMarkups[i];
      const matchResult = match.match(
        new RegExp(`^${markup.startSymbol}(?<content>.+?)${markup.endSymbol}$`),
      );
      if (matchResult)
        return markup.getComponent(matchResult.groups?.content as string, convertMarkup, key);
    }
    console.error("Couldn't find simple markup");
  });

  component = reactStringReplace(
    component,
    /(<<.+?>>(?:[0-9]+x[0-9]+)?(?:t|r|h|b|g|d)*(?:\(.*\))?)/g,
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
  );

  component = reactStringReplace(component, /(\r\n|\r|\n)/g, () => <br key={++key.value} />);

  return component;
};

interface WikiContentProps {
  content: string;
}

const WikiContent: React.FC<WikiContentProps> = ({ content }) => {
  const replacedContent = useMemo(() => convertMarkup(content, { value: 0 }), [content]);

  return (
    <Box w="full" overflowX="hidden">
      {replacedContent}
    </Box>
  );
};

export default WikiContent;
