// import { FormEventHandler, useState } from 'react';
// import useSWR from 'swr';
import List from 'components/List';

const HomePage: React.FC = () => {
  // const { data } = useSWR('/api/messages', args => fetch(args).then(res => res.json()));
  // const [value, setValue] = useState('');

  // const onClick: FormEventHandler<HTMLFormElement> = (event): void => {
  //   event.preventDefault();
  //   fetch('/api/create-message', {
  //     method: 'POST',
  //     body: JSON.stringify({ message: value }),
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   setValue('');
  // };
  return (
    <>
      <List />
      {/* <h1>Notre super site</h1>
      <form onSubmit={onClick}>
        <input
          type="text"
          id="create-message"
          value={value}
          onChange={v => setValue(v.target.value)}
        />
        <input type="submit" value="Create message" />
      </form>
      <ul>{data && data.map((v: any) => <li key={v._id}>{v.message}</li>)}</ul> */}
    </>
  );
};

export default HomePage;
