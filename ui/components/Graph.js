import {
  LineChart,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Brush,
  Tooltip as ChartTooltip,
  ResponsiveContainer
} from "recharts";
import dayjs from "dayjs";

function addNullDays(wordsPerDay) {
  const first = dayjs(wordsPerDay[0].date);
  const last = dayjs(wordsPerDay[wordsPerDay.length - 1].date);
  const today = dayjs();

  const values = wordsPerDay.reduce((acc, obj) => {
    return {
      ...acc,
      [obj.date]: obj.number_of_words
    };
  }, {});

  const newArray = [];

  let date = first;

  while (true) {
    const value = values[date.format("YYYY-MM-DD")];
    newArray.push({
      date: date.valueOf(),
      ...(value && { number_of_words: value })
    });

    if (date.isSame(today, "day")) break;

    date = date.add(1, "day");
  }
  return newArray;
}

export default ({ wordsPerDay }) => {
  const graphData = addNullDays(wordsPerDay);

  return (
    <ResponsiveContainer width={"100%"}>
      <LineChart data={graphData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          angle={-15}
          tickFormatter={value => dayjs(value).format("MMM D")}
        />
        <YAxis width={45} />
        <ChartTooltip
          labelFormatter={label => dayjs(label).format("ddd, MMM D, YYYY")}
          formatter={value => [`${value} words`]}
          separator={""}
        />
        <Line
          type="monotone"
          dot={true}
          strokeWidth={2}
          dataKey="number_of_words"
          stroke="#4b489b"
        />
        <Brush
          dataKey="number_of_words"
          startIndex={Math.max(0, graphData.length - 30)}
          data={graphData}
          children={
            <AreaChart>
              <Area
                type="monotone"
                dataKey="number_of_words"
                stroke="#4b489b"
                fill="#afaddb"
              />
            </AreaChart>
          }
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
