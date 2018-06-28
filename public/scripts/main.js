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

            /*$(".iframe").colorbox({
                iframe: true,
                innerWidth: "80%",
                innerHeight: "75%",
                fixed: true
            });*/

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
        matchChat: function (x) {

            this.chat = this.games.slice();

            var chatRoom = x.getAttribute("data-value");

            var chatToShow = this.chat.filter(function (chat) {
                return (chat.match == chatRoom);
            });

            this.chat = chatToShow;

            console.log(this.chat);

            $(".matchScreen, .matchChat").toggle();
        },
        check: function () {
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    // User is signed in.
                    $(".advice").hide();
                    $(".chatBox").show();

                } else {
                    $(".advice").show();
                    $(".accordionLogin").hide();
                    $(".accordionRegister").hide();
                    $(".chatBox").hide();
                    // No user is signed in.
                }
            });
        },
        accordionLogin: function () {
            
            if($(".accordionRegister").css("display") == "none"){
                 $(".accordionLogin").toggle();
            } else {
                $(".accordionLogin, .accordionRegister").toggle();
            };

        },
        toggleButton: function(div1, div2){
            
            var class1 = "." + div1;
            var class2 = "." + div2;
            
            $(class1 + "," + class2).toggle();
            
        },
        buttonChat: function () {

            if (this.chat.length < 1) {
                $(".index, .teams").toggle();

                alert("Choose your team, go into the match and chat with the others. Afterwards you can join your last chat immediately. (If you reload the page, you have to make this steps again!)")
            } else {
                $(".index, .matchChat").toggle();
            }

        }


    }
})
