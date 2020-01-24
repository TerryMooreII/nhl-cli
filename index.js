const program = require('commander');
const scores = require('./src/scores');
const standings = require('./src/standings');
const favorites = require('./src/favorites');

program
  .command('scores [option]')
  .description('Show score and upcoming games.')
  .option("-s, --scheduled [days]", "How many days of scheduled games to show")
  .option("-c, --completed [days]", "How many previous days scores to show")
  .action((env, options) => {
    scores.get(options.completed, options.scheduled)
  });

program
  .command('standings [option]')
  .description('Shows the current standings')
  .option("-w, --wildcard", "Shows the wildcard standings")
  .option("-l, --league", "Shows the league standings")
  .option("-d, --division", "Shows the standing by division")
  .option("-c, --conference", "Shows the standings by conference")
  .action((env, options) => {
    const { league, conference, division} = options;
    if (league) standings.byLeague()
    else if (division) standings.byDivision()
    else if (conference) standings.byConference()
    else standings.wildcard()
  });

  program
  .command('favorites')
  .description('Set your favorite team(s)')
  .action(() => {
    favorites.select()
  });


  

program.parse(process.argv)

