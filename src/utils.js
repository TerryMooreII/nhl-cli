exports.NHL_BASE_URL = 'https://statsapi.web.nhl.com/api/v1';

exports.DATE_FORMAT = 'YYYY-MM-DD';

exports.DATE_FORMAT_LONG = 'dddd, MMMM DD';

exports.padEnd = (value = '', len = 1, char = ' ') => `${value}`.padEnd(len, char);

exports.padStart = (value = '', len = 1, char = ' ') => `${value}`.padStart(len, char);

exports.displayLine = (len = 1, char = '-') => console.log(''.padEnd(len, char).brightWhite);
