# The nhl changed their apis and this no longer works.  Some day I will get around to upating it. PRs welcome :) 

# nhl-cli

Get the latest NHL scores and standing on your command line

## Installation

```bash
$ npm install -g nhl-cli
```

## Usage

## Line Score

```bash
$ nhl 
$ nhl scores -l

Friday January 24
====================================================
1st 20:00                1st 2nd 3rd      Total  SOG
Canadian All-Stars        0   0   0         0     0
American All-Stars        0   0   0         0     0

Saturday January 25
====================================================
                         1st 2nd 3rd      Total  SOG
Team Metropolitan         0   0   0         0     0
Team Atlantic             0   0   0         0     0

                         1st 2nd 3rd      Total  SOG
Team Pacific              0   0   0         0     0
Team Central              0   0   0         0     0

```

### Options

```bash
nhl scores -h
Usage: nhl scores [options] [option]

Show score and upcoming games.

Options:
  -l, --line              Show as line score
  -s, --scheduled [days]  How many days of scheduled games to show
  -c, --completed [days]  How many previous days scores to show
  -h, --help              output usage information
```


## Scores

```bash
$ nhl scores
Friday January 24
-----------------------------------------------------
Vegas Golden Knights  2  vs  3  Boston Bruins
  New York Islanders  4  vs  2  New York Rangers
       Winnipeg Jets  1  vs  4  Carolina Hurricanes
 Pittsburgh Penguins  0  vs  3  Philadelphia Flyers
    Florida Panthers  4  vs  3  Chicago Blackhawks

Saturday January 25
-----------------------------------------------------
       Winnipeg Jets  0  vs  0  Columbus Blue Jackets
   Detroit Red Wings  0  vs  0  Minnesota Wild

```

### Options

```bash
nhl scores -h
Usage: nhl scores [options] [option]

Show score and upcoming games.

Options:
  -l, --line              Show as line score
  -s, --scheduled [days]  How many days of scheduled games to show
  -c, --completed [days]  How many previous days scores to show
  -h, --help              output usage information
```

## Standings

```bash
$ nhl standings  
---------------------------------------------
                   Eastern
---------------------------------------------
Atlantic                  PT | WN | LO | OT 
---------------------------------------------
Boston Bruins             70 | 29 | 10 | 12
Tampa Bay Lightning       62 | 29 | 15 |  4
Florida Panthers          61 | 28 | 16 |  5
---------------------------------------------
Metro                     PT | WN | LO | OT 
---------------------------------------------
Washington Capitals       71 | 33 | 11 |  5
Pittsburgh Penguins       67 | 31 | 14 |  5
New York Islanders        63 | 29 | 15 |  5
---------------------------------------------
Wildcard                  PT | WN | LO | OT 
---------------------------------------------
Columbus Blue Jackets     62 | 27 | 16 |  8
Carolina Hurricanes       61 | 29 | 18 |  3
Philadelphia Flyers       60 | 27 | 17 |  6
Toronto Maple Leafs       57 | 25 | 17 |  7
Buffalo Sabres            51 | 22 | 20 |  7
Montréal Canadiens        51 | 22 | 21 |  7
New York Rangers          50 | 23 | 21 |  4
Ottawa Senators           42 | 17 | 23 |  8
New Jersey Devils         41 | 17 | 24 |  7
Detroit Red Wings         28 | 12 | 35 |  4
---------------------------------------------
                   Western
---------------------------------------------
Pacific                   PT | WN | LO | OT 
---------------------------------------------
Vancouver Canucks         58 | 27 | 18 |  4
Edmonton Oilers           57 | 26 | 18 |  5
Calgary Flames            57 | 26 | 19 |  5
---------------------------------------------
Central                   PT | WN | LO | OT 
---------------------------------------------
St. Louis Blues           68 | 30 | 11 |  8
Colorado Avalanche        62 | 28 | 15 |  6
Dallas Stars              58 | 27 | 17 |  4
---------------------------------------------
Wildcard                  PT | WN | LO | OT 
---------------------------------------------
Arizona Coyotes           57 | 26 | 20 |  5
Vegas Golden Knights      57 | 25 | 20 |  7
Winnipeg Jets             54 | 25 | 22 |  4
Chicago Blackhawks        54 | 24 | 21 |  6
Minnesota Wild            52 | 23 | 21 |  6
Nashville Predators       51 | 22 | 18 |  7
San Jose Sharks           46 | 21 | 25 |  4
Anaheim Ducks             43 | 19 | 24 |  5
Los Angeles Kings         41 | 18 | 27 |  5
---------------------------------------------
```

### Options

```bash
nhl standings -h
Usage: nhl standings [options] [option]

Shows the current standings

Options:
  -w, --wildcard    Shows the wildcard standings
  -l, --league      Shows the league standings
  -d, --division    Shows the standing by division
  -c, --conference  Shows the standings by conference
  -h, --help        output usage information
```

## Favorites

Set your favorite NHL team(s) and they will get highlighted in the output

```bash
$ nhl favorites
```



## Contribute

Something broke?  What to add something?  Open a PR!

## License

MIT
