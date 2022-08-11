import { BiCollapse, BiExpand } from 'react-icons/bi';
import { useBoolean } from '@chakra-ui/react';
import Box from 'components/core/Containers/Box';
import { Grid } from 'components/core/Containers/Grid';
import IconButton from 'components/core/Interactive/IconButton';
import Heading from 'components/core/Typography/Heading';
import Text from 'components/core/Typography/Text';
import WikiContent from '../WikiContent';

interface WikiProposalFormPreviewProps {
  title: string;
  content: string;
}

const WikiProposalFormPreview: React.FC<WikiProposalFormPreviewProps> = ({ title, content }) => {
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
      <Box
        mt="2"
        maxHeight={previewHasRestrictedHeight ? '455px' : undefined}
        overflow="auto"
        px="1"
      >
        <Heading textAlign="center" fontFamily="Norse" size="2xl" fontWeight="normal" mb="7">
          {title}
        </Heading>
        <WikiContent content={content} />
      </Box>
    </Box>
  );
};

export default WikiProposalFormPreview;
