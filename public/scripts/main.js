var app = new Vue({
    el: ".match",
    data: {
        json: "scripts/data.json",
        teams: [],
        locations: [],
        games: [],
        allGames: [],
        match: [],
        chat: [],

    },
    created: function () {
        this.getData();

    },
    methods: {
        getData: function () {
            $.getJSON(this.json, function (data) {
                app.teams = data.teams;
                app.locations = data.locations;
                app.games = data.games;
                app.allGames = data.games;
            })
        },
        openLocations: function (x) {

            window.open(x);

        },
        openTeam: function (x) {

            this.games = this.allGames;

            var teamName = x.getAttribute("data-value");

            var gamesToShow = this.games.filter(function (game) {
                return game.teams.split(" ").includes(teamName);
            })

            this.games = gamesToShow;

            $(".teams, .matchList").toggle();

        },
        buttonLocation: function () {

            $(".index, .locations").toggle();
        },
        buttonTeams: function () {

            $(".index, .teams").toggle();
        },
        buttonHome1: function () {

            $(".locations, .index").toggle();
        },
        buttonHome2: function () {

            $(".teams, .index").toggle();
        },
        buttonHome3: function () {

            $(".matchList, .index").toggle();
        },
        buttonHome4: function () {
            $(".matchScreen, .index").toggle();
        },
        buttonHome5: function () {
            $(".allChat, .index").toggle();
        },
        buttonHome6: function () {
            $(".matchChat, .index").toggle();
        },

        singleMatch: function (x) {

            this.match = this.games.slice();

            var matchInfo = x.getAttribute("data-value");
            var matchTime = x.getAttribute("data-time");

            var matchToShow = this.match.filter(function (match) {

                var filter = match.teams.includes(matchInfo);
                var filter2 = match.time.includes(matchTime);

                var masterFilter = filter && filter2;

                return masterFilter;
            })

            this.match = matchToShow;

            $(".matchList, .matchScreen").toggle();

        },
        buttonBack: function () {

            $(".matchScreen, .matchList").toggle();
        },
        buttonBack2: function () {

            $(".matchList, .teams").toggle();
        },
        buttonBack3: function () {

            $(".matchChat, .matchScreen").toggle();
        },
        buttonChat: function () {
            $(".index, .matchChat").toggle();
        },
        buttonChat2: function () {

           /* $(".matchScreen, .matchChat").toggle();*/
        },
        
        matchChat: function(x){
            
            this.chat = this.games.slice();
            
            var chatRoom = x.getAttribute("data-value");
            
            var chatToShow = this.chat.filter(function(chat){
                return (chat.match == chatRoom);
            });
            
            this.chat = chatToShow;
            
            $(".matchScreen, .matchChat").toggle();
        }

    }
})
