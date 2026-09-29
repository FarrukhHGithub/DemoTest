import moment from 'moment-timezone';

/**
 * Safely converts a UTC ISO string to any target timezone.
 * Ensures the slot is parsed as UTC first to prevent local browser clock assumptions.
 * 
 * @param {string|Date|moment.Moment} utcString - The UTC date value to convert
 * @param {string} timezone - Target IANA timezone (e.g. 'Europe/London', 'Asia/Karachi')
 * @param {string} formatStr - Desired output string format
 * @returns {string} The formatted local time
 */
export const convertUtcToTimezone = (utcString, timezone, formatStr = "hh:mm A") => {
  if (!utcString) return "";
  
  // Explicitly parse as UTC to ensure no local offset leak
  const parsedUtc = moment.utc(utcString);
  const finalTime = parsedUtc.clone().tz(timezone).format(formatStr);
  
  // Debug logs requested by user
  console.log(`[TZ DEBUG]`);
  console.log(`- Original UTC: ${utcString}`);
  console.log(`- Selected Timezone: ${timezone}`);
  console.log(`- Parsed UTC: ${parsedUtc.toISOString()}`);
  console.log(`- Final Displayed Local Time: ${finalTime}`);
  
  return finalTime;
};
