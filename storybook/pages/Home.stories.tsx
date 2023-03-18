import HomePage from 'components/pages/Home';
import { StoryCategory } from 'storybook/config/constants';
import { storybookSetup } from 'storybook/config/setup';
import { APIRoute } from 'utils/routes';

const { defaultExport, StoryFactory } = storybookSetup(HomePage, StoryCategory.PAGE, {
  parameters: { chromatic: { delay: 1000 } },
});

export default defaultExport;

const SSRFeaturedWikiPages = {
  lastPages: [{ _id: '1', slug: 'a-wiki-page', title: 'A wiki page' }],
  startingPages: [],
  essentialPages: [],
  popularPages: [{ _id: '1', slug: 'a-wiki-page', title: 'A wiki page' }],
};

export const AsVisitor = StoryFactory(
  { SSRFeaturedWikiPages: JSON.stringify(SSRFeaturedWikiPages) },
  {
    requestResults: [{ url: `${APIRoute.WIKI}/featured`, result: SSRFeaturedWikiPages }],
  },
);

export const AsNonMember = StoryFactory(
  { SSRFeaturedWikiPages: JSON.stringify(SSRFeaturedWikiPages) },
  {
    sessionRequestResult: { isNonMember: true },
    requestResults: [{ url: `${APIRoute.WIKI}/featured`, result: SSRFeaturedWikiPages }],
  },
);

export const AsMember = StoryFactory(
  { SSRFeaturedWikiPages: JSON.stringify(SSRFeaturedWikiPages) },
  {
    sessionRequestResult: { isNonMember: false },
    requestResults: [{ url: `${APIRoute.WIKI}/featured`, result: SSRFeaturedWikiPages }],
  },
);
