const fetch = require('node-fetch');
const moment = require('moment');
require('colors');
const {
  padEnd,
  displayLine,
  NHL_BASE_URL,
  DATE_FORMAT,
} = require('./utils');

const url = `${NHL_BASE_URL}/schedule`;
const TEAM_WIDTH = 23;
const LINE_LENGTH = 51;

const displayHeader = (game) => {
  const { currentPeriod, currentPeriodOrdinal, currentPeriodTimeRemaining } = game.linescore;
  const isOT = currentPeriod > 3;
  let periods = '1st 2nd 3rd      Total  SOG';
  if (isOT) {
    const OT = currentPeriod === 4 ? 'OT' : 'SO';
    periods = `1st 2nd 3rd ${OT}   Total  SOG`;
  }

  let remaining = '';
  if (game.status.statusCode === '1' || game.status.statusCode === '2') {
    const startTime = moment(game.gameDate).format('h:mma');
    remaining = padEnd(startTime, TEAM_WIDTH);
  } else if (currentPeriodTimeRemaining !== 'Final') {
    remaining = padEnd(`${currentPeriodOrdinal || ''} ${currentPeriodTimeRemaining || ''}`, TEAM_WIDTH);
  } else {
    remaining = padEnd(`${currentPeriodTimeRemaining}${isOT ? `/${currentPeriodOrdinal}` : ''}`, TEAM_WIDTH);
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
    console.log(`${padEnd(game.teams.away.team.name, TEAM_WIDTH)}  ${goals(periods, 1, 'away')}   ${goals(periods, 2, 'away')}   ${goals(periods, 3, 'away')}   ${goals(periods, currentPeriodOrdinal, 'away', shootoutInfo)}     ${away.score}     ${sog(periods, 'away')}`[aWin ? 'green' : 'dim']);
    console.log(`${padEnd(game.teams.home.team.name, TEAM_WIDTH)}  ${goals(periods, 1, 'home')}   ${goals(periods, 2, 'home')}   ${goals(periods, 3, 'home')}   ${goals(periods, currentPeriodOrdinal, 'home', shootoutInfo)}     ${home.score}     ${sog(periods, 'home')}`[hWin ? 'green' : 'dim']);
  } else {
    console.log(`${padEnd(game.teams.away.team.name, TEAM_WIDTH)}  ${goals(periods, 1, 'away')}   ${goals(periods, 2, 'away')}   ${goals(periods, 3, 'away')}         ${away.score}     ${sog(periods, 'away')}`[aWin ? 'green' : 'dim']);
    console.log(`${padEnd(game.teams.home.team.name, TEAM_WIDTH)}  ${goals(periods, 1, 'home')}   ${goals(periods, 2, 'home')}   ${goals(periods, 3, 'home')}         ${home.score}     ${sog(periods, 'home')}`[hWin ? 'green' : 'dim']);
  }
};

const get = async (start = 1, end = 0) => {
  const startDate = moment().subtract(Math.abs(start), 'days').format(DATE_FORMAT);
  const endDate = moment().add(end, 'days').format(DATE_FORMAT);
  const response = await fetch(`${url}?startDate=${startDate}&endDate=${endDate}&hydrate=linescore`);
  const json = await response.json();
  json.dates.forEach((date) => {
    console.log(moment(date.date).format('dddd MMMM DD').brightWhite);
    displayLine(LINE_LENGTH);
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
