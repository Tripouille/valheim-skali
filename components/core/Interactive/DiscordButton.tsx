import { useBoolean } from '@chakra-ui/react';
import { FaDiscord } from 'react-icons/fa';
import { CypressProps } from 'utils/types';
import Button from 'components/core/Interactive/Button';
import Spinner from 'components/core/Feedback/Spinner';

export interface DiscordButtonProps extends CypressProps {
  href: string;
  label?: string;
}

const DiscordButton: React.FC<DiscordButtonProps> = ({
  'data-cy': dataCy,
  href,
  label = 'Lien discord',
}) => {
  const [isLoading, setLoading] = useBoolean();

  const openLink = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

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
    <Button
      data-cy={dataCy}
      as="a"
      href={href}
      leftIcon={isLoading ? <Spinner size="sm" emptyColor="blue.200" /> : <FaDiscord />}
      onClick={openLink}
      lineHeight="1em"
    >
      <span>{label}</span>
    </Button>
  );
};

export default DiscordButton;
