import { ReactElement, useState, useEffect, useRef, useCallback } from 'react';
import reactStringReplace from 'react-string-replace';
import { chakra } from '@chakra-ui/react';
import Box from 'components/core/Containers/Box';
import { Grid } from 'components/core/Containers/Grid';
import DynamicallyLoadedIcon from 'components/core/Images/DynamicallyLoadedIcon';
import ZoomableImage from 'components/core/Images/ZoomableImage';
import DiscordButton from 'components/core/Interactive/DiscordButton';
import Link from 'components/core/Interactive/Link';
import Spoiler from 'components/core/Typography/Spoiler';
import Heading from 'components/core/Typography/Heading';
import {
  getInternalLinkProperties,
  getMarkupDiscordLinkProperties,
  getMarkupGridContent,
  getMarkupImageProperties,
  getMarkupTitleProperties,
} from 'utils/markup';
import { StrictReactNode } from 'utils/types';
import WikiInternalLink from './WikiInternalLink';

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
    getComponent: (content, _, key) => (
      <DynamicallyLoadedIcon key={++key.value} iconName={content} />
    ),
  },
  {
    startSymbol: '\\[',
    endSymbol: '\\]',
    getComponent: (content, _, key) => (
      <Link key={++key.value} href={content} isExternal>
        {content}
      </Link>
    ),
  },
];

const simpleMarkupsRegex = new RegExp(
  '(' +
    simpleMarkups.map(markup => `(?:${markup.startSymbol}.+?${markup.endSymbol})`).join('|') +
    ')',
  'g',
);

export const convertMarkup: ConvertMarkupFunction = (markupContent, key) => {
  let component: string | StrictReactNode[] = markupContent;

  component = reactStringReplace(component, /(```[\s\S]*?```)/g, match => {
    return (
      <chakra.pre key={++key.value} backgroundColor="blue.900">
        {match.slice(3, -3)}
      </chakra.pre>
    );
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
      <chakra.pre key={++key.value} display="inline" backgroundColor="blue.900">
        {match.slice(1, -1)}
      </chakra.pre>
    );
  });

  component = reactStringReplace(component, /(==(?:.+?)==(?:#\S+)?)(?:\r\n|\r|\n)?/g, match => {
    const { title, anchor } = getMarkupTitleProperties(match);
    return (
      <Heading
        key={++key.value}
        id={anchor?.slice(1)}
        size="md"
        marginTop="2"
        marginBottom="2"
        display="flex"
        alignItems="center"
        gap="0.5em"
        css={{ svg: { width: '1.25em', height: '1.25em' } }}
      >
        {convertMarkup(title, key)}
      </Heading>
    );
  });

  component = reactStringReplace(component, /(\[\[\[(?:.+?)\]\]\](?:\(.*\))?)/g, match => {
    const { url, label } = getMarkupDiscordLinkProperties(match);
    return <DiscordButton key={++key.value} data-cy={label ?? url} href={url} label={label} />;
  });

  component = reactStringReplace(component, /(\[\[(?:.+?)(?:\|(?:.*?))?\]\](?:\S+)?)/g, match => {
    const { pageName, label, labelSuffix } = getInternalLinkProperties(match);
    const linkLabel = (label ?? pageName) + (labelSuffix ?? '');
    return (
      <WikiInternalLink
        key={++key.value}
        data-cy={linkLabel}
        pageName={pageName}
        label={linkLabel}
      />
    );
  });

  component = reactStringReplace(component, simpleMarkupsRegex, match => {
    for (const markup of simpleMarkups) {
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
    /(<<.+?>>(?:\d+x\d+)?(?:[trhbgd])*(?:\(.*\))?)/g,
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

const delay = 500;
const WikiContent: React.FC<WikiContentProps> = ({ content }) => {
  const [replacedContent, setReplacedContent] = useState<string | StrictReactNode[]>(
    convertMarkup(content, { value: 0 }),
  );
  const lastExecutionTime = useRef<number>(new Date().getTime());
  const timerId = useRef<number>();

  const executeAndResetTimer = useCallback((contentString: string) => {
    timerId.current = undefined;
    lastExecutionTime.current = new Date().getTime();
    setReplacedContent(convertMarkup(contentString, { value: 0 }));
  }, []);

  useEffect(() => {
    const now = new Date().getTime();
    const timeSinceLastExecution = now - lastExecutionTime.current;
    clearTimeout(timerId.current);
    if (timeSinceLastExecution >= delay) {
      executeAndResetTimer(content);
    } else {
      // already executed less than delay ago : we'll execute after the remaining time has elapsed
      timerId.current = window.setTimeout(
        () => executeAndResetTimer(content),
        delay - timeSinceLastExecution,
      );
    }
  }, [content, executeAndResetTimer]);

  return (
    <Box data-cy="content" w="full" overflowX="hidden">
      {replacedContent}
    </Box>
  );
};

export default WikiContent;
