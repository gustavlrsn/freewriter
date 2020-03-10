import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import useForm from "react-hook-form";

const SEND_MAGIC_LINK_MUTATION = gql`
  mutation SendMagicLink($email: String!) {
    sendMagicLink(email: $email)
  }
`;

export default ({ currentUser }) => {
  const [sendMagicLink, { data, loading }] = useMutation(
    SEND_MAGIC_LINK_MUTATION
  );
  const { handleSubmit, register, errors } = useForm();

  if (currentUser) {
    return <div>You are logged in as @{currentUser.username}.</div>;
  }

  return (
    <div>
      <div>
        {data && data.sendMagicLink ? (
          <div>
            {process.env.IS_PROD
              ? "Magic link sent! Check your inbox!"
              : "Find the magic link in console (in development)."}
          </div>
        ) : (
          <div
            onSubmit={handleSubmit(({ email }) => {
              sendMagicLink({ variables: { email } });
            })}
          >
            <div className="two-cols-3-1">
              <input
                name="email"
                disabled={loading}
                placeholder="Email"
                ref={register({
                  required: "Required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "invalid email address"
                  }
                })}
              />
              <button type="submit">Send</button>
            </div>

            {errors.email && email.title.message}
          </div>
        )}
      </div>
    </div>
  );
};
