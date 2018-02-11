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
				cities: ["Portland"],
				//currentTime: moment.tz("America/St_Johns").format("h:mma")
				currentTime: "",
				diffTime: moment()
					.tz("America/Vancouver")
					.format("LT")
			},
			{
				name: "Mountain",
				location: "America/Phoenix",
				cities: ["Utah", "Denver", "Phoenix", "Jackson"],
				currentTime: "",
				diffTime: moment()
					.tz("America/Phoenix")
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
				cities: ["St. John's"],
				currentTime: "",
				diffTime: moment()
					.tz("America/St_Johns")
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
			}
		]
	},
	methods: {
		getDiffTime(selectedZone) {
			// Map over all zones

			this.timezones.map(zone => {
				const converted = moment
					// time, selected timezone
					// this.selectedTime
					//moment( `${current}`, 'hh:mm A').tz('America/Toronto').format('h:mma')
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
		populateHours() {
			const start = moment("2018-01-01 08:00");
			const finish = moment("2018-01-01 23:30");

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
