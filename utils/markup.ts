import * as CSS from 'csstype';

interface ImageMarkup {
  url: string;
  width?: string;
  height?: string;
  properties?: string;
  legend?: string;
}

const positionLetterToObjectPosition = { h: 'top', b: 'bottom', g: 'left', d: 'right' };

export const getMarkupImageProperties = (
  match: string,
): {
  url: string;
  width: number;
  height: number;
  display: CSS.Property.Display;
  objectFit: CSS.Property.ObjectFit;
  objectPosition: CSS.Property.ObjectPosition;
  legend?: string;
} => {
  const {
    groups: { url, width, height, properties, legend },
  } = match.match(
    /<<(?<url>.+?)>>(?:(?<width>\d+)x(?<height>\d+))?(?<properties>(?:[trhbgd])+)?(?:\((?<legend>.+)\))?/,
  ) as unknown as { groups: ImageMarkup };

  const positionLetter = Object.keys(positionLetterToObjectPosition).find(property =>
    properties?.includes(property),
  ) as keyof typeof positionLetterToObjectPosition | undefined;

  return {
    url,
    width: width ? Number(width) : 200,
    height: height ? Number(height) : 200,
    display: properties?.includes('t') ? 'inline' : 'block',
    objectFit: properties?.includes('r') ? 'cover' : 'contain',
    objectPosition: positionLetter ? positionLetterToObjectPosition[positionLetter] : 'center',
    legend,
  };
};

export const getMarkupTitleProperties = (match: string) => {
  const matchResult = match.match(/==\s*(?<title>.+?)\s*==(?<anchor>#\S+)?/);

  return matchResult?.groups ?? {};
};

export const getMarkupGridContent = (match: string) => {
  const {
    groups: { dimensions, gridContent },
  } = match.match(/<Grille (?<dimensions>.*)>(?<gridContent>[\s\S]*?)<\/Grille>/) as unknown as {
    groups: { dimensions?: string; gridContent: string };
  };
  const columns = gridContent
    .split(/(?:\r\n|\r|\n)?<Colonne>(?:\r\n|\r|\n)?/)
    .filter(column => column);

  return { dimensions, columns };
};

export const getMarkupDiscordLinkProperties = (match: string) => {
  const matchResult = match.match(/\[\[\[(?<url>.+?)\]\]\](?:\((?<label>.*)\))?/);

  return matchResult?.groups ?? {};
};

export const getInternalLinkProperties = (match: string) => {
  const matchResult = match.match(
    /(\[\[(?<pageName>.+?)(?:\|(?<label>.*?))?\]\](?<labelSuffix>\S+)?)/,
  );

  return matchResult?.groups ?? {};
};
