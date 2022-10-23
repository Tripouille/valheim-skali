import { useMemo } from 'react';
import { IconContext } from 'react-icons';
import { chakra } from '@chakra-ui/react';
import loadable from '@loadable/component';
import BasicIcon from 'components/core/Images/Icon';

const iconNameStartToIconPackage = {
  Gi: 'gi',
  Wi: 'wi',
  Ai: 'ai',
  Bs: 'bs',
  Bi: 'bi',
  Di: 'di',
  Fi: 'fi',
  Fa: 'fa',
  Fc: 'fc',
  Go: 'go',
  Gr: 'gr',
  Hi: 'hi',
  Im: 'im',
  IoIos: 'io',
  Io: 'io5',
  Md: 'md',
  Ri: 'ri',
  Si: 'si',
  Tb: 'tb',
  Ti: 'ti',
  Vsc: 'vsc',
  Cg: 'cg',
};

const DynamicIconFallback = () => (
  <chakra.span title="Icône non trouvée">
    <BasicIcon />
  </chakra.span>
);

interface DynamicIconProps {
  iconName: string;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ iconName }) => {
  const lib = useMemo(() => {
    if (iconName.length < 2) return;
    let libShortcut;
    Object.entries(iconNameStartToIconPackage).forEach(([key, value]) => {
      if (iconName.startsWith(key)) {
        libShortcut = value;
      }
    });
    return libShortcut;
  }, [iconName]);
  if (!lib) return <DynamicIconFallback />;

  const Icon = loadable(() => import(`react-icons/${lib}/index.js`), {
    resolveComponent: (el: JSX.Element) => el[iconName as keyof JSX.Element] ?? DynamicIconFallback,
    fallback: <DynamicIconFallback />,
  });

  const iconContext: IconContext = {
    style: {
      display: 'inline-block',
      verticalAlign: 'text-bottom',
      fontSize: '1.4em',
    },
  };

  return (
    <IconContext.Provider value={iconContext}>
      <Icon />
    </IconContext.Provider>
  );
};

export default DynamicIcon;
