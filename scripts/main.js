var app = new Vue({
    el: ".match",
    data: {
        json: "scripts/data.json",
        teams: [],
        locations: [],

    },
    created: function() {
        this.getData();
    },
    methods: {
        getData: function () {
            $.getJSON(this.json, function (data) {
                app.teams = data.teams;
                app.locations = data.locations;
                console.log(app.locations);
            })
        },


    }
})
