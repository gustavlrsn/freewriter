import React, { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import dayjs from "dayjs";
import copy from "copy-to-clipboard";

import { withApollo } from "../lib/apollo";
import countWords from "../utils/countWords";
import saveAsTxt from "../utils/saveAsTxt";

import "../styles.css";
import "react-tippy/dist/tippy.css";

import { modals, Modal } from "../components/Modal";
import Layout from "../components/Layout";
import Router from "next/router";

export const CURRENT_USER_QUERY = gql`
  query currentUser {
    currentUser {
      _id
      username
      avatar
      dailygoal
      wordsToday
      timezone
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
      _id
      number_of_words
      elapsed_time
      unlocks
      new_streak
    }
  }
`;

Router.events.on("routeChangeComplete", () => {
  window.scrollTo(0, 0);
});

const MyApp = ({ Component, pageProps, apolloClient }) => {
  let currentUser;

  const { data } = useQuery(CURRENT_USER_QUERY, { client: apolloClient });
  if (data) {
    currentUser = data.currentUser;
  }

  const [letGoMutation] = useMutation(LET_GO_MUTATION, {
    client: apolloClient,
  });

  const [currentModal, setCurrentModal] = useState(null);

  const openModal = (modal) => {
    setCurrentModal(modal);
  };

  const [showHeader, setShowHeader] = useState(true); //rename this fgs
  const [writings, setWritings] = useState("");
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    if (currentUser && !currentUser.timezone)
      openModal({
        type: modals.WELCOME_AND_SET_TIMEZONE,
        hideCloseButton: true,
      });
  }, []);
  // const beforeUnload = e => {
  //   console.log(writings);
  //   //e.preventDefault();
  //   if (writings.length) {
  //     e.preventDefault();
  //     return "You have written something that has not been added to your stats yet.";
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("beforeunload", beforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", beforeUnload);
  //   };
  // });

  const wordCount = countWords(writings);

  const letGo = () => {
    const endTime = dayjs();
    const elapsed_time = endTime.valueOf() - startTime.valueOf();
    const date = endTime.format("YYYY-MM-DD");
    letGoMutation({
      variables: { number_of_words: wordCount, elapsed_time, date },
    })
      .then(({ data }) => {
        Router.push("/[username]", `/@${currentUser.username}`);

        openModal({
          type: modals.FINISHED_WRITING,
          props: {
            number_of_words: data.letGo.number_of_words,
            unlocks: data.letGo.unlocks,
            elapsed_time: data.letGo.elapsed_time,
            new_streak: data.letGo.new_streak,
          },
        });
        setWritings("");
        setStartTime(null);
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div onMouseMove={() => setShowHeader(true)}>
      <Layout
        currentUser={currentUser}
        apollo={apolloClient}
        showHeader={showHeader}
        letGo={letGo}
        saveAsTxt={() => saveAsTxt(writings)}
        copyToClipboard={() =>
          copy(writings, {
            message: "Press #{key} to copy",
            format: "text/plain",
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
          fadeHeader={() => setShowHeader(false)}
          setStartTime={setStartTime}
        />
      </Layout>

      <Modal modal={currentModal} closeModal={() => setCurrentModal(null)} />
    </div>
  );
};

export default withApollo({ ssr: true })(MyApp);
