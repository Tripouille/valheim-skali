import { BiCollapse, BiExpand } from 'react-icons/bi';
import { useBoolean } from '@chakra-ui/react';
import Box from 'components/core/Containers/Box';
import { Grid } from 'components/core/Containers/Grid';
import IconButton from 'components/core/Interactive/IconButton';
import Text from 'components/core/Typography/Text';
import { Children } from 'utils/types';

interface FormPreviewChildrenProps {
  previewHasRestrictedHeight: boolean;
}

interface FormPreviewLayoutProps {
  children: (props: FormPreviewChildrenProps) => Children;
}

const FormPreviewLayout: React.FC<FormPreviewLayoutProps> = ({ children }) => {
  const [previewHasRestrictedHeight, setPreviewRestrictedHeight] = useBoolean(false);

  return (
    <Box mt="10">
      <Grid templateColumns="1fr auto 1fr" gap="5" width="full">
        <Text alignSelf="center" gridColumnStart="2">
          Aperçu :
        </Text>
        <IconButton
          data-cy="switch-preview-height"
          aria-label={
            previewHasRestrictedHeight ? "Agrandir l'aperçu" : "Restreindre la hauteur de l'aperçu"
          }
          title={
            previewHasRestrictedHeight ? "Agrandir l'aperçu" : "Restreindre la hauteur de l'aperçu"
          }
          icon={previewHasRestrictedHeight ? <BiExpand /> : <BiCollapse />}
          variant="ghost"
          justifySelf="end"
          onClick={setPreviewRestrictedHeight.toggle}
        />
      </Grid>
      {children({ previewHasRestrictedHeight })}
    </Box>
  );
};

export default FormPreviewLayout;
