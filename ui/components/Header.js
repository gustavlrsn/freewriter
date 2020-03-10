import Link from "next/link";
import Router from "next/router";
import cookie from "js-cookie";

import ProfileDropdown from "./ProfileDropdown";

// const Header = styled.div`
//   padding: 15px 0;
//   display: flex;
//   /* justify-content: space-between;
//   align-items: center; */
//   position: fixed;
//   left: 0px;
//   right: 0px;
//   top: 0px;
//   background: rgba(255, 255, 255, 0.95);
//   border-bottom: 1px solid rgba(0, 0, 0, 0.03);
//   /* visibility: hidden; */
//   transition: opacity 100ms;
//   z-index: 50;
//   &.show {
//     opacity: 1;
//   }
//   &.hide {
//     opacity: 0;
//   }
//   a.logo {
//     text-decoration: none;
//     color: rgba(0, 0, 0, 0.8);
//     h1 {
//       font-size: 24px;
//       margin: 0;
//     }
//   }
// `;

// const Nav = styled.nav`
//   display: flex;
//   align-items: center;

//   > div {
//     margin-left: 20px;
//   }
// `;

export default ({ currentUser, logOut, showHeader }) => {
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  return (
    <header className="border-b border-gray-200 ">
      <div className="max-w-screen-md mx-auto sm:flex sm:items-center p-0 sm:p-3">
        <div className="flex items-center justify-between p-3 sm:p-0">
          <div>
            <img className="h-10" src="/logo.png" alt="Freewriter" />
          </div>
          <div className="sm:hidden flex">
            <button className="bg-purple-700 text-white rounded px-2 py-1">
              Let go
            </button>
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
          } sm:flex flex-auto justify-between`}
        >
          {currentUser ? (
            <>
              <div className="px-2 py-3 sm:flex  sm:p-0 sm:items-center">
                <Link href="/">
                  <a className="block text-gray-800 font-semibold hover:bg-gray-200 px-2 py-1 rounded sm:mt-0 sm:ml-2">
                    Write
                  </a>
                </Link>
                <Link href="/[username]" as={`/@${currentUser.username}`}>
                  <a className="mt-1 block text-gray-800 font-semibold hover:bg-gray-200 px-2 py-1 rounded sm:mt-0 sm:ml-2">
                    Stats
                  </a>
                </Link>
                <a
                  href="#"
                  className="mt-1 block text-gray-800 font-semibold hover:bg-gray-200 px-2 py-1 rounded sm:mt-0 sm:ml-2"
                >
                  Tribe
                </a>
              </div>
              <div className="sm:flex items-center">
                <button className="bg-purple-700 text-white rounded px-2 py-1 hidden sm:block">
                  Let go
                </button>

                <div className="hidden sm:block sm:ml-4">
                  <ProfileDropdown currentUser={currentUser} logOut={logOut} />
                </div>
              </div>

              <div className="py-4 px-4 border-t border-gray-200 sm:hidden">
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
                  <a
                    href="#"
                    className="mt-2 block text-gray-600 hover:text-gray-900"
                  >
                    Edit profile
                  </a>
                  <a
                    href="#"
                    className="mt-2 block text-gray-600 hover:text-gray-900"
                  >
                    Manage subscription
                  </a>
                  <a
                    href="#"
                    onClick={logOut}
                    className="mt-2 block text-gray-600 hover:text-gray-900"
                  >
                    Sign out
                  </a>
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
