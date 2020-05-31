import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "react-hook-form";
import Button from "components/Button";

const SEND_MAGIC_LINK_MUTATION = gql`
  mutation SendMagicLink($email: String!) {
    sendMagicLink(email: $email)
  }
`;

export default ({ currentUser }) => {
  const [sendMagicLink, { data, loading }] = useMutation(
    SEND_MAGIC_LINK_MUTATION
  );
  const {
    handleSubmit,
    register,
    errors,
    formState: { dirty },
  } = useForm();

  if (currentUser) {
    return <div>You are logged in as @{currentUser.username}.</div>;
  }

  return (
    <div>
      <div className="text-center md:px-32  pt-10">
        {data && data.sendMagicLink ? (
          <h1 className="text-xl font-semibold text-gray-800 mb-4">
            {process.env.IS_PROD
              ? "Magic link sent! Check your inbox!"
              : "Find the magic link in console (in development)."}
          </h1>
        ) : (
          <form
            onSubmit={handleSubmit(({ email }) => {
              sendMagicLink({ variables: { email } });
            })}
          >
            <h1 className="text-xl font-semibold text-gray-800 mb-4">
              Enter your email to log in with a magic link
            </h1>
            <div className="flex">
              <input
                name="email"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mr-4 focus:outline-none focus:shadow-outline"
                disabled={loading}
                placeholder="Email"
                ref={register({
                  required: "Required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "invalid email address",
                  },
                })}
              />
              <Button type="submit" disabled={loading} loading={loading}>
                Send
              </Button>
            </div>

            {errors.email && email.title.message}
          </form>
        )}
      </div>
    </div>
  );
};
