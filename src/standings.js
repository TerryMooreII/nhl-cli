
const fetch = require('node-fetch');
require('colors');
const favorites = require('./favorites');
const {
  padStart,
  padEnd,
  displayLine,
  NHL_BASE_URL,
} = require('./utils');

const STANDINGS_URL = `${NHL_BASE_URL}/standings`;
const favTeamIds = favorites.get();
const WIDTH = 25;
const LINE_LENGTH = 45;

const isFav = (id) => (favTeamIds.includes(id) ? 'brightGreen' : 'dim');

const displayRecords = (records) => {
  if (!records.length) {
    console.log(' No standings information available.');
    console.log('');
  }

  records.forEach((record) => {
    const { wins, losses, ot } = record.leagueRecord;
    console.log(`${padEnd(record.team.name, WIDTH)}  ${padStart(record.points, 2)} | ${padStart(wins, 2)} | ${padStart(losses, 2)} | ${padStart(ot, 2)}`[isFav(record.team.id)]);
  });
  displayLine(LINE_LENGTH);
};

const displayConferenceTitle = (title) => {
  console.log(title.padStart(26, ' ').brightWhite);
  displayLine(LINE_LENGTH);
};

const displayDivisionTitle = (title) => {
  console.log(`${padEnd(title, WIDTH)}  PT | WN | LO | OT `.brightWhite);
  displayLine(LINE_LENGTH);
};

const wildcard = async () => {
  const url = `${STANDINGS_URL}/wildCardWithLeaders`;
  const response = await fetch(url);
  const json = await response.json();
  const records = {
    western: {
      pacific: json.records[5] ? json.records[5].teamRecords : [],
      central: json.records[4] ? json.records[4].teamRecords : [],
      wildcard: json.records[1] ? json.records[1].teamRecords : [],
    },
    eastern: {
      metro: json.records[2] ? json.records[2].teamRecords : [],
      atlantic: json.records[3] ? json.records[3].teamRecords : [],
      wildcard: json.records[0] ? json.records[0].teamRecords : [],
    },
  };
  displayLine(LINE_LENGTH);
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
  const url = `${STANDINGS_URL}/byConference`;
  const response = await fetch(url);
  const json = await response.json();
  displayLine(LINE_LENGTH);
  json.records.forEach((record) => {
    displayDivisionTitle(record.conference.name);
    displayRecords(record.teamRecords);
  });
};

const byDivision = async () => {
  const url = `${STANDINGS_URL}/byDivision`;
  const response = await fetch(url);
  const json = await response.json();
  displayLine(LINE_LENGTH);
  json.records.forEach((record) => {
    displayDivisionTitle(record.division.name);
    displayRecords(record.teamRecords);
  });
};

const byLeague = async () => {
  const url = `${STANDINGS_URL}/byLeague`;
  const response = await fetch(url);
  const json = await response.json();
  displayLine(LINE_LENGTH);

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
