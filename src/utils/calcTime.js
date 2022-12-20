function calcTime(timestamp) {
  const time = timestamp.toDate();
  const current = new Date();
  const elapsed = current - time;
  const seconds = elapsed / 1000;
  if (seconds < 1) {
    return({format: 's', time: 1});
  } else if (seconds < 60) {
    return({format: 's', time: seconds});
  } else if (seconds < 3600) {
    return({format: 'm', time: seconds / 60});
  } else if (seconds < 86400) {
    return({format: 'h', time: seconds / 3600});
  } else if (seconds < 604800) {
    return({format: 'd', time: seconds / 86400});
  } else if (seconds < 2592000) {
    return({format: 'w', time: seconds / 604800});
  } else if (seconds < 31536000) {
    const months = seconds / 2592000;
    const formatStr = months > 1 ? 'mths' : 'mth';
    return({ format: formatStr, time: months });
  } else {
    const years = seconds / 31536000;
    const formatStr = years > 1 ? 'yrs' : 'yr';
    return({ format: formatStr, time: years });
  }
}

export default calcTime;