import Vue from "vue";
var moment = require("moment-timezone");
Vue.use(require("vue-moment"));

// var current = '10:00 AM';
// moment( `${current}`, 'hh:mm A').tz('America/Toronto').format('h:mma')

//const currently = moment.tz("America/St_Johns").format();

new Vue({
    el: "#app",
    data: {
        selectedTime: moment().format("lll"), //set a default
        times: [],
        timezones: [
            {
                name: "Pacific",
                location: "America/Vancouver",
                cities: ["Vancouver", "Portland", "San Francisco"],
                currentTime: "",
                diffTime: moment()
                    .tz("America/Vancouver")
                    .format("LT")
            },
            {
                name: "Mountain",
                location: "America/Edmonton",
                cities: ["Calgary"],
                currentTime: "",
                diffTime: moment()
                    .tz("America/Edmonton")
                    .format("LT")
            },
            {
                name: "Central",
                location: "America/Chicago",
                cities: ["KC", "Louisiana", "North Dakota", "Texas"],
                currentTime: "",
                diffTime: moment()
                    .tz("America/Chicago")
                    .format("LT")
            },
            {
                name: "Eastern",
                location: "America/New_York",
                cities: ["NYC", "Boston", "Miami", "Florida"],
                currentTime: "",
                diffTime: moment()
                    .tz("America/New_York")
                    .format("LT")
            },
            {
                name: "Newfoundland",
                location: "America/St_Johns",
                cities: ["Terry's House"],
                currentTime: "",
                diffTime: moment()
                    .tz("America/St_Johns")
                    .format("LT")
            },
            {
                name: "United Kingdom",
                location: "Europe/London",
                cities: ["London", "Edinburgh"],
                currentTime: "",
                diffTime: moment()
                    .tz("Europe/London")
                    .format("LT")
            },
            {
                name: "Portugal",
                location: "Europe/London",
                cities: ["Lisbon "],
                currentTime: "",
                diffTime: moment()
                    .tz("Europe/Lisbon")
                    .format("LT")
            },
            {
                name: "Germany",
                location: "Europe/Berlin",
                cities: ["Berlin"],
                currentTime: "",
                diffTime: moment()
                    .tz("Europe/Berlin")
                    .format("LT")
            },
            {
                name: "Cape Town",
                location: "Africa/Johannesburg",
                cities: [],
                currentTime: "",
                diffTime: moment()
                    .tz("Africa/Johannesburg")
                    .format("LT")
            },
            {
                name: "India",
                location: "Asia/Calcutta",
                cities: [],
                currentTime: "",
                diffTime: moment()
                    .tz("Asia/Calcutta")
                    .format("LT")
            },
            {
                name: "Singapore",
                location: "Asia/Singapore",
                cities: [],
                currentTime: "",
                diffTime: moment()
                    .tz("Asia/Singapore")
                    .format("LT")
            },
            {
                name: "Australian Eastern",
                location: "Australia/Melbourne",
                cities: ["Melbourne"],
                currentTime: "",
                diffTime: moment()
                    .tz("Australia/Lord_Howe")
                    .format("LT")
            }
        ]
    },
    methods: {
        getDiffTime(selectedZone) {
            // Compare the time selected in the dropdown
            // (local to the zone it was in) with all other
            // timezones and update their diffTime
            this.timezones.map(zone => {
                const converted = moment
                    .tz(
                        `${this.selectedTime}`,
                        "hh:mm A",
                        selectedZone.location
                    )
                    .tz(zone.location)
                    .format("h:mma");
                return (zone.diffTime = converted);
            });
        },
        // Populate the <select> dropdowns with hours and half-hours
        populateHours() {
            const start = moment("2018-01-01 06:00");
            const finish = moment("2018-01-01 24:00");

            for (
                var m = moment(start);
                m.isBefore(finish);
                m.add(30, "minutes")
            ) {
                this.times.push(m.format("h:mm a"));
            }
        }
    },
    mounted() {
        // Populate this.times
        this.populateHours();

        // Add current time to each zone
        const zones = this.timezones.map(zone => {
            const currently = moment.tz(zone.location).format("h:mma");
            return (zone.currentTime = currently);
        });
    }
});
