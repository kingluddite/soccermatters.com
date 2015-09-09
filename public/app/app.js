angular.module('smApp', ['routerRoutes'])

.controller('mainController', function() {

    var vm = this;

    vm.pageTitle = "Soccermatters.com";
    vm.pageSlogan = "Because Soccer Does Matter";
})

// // home page controller
.controller('homeController', function() {
    var vm = this;

    vm.pageTitle = "Player Relationship Management (PRM)";
})

// // teams
.controller('teamController', function() {
    var vm = this;
    vm.pageTitle = "Teams";

})

.controller('mySeasonsController', function($http) {
    var vm = this;
    vm.pageTitle = "My Seasons";

    $http.get('/api/seasons')
      .then(function(data) {
        // bind the seasons we receive to vm.seasons
        vm.mySeasons = data.data;
        // console.log(vm.mySeasons);
      });

})

.controller('mySeasonController', function($http, $routeParams) {
        // console.log($routeParams.season_id);
    var seasonId = $routeParams.season_id;
    var vm = this;
    // vm.pageTitle = "My Season";

    $http.get('/api/seasons/' + seasonId)
      .then(function(data) {
        // bind the seasons we receive to vm.seasons
        vm.mySeasonGames = data.data.fullSeason;
        console.log(vm.mySeasonGames.awayTeam);
      });

})

.controller('aboutController', function() {
    var vm = this;
    vm.pageTitle = "About";
})

.controller('loginController', function() {
    var vm = this;
    vm.pageTitle = "Login";
})

.controller('registerController', function() {
    var vm = this;
    vm.pageTitle = "Register";
})

