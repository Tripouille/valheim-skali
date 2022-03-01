import { eventComp } from '@packages/components/pages/Events/utils';
import { Event } from '@packages/data/event';

interface GenEventArgs {
  startDate?: string;
  endDate?: string;
  continuous?: boolean;
}

describe('Function eventComp', () => {
  const compFn = eventComp(new Date('2000-01-15T21:00:00Z'));

  /** Generate a lambda event with custom start date, end date and continuous properties */
  const generateEvent = (args: GenEventArgs): Event => ({
    name: 'Event name',
    tags: [],
    startDate: args.startDate ? new Date(args.startDate).toISOString() : '2000-01-01T00:00:00Z',
    endDate: args.endDate ? new Date(args.endDate).toISOString() : undefined,
    continuous: args.continuous ?? false,
    description: '',
  });

  /**
   * For an event pair, expect the comparison function
   * to return the right value in both orders.
   * Also display args to be visible in failed tests.
   */
  const expectComp = (args1: GenEventArgs, args2: GenEventArgs) => {
    expect({ args1, args2, result: compFn(generateEvent(args1), generateEvent(args2)) }).toEqual({
      args1,
      args2,
      result: -1,
    });
    expect({ args1, args2, result: compFn(generateEvent(args2), generateEvent(args1)) }).toEqual({
      args2,
      args1,
      result: 1,
    });
  };

  it('should prioritize ponctual events over continuous events', () => {
    expectComp(
      { continuous: false, endDate: '2000-01-10' },
      { continuous: true, endDate: '2000-01-10' },
    );
    expectComp(
      { continuous: false, endDate: '2000-01-17' },
      { continuous: true, endDate: '2000-01-17' },
    );
  });

  it('should beforehand prioritize closer start date', () => {
    expectComp({ startDate: '2000-01-15T20:30:00Z' }, { startDate: '2000-01-15T20:00:00Z' });
    expectComp({ startDate: '2000-01-16' }, { startDate: '2000-01-17' });
    expectComp(
      { startDate: '2000-01-16', endDate: '2000-01-19' },
      { startDate: '2000-01-17', endDate: '2000-01-18' },
    );
    expectComp(
      { startDate: '2000-01-16', endDate: '2000-01-17' },
      { startDate: '2000-01-17', endDate: '2000-01-18' },
    );
    expectComp({ startDate: '2000-01-16' }, { startDate: '2000-01-01', continuous: true });
    expectComp({ startDate: '2000-01-14', continuous: true }, { startDate: '2000-01-20' });
    expectComp(
      { startDate: '2000-01-16', continuous: true },
      { startDate: '2000-01-13', continuous: true },
    );
  });

  it('should beforehand prioritize more recently ended events', () => {
    expectComp({ startDate: '2000-01-14' }, { startDate: '2000-01-13' });
    expectComp({ startDate: '2000-01-12', endDate: '2000-01-14' }, { startDate: '2000-01-12' });
    expectComp(
      { startDate: '2000-01-12', endDate: '2000-01-14' },
      { startDate: '2000-01-12', endDate: '2000-01-13' },
    );
    expectComp(
      { startDate: '2000-01-12', endDate: '2000-01-14', continuous: true },
      { startDate: '2000-01-12' },
    );
    expectComp(
      { startDate: '2000-01-14' },
      { startDate: '2000-01-12', endDate: '2000-01-13', continuous: true },
    );
    expectComp(
      { startDate: '2000-01-12', endDate: '2000-01-14' },
      { startDate: '2000-01-12', endDate: '2000-01-13', continuous: true },
    );
    expectComp(
      { startDate: '2000-01-12', endDate: '2000-01-14', continuous: true },
      { startDate: '2000-01-12', endDate: '2000-01-13' },
    );
    expectComp(
      { startDate: '2000-01-12', endDate: '2000-01-14', continuous: true },
      { startDate: '2000-01-12', endDate: '2000-01-13', continuous: true },
    );
  });

  it('should beforehand prioritize unfinished events', () => {
    expectComp({ startDate: '2000-01-16' }, { startDate: '2000-01-14' });
    expectComp(
      { startDate: '2000-01-15T20:00:00Z', endDate: '2000-01-15T22:00:00Z' },
      { startDate: '2000-01-15T19:00:00Z', endDate: '2000-01-15T20:00:00Z' },
    );
    expectComp({ startDate: '2000-01-15T20:00:00Z' }, { startDate: '2000-01-15T10:00:00Z' });
    expectComp(
      { startDate: '2000-01-15T20:00:00Z' },
      { startDate: '2000-01-15T19:00:00Z', endDate: '2000-01-15T20:00:00Z' },
    );
    expectComp(
      { startDate: '2000-01-15T19:00:00Z', endDate: '2000-01-15T22:00:00Z' },
      { startDate: '2000-01-15T10:00:00Z' },
    );
    expectComp(
      { startDate: '2000-01-15T10:00:00Z', endDate: '2000-01-15T22:00:00Z' },
      { startDate: '2000-01-15T10:00:00Z' },
    );
    expectComp(
      { startDate: '2000-01-13', continuous: true },
      { startDate: '2000-01-13', endDate: '2000-01-14' },
    );
    expectComp(
      { startDate: '2000-01-13', continuous: true },
      { startDate: '2000-01-13', endDate: '2000-01-14', continuous: true },
    );
    expectComp(
      { startDate: '2000-01-13', endDate: '2000-01-16', continuous: true },
      { startDate: '2000-01-13' },
    );
    expectComp(
      { startDate: '2000-01-13', endDate: '2000-01-16', continuous: true },
      { startDate: '2000-01-13', endDate: '2000-01-14' },
    );
    expectComp(
      { startDate: '2000-01-13', endDate: '2000-01-16', continuous: true },
      { startDate: '2000-01-13', endDate: '2000-01-14', continuous: true },
    );
  });
});
