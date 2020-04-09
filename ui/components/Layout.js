import Head from "next/head";
import Header from "./Header";
import Router, { useRouter } from "next/router";
import cookie from "js-cookie";
import ProgressBar from "./ProgressBar";

export default ({
  children,
  currentUser,
  apollo,
  showHeader,
  letGo,
  saveAsTxt,
  copyToClipboard,
  wordCount
}) => {
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
        <title>Freewriter {Boolean(wordCount) ? `(${wordCount})` : ""}</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Head>
      {currentUser && (
        <ProgressBar wordCount={wordCount} currentUser={currentUser} />
      )}

      <Header
        currentUser={currentUser}
        logOut={logOut}
        showHeader={showHeader}
        letGo={letGo}
        saveAsTxt={saveAsTxt}
        copyToClipboard={copyToClipboard}
      />

      <div className="max-w-screen-md mx-auto px-3 pt-24 pb-10">{children}</div>
    </>
  );
};
