const fetch = require('node-fetch');
const moment = require('moment');
require('colors');
// const theme = require('./theme');
// const favorites = require('./favorites');

// const favTeamIds = favorites.get();

const url = 'https://statsapi.web.nhl.com/api/v1/schedule';


const displayLine = (len = 52) => console.log(Array(len).fill('=').join(''));

const padHeader = (text) => `${text}${Array(25 - text.length).fill('').join(' ')}`;
const displayHeader = (game) => {
  const { currentPeriod, currentPeriodOrdinal, currentPeriodTimeRemaining } = game.linescore;
  const isOT = currentPeriod > 3;
  let periods = '1st 2nd 3rd      Total  SOG';
  if (isOT) {
    const OT = currentPeriod === 4 ? 'OT' : 'SO';
    periods = `1st 2nd 3rd ${OT}   Total  SOG`;
  }

  let remaining = '';
  if (game.status.statusCode === "1") {
    const startTime = moment(game.gameDate).format('h:mma');
    remaining = padHeader(`${startTime}`);
  } else if (currentPeriodTimeRemaining !== 'Final') {
    remaining = padHeader(`${currentPeriodOrdinal || ''} ${currentPeriodTimeRemaining || ''}`);
  } else {
    remaining = padHeader(`${currentPeriodTimeRemaining}${isOT ? `/${currentPeriodOrdinal}` : ''}`);
  }

  console.log(`${remaining} ${periods}`.brightWhite);
};

const sog = (periods, team) => periods
  .reduce((total, period) => period[team].shotsOnGoal + total, 0);

const goals = (periods, period, team, shootoutInfo) => {
  if (period === 'OT') return periods[3][team].goals;
  if (period === 'SO') return shootoutInfo[team].scores;
  return periods.length >= period ? periods[period - 1][team].goals : 0;
};

const displayTeamScore = (game) => {
  const { periods, shootoutInfo, currentPeriodOrdinal } = game.linescore;
  const { away, home } = game.teams;
  const isFinal = game.linescore.currentPeriodTimeRemaining === 'Final';
  const aWin = isFinal && away.score > home.score;
  const hWin = isFinal && home.score > away.score;
  if (game.linescore.periods.length > 3) {
    console.log(`${padHeader(game.teams.away.team.name)}  ${goals(periods, 1, 'away')}   ${goals(periods, 2, 'away')}   ${goals(periods, 3, 'away')}   ${goals(periods, currentPeriodOrdinal, 'away', shootoutInfo)}     ${away.score}     ${sog(periods, 'away')}`[aWin ? 'green' : 'dim']);
    console.log(`${padHeader(game.teams.home.team.name)}  ${goals(periods, 1, 'home')}   ${goals(periods, 2, 'home')}   ${goals(periods, 3, 'home')}   ${goals(periods, currentPeriodOrdinal, 'home', shootoutInfo)}     ${home.score}     ${sog(periods, 'home')}`[hWin ? 'green' : 'dim']);
  } else {
    console.log(`${padHeader(game.teams.away.team.name)}  ${goals(periods, 1, 'away')}   ${goals(periods, 2, 'away')}   ${goals(periods, 3, 'away')}         ${away.score}     ${sog(periods, 'away')}`[aWin ? 'green' : 'dim']);
    console.log(`${padHeader(game.teams.home.team.name)}  ${goals(periods, 1, 'home')}   ${goals(periods, 2, 'home')}   ${goals(periods, 3, 'home')}         ${home.score}     ${sog(periods, 'home')}`[hWin ? 'green' : 'dim']);
  }
};

const get = async (start = 1, end = 1) => {
  const startDate = moment().subtract(Math.abs(start), 'days').format('YYYY-MM-DD');
  const endDate = moment().add(end, 'days').format('YYYY-MM-DD');
  const response = await fetch(`${url}?startDate=${startDate}&endDate=${endDate}&hydrate=linescore`);
  const json = await response.json();
  json.dates.forEach((date) => {
    console.log(moment(date.date).format('dddd MMMM DD').brightWhite);
    displayLine();
    date.games.forEach((game) => {
      displayHeader(game);
      displayTeamScore(game);
      console.log('');
    });
  });
};

module.exports = {
  get,
};
