import TextareaAutosize from "react-textarea-autosize";
import dayjs from "dayjs";
import LandingPage from "components/LandingPage";

export default ({
  currentUser,
  fadeHeader,
  writings,
  setWritings,
  wordCount,
  setStartTime,
}) => {
  if (!currentUser) return <LandingPage />;

  const onKeyDown = (e) => {
    const isScrolledToBottom =
      document.body.scrollHeight - window.innerHeight <=
      document.documentElement.scrollTop + 30;
    if (isScrolledToBottom) document.documentElement.scrollTop = 10000000;
    if (e.key !== "Tab") fadeHeader();
  };

  return (
    <div className="">
      <TextareaAutosize
        onKeyDown={onKeyDown}
        value={writings}
        onChange={(e) => {
          if (writings.length === 0 && e.target.value.length) {
            setStartTime(dayjs());
          }
          setWritings(e.target.value);
        }}
        placeholder="Write it out..."
        autoFocus
        className="writearea"
        spellCheck="false"
      />
      <style jsx global>{`
        @font-face {
          font-family: "Inconsolata";
          src: url("/fonts/Inconsolata-Regular.ttf");
          font-weight: regular;
          font-style: normal;
          font-display: swap;
        }
        .writearea {
          font-family: Inconsolata, sans-serif;
          position: relative;
          resize: none;
          border: 1px solid rgba(255, 255, 255, 0);
          outline: none;
          background: rgba(0, 0, 0, 0);
          width: 100%;
          text-align: left;
          font-size: 20px;
          font-weight: 400 !important;
          word-wrap: break-word !important;
          padding: 0px 0px 150px 0px;
          /* overflow:hidden !important; */
          display: inline-block;
          min-height: 300px;
        }
      `}</style>
      <div className="right-0 bottom-0 p-4 fixed text-sm text-gray-500">
        {wordCount}
      </div>
    </div>
  );
};
