import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Tooltip } from "react-tippy";
import dayjs from "dayjs";
import Graph from "../components/Graph";

// hide navbar?
// hide autoscroll?
export const USER_QUERY = gql`
  query User($username: String!) {
    user(username: $username) {
      _id
      username
      dailygoal
      avatar
      # streak
      # lastCompletedDay
      longestStreak
      currentStreak
      wordsToday
      wordsTotal
      wordsPerDay {
        date
        number_of_words
      }
      achievements {
        _id
        type
        createdAt
      }
      words {
        _id
        number_of_words
        createdAt
        elapsed_time
      }
    }
  }
`;

export default ({ currentUser }) => {
  const router = useRouter();
  const { data: { user } = { user: null }, loading, error } = useQuery(
    USER_QUERY,
    {
      variables: { username: router.query.username.substr(1) }
    }
  );

  if (!user) return null;

  return (
    <>
      <div className="flex">
        <div className="w-40 mr-3 shadow">
          <img
            src={`/avatars/${user.avatar}.png`}
            className="u-max-full-width"
          />

          <h2 className="text-lg text-center font-semibold p-2 border-b">
            {user.username}
            {/* <i
              className="fa fa-check-circle"
              // style="color: #4B489B; margin-left: 2px;"
              aria-hidden="true"
              data-tooltip="Supporting member"
              data-tooltip-direction="s"
            ></i> */}
          </h2>
          <div className="p-2 text-center text-xs uppercase">
            <p>
              <strong className="text-2xl">{user.currentStreak} </strong>day
              streak
            </p>
            <p>Longest streak: {user.longestStreak}</p>
            <p>
              <strong className="text-2xl">{user.wordsToday} </strong>words
              today
            </p>
            <p>Daily goal: {user.dailygoal}</p>
            <p> {user.wordsTotal} words total</p>
          </div>
        </div>
        <div className="flex-grow">
          <Graph wordsPerDay={user.wordsPerDay} />
        </div>
      </div>

      <div className="mt-6 bg-gray-100 rounded p-4 flex flex-wrap">
        {user.achievements.map(achievement => (
          <Tooltip
            title={`Unlocked on ${dayjs(achievement.createdAt).format(
              "MMMM D, YYYY"
            )}`}
            position="bottom"
            distance="-3"
            size="small"
            key={achievement.type}
          >
            <img
              className="w-25 h-25 m-2"
              src={`/achievements/${achievement.type}.png`}
            />
          </Tooltip>
        ))}
      </div>

      <table className="w-full text-left mt-6">
        <thead>
          <tr>
            <th className="py-2">Date</th>
            <th className="py-2"># words</th>
            <th className="py-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {user.words.map(entry => (
            <tr key={entry._id} className="border-t">
              <td className="py-2">
                {dayjs(entry.createdAt).format("ddd, MMM D, YYYY h:mm A")}
              </td>
              <td className="py-2">{entry.number_of_words} words</td>
              <td className="py-2">
                {Math.round(entry.elapsed_time / (1000 * 60))} minutes
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
