// formats ruby timestamps to a date and time string
// ruby timestamp format: "2020-11-19T16:44:53.702Z";
function formatDate(timeStamp) {
  const date = timeStamp.split(' ')[0];
  const time = timeStamp.split(' ')[1].split('.')[0];
  return { date, time };
}

export default formatDate;
