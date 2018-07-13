/*--Davids' logic :-)*/

function Countdown2(numSecs) {
    this.numSecs = numSecs;
    var self = this;
    this.start = function() {
        (function counterPrint() {
            setTimeout(function() {
                console.log(self.numSecs);
                if (--self.numSecs) {
                    counterPrint(self.numSecs);
                }
            }, 1000);
        })();
    };
}
var counter = new Countdown2(10);
counter.start();
