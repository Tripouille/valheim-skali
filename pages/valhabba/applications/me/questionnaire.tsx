import Background from 'components/core/Containers/Background';
import QueryHandler from 'components/core/Disclosure/QueryHandler';
import PageTitle from 'components/core/Typography/PageTitle';
import MyQuestionnaire from 'components/pages/RulesQuestionnaire/MyQuestionnaire';
import { Application } from 'data/application';
import useMyApplication from 'hooks/applications/useMyApplication';

const hasQuestionnaire = (
  application?: Application,
): application is Application & { questionnaire: NonNullable<Application['questionnaire']> } =>
  !!application?.questionnaire;

const MyRulesQuestionnairePage = () => {
  const myApplicationQuery = useMyApplication();
  const application = myApplicationQuery.data;

  return (
    <Background>
      <PageTitle title="Questionnaire" mb="8" />
      <QueryHandler query={myApplicationQuery}>
        {hasQuestionnaire(application) && <MyQuestionnaire application={application} />}
      </QueryHandler>
    </Background>
  );
};

export default MyRulesQuestionnairePage;
