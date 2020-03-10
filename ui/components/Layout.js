import Head from "next/head";
import Header from "./Header";
import Router, { useRouter } from "next/router";
import cookie from "js-cookie";

// const Container = styled.div`
//   flex: 0 1 700px;
//   margin: 0 20px;
//   padding: 100px 0;
//   justify-content: stretch;
// `;

export default ({ children, currentUser, apollo, showHeader }) => {
  const router = useRouter();

  // check for token in query to set it and remove it from url
  React.useEffect(() => {
    if (router.query.token) {
      cookie.set("token", router.query.token, { expires: 30 });
      apollo.resetStore();
      Router.push("/"); // change this to just be replace current route?
      // trigger alert or something on invalid token
    }
  }, [router.query]);

  // React.useEffect(() => {
  //   // this will be first time user logs in
  //   if (currentUser && !currentUser.name) {
  //     // pop modal to set user name and maybe go through a dreams walk through? :)
  //     openModal(modals.FINISH_SIGN_UP);
  //   }
  // }, [currentUser]);

  const logOut = () => {
    cookie.remove("token");
    apollo.resetStore();
    Router.push("/");
  };

  return (
    <>
      <Head>
        <title>Freewriter</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Head>

      <Header
        currentUser={currentUser}
        logOut={logOut}
        showHeader={showHeader}
      />

      <div className="mx-3">{children}</div>
    </>
  );
};
