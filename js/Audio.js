/* 
------------------
The MIT License (MIT)
Copyright (c) 2016 RAYMOND R-MCNAUGHT

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE R OTHER DEALINGS IN THE SOFTWARE.
------------------
*/


var audioPlayer = {
		timeInc: 8.7,
		init: function(){
			//LOADER
			$loader = $('#loader');

			//Audio
			$audio1 = $('#audioOne');

			//Buttons
			$bttn1 = $('#bttn1');
			$bttn2 = $('#bttn2');
			$bttn3 = $('#bttn3');
			$bttn4 = $('#bttn4');
			$bttnPlayPause = $('#bttnPlayPause');
			
			//Images
			$imgHold = $('#imageHold');
			$imgOne = $('.imgOne');
			$imgTwo = $('.imgTwo');
			$imgThree = $('.imgThree');
			$imgFour = $('.imgFour');
			

			loopOneTime = 8.700;
			loopTwoTime = 17.400;
			loopThreeTime = 26.100;
			loopFourTime = 34.7; //originally 34.8, but had to shorten time so that audio doesn't end before looping

			//Arrays
			audioArr = [$audio1];
			loopArr = [true, false, false, false];
			imgArr = [$imgOne, $imgTwo, $imgThree, $imgFour];
			bttnArr = [$bttn1,$bttn2,$bttn3,$bttn4];

			$(document).ready(function(){

				audioPlayer.preload(audioArr);//load audio
				//$bttn1.css('opacity', '.5');//video playing  button opacity
				
				$bttn1.click(audioPlayer.btnClicked);
				$bttn2.click(audioPlayer.btnClicked);
				$bttn3.click(audioPlayer.btnClicked);
				$bttn4.click(audioPlayer.btnClicked);
				
				$bttnPlayPause.click(function(){
					audioPlayer.playPause();
				});
				

			});//window load end
		},
		//PRELOAD AUDIO
		preload: function(array){
			var loadedSounds = 0;
			for (var i=0; i<array.length; i++) {
					loadedSounds++;
					//console.log("SOUNDS LOADED "+ loadedSounds);
					if(loadedSounds == array.length){
						$loader.remove();//remove loader
						audioPlayer.loopAUDIO();//loop audio
					}
			}
			//console.log("PRELOADER FIRED "+ loadedSounds);
		},
		//PLAY ALL
		playStart: function(){
				$audio1[0].play();
				$audio1.controls = true;
				$bttnPlayPause.css('background-position', '-35px 0px');
		},
		//PLAY-PAUSE FUNCTION
		playPause: function(){
			for(var i = 0; i<$audio1.length;i++){
				if($audio1[0].paused){
					$audio1[0].play();
					$bttnPlayPause.css('background-position', '-35px 0px');
				}else{
					$audio1[0].pause();
					$bttnPlayPause.css('background-position', 0);
				}
			}
	
			
		},
		//LOOP AUDIO 1
		loopAUDIO: function(){
				$audio1.on("timeupdate", function(event){
					if(loopArr[0] == true && $audio1[0].currentTime >= loopOneTime){
						$audio1[0].currentTime = 0;
						//console.log("Loop1 "+loopArr[0]);
					}
					else if(loopArr[1] == true && $audio1[0].currentTime >= loopTwoTime){
						$audio1[0].currentTime = loopOneTime;
						//console.log("Loop2 "+loopArr[1]);
					}
					else if(loopArr[2] == true && $audio1[0].currentTime >= loopThreeTime){
						$audio1[0].currentTime = loopTwoTime;
						//console.log("Loop3 "+loopArr[2]);
					}
					else if(loopArr[3] == true && $audio1[0].currentTime >= loopFourTime){
						$audio1[0].currentTime = loopThreeTime;
						//console.log("Loop4 "+loopArr[3]);
					}
					//console.log("PLAYING "+ audioArr[0][0].currentTime);
				})
		},
		//TIME DURATION
		getTime: function(){
			for(var i = 0; i<$audio1.length;i++){
				$audio1.on('timeupdate',function(){
					var currentPos = $audio1.currentTime;
					var maxDuration = $audio1.duration;
					var percentage = 100 * currentPos/maxDuration;
				});
			}
		},
		
		btnClicked: function(event){
			audioPlayer.playStart();
			btnVal = $(event.target).html() - 1;//evals text from each clicked element ( -1 because array start at 0). Plulls exact html from div
			
			for (var i=0; i<loopArr.length; i++) {//turns everything off
				loopArr[i] = false;
				bttnArr[i].css('opacity', '0.5');
				imgArr[i].css('opacity', '0');
			}
			loopArr[btnVal] = true;//turns on targeted button/image/loop
			bttnArr[btnVal].css('opacity', '1');
			imgArr[btnVal].css('opacity', '1');
			var delta = audioPlayer.fmod($audio1[0].currentTime, audioPlayer.timeInc);//returns time from start of clip/sound
			$audio1[0].currentTime = (audioPlayer.timeInc * btnVal) + delta//gives the differential into newly selcted clip
			//console.log("Button "+(btnVal+1)+" ; Current time "+$audio1[0].currentTime);
		},
		
		fmod: function (a,b) {//fmod the greatest ever
			return Number((a - (Math.floor(a / b) * b)).toPrecision(8));//toPrecision specifies how many decimals
		}
	
}
audioPlayer.init();/* Run Aniation */

