
const fetch = require('node-fetch');
require('colors');
const favorites = require('./favorites');

const favTeamIds = favorites.get();
const WIDTH = 25;

const getTeamRecords = (json) => ({
  western: {
    pacific: json.records[5].teamRecords,
    central: json.records[4].teamRecords,
    wildcard: json.records[1].teamRecords,
  },
  eastern: {
    metro: json.records[2].teamRecords,
    atlantic: json.records[3].teamRecords,
    wildcard: json.records[0].teamRecords,
  },
});

const isFav = (id) => (favTeamIds.includes(id) ? 'brightGreen' : 'dim');

const pad = (name, extra = 0) => Array(WIDTH - name.length + extra).fill('').join(' ');

const padStat = (stat) => (stat > 9 ? stat : ` ${stat}`);

const displayLine = (len = 45) => console.log(Array(len).fill('-').join('').brightWhite);

const displayRecords = (records) => {
  records.forEach((record) => {
    const { wins, losses, ot } = record.leagueRecord;
    console.log(`${record.team.name}${pad(record.team.name)}  ${padStat(record.points)} | ${padStat(wins)} | ${padStat(losses)} | ${padStat(ot)}`[isFav(record.team.id)]);
  });
  displayLine();
};

const displayConferenceTitle = (title) => {
  console.log(`${Array(20).fill('').join(' ')}${title}`.brightWhite);
  displayLine();
};

const displayDivisionTitle = (title) => {
  console.log(`${title}${pad(title)}  PT | WN | LO | OT `.brightWhite);
  displayLine();
};

const wildcard = async () => {
  const url = 'https://statsapi.web.nhl.com/api/v1/standings/wildCardWithLeaders';
  const response = await fetch(url);
  const json = await response.json();
  const records = getTeamRecords(json);
  displayLine();
  displayConferenceTitle('Eastern');
  displayDivisionTitle('Atlantic');
  displayRecords(records.eastern.atlantic);

  displayDivisionTitle('Metro');
  displayRecords(records.eastern.metro);

  displayDivisionTitle('Wildcard');
  displayRecords(records.eastern.wildcard);


  displayConferenceTitle('Western');
  displayDivisionTitle('Pacific');
  displayRecords(records.western.pacific);

  displayDivisionTitle('Central');
  displayRecords(records.western.central);

  displayDivisionTitle('Wildcard');
  displayRecords(records.western.wildcard);
};

const byConference = async () => {
  const url = 'https://statsapi.web.nhl.com/api/v1/standings/byConference';
  const response = await fetch(url);
  const json = await response.json();
  displayLine();
  json.records.forEach((record) => {
    displayDivisionTitle(record.conference.name);
    // displayConferenceTitle(record.conference.name);
    displayRecords(record.teamRecords);
  });
};

const byDivision = async () => {
  const url = 'https://statsapi.web.nhl.com/api/v1/standings/byDivision';
  const response = await fetch(url);
  const json = await response.json();
  displayLine();
  json.records.forEach((record) => {
    displayDivisionTitle(record.division.name);
    displayRecords(record.teamRecords);
  });
};

const byLeague = async () => {
  const url = 'https://statsapi.web.nhl.com/api/v1/standings/byLeague';
  const response = await fetch(url);
  const json = await response.json();
  displayLine();

  json.records.forEach((record) => {
    displayDivisionTitle('League Standings');
    displayRecords(record.teamRecords);
  });
};

module.exports = {
  wildcard,
  byConference,
  byDivision,
  byLeague,
};
