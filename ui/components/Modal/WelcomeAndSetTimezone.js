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
        May 31, 2020
      </span>
      <h1 className="text-3xl mb-4">Freewriter has been updated!</h1>
      <p className="mb-4 text-gray-800">
        I have had to do a complete rewrite of the code so some things might
        look slightly different, but most of all you should notice way better
        performance and lots of fixed bugs.
      </p>

      <p className="mb-4 text-gray-800">
        Some things, like the "experimental" settings, are not yet implemented.
        I'll be working on getting more customization of the writing experience
        back online and with the new updated version you can expect more
        frequent updates.
      </p>
      <p className="mb-4 text-gray-800">
        I'd love to hear from you what you would like to see in terms of
        features and improvements, or if you spot any bug or oddity, feel free
        to{" "}
        <a
          className="text-purple-800"
          href="mailto:gustav.larsson@gmail.com"
          target="_blank"
        >
          send an email{" "}
        </a>{" "}
        or reach out through{" "}
        <a
          className="text-purple-800"
          href="https://twitter.com/gustavlrsn"
          target="_blank"
        >
          Twitter
        </a>
        .
      </p>

      <p className="mb-4 text-gray-800">Thanks!</p>

      <p className="mb-4 text-gray-800">
        - Gustav{" "}
        <a
          className="text-purple-800"
          href="https://twitter.com/gustavlrsn"
          target="_blank"
        >
          @gustavlrsn
        </a>{" "}
        <span className="text-gray-500">(creator of Freewriter)</span>
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
