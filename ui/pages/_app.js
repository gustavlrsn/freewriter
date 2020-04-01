import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import gql from "graphql-tag";
import withData from "../utils/apolloClient";
import { useQuery } from "@apollo/react-hooks";
import "../styles.css";
import "react-tippy/dist/tippy.css";

import Layout from "../components/Layout";

export const CURRENT_USER_QUERY = gql`
  query currentUser {
    currentUser {
      _id
      username
      avatar
      dailygoal
      wordsToday
    }
  }
`;

const MyApp = ({ Component, pageProps, apollo, hostInfo }) => {
  let currentUser;

  const { data } = useQuery(CURRENT_USER_QUERY, {
    client: apollo
  });
  if (data) {
    currentUser = data.currentUser;
  }

  const [modal, setModal] = React.useState(null);

  const openModal = name => {
    if (modal !== name) setModal(name);
  };

  const closeModal = () => {
    setModal(null);
  };

  const [writing, setWriting] = React.useState(false);

  return (
    <div onMouseMove={() => setWriting(false)}>
      <ApolloProvider client={apollo}>
        <Layout currentUser={currentUser} apollo={apollo} showHeader={!writing}>
          <Component
            {...pageProps}
            currentUser={currentUser}
            fadeHeader={() => setWriting(true)}
          />
        </Layout>
      </ApolloProvider>
    </div>
  );
};

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};

export default withData(MyApp);
