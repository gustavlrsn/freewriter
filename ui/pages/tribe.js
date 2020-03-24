import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

// TODO:
// hide navbar?
// hide autoscroll?

export const TRIBE_QUERY = gql`
  query TribeWords {
    tribeWords {
      _id
      number_of_words
      createdAt
      date
      elapsed_time
      owner {
        _id
        username
        dailygoal
        avatar
      }
    }
  }
`;

export default ({ currentUser }) => {
  const {
    data: { tribeWords } = { tribeWords: null },
    loading,
    error
  } = useQuery(TRIBE_QUERY);

  if (!tribeWords) return null;
  return (
    <>
      <div>
        {tribeWords.map(obj => (
          <li key={obj._id}>
            {obj.owner.username} - {obj.number_of_words} words
          </li>
        ))}
      </div>
    </>
  );
};
