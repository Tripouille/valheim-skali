import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { APIRoute, NavRoute, serverName } from 'utils/routes';

const useTrackView = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === `/${serverName}${NavRoute.WIKI}/[slug]`) {
      axios.put(`${APIRoute.WIKI}/${router.query.slug}/trackView`).catch(() => {});
    }
  }, [router.pathname, router.query.slug]);
};

export default useTrackView;
