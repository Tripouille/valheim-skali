function NewsPage() {
  const onClick = async () => {
    const response = await fetch('/api/my-route', {
      method: 'POST',
      body: JSON.stringify({ message: 'coucou' }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    // eslint-disable-next-line no-unused-vars
    await response.json();
  };
  return (
    <>
      <h1> The news Page </h1>
      <button onClick={onClick} type="button">
        click me
      </button>
    </>
  );
}

export default NewsPage;
