import Link from "next/link";
import { useRouter } from "next/router";
import { Tooltip } from "react-tippy";
import {
  Save as SaveIcon,
  Expand as ExpandIcon,
  Copy as CopyIcon,
  FreewriterLogo,
} from "./Icons";
import ProfileDropdown from "./ProfileDropdown";
import toggleFullscreen from "../utils/toggleFullscreen";
import { modals } from "./Modal";

const WriteActions = ({ letGo, saveAsTxt, copyToClipboard }) => {
  const css = {
    iconButton:
      "px-1 py-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:shadow-outline rounded",
  };

  return (
    <>
      <Tooltip title="Toggle fullscreen" size="small" delay={25}>
        <button onClick={toggleFullscreen} className={css.iconButton}>
          <ExpandIcon className="h-6 w-6" />
        </button>
      </Tooltip>
      <Tooltip title="Copy to clipboard" size="small" delay={25}>
        <button onClick={copyToClipboard} className={css.iconButton}>
          <CopyIcon className="h-6 w-6" />
        </button>
      </Tooltip>
      <Tooltip title="Save .txt" size="small" delay={25}>
        <button onClick={saveAsTxt} className={css.iconButton}>
          <SaveIcon className="h-6 w-6" />
        </button>
      </Tooltip>

      <Tooltip title="Erase text but save progress" size="small" delay={25}>
        <button
          onClick={letGo}
          className="ml-2 border text-sm border-indigo-darker text-indigo-darker hover:text-white hover:bg-indigo-darker transition-colors duration-100 rounded px-3 py-2 rounded-full focus:outline-none focus:shadow-outline"
        >
          Let it go
        </button>
      </Tooltip>
    </>
  );
};

export default ({
  currentUser,
  logOut,
  showHeader,
  letGo,
  saveAsTxt,
  copyToClipboard,
  openModal,
}) => {
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const router = useRouter();

  return (
    <header
      className={`border-b border-gray-200 fixed right-0 left-0 z-10 bg-white transition-opacity ease-out duration-200 ${
        showHeader ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="max-w-screen-md mx-auto sm:flex sm:items-center p-0 sm:px-3 h-16">
        <div className="flex items-center justify-between p-3 sm:p-0">
          <Link href="/">
            <a>
              <FreewriterLogo
                className="h-10 w-10 text-gray-600"
                alt="Freewriter"
              />
            </a>
          </Link>
          <div className="sm:hidden flex">
            <WriteActions
              letGo={letGo}
              saveAsTxt={saveAsTxt}
              copyToClipboard={copyToClipboard}
            />
            <button
              onClick={() => setMenuOpen(!isMenuOpen)}
              type="button"
              className="block ml-3 text-gray-600 hover:text-black focus:text-black focus:outline-none"
            >
              <svg className="fill-current h-6 w-6" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path
                    fillRule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                  />
                ) : (
                  <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                )}
              </svg>
            </button>
          </div>
        </div>
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } sm:flex flex-auto justify-between h-full bg-white`}
        >
          {currentUser ? (
            <>
              <div className="px-2 py-3 sm:flex sm:p-0 sm:items-center bg-white">
                <Link href="/">
                  <a
                    className={`mt-1 block font-medium hover:text-gray-800 px-1 pt-2 pb-1 sm:mt-0 sm:ml-4 border-b-2 h-full flex items-center ${
                      router.pathname === "/"
                        ? "border-indigo-darker text-gray-800"
                        : "border-transparent text-gray-600"
                    }`}
                  >
                    Write
                  </a>
                </Link>
                <Link href="/[username]" as={`/@${currentUser.username}`}>
                  <a
                    className={`mt-1 block font-medium hover:text-gray-800 px-1 pt-2 pb-1 sm:mt-0 sm:ml-4 border-b-2 h-full flex items-center ${
                      router.query.username === `@${currentUser.username}`
                        ? "border-indigo-darker text-gray-800"
                        : "border-transparent text-gray-600"
                    }`}
                  >
                    Stats
                  </a>
                </Link>
                <Link href="/tribe">
                  <a
                    className={`mt-1 block font-medium hover:text-gray-800 px-1 pt-2 pb-1 sm:mt-0 sm:ml-4 border-b-2 h-full flex items-center ${
                      router.pathname === "/tribe"
                        ? "border-indigo-darker text-gray-800"
                        : "border-transparent text-gray-600"
                    }`}
                  >
                    Tribe
                  </a>
                </Link>
              </div>
              <div className="hidden sm:flex items-center">
                {router.pathname === "/" && (
                  <WriteActions
                    letGo={letGo}
                    saveAsTxt={saveAsTxt}
                    copyToClipboard={copyToClipboard}
                  />
                )}

                <div className="ml-4">
                  <ProfileDropdown
                    currentUser={currentUser}
                    logOut={logOut}
                    openModal={openModal}
                  />
                </div>
              </div>

              <div className="py-4 px-4 border-t border-gray-200 sm:hidden bg-white border-b">
                <div className="flex items-center">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={`/avatars/${currentUser.avatar}.png`}
                    alt={currentUser.username}
                  />
                  <span className="ml-2 font-semibold text-gray-600">
                    @{currentUser.username}
                  </span>
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => {
                      openModal({
                        type: modals.EDIT_PROFILE,
                      });
                    }}
                    className="mt-2 block text-gray-600 hover:text-gray-900"
                  >
                    Edit profile
                  </button>
                  <a
                    href="#"
                    className="mt-2 block text-gray-600 hover:text-gray-900"
                  >
                    Manage subscription
                  </a>
                  <button
                    onClick={logOut}
                    className="mt-2 block text-gray-600 hover:text-gray-900"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="px-2 py-3 sm:flex  sm:p-0 sm:items-center">
              <Link href="/login">
                <a className="block text-gray-800 font-semibold hover:bg-gray-200 px-2 py-1 rounded sm:mt-0 sm:ml-2">
                  Log in
                </a>
              </Link>
              <Link href="/signup">
                <a className="mt-1 block text-gray-800 font-semibold hover:bg-gray-200 px-2 py-1 rounded sm:mt-0 sm:ml-2">
                  Sign up
                </a>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
