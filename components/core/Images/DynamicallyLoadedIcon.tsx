import { useEffect, useState } from 'react';
import { IconContext } from 'react-icons/lib';
import { chakra } from '@chakra-ui/react';
import Icon from 'components/core/Images/Icon';

const getIconComponent = async (iconName: string) => {
  if (iconName.length < 2) return;
  let icons: unknown = [];
  if (iconName.startsWith('Gi')) {
    icons = await import('react-icons/gi');
  } else if (iconName.startsWith('Wi')) {
    icons = await import('react-icons/wi');
  } else if (iconName.startsWith('Ai')) {
    icons = await import('react-icons/ai');
  } else if (iconName.startsWith('Bs')) {
    icons = await import('react-icons/bs');
  } else if (iconName.startsWith('Bi')) {
    icons = await import('react-icons/bi');
  } else if (iconName.startsWith('Di')) {
    icons = await import('react-icons/di');
  } else if (iconName.startsWith('Fi')) {
    icons = await import('react-icons/fi');
  } else if (iconName.startsWith('Fa')) {
    icons = await import('react-icons/fa');
  } else if (iconName.startsWith('Fc')) {
    icons = await import('react-icons/fc');
  } else if (iconName.startsWith('Go')) {
    icons = await import('react-icons/go');
  } else if (iconName.startsWith('Gr')) {
    icons = await import('react-icons/gr');
  } else if (iconName.startsWith('Hi')) {
    icons = await import('react-icons/hi');
  } else if (iconName.startsWith('Im')) {
    icons = await import('react-icons/im');
  } else if (iconName.startsWith('IoIos')) {
    icons = await import('react-icons/io');
  } else if (iconName.startsWith('Io')) {
    icons = await import('react-icons/io5');
  } else if (iconName.startsWith('Md')) {
    icons = await import('react-icons/md');
  } else if (iconName.startsWith('Ri')) {
    icons = await import('react-icons/ri');
  } else if (iconName.startsWith('Si')) {
    icons = await import('react-icons/si');
  } else if (iconName.startsWith('Tb')) {
    icons = await import('react-icons/tb');
  } else if (iconName.startsWith('Ti')) {
    icons = await import('react-icons/ti');
  } else if (iconName.startsWith('Vsc')) {
    icons = await import('react-icons/vsc');
  } else if (iconName.startsWith('Cg')) {
    icons = await import('react-icons/cg');
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return icons[iconName];
};

interface DynamicallyLoadedIconProps {
  iconName: string;
}

const DynamicallyLoadedIcon: React.FC<DynamicallyLoadedIconProps> = ({ iconName }) => {
  const [IconComponent, setIconComponent] = useState();

  useEffect(() => {
    let unmounted = false;
    async function setIcon() {
      const icon = await getIconComponent(iconName);
      if (!unmounted) setIconComponent(icon);
    }
    setIcon();
    return () => {
      unmounted = true;
    };
  }, [iconName]);

  return (
    <IconContext.Provider
      value={{
        style: {
          display: 'inline-block',
          verticalAlign: 'text-bottom',
          fontSize: '1.4em',
        },
      }}
    >
      {IconComponent ?? (
        <chakra.span title="Icône non trouvée">
          <Icon />
        </chakra.span>
      )}
    </IconContext.Provider>
  );
};

export default DynamicallyLoadedIcon;
