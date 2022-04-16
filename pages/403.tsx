import React from 'react';
import Error from 'components/core/Feedback/Error';

const ForbiddenPage: React.FC = () => (
  <Error>
    Vous n&apos;avez pas la permission d&apos;accéder à cette page. Veuillez contactez le
    propriétaire du site si vous pensez que cela n&apos;est pas normal.
  </Error>
);

export default ForbiddenPage;
