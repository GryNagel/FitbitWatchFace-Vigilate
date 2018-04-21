import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { HeartRateSensor } from "heart-rate";
import { today, goals } from "user-activity";
import { charger, battery } from "power";

// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
const timeText = document.getElementById("time");
const steps = document.getElementById("steps");
const hBpm = document.getElementById("hBpm");
const day = document.getElementById("day");
const date = document.getElementById("date");
const batteryText = document.getElementById("battery");

let time = new Date();

var hrm = new HeartRateSensor();

let monthNames = [
"Jan", "Feb", "Mar",
"Apr", "May", "June", "July",
"Augt", "Sept", "Oct",
"Nov", "Dec"
];
 
let weekdays = [
"Sun", "Mon", "Tue",
"Wed", "Thu", "Fri", "Sat"
];

let weekdate = time.getDate();
let weekindex = time.getDay();
let monthIndex = time.getMonth();

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  updateSteps();
  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
    hours = util.zeroPad(hours);
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  
  timeText.text = `${hours}:${mins}`;
  
  updateDate();
  batteryStatus();
}

//Battery
function batteryStatus(){
  const batteryStatus = Math.floor(battery.chargeLevel) + "%";
  batteryText.text = batteryStatus;
}

//Get steps
function updateSteps() {
  steps.text = (today.adjusted.steps);
}

//HRM
hrm.onreading = function(){
  hBpm.text = hrm.heartRate;
}

hrm.start();

//Date
function updateDate(){
  day.text = `${weekdays[weekindex]}`;
  date.text= `${weekdate} ${monthNames[monthIndex]}`;
}
