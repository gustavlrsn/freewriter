export default ({ wordCount, currentUser }) => {
  const percent =
    ((wordCount + currentUser.wordsToday) / currentUser.dailygoal) * 100;
  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-20">
      <div
        className="bg-purple-700 h-full"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
};
