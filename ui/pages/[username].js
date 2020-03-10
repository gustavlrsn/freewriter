import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

// TODO:

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
      <div className="row">
        <div className="three columns">
          <div className="profile">
            <img
              src={`/avatars/${user.avatar}.png`}
              className="u-max-full-width"
            />
            <h2>
              {user.username}{" "}
              <i
                className="fa fa-check-circle"
                // style="color: #4B489B; margin-left: 2px;"
                aria-hidden="true"
                data-tooltip="Supporting member"
                data-tooltip-direction="s"
              ></i>
            </h2>
            <hr />
            <p>
              <strong>{user.currentStreak} </strong>day streak
              <br />
              Longest streak: {user.longestStreak}
              <br />
              <strong>{user.wordsToday} </strong>words today
              <br />
              Daily goal: {user.dailygoal}
              <br />
              {user.wordsTotal} words total
            </p>
          </div>
        </div>
        <div className="nine columns">
          {/* {{#if Template.subscriptionsReady}}
          {{> chart dailygoal=user.profile.dailygoal}}
        {{else}}
          Loading...
        {{/if}} */}
        </div>
      </div>

      <div className="row">{/* {{> achievements userId=user._id}} */}</div>

      <table className="u-full-width">
        <thead>
          <tr>
            <th>Date</th>
            <th># words</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {user.words.map(entry => (
            <tr key={entry._id}>
              <td>{entry.createdAt}</td>
              <td>{entry.number_of_words} words</td>
              <td>{entry.elapsed_time} minutes</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
