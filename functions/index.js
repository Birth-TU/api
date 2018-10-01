const functions = require('firebase-functions');

exports.api = functions.https.onRequest((req, res) => {
  var current_year = (new Date()).getFullYear();

  var now = new Date().getTime();

  var check = new Date('03/21/' + current_year + ' 00:45:00 UTC+0700');

  if (check - now <= 0)
    current_year++;

  let TargetDate = '03/21/' + current_year + ' 00:45:00 UTC+0700';

  let countDownDate = new Date(TargetDate).getTime();
  let distance = countDownDate - now;

  var DaysInMonth = [
    31, 29, 31,
    30, 31, 30,
    31, 31, 30,
    31, 30, 31
  ];

  function isLeap(Year) {
    return (Year % 4 === 0 && Year % 100 !== 0) || (Year % 400 === 0);
  }

  function getDaysAndMonths(days) {
    let daysLeft = days;
    let thisMonth = (new Date()).getMonth();
    let monthsPassed = 0;
    while (daysLeft > DaysInMonth[thisMonth]) {
      let days = (isLeap((new Date()).getFullYear()) && thisMonth == 1) ? DaysInMonth[thisMonth] + 1 : DaysInMonth[thisMonth];
      thisMonth = (thisMonth + 1 >= 12) ? 0 : thisMonth + 1;
      daysLeft = daysLeft - days;
      monthsPassed++;
    }
    return {
      day: daysLeft,
      month: monthsPassed
    };
  }

  let process = getDaysAndMonths(distance / (1000 * 60 * 60 * 24));

  let months = Math.floor(process.month);
  let days = Math.floor(process.day);
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  res.status(200).json({
    month: months,
    day: days,
    hour: hours,
    minute: minutes,
    second: seconds
  });
})