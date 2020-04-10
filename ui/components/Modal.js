import { useEffect } from "react";
import fromMsToMinutes from "../utils/fromMsToMinutes";
import { Close as CloseIcon } from "./Icons";

export const modals = {
  FINISHED_WRITING: "FINISHED_WRITING",
  WELCOME_AND_SET_TIMEZONE: "WELCOME_AND_SET_TIMEZONE"
};

const WelcomeAndSetTimezone = ({}) => (
  <div className="w-64">
    <h1 className="text-3xl">Welcome to a slightly updated Freewriter.</h1>
    <p>You need to set your timezone.</p>
  </div>
);

const FinishedWriting = ({
  number_of_words,
  elapsed_time,
  unlocks,
  new_streak
}) => {
  return (
    <div className="p-5">
      <h3 className="text-3xl text-center">
        Boom!
        <br /> You wrote <strong>{number_of_words} words</strong> in{" "}
        <strong>{fromMsToMinutes(elapsed_time)}</strong> minutes
        <br /> ({new_streak} day streak)
      </h3>
      <div className="flex mt-4 justify-center">
        {unlocks.map(unlock => (
          <img
            key={unlock}
            src={`/achievements/${unlock}.png`}
            className="w-25 h-25 m-2"
          />
        ))}
      </div>
    </div>
  );
};

const components = {
  FINISHED_WRITING: FinishedWriting,
  WELCOME_AND_SET_TIMEZONE: WelcomeAndSetTimezone
};

export function Modal({ modal, onClose, showCloseButton = true }) {
  if (!modal) return null;
  const ModalComponent = components[modal.type];

  useEffect(() => {
    const handleEscape = e => {
      if (e.key === "Esc" || e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-20">
        <button
          onClick={onClose}
          tabIndex="-1"
          className="absolute top-0 left-0 w-screen h-screen cursor-default bg-black opacity-50 animation-fade-in animation-ease-out animation-200ms animation-once z-10"
        ></button>
        <div className="bg-white rounded-lg p-5 z-50 absolute shadow animation-fade-in animation-ease-out animation-200ms animation-once">
          <ModalComponent {...modal.props} />
          {showCloseButton && (
            <button
              onClick={onClose}
              tabIndex="1"
              className="absolute top-0 right-0 mr-2 mt-2 p-2 text-gray-600 hover:bg-gray-200 rounded-full focus:outline-none focus:shadow-outline"
            >
              <CloseIcon className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
