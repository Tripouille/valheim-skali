import Box from 'components/core/Containers/Box';
import FromMarkup from 'components/core/DataDisplay/FromMarkup';
import FormPreviewLayout from 'components/core/Form/FormPreviewLayout';
import Heading from 'components/core/Typography/Heading';

interface WikiProposalFormPreviewProps {
  title: string;
  content: string;
}

const WikiProposalFormPreview: React.FC<WikiProposalFormPreviewProps> = ({ title, content }) => (
  <FormPreviewLayout>
    {({ previewHasRestrictedHeight }) => (
      <Box
        mt="2"
        maxHeight={previewHasRestrictedHeight ? '455px' : undefined}
        overflow="auto"
        px="1"
      >
        <Heading textAlign="center" fontFamily="Norse" size="2xl" fontWeight="normal" mb="7">
          {title}
        </Heading>
        <FromMarkup content={content} />
      </Box>
    )}
  </FormPreviewLayout>
);

export default WikiProposalFormPreview;
