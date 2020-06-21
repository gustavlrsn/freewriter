// 1 choose avatar
// 2 daily goal
// 3
// username
// email
// timezone

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Tooltip } from "react-tippy";
import { useForm } from "react-hook-form";

import avatars from "lib/avatars";
import Button from "components/Button";
import { timezones } from "lib/timezones";

const css = {
  title: " font-medium text-center text-lg mb-2",
};

const SIGNUP_MUTATION = gql`
  mutation SignUp(
    $avatar: String!
    $dailygoal: Int!
    $username: String!
    $email: String!
    $timezone: String!
  ) {
    signUp(
      avatar: $avatar
      dailygoal: $dailygoal
      username: $username
      email: $email
      timezone: $timezone
    ) {
      email
    }
  }
`;

export default ({ currentUser }) => {
  const { handleSubmit, register, errors, reset } = useForm();
  const [signUp, { loading, data, error }] = useMutation(SIGNUP_MUTATION);

  const tzFromBrowser = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (data) {
    return (
      <>
        Sign up successful! An email with a magic link to login has been sent to
        your email address.
      </>
    );
  }
  if (currentUser) {
    return <>Already logged in. </>;
  }
  if (error) {
    console.log({ error });
  }
  return (
    <form
      onSubmit={handleSubmit((variables) => {
        signUp({
          variables: { ...variables, dailygoal: Number(variables.dailygoal) },
        }).catch((err) => alert(err.message));
      })}
    >
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-semibold text-center mb-4">Sign up</h1>
        <h2 className={css.title}>1. Choose avatar</h2>
        <div className="flex flex-wrap -mx-2 justify-between mb-16">
          {avatars.map((avatar, i) => (
            <Tooltip
              key={avatar.id}
              title={avatar.name}
              size="small"
              position="bottom"
              distance="5"
              hideOnClick={false}
              delay={75}
              className="rounded-full m-1"
            >
              <input
                name="avatar"
                value={avatar.id}
                id={avatar.id}
                type="radio"
                className="hidden"
                ref={register}
                defaultChecked={i === 0}
              />
              <label htmlFor={avatar.id} className="rounded-full block">
                <img
                  src={`/avatars/${avatar.id}.png`}
                  alt={avatar.name}
                  className="h-25 w-25 rounded-full cursor-pointer transition-opacity duration-100 opacity-50 hover:opacity-100 transition-opacity duration-100"
                />
              </label>
            </Tooltip>
          ))}
        </div>
        <div className="mb-16">
          <h2 className={css.title}>2. Set a daily goal</h2>
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="dailygoal"
          >
            Words per day
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:shadow-outline-indigo"
            id="dailygoal"
            name="dailygoal"
            type="text"
            placeholder="Daily goal (words)"
            ref={register}
            defaultValue="750"
          />
        </div>

        <div className="mb-16">
          <h2 className={css.title}>3. Account details</h2>
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="mb-4 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:shadow-outline-indigo"
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            ref={register}
          />

          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="mb-4 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:shadow-outline-indigo"
            id="email"
            name="email"
            type="text"
            placeholder="Email"
            ref={register}
          />

          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="timezone"
          >
            Timezone
          </label>
          <div className="mb-4 relative">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded focus:outline-none focus:shadow-outline-indigo"
              name="timezone"
              id="timezone"
              ref={register}
              defaultValue={tzFromBrowser}
            >
              {timezones.map((timezone) => (
                <option key={timezone} value={timezone}>
                  {timezone}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700">
              <svg className="h-4 w-4" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <Button type="submit" loading={loading}>
          Sign up
        </Button>
      </div>
    </form>
  );
};
