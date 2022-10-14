exports.NHL_BASE_URL = 'https://statsapi.web.nhl.com/api/v1';

exports.DATE_FORMAT = 'YYYY-MM-DD';

exports.padEnd = (name = '', len = 1) => name.padEnd(len, ' ');

exports.padStart = (stat = '', len = 1) => `${stat}`.padStart(len, ' ');

exports.displayLine = (len = 1) => console.log('-'.padEnd(len, '-').brightWhite);
