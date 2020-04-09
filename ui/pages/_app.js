import React, { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import dayjs from "dayjs";
import copy from "copy-to-clipboard";

import withData from "../utils/apolloClient";
import countWords from "../utils/countWords";
import saveAsTxt from "../utils/saveAsTxt";

import "../styles.css";
import "react-tippy/dist/tippy.css";

import Layout from "../components/Layout";
import { Router } from "next/router";

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

const LET_GO_MUTATION = gql`
  mutation letGo($number_of_words: Int!, $elapsed_time: Int!, $date: String!) {
    letGo(
      number_of_words: $number_of_words
      elapsed_time: $elapsed_time
      date: $date
    ) {
      number_of_words
      _id
      elapsed_time
    }
  }
`;

const MyApp = ({ Component, pageProps, apollo }) => {
  let currentUser;

  const { data } = useQuery(CURRENT_USER_QUERY, {
    client: apollo
  });
  if (data) {
    currentUser = data.currentUser;
  }
  const [letGoMutation] = useMutation(LET_GO_MUTATION, { client: apollo });

  const [modal, setModal] = useState(null);

  const openModal = name => {
    if (modal !== name) setModal(name);
  };

  const closeModal = () => {
    setModal(null);
  };

  const [writing, setWriting] = useState(false);
  const [writings, setWritings] = useState("");

  const beforeUnload = e => {
    console.log(writings);
    //e.preventDefault();
    if (writings.length) {
      e.preventDefault();
      return "You have written something that has not been added to your stats yet.";
    }
  };

  useEffect(() => {
    window.addEventListener("beforeunload", beforeUnload);

    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
    };
  });

  const [startTime, setStartTime] = useState(null);

  const wordCount = countWords(writings);

  const letGo = () => {
    const endTime = dayjs();
    const elapsed_time = endTime.valueOf() - startTime.valueOf();
    const date = endTime.format("YYYY-MM-DD");
    letGoMutation({
      variables: { number_of_words: wordCount, elapsed_time, date }
    })
      .then(data => {
        console.log({ data });
        // Router.push('/[username]', `/@${currentUser.username}`);
        // // pop modal..
      })
      .catch(err => alert(err.message));
  };

  return (
    <div onMouseMove={() => setWriting(false)}>
      <ApolloProvider client={apollo}>
        <Layout
          currentUser={currentUser}
          apollo={apollo}
          showHeader={!writing}
          letGo={letGo}
          saveAsTxt={() => saveAsTxt(writings)}
          copyToClipboard={() =>
            copy(writings, {
              message: "Press #{key} to copy",
              format: "text/plain"
            })
          }
          wordCount={wordCount}
        >
          <Component
            {...pageProps}
            writings={writings}
            setWritings={setWritings}
            currentUser={currentUser}
            wordCount={wordCount}
            fadeHeader={() => setWriting(true)}
            setStartTime={setStartTime}
            onScrolledTop={e =>
              console.log("scrolled top")
            } /* add props to be intercepted by autoscroll */
            onScrolled={e => console.log("the list was scrolled")}
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
