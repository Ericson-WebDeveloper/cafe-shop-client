import moment from "moment";

export const convertDateTime = (date: Date) => {
  return moment(date).format("MMMM Do YYYY, h:mm:ss a");
};

export const getPastTime = (date: Date): number => {
  const startTime = moment(date); // Replace with your start time
  const endTime = moment(); // Use the current time as the end time

  // Calculate the difference in minutes
  const minutesPassed = endTime.diff(startTime, "minutes");
  return minutesPassed;
};
