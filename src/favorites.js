const inquirer = require('inquirer');
const Configstore = require('configstore');
const packageJson = require('../package.json');
const config = new Configstore(packageJson.name, {favorites: []});

const teams =  [
  { "name": "New Jersey Devils", "value": 1 },
  { "name": "New York Islanders","value":2 },
  { "name": "New York Rangers", "value": 3 },
  { "name": "Philadelphia Flyers", "value": 4 },
  { "name": "Pittsburgh Penguins", "value": 5 },
  { "name": "Boston Bruins", "value": 6 },
  { "name": "Buffalo Sabres", "value": 7 },
  { "name": "Montréal Canadiens", "value": 8 },
  { "name": "Ottawa Senators", "value": 9 },
  { "name": "Toronto Maple Leafs", "value": 10 },
  { "name": "Carolina Hurricanes", "value": 12 },
  { "name": "Florvaluea Panthers", "value": 13 },
  { "name": "Tampa Bay Lightning", "value": 14 },
  { "name": "Washington Capitals", "value": 15 },
  { "name": "Chicago Blackhawks", "value": 16 },
  { "name": "Detroit Red Wings", "value": 17 },
  { "name": "Nashville Predators", "value": 18 },
  { "name": "St. Louis Blues", "value": 19 },
  { "name": "Calgary Flames", "value": 20 },
  { "name": "Colorado Avalanche", "value": 21 },
  { "name": "Edmonton Oilers", "value": 22 },
  { "name": "Vancouver Canucks", "value": 23 },
  { "name": "Anaheim Ducks", "value": 24 },
  { "name": "Dallas Stars", "value": 25 },
  { "name": "Los Angeles Kings", "value": 26 },
  { "name": "San Jose Sharks", "value": 28 },
  { "name": "Columbus Blue Jackets", "value": 29 },
  { "name": "Minnesota Wild", "value": 30 },
  { "name": "Winnipeg Jets", "value": 52 },
  { "name": "Arizona Coyotes", "value": 53 },
  { "name": "Vegas Golden Knights", "value": 54 }
].sort((a, b) => a.name < b.name ? -1 : 1);


const select = async () => {
  inquirer
    .prompt([
      {
        type: 'checkbox',
        message: 'Select your favorite NHL team(s)',
        name: 'favorites',
        choices: teams,
        default: config.get('favorites')
      }])
      .then(answers => config.set('favorites', answers.favorites))

};

const get = () => config.get('favorites');

module.exports = {
  select,
  get
};
