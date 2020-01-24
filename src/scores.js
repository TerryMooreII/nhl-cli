const fetch = require('node-fetch');
const moment = require('moment');
const colors = require('colors/safe');
const theme = require('./theme');
const favorites = require('./favorites');
const favTeamIds = favorites.get();

const url = 'https://statsapi.web.nhl.com/api/v1/schedule';

let awayNameWidth = 0;

colors.setTheme(theme);

const isFav = (id, result) => favTeamIds.includes(id) ? `${result}Favorite` : result;

const pad = (name, extra = 0) => Array(awayNameWidth - name.length + extra).fill('').join(' ');

const colorize = (game) => {
  if (game.awayScore > game.homeScore) {
    return [colors[isFav(game.awayId, 'winner')](`${pad(game.away)}${game.away}  ${game.awayScore}`), '  vs  ', colors[isFav(game.homeId, 'loser')](`${game.homeScore}  ${game.home}`)];
  } else if(game.homeScore > game.awayScore){
    return [colors[isFav(game.awayId, 'loser')](`${pad(game.away)}${game.away}  ${game.awayScore}`), '  vs  ', colors[isFav(game.homeId, 'winner')](`${game.homeScore}  ${game.home}`)];
  } 
  return [colors[isFav(game.awayId, 'today')](`${pad(game.away)}${game.away}  ${game.awayScore}`), '  vs  ', colors[isFav(game.homeId, 'today')](`${game.homeScore}  ${game.home}`)];
};

const get = async (daysBack = 1, daysForward = 1) => {
  const startDate = moment().subtract(Math.abs(daysBack), 'days').format('YYYY-MM-DD');
  const endDate = moment().add(daysForward, 'days').format('YYYY-MM-DD');
  const response = await fetch(`${url}?startDate=${startDate}&endDate=${endDate}`);
  const json = await response.json();
   
  
  const matches = json.dates.reduce((acc, date) => {
    acc[date.date] = date.games.map(game => {
      const {away, home} = game.teams;
      awayNameWidth = away.team.name.length > awayNameWidth ? away.team.name.length + 1 : awayNameWidth;
  
      return {
        awayId: away.team.id,
        away: away.team.name,
        awayScore: away.score,
        homeId: home.team.id,
        home: home.team.name,
        homeScore: home.score
      }
    });
    return acc;
  }, {});

  Object.keys(matches).forEach(date => {
    console.log(`${pad(date, 11)}${date}`);
    console.log(Array(53).fill('-').join(''));
    matches[date].forEach(game => {
      console.log(colorize(game).join(''));
    });
    console.log('');
  })
};

module.exports = {get};
