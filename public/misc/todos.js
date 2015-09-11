add tournaments (copy)
add current page on navigation
add coaches pages (copy)
add About page copy
add referees pages (copy)
add gear (copy - icebox functionality)
clean up pages
add auto increment to game
minify with gulp
clean up login/logout/register
route to single game
update trello
figure out authentication
add processing animations
organize routes and controllers on server
tried and failed (favicon)
clean up top of single season page
get message to update screen when changes happen
update readme
add teams pages (crud)
click on games and open that game
you can add multiple controllers to one field (refactor)
figure out how to temporarily turn off page animations when certain things happen
add inline editing to make adding scores easier
figure out show/hide
get field API working (long lat)
authentication on its own branch in case I cant get it to work
add crud users and add 'admin boolean' (icebox)
questions for adding a season (holidays, teams, divisions) - icebox functionality
add array of players to game (icebox?)
add scores to game (icebox?)
add weather API to game (3rd Party Api - icebox)

done - logo soccer matters?
done (figure out services)
done (figure out factories)
done (organize controllers angular)

/*============================
=            TODO            =
============================*/
1) create alternate division games(no blending divisions)
2) create holiday array
3) does this work
if start date is not Saturday ?
  4) OOP refactor ?
  5) IIFE ?
  6) Create Express App
7) Add login
8) if logged in as league admin allow to create new season
9) also create new divisions
10) add holidays
11) add start Date
12) when submit, show output and ask admin
if ok to create
13) no - goes to create season schedule new form
14) if yes, submit to schedule collection, schedule set to LIVE
15) give ability to do CRUD on schedule with business rules
16) admin can add / update scores
17) 3 pts added
for win, 1 pt tie, 0 loss
18) top 8 teams from each division go to playoffs
19) players can use paypal to pay coaches
20) coaches can use paypal to pay league
21) league can use paypal to pay referees
22) soccer uniforms and equipment API to buy soccer stuff
23) coaches can auto email team members game reminder yes / no / maybe
24) coaches can create drag drop starting lineup
25) coaches can auto email players who have not paid
26) coaches can add goals, assists, red and yellow cards
27) coaches can add player numbers
28) players can update profile, shows stats
29) league can create seasons
30) teams can see just their season schedule
31) live link to update game reminder

/*============================================
=            Create Schedule Form            =
============================================*/
// On the home page the person will have to register to be
// able to create a league.
// He will then be taken to the 'Create Season Schedule Form'
// The form will request the following information:
// What day does the season start?
//  This will be a calendar field where the user chooses the day.
// What day(s) of the week will the games be played?
//  This will be a checkbox with m-t-w-th-f-sa-su
// How many weeks is this season? (a dropdown)
// How many divisions are in this season?
// a textarea will be generated for each division
//   with the division heading on top of each textarea
//   the person will be instructed to enter all the teams in divsion-A,
//   in the first box and each team should be separated by a space 
//   they should do the same for the other boxes
//   Will there be interdivisional play (teams from different divisions play each other)
//      if no - make sure the divisons start with 2 teams from A division
//       then 2 teams from division B 
//      if yes - concatenate the divisions (already done) and have them
//        randomly play each other
//      are there any holidays, in addition to these holidays, that games will not be played in this season you are about to create?
//      if yes is selected, a textarea will be generated and the user
//        will be instructed to add all the holidays in the format (mm/dd/yyyy) and the days should be separated by a space
// Will there be playoffs?
// The person will click the generate button and the schedule will be created. They will be asked to review the schedule and edit any indivual games they need to. They can swap one team with any other team from that week.
// Once they are happy with their 'virtual league schedule' they will be asked to click the 'make season live' button and then the schedule will be entered into the MongoDB for persistant storage.
// They will be then be able to link to the live scores page to update the scores of all the games for the week.

// grab all teams from teamsAvailableDivisionA
// take 2 random teams from division a
// teams removed from teamsAvailableDivisionA
// start on day1 of season (saturday)
// set 2 teams to play at time1 of saturday (4pm)
// set weekNumber property to 1
// go to next time on saturday 5:45pm(4pm)
// take 2 random teams from division b
// teams removed from teamsAvailableArray
// and have them play at 5:45
// 5:45 time slot removed from timesAvailableSaturdayArray
// take 2 random teams from division a
// remove teams from teamsAvailable array
// have them play at 7:30pm time slot
// remove 7:30pm from timesAvailableSaturdayArray
// take 2 random teams from division b teamsAvailableArray
// remove 2 teams from teamsAvailableArray
// have them play at 9:15pm time slot
// remove 9:15pm from timesAvailableSaturdayArray
// check if timesAvailableSaturdayArray.length === 0
// move to next day (sunday)
// repeat process for the following times:
//  8:00am
//  9:45am
//  11:30am
//  1:15pm
//  3:00pm
//  4:45pm
//  6:30pm
//  8:15pm
// check if timesAvailableSundayArray.length === 0
// move to next Saturday
// repopulate the teamsAvailableArray
// repopulate the timesAvailableSaturdayArray
// repopulate the timesAvailableSundayArray
// repeat what you did for week 1
// add 1 to weekNumber
// when weekNumber > 11 - stop
