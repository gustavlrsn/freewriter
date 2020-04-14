import { Loader as LoaderIcon } from "./Icons";

export default ({ children, disabled, loading, ...props }) => {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`btn relative flex justify-center items-center ${
        (disabled || loading) && "opacity-25"
      } ${props.className}`}
    >
      {loading && (
        <LoaderIcon className="w-5 h-5 absolute animation-spin animation-linear animation-2s" />
      )}
      <span className={loading ? "invisible" : ""}>{children}</span>
    </button>
  );
};
