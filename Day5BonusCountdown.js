/*Bonus Exercise
Write a constructor called Countdown that accepts a single argument
- the number of seconds to count down. It should be possible to call
the start method of instances of Countdown to initiate the countdown.
Once the countdown starts, it should count down to zero starting with
 the number that was passed to the constructor and logging each number
 to the console with a one second delay.*/
//-----------------------------------------------------------------------
function Countdown(numSecs) {
    this.numSecs = numSecs;
    var self = this;
    this.start = function() {
        numSecs++;
        var intervalid;
        intervalid = setInterval(function() {
            if (self.numSecs > 0) {
                console.log(self.numSecs);
                self.numSecs--;
            } else {
                clearInterval(intervalid);
            }
        }, 1000);
    };
}

var counter = new Countdown(10);
counter.start();
