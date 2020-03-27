import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Link from "next/link";
import dayjs from "dayjs";
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
      unlocks
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

  const wordsToday = tribeWords.reduce(
    (acc, obj) => acc + obj.number_of_words,
    0
  );
  const noOfAuthors = tribeWords.reduce((acc, obj) => {
    if (!acc.includes(obj.owner._id)) return [...acc, obj.owner._id];
    return acc;
  }, []).length;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-sidebar gap-4">
        <div>
          <h2 className="text-3xl mb-3">
            {wordsToday} words by {noOfAuthors} writers today!
          </h2>
          <ul>
            {tribeWords.map(obj => (
              <li key={obj._id} className="mb-2 text-gray-800">
                <Link href="/[username]" as={`/@${obj.owner.username}`}>
                  <a className=" items-center text-purple-800 hover:text-purple-900">
                    <img
                      src={`/avatars/${obj.owner.avatar}.png`}
                      className="w-10 h-10 inline-block rounded-full mr-1"
                    />{" "}
                    @{obj.owner.username}
                  </a>
                </Link>{" "}
                <span className="mr-2">
                  wrote {obj.number_of_words} words in{" "}
                  {Math.round(obj.elapsed_time / (1000 * 60))} minutes
                </span>
                {obj.unlocks.map(unlock => (
                  <img
                    key={unlock}
                    src={`/achievements/${unlock}.png`}
                    className="h-6 w-6 mr-2 inline-block"
                  />
                ))}
                <span className="text-gray-500">
                  {dayjs(obj.createdAt).format("h:mm A")}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="bg-gray-100 rounded px-3 py-4 text-center">
            <h2 className="text-lg font-semibold mb-2">Monthly challenge</h2>

            <img
              src={`/achievements/${dayjs().format("YYMM")}.png`}
              className="h-25 w-25 mb-2 mx-auto"
            />

            <p>
              Hit your daily goal for every day of {dayjs().format("MMMM")} to
              unlock this badge!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
