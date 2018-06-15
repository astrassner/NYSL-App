var app = new Vue({
    el: ".match",
    data: {
        json: "scripts/data.json",
        teams: [],
        locations: [],
        games: [],
        allGames: [],
        hide: true

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

            /*window.location.href = "detailedTeams.html"*/
            
            this.games = this.allGames;
            var teamName = x.getAttribute("data-value");
            
            console.log(teamName);
            
            var gamesToShow = this.games.filter(function(game){
                return game.teams.split(" ").includes(teamName);
            })
            
            this.games = gamesToShow;    
            
            /*$(".buttons").hide();*/
            
            this.hide = false;
            
        }

    }
})