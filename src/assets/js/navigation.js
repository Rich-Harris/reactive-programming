// in presentation mode, J and K should move between checkpoints
(function () {

	'use strict';

	var threshold = 50, checkpoints, scrollAnimation;

	updateCheckpoints();

	window.addEventListener( 'keydown', function ( event ) {
		var key, checkpoint, i, bcr, top, current, index, targetIndex, targetCheckpoint, visibleCheckpoints;

		console.log( event );

		visibleCheckpoints = Array.prototype.slice.call( checkpoints ).filter( function ( checkpoint ) {
			var bcr = checkpoint.getBoundingClientRect();
			return bcr.top || bcr.width;
		});

		key = event.which;

		if ( document.activeElement !== document.body ) {
			return;
		}

		console.log( visibleCheckpoints );

		i = visibleCheckpoints.length;
		while ( i-- ) {
			checkpoint = visibleCheckpoints[i];
			bcr = checkpoint.getBoundingClientRect();

			if ( bcr.top < threshold ) {

				index = i;
				current = checkpoint;
				break;
			}
		}

		if ( !current ) {
			index = -1;
			current = visibleCheckpoints[0];
		}

		if ( key === 74 ) {
			if ( index >= visibleCheckpoints.length - 1 ) {
				return;
			}

			targetCheckpoint = visibleCheckpoints[ index + 1 ];
		}

		else if ( key === 75 ) {
			if ( index <= 0 ) {
				return;
			}

			targetCheckpoint = visibleCheckpoints[ index - 1 ];
		}

		new ScrollAnimation( getOffsetTop( targetCheckpoint ) );
	});

	function getOffsetTop ( el ) {
		var top = 0;

		do {
			top += el.offsetTop || 0;
		} while ( el = el.offsetParent );

		return top;
	}

	var ScrollAnimation = function ( targetScrollTop ) {
		var self = this, duration = 600, startTime, startScrollTop, loop, d;

		if ( scrollAnimation ) {
			scrollAnimation.stop();
		}

		startTime = Date.now();
		startScrollTop = document.body.scrollTop;

		d = targetScrollTop - startScrollTop;

		loop = function () {
			var timeNow, elapsed, t;

			if ( !self.looping ) {
				return;
			}

			timeNow = Date.now();
			elapsed = timeNow - startTime;

			if ( elapsed > duration ) {
				document.body.scrollTop = targetScrollTop;
				return;
			}

			t = easeOut( elapsed / duration );

			document.body.scrollTop = startScrollTop + ( d * t );
			requestAnimationFrame( loop );
		};

		scrollAnimation = this;

		self.looping = true;
		loop();
	};

	ScrollAnimation.prototype = {
		stop: function () {
			this.looping = false;
		}
	};

	function scrollTo ( targetScrollTop ) {
		document.documentElement.scrollTop = targetScrollTop;

		var startTime, duration, loop;

		loop = function () {
			if ( !looping ) {
				return;
			}
		};
	}

	function easeOut ( pos ) {
		return ( Math.pow( ( pos - 1 ), 3 ) + 1 );
	}

	function updateCheckpoints () {
		checkpoints = document.querySelectorAll( 'article' );
	}


}());
