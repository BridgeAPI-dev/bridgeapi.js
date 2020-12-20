// formats ruby timestamps to a date and time string
// ruby timestamp format: "2020-11-19 16:44:53";
function formatDate(timeStamp) {
  const [date, time] = timeStamp.split(' ');
  return { date, time };
}

export default formatDate;

export const hourMinutes = (timestamp) => {
  const date = new Date(timestamp);
  let minutes = String(date.getMinutes());
  let hour = date.getHours();
  let amPm;

  if (hour === 0) {
    hour = 12;
    amPm = 'AM';
  } else if (hour > 12) {
    amPm = 'PM';
    hour -= 12;
  } else if (hour === 12) {
    amPm = 'PM';
  } else {
    amPm = 'AM';
  }

  if (minutes.length === 1) {
    minutes = `0${minutes}`;
  }

  return `${hour}:${minutes}${amPm}`;
};
