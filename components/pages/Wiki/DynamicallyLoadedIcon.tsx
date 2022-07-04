import { useEffect, useState } from 'react';
import { IconContext } from 'react-icons/lib';
import { chakra } from '@chakra-ui/react';
import Icon from 'components/core/Images/Icon';
import { getMarkupIconComponent } from 'utils/markup';

const DynamicallyLoadedIcon = ({ content }: { content: string }) => {
  const [IconComponent, setIconComponent] = useState();

  useEffect(() => {
    let unmounted = false;
    async function setIcon() {
      const icon = await getMarkupIconComponent(content);
      if (!unmounted) setIconComponent(icon);
    }
    setIcon();
    return () => {
      unmounted = true;
    };
  }, [content]);

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
