import TextareaAutosize from "react-textarea-autosize";
import dayjs from "dayjs";

export default ({
  currentUser,
  fadeHeader,
  writings,
  setWritings,
  wordCount,
  setStartTime
}) => {
  const onKeyDown = e => {
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
        onChange={e => {
          if (writings.length === 0 && e.target.value.length) {
            setStartTime(dayjs());
          }
          setWritings(e.target.value);
        }}
        placeholder="Write it out..."
        autoFocus
        className="writearea"
      />
      <style jsx global>{`
        .writearea {
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