.controller('schedulerController', function($http) {
    var vm = this;
    vm.pageTitle = "Create A Season Schedule";
    $(document).ready(function() {
  /* ########################### */
  // rule - divisions do not play each other
  // teams from division A
  var divisionA = [
    "Evolution FC",
    "Beach Mex",
    "Fram",
    "South Bay Royals",
    "Long Beach",
    "FC Illuminati",
    "Lionside FC",
    "South Bay Eagles FC",
    "Civitas United",
    "Dinamo Red Star",
    "United XI",
    "Gunners 11"
  ];
  // teams from division B
  var divisionB = [
    "5 Estrellas",
    "SpaceX-Men",
    "Beach Cities United",
    "FC Gringos",
    "Tasmania",
    "TTAF Footbal Club",
    "Dogos FC",
    "Eskimo Bros",
    "Civitas FC",
    "SBFC",
    "AC Sparta"
  ];
  // these are times combined from Saturday (4) and
  // Sunday (8)
  var gameTimes = [
    "4:00pm",
    "5:45pm",
    "7:30pm",
    "9:15pm",
    "8:00am",
    "9:45am",
    "11:30am",
    "1:15pm",
    "3:00pm",
    "4:45pm",
    "6:30pm",
    "8:15pm"
  ];

  // we story all the holidays in milliseconds for easier matching
  var holidayArray = [
    new Date('01/01/2016').getTime(),
    new Date('01/19/2016').getTime(),
    new Date('02/04/2016').getTime(),
    new Date('02/14/2016').getTime(),
    new Date('02/16/2016').getTime(),
    new Date('03/17/2016').getTime(),
    new Date('04/03/2016').getTime(),
    new Date('04/04/2016').getTime(),
    new Date('04/05/2016').getTime(),
    new Date('05/25/2016').getTime(),
    new Date('07/03/2016').getTime(),
    new Date('07/04/2016').getTime(),
    new Date('09/05/2015').getTime(),
    new Date('09/06/2015').getTime(),
    new Date('09/26/2015').getTime(),
    new Date('10/12/2015').getTime(),
    new Date('11/11/2015').getTime(),
    new Date('11/26/2015').getTime(),
    new Date('11/27/2015').getTime(),
    new Date('12/24/2015').getTime(),
    new Date('12/25/2015').getTime(),
    new Date('12/26/2015').getTime(),
    new Date('12/31/2015').getTime()
  ];

  function findNextNonHoliday(gDate) {
    currentDate = gDate;
    // is the current day not a saturday or sunday?
    if (currentDate.getDay() !== 6 || currentDate.getDate() !== 0) {
      // current date is not sat or sun
      // so we need to add a day to it
      currentDate = addDays(currentDate, 1);
      // we have a new day so we need to check if that is a holiday
      currentDate = checkHoliday(currentDate);
      return currentDate;
    } else {
      return currentDate;
    }
  }

  // find out if game date is holiday
  function checkHoliday(currentDate) {
    // look for a match of game date and holiday
    // we change both dates to milliseconds so we can easily match
    //  them
    if ($.inArray(currentDate.getTime(), holidayArray) > -1) {
      // if there is a match we need to
      // move to the next day and check if that is a holiday
      currentDate = findNextNonHoliday(currentDate);
      // we now have the next non-holiday date so we can return it
      return currentDate;
    } else {
      return currentDate;
    }
  }

  // sometimes we need just a boolean valued to determine
  //  if the game date falls on a holiday
  //  we check the holiday array for matches
  function isItAHoliday(gmDate) {
    if ($.inArray(gmDate.getTime(), holidayArray) > -1) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Create a shuffled array containing all values of [from, to]
   * purpose - grab a random team
   */
  function createShuffledArray(from, to) {
    var i = to - from + 1;
    var a = Array(i);
    while (i) {
      var j = Math.floor(Math.random() * i--);
      var temp = isNaN(a[i]) ? (i + from) : a[i];
      a[i] = isNaN(a[j]) ? (j + from) : a[j];
      a[j] = temp;
    }
    return a;
  }

  // function to add days to a given date
  //  need a way to easily add days to the current game date
  function addDays(startDate, numberOfDays) {
    // when the addDays function is called
    //  we need to find out what the current day is
    //  this league only plays on sat and sun so we
    //  need to determine current day and add to it the proper
    //  number of days to get to either a saturday or sunday
    // we also need to set the gmTime array to the beginning
    // time slot for a saturday or sunday
    switch(startDate.getDay()) {
      case 0:
       gmTime = 0;
       numberOfDays = 6;
       break;
      case 1:
       numberOfDays = 5;
       break;
      case 2:
       numberOfDays = 4;
       break;
      case 3:
       numberOfDays = 3;
       break;
      case 4:
       numberOfDays = 2;
       break;
      case 5:
       numberOfDays = 1;
       break;
      case 6:
       gmTime = 4;
       numberOfDays = 1;
       break;
    }
    // console.log('numdays: ' + numberOfDays);
    var returnDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + numberOfDays,
      startDate.getHours(),
      startDate.getMinutes(),
      startDate.getSeconds());
    return returnDate;
  }

  // when adding the game date we need the first games to be played on Saturday
  //  if it's the last game of Saturday, we need to change the day to 
  //  Sunday
  //    when its the last game of Sunday we need the next game to be
  //    played on the following Saturday
  //    the season nested loop continues until all the games have been
  //    played.
  function setDateOfGame(gDate, gTime, counter) {
    // first the day should be Saturday and the time should be less then 4
    //   which means it is using 1 of the 4 saturday times
    // console.log(gDate);
    currentDate = gDate;
    if (currentDate.getDay() === 6 && gTime < 4) {
      if(!isItAHoliday(currentDate)) {
        return currentDate;
      } else {
        currentDate = checkHoliday(currentDate);
        // console.log(checkHoliday(currentDate));
      }
    } else if (gTime === 4) {
      if (!isItAHoliday(gDate)) {        
        // if we hit the 4th index of the gTime array, add 1 day to the
        //  currentDate (so it will now be Sunday)
        currentDate = addDays(gDate, 1);
        return currentDate;
      } else {
        currentDate = checkHoliday(gDate);
        return currentDate;
      }
    } else if (gDate.getDay() === 0 && counter === 1) {
      if (!isItAHoliday(gDate)) {  
        // if its Sunday and the counter equals 1, we need to get ready for 
        //  the next week so add 6 to the sunday date (which will take us
        //  to the following Saturday)
        currentDate = addDays(gDate, 6);
        return currentDate;
      } else {
        currentDate = checkHoliday(gDate);
        return currentDate;
      }
    } else {
      if (!isItAHoliday(gDate)) {        
        // everything else should just return the date
        return currentDate;
      } else {
        currentDate = checkHoliday(gDate);
        return currentDate;
      }
    }
  }

  function init() {
    // start the season from scratch
    // needed to add this to properly destroy a virtual schedule
    // and create a new one
    season = [];
    divisions = divisionA.concat(divisionB);
    currentDate = new Date("08/29/2015");
    gameNum = 1;
    gmTime = 0;
    weekNum = 1;
  }

  function createHolidayCard(currentDate, counter) {
    // we need to create an object with holiday data
    //  so that we can add this holiday data to the view
    //  showing a nice blue holiday card
    season.push({
      counter: counter,
      gameStatus: 'HOLIDAY',
      // to set the correct game date, we call the 
      //   setDateOfGame function and pass it the necessary
      // arguments (the current date, the game time, and the
      // counter)
      gameDate: setDateOfGame(currentDate, gmTime, counter)
    });
  }

  // create an array to store the entire season
  var season = [];
  // join divisions together (for now)
  //  improvement: alternate division A and B into schedule
  //  first 2 random teams from division A play each other
  //   then 2 random teams from division B play each other
  //   the teams need to be stored in tempArrays so the original
  //   values are not mutable
  var divisions = divisionA.concat(divisionB);

  // we need the start date of the season
  var currentDate = new Date("08/29/2015");

  // keep track of every game number
  var gameNum = 1;

  // this variable is kept so we can cycle through all the times in the
  //  gameTimes array
  var gmTime = 0;

  // need to keep track of weekNumbers so we know
  // each week all the teams play
  var weekNum = 1;
  var addOneToCounter;

  /*=============================================
  =            Generate Schedule Function            =
  =============================================*/

  var generateSchedule = function(divisions, gameTimes, weeksInSeason) {
    // don't mess with original divison
    var tempDivision = divisions;
    var team;

    // don't mess with original game times
    var tempGameTimes = gameTimes;

    // store random team
    team = createShuffledArray(0, tempDivision.length - 1);

    // find total teams and divide by 2
    var counter = Math.floor(tempDivision.length / 2);

    // as long as the counter is not 0, keep looping
    while (counter >= 0) {
      // if (addOneToCounter) {
      //   counter++;
      // }
      if (counter === 0 && weekNum === weeksInSeason) {
        // need to determine if the date is a holiday
        if (isItAHoliday(currentDate)) {
          // it's a holiday
          // grab the date
          currentDate = checkHoliday(currentDate);
          // generate a holiday card to be added to the schedule
          // the times, week number, game number
          // home team and away team and time will not be updated
          createHolidayCard(currentDate, counter)
        }
        // outer loop will end if counter equals zero
        // AND
        //  the week number equals the weeks in a season
        // example: if counter === 0 AND
        //   11 === 11 -----> END THE LOOP (season is scheduled!)
        //  by just returning
        return;
      } else if (counter === 0) {
        // if the counter is 0, then our games are scheduled for the week
        //  and we need to increase the week number by 1
        weekNum++;
        // we run the generateSchedule again and pass same arguments
        //  to recursively build our season schedule
        generateSchedule(divisions, gameTimes, weeksInSeason);
      } else {
        // need to determine if the date is a holiday
        if (isItAHoliday(currentDate)) {
          // it's a holiday
          // grab the date
          currentDate = checkHoliday(currentDate);
          // generate a holiday card to be added to the schedule
          // the times, week number, game number
          // home team and away team and time will not be updated
          createHolidayCard(currentDate, counter);
        }
        // so if we are not adding a new week or busting out of the loop
        // do the grunt work and build a season game object with
        // all of the following data
        season.push({
          // what's the week number?
          weekNum: weekNum,
          // what's the game number?
          gameNum: gameNum,
          // what iteration of the game times do we need to use?
          gameTime: gameTimes[gmTime],
          // remember counter counts down!
          counter: counter,
          // pop out the teams we schedule games for
          // pop returns the index of the team removed
          // we use that index to populate the object key with
          // the correct team
          homeTeam: tempDivision[team.pop()],
          // we do this for both home and away
          awayTeam: tempDivision[team.pop()],
          gameStatus: 'TBP',
          seasonStatus: false,
          // to set the correct game date, we call the 
          //   setDateOfGame function and pass it the necessary
          // arguments (the current date, the game time, and the
          // counter)
          gameDate: setDateOfGame(currentDate, gmTime, counter)
        });
        // need to determine if the date is a holiday
        if (isItAHoliday(currentDate)) {
          // it's a holiday
          // grab the date
          currentDate = checkHoliday(currentDate);
          // generate a holiday card to be added to the schedule
          // the times, week number, game number
          // home team and away team and time will not be updated
          createHolidayCard(currentDate)
        } else {  
          gameNum++; // gameNum goes up
          if (gmTime > 9) { // if gameTime > 9 we have gone through
            // all our times, so we need to start over
            gmTime = 0;
          } else {
            // if we are resetting the game time, then just add 1 to it
            gmTime++;
          }
        }
        // the counts down as online research shows nested while loops
        // work better with arrays if you count down
        counter--;
      }
    }
  }

  // generate output to show the scheduled season is working properly
  $('#createSchedule').on('click', function() {
    // console.log('clicked');
    $('#destroySchedule').prop('disabled', false);
   $('.card-columns').empty();
   // on click generate the schedule
   // passing in the divisions used (concatenated for now)
   // the game times (both sat and sunday - for now)
   // and the number of weeks in the season
   
   /*=======================================================
   =            Generate the Schedule Card View            =
   =======================================================*/
   
    generateSchedule(divisions, gameTimes, 11);
    // console.log(season);
    // $.post(season);
    // $.ajax({
    // url: '/api/seasons',   
    // type: 'POST',   
    // contentType: 'application/json',   
    // data: JSON.stringify(season) //stringify is important
    // //success: alert(JSON.stringify(season))   
    // });
    // $.post("http://localhost:8080/api/seasons", {fullSeason: season});
    $http.post("/api/seasons", {fullSeason: season});
    // in this loop generate a card for a regular game card
    //  or a holiday card - the 'if' decides to render which one
    $.each(season, function(i, team) {
        if (team.gameStatus === "HOLIDAY") {
          $('<div class="card card-block card-inverse card-primary text-center"><blockquote class="card-blockquote"><p>Holiday</p><footer><small>' + moment(team.gameDate).format('dddd, MMMM Do YYYY') + '</small></footer></blockquote></div>').appendTo('.card-columns');
        } else {
          $('<div class="card"><div class="card-header"> Game# ' + team.gameNum + '<span class="pull-right text-muted">Week# ' + team.weekNum + '</div><div class="card-block"><blockquote class="card-blockquote text-center"><p>(a) ' + team.awayTeam + '<br/> VS <br>' + team.homeTeam + ' <em>(h)</em>' + '</p><footer><small class="text-muted">Game Time <cite title="Game Time"> @ ' + team.gameTime + '<br>' + moment(team.gameDate).format('dddd, MMMM Do YYYY') + '</cite></small></footer></blockquote><small class="card-text text-center"></small>' + '<small class="pull-left text-muted">' + team.gameStatus + '</small>' + '<small class="pull-right text-muted">Aviation Field</small></div><!--END card -->').appendTo('.card-columns');
        }
      
        if (i === season.length) {
          return false;
        }

    // console.log(season);
  });
  });

// to clear out and reset the virtual season schedule
//  when admin user clicks destroy season
if (season.length === 0) {
  $('#destroySchedule').prop('disabled', true);
}
// TODO - add confirmation
$('#destroySchedule').on('click', function() {});

$('#confirm-delete').on('click', function() {
  if (season.length !== 0) {
    init();
    $('.card-columns').empty();
    season.length = 0;
    $('.card-columns').html('<div class="card card-block card-inverse card-danger text-center"><blockquote class="card-blockquote"><p>Your Season Schedule has been deleted.</p><footer><small></small></footer></blockquote></div>').appendTo('.card-columns');
  }
});

});

})

.controller('fieldController', function() {
    var vm = this;
    vm.pageTitle = "Find Or Share A Soccer Field";
});
