const getHoursMinutes = (hours) => hours.split(':').map((item) => parseInt(item, 10));
const getDaystamp = ([hours, minutes]) => hours * 60 + minutes;

const isWithinWorkHours = (startHour, endHour, meetingStartHour, meetingDuration) => {
  const dayStartHoursMinutes = getHoursMinutes(startHour);
  const dayEndHoursMinutes = getHoursMinutes(endHour);
  const meetingStartHoursMinutes = getHoursMinutes(meetingStartHour);

  const dayStartInMinutes = getDaystamp(dayStartHoursMinutes);
  const dayEndInMinutes = getDaystamp(dayEndHoursMinutes);
  const meetingStartInMinutes = getDaystamp(meetingStartHoursMinutes);

  const isMeetingStartedInTime = dayStartInMinutes <= meetingStartInMinutes;
  const isMeetingEndedInTime = (meetingStartInMinutes + meetingDuration) <= dayEndInMinutes;

  return isMeetingStartedInTime && isMeetingEndedInTime;
};

isWithinWorkHours('10:03', '17:20', '17:10', 10);
