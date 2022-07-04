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

export const getMarkupIconComponent = async (match: string) => {
  if (match.length < 2) return;
  let icons: unknown = [];
  if (match.startsWith('Gi')) {
    icons = await import('react-icons/gi');
  } else if (match.startsWith('Wi')) {
    icons = await import('react-icons/wi');
  } else if (match.startsWith('Ai')) {
    icons = await import('react-icons/ai');
  } else if (match.startsWith('Bs')) {
    icons = await import('react-icons/bs');
  } else if (match.startsWith('Bi')) {
    icons = await import('react-icons/bi');
  } else if (match.startsWith('Di')) {
    icons = await import('react-icons/di');
  } else if (match.startsWith('Fi')) {
    icons = await import('react-icons/fi');
  } else if (match.startsWith('Fa')) {
    icons = await import('react-icons/fa');
  } else if (match.startsWith('Fc')) {
    icons = await import('react-icons/fc');
  } else if (match.startsWith('Gi')) {
    icons = await import('react-icons/gi');
  } else if (match.startsWith('Go')) {
    icons = await import('react-icons/go');
  } else if (match.startsWith('Gr')) {
    icons = await import('react-icons/gr');
  } else if (match.startsWith('Im')) {
    icons = await import('react-icons/im');
  } else if (match.startsWith('IoIos')) {
    icons = await import('react-icons/io');
  } else if (match.startsWith('Io')) {
    icons = await import('react-icons/io5');
  } else if (match.startsWith('Md')) {
    icons = await import('react-icons/md');
  } else if (match.startsWith('Ri')) {
    icons = await import('react-icons/ri');
  } else if (match.startsWith('Si')) {
    icons = await import('react-icons/si');
  } else if (match.startsWith('Tb')) {
    icons = await import('react-icons/tb');
  } else if (match.startsWith('Ti')) {
    icons = await import('react-icons/ti');
  } else if (match.startsWith('Vsc')) {
    icons = await import('react-icons/vsc');
  } else if (match.startsWith('Wi')) {
    icons = await import('react-icons/wi');
  } else if (match.startsWith('Cg')) {
    icons = await import('react-icons/cg');
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return icons[match];
};
