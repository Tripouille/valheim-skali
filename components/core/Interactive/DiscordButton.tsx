import { FaDiscord } from 'react-icons/fa';
import { chakra, useBoolean } from '@chakra-ui/react';
import Spinner from 'components/core/Feedback/Spinner';
import Button from 'components/core/Interactive/Button';
import { CypressProps } from 'utils/types';

export interface DiscordButtonProps extends CypressProps {
  href: string;
  label?: string;
  isInvitation?: true;
  title?: string;
}

const DiscordButton: React.FC<DiscordButtonProps> = ({
  'data-cy': dataCy,
  href,
  label = 'Lien discord',
  isInvitation,
  title,
}) => {
  const [isLoading, setLoading] = useBoolean();

  const openLink = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isInvitation) return;

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
      target="_blank"
      title={title}
    >
      <chakra.span overflow="hidden" textOverflow="ellipsis">
        {label}
      </chakra.span>
    </Button>
  );
};

export default DiscordButton;
