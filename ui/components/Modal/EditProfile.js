import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Tooltip } from "react-tippy";

import avatars from "lib/avatars";
import { timezones } from "lib/timezones";
import Button from "components/Button";

const EDIT_PROFILE_MUTATION = gql`
  mutation EditProfile(
    $username: String
    $dailygoal: Int
    $email: String
    $timezone: String
    $avatar: String
  ) {
    editProfile(
      username: $username
      dailygoal: $dailygoal
      email: $email
      timezone: $timezone
      avatar: $avatar
    ) {
      _id
      username
      avatar
      dailygoal
      email
      emailVerified
      timezone
    }
  }
`;

export default ({ currentUser, closeModal }) => {
  const [editProfile, { loading }] = useMutation(EDIT_PROFILE_MUTATION);
  const {
    handleSubmit,
    register,
    errors,
    reset,
    formState: { dirty, dirtyFields },
  } = useForm();
  // error handling
  // loading state handling including button

  return (
    <div className="">
      <h2 className="text-3xl mb-3">Edit profile</h2>
      <form
        onSubmit={handleSubmit((variables) => {
          // only send variables that have been changed (i.e. dirtyFields)
          const changedVariables = [...dirtyFields].reduce(
            (acc, current) => ({
              [current]:
                current === "dailygoal"
                  ? Number(variables[current])
                  : variables[current],
              ...acc,
            }),
            {}
          );

          editProfile({ variables: changedVariables })
            .then(() => {
              // reset();
              closeModal();
            })
            .catch((err) => alert(err.message));
        })}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:shadow-outline"
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              ref={register}
              defaultValue={currentUser.username}
            />
          </div>
          <div>
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="dailygoal"
            >
              Daily goal (words)
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:shadow-outline"
              id="dailygoal"
              name="dailygoal"
              type="text"
              placeholder="Daily goal"
              ref={register}
              defaultValue={currentUser.dailygoal}
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold"
                htmlFor="email"
              >
                Email
              </label>
              {/* {!currentUser.emailVerified && !dirtyFields.has("email") && (
                <button
                  tabIndex="-1"
                  className="text-xs text-red-900 bg-red-200 rounded-full hover:bg-red-300 focus:outline-none focus:shadow-outline block px-2"
                >
                  Not verified - resend verification email
                </button>
              )} */}
            </div>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:shadow-outline-indigo"
              id="email"
              name="email"
              type="text"
              placeholder="Email"
              ref={register}
              defaultValue={currentUser.email}
            />
          </div>

          <div>
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="timezone"
            >
              Timezone
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded focus:outline-none focus:shadow-outline"
                name="timezone"
                id="timezone"
                ref={register}
                defaultValue={currentUser.timezone}
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
        </div>
        <h3 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-4 mb-3">
          Choose avatar
        </h3>
        <div className="flex flex-wrap -mx-2 justify-between">
          {avatars.map((avatar) => (
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
                defaultChecked={currentUser.avatar === avatar.id}
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
        <div className="flex justify-end mt-6">
          <button
            type="button"
            className="btn bg-transparent hover:bg-gray-200 text-gray-600 mr-2"
            onClick={closeModal}
          >
            Close
          </button>
          <Button type="submit" disabled={!dirty} loading={loading}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};
