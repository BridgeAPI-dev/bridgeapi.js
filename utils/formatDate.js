// formats ruby timestamps to a date and time string
// ruby timestamp format: "2020-11-19 16:44:53";
function formatDate(timeStamp) {
  const [date, time] = timeStamp.split(' ');
  return { date, time };
}

export default formatDate;
