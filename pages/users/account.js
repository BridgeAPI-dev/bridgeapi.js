function Account() {
  return (
    <h1>Account</h1>
  );
}

export default Account;

export async function getStaticProps(context) {
  return {
    props: {
      user: {
        email: 'myemail@gmail.com',
        notifications: {
          emailOnEvents: true,
        },
      },
    },
  };
}
