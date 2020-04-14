import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "react-hook-form";
import { Tooltip } from "react-tippy";
import { QuestionMark as QuestionMarkIcon } from "../Icons";
import { timezones } from "../../lib/timezones";

const SET_TIMEZONE_MUTATION = gql`
  mutation SetTimezone($timezone: String!) {
    editProfile(timezone: $timezone) {
      _id
      timezone
    }
  }
`;

const WelcomeAndSetTimezone = ({ closeModal }) => {
  const [setTimezone] = useMutation(SET_TIMEZONE_MUTATION);
  const { handleSubmit, register, errors } = useForm();

  const tzFromBrowser = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return (
    <div className="max-w-screen-sm">
      <span className="text-gray-500 text-sm uppercase tracking-wide">
        April 20, 2020
      </span>
      <h1 className="text-3xl mb-4">Freewriter has been updated!</h1>
      <p className="mb-4 text-gray-800"></p>

      <p className="mb-4 text-gray-800">
        This is a complete rewrite of the code, but sticking to the same
        features and functionality, you will not notice much changes beyond a
        lot less bugs and better performance.
      </p>
      <p className="mb-4 text-gray-800">
        With the rewrite complete I can now focus on improving the app and
        develop new features. I'd like to invite you to be part of this
        development, and help me build the best sensemaking tool out there.
      </p>

      <div className="bg-gray-100 border border-gray-300 rounded p-4">
        <div className="block sm:flex justify-between">
          <h2 className="font-medium inline text-lg text-gray-900">
            Confirm your timezone{" "}
            <Tooltip title="Timezone is used to calculate stats, how many words you wrote every day and your daily streak et cetera.">
              <QuestionMarkIcon className="w-5 h-5 inline text-gray-600 hover:text-gray-800" />
            </Tooltip>
          </h2>
          <span className="px-3 py-1 tracking-wide hidden sm:inline-block uppercase text-sm text-purple-600 border border-purple-200 bg-purple-100 rounded-full">
            Action required
          </span>
        </div>
        <form
          onSubmit={handleSubmit((variables) =>
            setTimezone({ variables })
              .then(() => {
                closeModal();
              })
              .catch((err) => alert(err.message))
          )}
        >
          <select
            defaultValue={tzFromBrowser}
            ref={register}
            name="timezone"
            className="block my-3 text-lg bg-white border border-gray-300 py-2 px-1 focus:outline-none focus:shadow-outline"
          >
            {timezones.map((timezone) => (
              <option key={timezone} value={timezone}>
                {timezone}
              </option>
            ))}
          </select>
          <button type="submit" className="btn">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default WelcomeAndSetTimezone;
