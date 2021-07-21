const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
export const getDay = (timeStamp) => {
  let date = new Date();
  date.setTime(timeStamp * 1000); // javascript timestamps are in milliseconds
  return days[date.getDay()];
}
export const getMonth = (timeStamp) => {
  let date = new Date();
  date.setTime(timeStamp * 1000); // javascript timestamps are in milliseconds
  return months[date.getMonth()];
}
export const getDate = (timeStamp) => {
  let date = new Date();
  date.setTime(timeStamp * 1000); // javascript timestamps are in milliseconds
  return date.getDate();
}
export const isEmpty = (val) => {
  if (Array.isArray(val)) {
    return val.length === 0
  }
  if (typeof val === 'string') {
    return val === ''
  }
  if (typeof val === 'object') {
    return Object.keys(val).length === 0;
  }
  return [null, undefined].includes(val)
}
export const constants = { humidity: 'Humidity', clouds: 'Clouds', dew_point: 'Dew point', wind_speed: 'Wind speed' }
const exportedObject = {
  getDay,
  getDate,
  getMonth,
  isEmpty,
  constants,
};

export default exportedObject;