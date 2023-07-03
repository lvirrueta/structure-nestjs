export const Regex = {
  /** Regex for telephone number */
  E164: /^\+[1-9]\d{10,14}$/,

  /** Regex for any combination of 'AOC' */
  AOC: /\b(?!\w*(\w)\w*\1)[AOC]+\b/,

  /** Regex for HH:MM */
  HH_MM: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
};
