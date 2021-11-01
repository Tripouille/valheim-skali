import { GetStaticProps } from 'next';

interface Props {
  message: string | string[];
}

const DetailPage: React.FC<Props> = ({ message }) => {
  return <div> The Detail Page {message}</div>;
};

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          id: '1',
        },
      },
      {
        params: {
          id: '6',
        },
      },
    ],
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps = async context => {
  const props: Props = {
    message: context.params?.id ?? '',
  };

  return {
    props,
  };
};

export default DetailPage;
