import * as CSS from 'csstype';
import * as FaIcons from 'react-icons/fa';
import * as GiIcons from 'react-icons/gi';
import * as HiIcons from 'react-icons/hi';
import * as SiIcons from 'react-icons/si';

const ICON_SHORTCUT_TO_ICON_GROUP = {
  Fa: FaIcons,
  Gi: GiIcons,
  Hi: HiIcons,
  Si: SiIcons,
};

export const getMarkupIconComponent = (match: string) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return ICON_SHORTCUT_TO_ICON_GROUP[match.slice(0, 2)]?.[match];
};

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
    /<<(?<url>.+?)>>(?:(?<width>[0-9]+)x(?<height>[0-9]+))?(?<properties>(?:t|r|h|b|g|d)+)?(?:\((?<legend>.+)\))?/,
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
  const matchResult = match.match(/==[\s]*(?<title>.+?)[\s]*==(?<anchor>#[\S]+)?/);

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
