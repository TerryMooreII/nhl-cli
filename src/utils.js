exports.NHL_BASE_URL = 'https://statsapi.web.nhl.com/api/v1';

exports.DATE_FORMAT = 'YYYY-MM-DD';

exports.DATE_FORMAT_LONG = 'dddd, MMMM DD';

exports.padEnd = (name = '', len = 1) => `${name}`.padEnd(len, ' ');

exports.padStart = (name = '', len = 1) => `${name}`.padStart(len, ' ');

exports.displayLine = (len = 1, char = '-') => console.log(''.padEnd(len, char).brightWhite);
