export function MakeTimeStamp(e) {
  var timeInt = parseInt(e.split("=").pop());
  var minutes = Math.floor(timeInt / 60);
  var seconds = timeInt - minutes * 60;
  if (minutes < 10) {
    minutes = "0" + minutes.toString();
  } else {
    minutes = minutes.toString();
  }
  if (seconds < 10) {
    seconds = "0" + seconds.toString();
  } else {
    seconds = seconds.toString();
  }
  var thisTimeStamp = minutes + ":" + seconds;
  return thisTimeStamp;
}
