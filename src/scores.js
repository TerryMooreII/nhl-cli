const fetch = require('node-fetch');
const moment = require('moment');
const colors = require('colors/safe');
const theme = require('./theme');
const favorites = require('./favorites');
const {
  padStart,
  displayLine,
  NHL_BASE_URL,
  DATE_FORMAT,
} = require('./utils');

const favTeamIds = favorites.get();

const url = `${NHL_BASE_URL}/schedule`;
const LINE_LENGTH = 53;

let awayNameWidth = 0;

colors.setTheme(theme);

const isFav = (id, result) => (favTeamIds.includes(id) ? `${result}Favorite` : result);

const colorize = (game) => {
  if (game.awayScore > game.homeScore) {
    return [colors[isFav(game.awayId, 'winner')](`${padStart(game.away, awayNameWidth)}  ${game.awayScore}`), '  vs  ', colors[isFav(game.homeId, 'loser')](`${game.homeScore}  ${game.home}`)];
  } if (game.homeScore > game.awayScore) {
    return [colors[isFav(game.awayId, 'loser')](`${padStart(game.away, awayNameWidth)}  ${game.awayScore}`), '  vs  ', colors[isFav(game.homeId, 'winner')](`${game.homeScore}  ${game.home}`)];
  }
  return [colors[isFav(game.awayId, 'today')](`${padStart(game.away, awayNameWidth)}  ${game.awayScore}`), '  vs  ', colors[isFav(game.homeId, 'today')](`${game.homeScore}  ${game.home}`)];
};

const get = async (daysBack = 1, daysForward = 0) => {
  const startDate = moment().subtract(Math.abs(daysBack), 'days').format(DATE_FORMAT);
  const endDate = moment().add(daysForward, 'days').format(DATE_FORMAT);
  const response = await fetch(`${url}?startDate=${startDate}&endDate=${endDate}`);
  const json = await response.json();

  const matches = json.dates.reduce((acc, date) => {
    acc[date.date] = date.games.map((game) => {
      const { away, home } = game.teams;
      awayNameWidth = away.team.name.length > awayNameWidth
        ? away.team.name.length + 1
        : awayNameWidth;

      return {
        awayId: away.team.id,
        away: away.team.name,
        awayScore: away.score,
        homeId: home.team.id,
        home: home.team.name,
        homeScore: home.score,
      };
    });
    return acc;
  }, {});

  Object.keys(matches).forEach((date) => {
    const d = moment(date).format('dddd MMMM DD');
    console.log(padStart(d, LINE_LENGTH / 2 + d.length / 2));
    displayLine(LINE_LENGTH);
    matches[date].forEach((game) => {
      console.log(colorize(game).join(''));
    });
    console.log('');
  });
};

module.exports = { get };
