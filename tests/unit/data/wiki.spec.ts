import { sortWikiProposals, WikiCreationProposal, WikiSuggestion } from 'data/wiki';

type PartialWikiProposal = Partial<
  Omit<WikiCreationProposal, 'suggestions'> & { suggestions: Pick<WikiSuggestion, 'date'>[] }
>;

describe('Function sortWikiProposals', () => {
  const completeWikiProposal = (partialProposal: PartialWikiProposal): WikiCreationProposal => ({
    _id: '',
    authorId: '',
    status: 'proposed',
    proposalType: 'creation',
    ...partialProposal,
    suggestions:
      partialProposal.suggestions?.map(suggestion => ({ title: '', content: '', ...suggestion })) ??
      [],
  });

  /**
   * For a proposals array, expect to return the same given array
   * when sorted from both orders.
   */
  const expectSort = (partialProposals: PartialWikiProposal[]) => {
    const proposals = partialProposals.map(partialProposal =>
      completeWikiProposal(partialProposal),
    );
    const proposalsInOrder = proposals.slice();
    sortWikiProposals(proposalsInOrder);
    const proposalsReversed = proposals.slice();
    sortWikiProposals(proposalsReversed);
    expect(proposalsInOrder).to.eql(proposals);
    expect(proposalsReversed).to.eql(proposals);
  };

  it('should prioritize proposals still in proposition, no matter the last date', () => {
    expectSort([{ status: 'proposed' }, { status: 'validated' }]);
    expectSort([{ status: 'proposed' }, { status: 'rejected' }]);
    expectSort([
      { status: 'proposed', suggestions: [{ date: '2000-01-01' }] },
      { status: 'validated', suggestions: [{ date: '2000-01-02' }] },
    ]);
    expectSort([
      { status: 'proposed', suggestions: [{ date: '2000-01-01' }] },
      { status: 'rejected', suggestions: [{ date: '2000-01-02' }] },
    ]);
  });

  it('should prioritize proposals with most recent suggestions when the status is similar', () => {
    expectSort([
      { status: 'proposed', suggestions: [{ date: '2000-01-02' }] },
      { status: 'proposed', suggestions: [{ date: '2000-01-01' }] },
    ]);
    expectSort([
      { status: 'rejected', suggestions: [{ date: '2000-01-02' }] },
      { status: 'validated', suggestions: [{ date: '2000-01-01' }] },
    ]);
    expectSort([
      { status: 'validated', suggestions: [{ date: '2000-01-02' }] },
      { status: 'validated', suggestions: [{ date: '2000-01-01' }] },
    ]);
  });
});
