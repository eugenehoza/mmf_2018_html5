var getRandomNum = function () {
var arr = [];

nextPrime:
      for (var i = 2; i <= 10000; i++) {
    
        for (var j = 2; j < i; j++) {
          if (i % j == 0) continue nextPrime;
        }
		if (i-1>0){
    arr[i] = i;
	}
}
while (typeof randomItem == "undefined") {
var randomItem = arr[Math.floor(Math.random()*arr.length)]
	}
alert(randomItem);
setTimeout(getRandomNum, 2000);
}
getRandomNum();