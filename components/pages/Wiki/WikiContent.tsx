import reactStringReplace from 'react-string-replace';
import { chakra } from '@chakra-ui/react';
import Spoiler from 'components/core/Typography/Spoiler';
import Heading from 'components/core/Typography/Heading';
import Icon from 'components/core/Images/Icon';
import ZoomableImage from 'components/core/Images/ZoomableImage';
import Box from 'components/core/Containers/Box';
import {
  getMarkupIconComponent,
  getMarkupImageProperties,
  getMarkupTitleProperties,
} from 'utils/markup';

interface WikiContentProps {
  content: string;
}

const WikiContent: React.FC<WikiContentProps> = ({ content }) => {
  let replacedContent;
  let key = 0;

  // Système de grille

  replacedContent = reactStringReplace(content, /\*\*(.+?)\*\*/g, match => (
    <strong key={++key}>{match}</strong>
  ));

  replacedContent = reactStringReplace(replacedContent, /\*(.+?)\*/g, match => (
    <em key={++key}>{match}</em>
  ));

  replacedContent = reactStringReplace(replacedContent, /~~(.+?)~~/g, match => (
    <chakra.span key={++key} textDecoration="line-through">
      {match}
    </chakra.span>
  ));

  replacedContent = reactStringReplace(replacedContent, /\|\|(.+?)\|\|/g, match => (
    <Spoiler key={++key}>{match}</Spoiler>
  ));

  replacedContent = reactStringReplace(replacedContent, /(\[\[(?:.+?)\]\](?:#[\S]+)?)/g, match => {
    const { title, anchor } = getMarkupTitleProperties(match);
    return <Heading key={++key}>{anchor ? <a href={anchor}>{title}</a> : title}</Heading>;
  });

  replacedContent = reactStringReplace(
    replacedContent,
    /(<<.+?>>(?:[0-9]+x[0-9]+)?(?:t|r|h|b|g|d)*(?:\[.*\])?)/g,
    match => {
      const { url, width, height, display, objectFit, objectPosition, legend } =
        getMarkupImageProperties(match);
      return (
        <Box key={++key} width="min-content" display={display} margin="auto">
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

  replacedContent = reactStringReplace(replacedContent, /{{(.+?)}}/g, match => {
    const IconComponent = getMarkupIconComponent(match);
    return IconComponent ? (
      <Icon key={++key} as={IconComponent} />
    ) : (
      <chakra.span key={++key} fontSize="xs">
        [Icône non trouvée : {match}]
      </chakra.span>
    );
  });

  replacedContent = reactStringReplace(replacedContent, /(\r\n|\r|\n)/g, () => <br key={++key} />);

  return <>{replacedContent}</>;
};

export default WikiContent;
