"use strict"

export function formatDate(date, option) {
  const weekday  = {
    long: ['Sunday', 'Monday', "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    short: ['Sun', 'Mon', "Tue", "Wed", "Thur", "Fri", "Sat"],
  };
  const dd = date.getDate();
  const mm = ("00" + (date.getMonth()+1)).slice(-2); //January is 0!
  const yyyy = date.getFullYear();
  const form = option && option.short ? 'short' : 'long';
  return `${weekday[form][date.getDay()]} ${dd}-${mm}-${yyyy}`;
}

export function formatTime(time, option) {
  const hh = Math.floor(time/3600);
  const mm = Math.floor((time%3600)/60);
  const ss = time - hh*3600 - mm*60;
  const sep = {
    h: option && option.long? ' hours ' : ':',
    m: option && option.long? ' min ' : ':',
    s: option && option.long? ' sec ' : '',
  }
  if (hh) {
    return `${("00"+hh).slice(-2)}${sep.h}${("00"+mm).slice(-2)}${sep.m}${("00"+ss).slice(-2)}${sep.s}`;
  } else if (mm) {
    return `${("00"+mm).slice(-2)}${sep.m}${("00"+ss).slice(-2)}${sep.s}`;
  } else {
    return `${("00"+ss).slice(-2)}${sep.s}`;
  }
}
