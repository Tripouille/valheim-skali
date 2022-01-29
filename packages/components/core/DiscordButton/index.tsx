import { useBoolean } from '@chakra-ui/react';
import { FaDiscord } from 'react-icons/fa';
import IconButton from '@packages/components/core/IconButton';
import { ElementCategoriesProps } from '@packages/utils/types';

export interface DiscordButtonProps extends ElementCategoriesProps {
  href: string;
}

const DiscordButton: React.FC<DiscordButtonProps> = ({ elementCategories, href }) => {
  const [isLoading, setLoading] = useBoolean();

  const openLink = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setLoading.on();
    let lostFocus = false;

    // window is blurred when dialogs are shown or tab is hidden
    const onBlur = () => {
      lostFocus = true;
    };
    window.addEventListener('blur', onBlur);

    setTimeout(() => {
      if (!lostFocus) {
        /** timeout ended and the user still has focus on the window
         * -> the popup didn't appear -> the app is not installed
         * -> redirecting to https url
         */
        window.open(href);
      }
      window.removeEventListener('blur', onBlur);
      setLoading.off();
    }, 1000);
    window.location.href = href.replace('https', 'discord');
  };

  return (
    <IconButton
      elementCategories={elementCategories}
      as="a"
      href={href}
      title="Ouvrir le message discord"
      aria-label="Ouvrir le message discord"
      icon={<FaDiscord />}
      onClick={openLink}
      isLoading={isLoading}
      variant="expand"
    />
  );
};

export default DiscordButton;
