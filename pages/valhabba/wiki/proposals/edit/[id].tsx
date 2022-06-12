import { useRouter } from 'next/router';
import WikiProposalForm from 'components/pages/Wiki/WikiProposals/WikiProposalForm';
import QueryHandler from 'components/core/Disclosure/QueryHandler';
import { useWikiProposal } from 'hooks/wiki/useWikiProposal';
import useAddWikiSuggestion from 'hooks/wiki/useAddWikiSuggestion';
import { getRouteParameterAsString } from 'utils/routes';

const EditWikiProposalPage = () => {
  const router = useRouter();
  const wikiProposalId = getRouteParameterAsString(router.query.id);

  const wikiProposalQuery = useWikiProposal(wikiProposalId);
  const addWikiSuggestion = useAddWikiSuggestion(wikiProposalId);

  return (
    <QueryHandler query={wikiProposalQuery}>
      <WikiProposalForm wikiProposal={wikiProposalQuery.data} onSubmit={addWikiSuggestion} />
    </QueryHandler>
  );
};

export default EditWikiProposalPage;
