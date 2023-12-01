function date(date: string) {
  var month = [
    0,
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC"
  ];
  var Datearray = date.split("-"),
    index = parseInt(Datearray[1]),
    result = {
      index: index,
      month: month[index],
      day: Datearray[0],
      year: Datearray[2]
    };
  return result.day + " " + result.month + " " + result.year;
}
export default date;
