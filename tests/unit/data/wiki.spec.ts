import { sortWikiProposals, WikiProposal, WikiSuggestion } from 'data/wiki';

type PartialWikiProposal = Partial<
  Omit<WikiProposal, 'suggestions'> & { suggestions: Pick<WikiSuggestion, 'date'>[] }
>;

describe('Function sortWikiProposals', () => {
  const completeWikiProposal = (partialProposal: PartialWikiProposal): WikiProposal => ({
    _id: '',
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
    expect(sortWikiProposals(proposals)).to.eql(proposals);
    expect(sortWikiProposals(proposals.slice().reverse())).to.eql(proposals);
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
      { status: 'proposed', suggestions: [{ date: '2000-01-01' }] },
      { status: 'proposed', suggestions: [{ date: '2000-01-02' }] },
    ]);
    expectSort([
      { status: 'validated', suggestions: [{ date: '2000-01-01' }] },
      { status: 'rejected', suggestions: [{ date: '2000-01-02' }] },
    ]);
    expectSort([
      { status: 'validated', suggestions: [{ date: '2000-01-01' }] },
      { status: 'validated', suggestions: [{ date: '2000-01-02' }] },
    ]);
  });
});