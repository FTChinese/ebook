/*
 * SwipeBook 1.0
 *
 * Brad Birdsall, Prime
 * Oliver Zhang, customization to fit huge amount of content
 * Copyright 2011, Licensed GPL & MIT
 *
 */


// Gesture details
var _eventHistory = [];
var _sliding = 0;
var _scrollerOn = 0;
var _clicktoTurnPage = "on";
var _scrolling = 0;

window.Swipe = function(element, options) {
    // return immediately if element doesn't exist
    if (!element) {
        return null;
    }
    var _this = this;


    // retreive options
    this.options = options || {};
    this.index = this.options.startSlide || 0;
    this.speed = this.options.speed || 400;
    this.callback = this.options.callback || function() {};
    this.delay = this.options.auto || 0;
    this.type = this.options.type || 0;


    // reference dom elements
    this.container = element;
    this.element = this.container.children[0]; // the slide pane


    // static css
    this.container.style.overflow = 'hidden';
    this.element.style.listStyle = 'none';

    // trigger slider initialization
    this.setup();

    // begin auto slideshow
    this.begin();

    // add event listeners

    if (this.element.addEventListener) {
        this.element.addEventListener('touchstart', this, false);
        this.element.addEventListener('touchmove', this, false);
        this.element.addEventListener('touchend', this, false);
        this.element.addEventListener('webkitTransitionEnd', this, false);
        this.element.addEventListener('msTransitionEnd', this, false);
        this.element.addEventListener('oTransitionEnd', this, false);
        this.element.addEventListener('transitionend', this, false);
        window.addEventListener('resize', this, false);
    }
};

Swipe.prototype = {

    setup: function() {

        // get and measure amt of slides
        this.slides = this.element.children;
        this.length = this.slides.length;



        // return immediately if their are less than two slides
        if (this.length < 2) {
            return null;
        }

        // determine width of each slide
        this.width = this.container.getBoundingClientRect().width;

        // return immediately if measurement fails
        if (!this.width) {
            return null;
        }

        // hide slider element but keep positioning during setup
        this.container.style.visibility = 'hidden';

        // set start position and force translate to remove initial flickering
        this.slide(this.index, 0);

        // show slider element
        this.container.style.visibility = 'visible';
    },

    slide: function(index, duration, turnpage) {
        //if a sliding is already happening, return
        if (_sliding === 1) {
            return;
        }

        // fallback to default speed
        if (duration === undefined) {
            duration = this.speed;
        }

        var style, el, thepos, animationDelay, firstmove, lastmove, firstmovedirection;
        var n = this.length;
        if (typeof turnpage !== 'undefined' && (turnpage === 1 || turnpage === -1)) {
            firstmove = index - turnpage;
            lastmove = index + turnpage;
            firstmovedirection = turnpage;
        } else if (this.deltaX && this.deltaX >= 0) {
            firstmove = index - 1;
            lastmove = index + 1;
            firstmovedirection = 1;
        } else {
            firstmove = index + 1;
            lastmove = index - 1;
            firstmovedirection = -1;
        }

        $("#testMessage").html(this.width);

        if (firstmove >= 0 && firstmove < n) {
            el = this.slides[firstmove];
            style = el.style;
            style.display = "block";
            style.webkitTransitionDuration = style.MozTransitionDuration = style.msTransitionDuration = style.OTransitionDuration = style.transitionDuration = duration + 'ms';
            thepos = -firstmovedirection * this.width + "px";
            style.MozTransform = style.webkitTransform = 'translate3d(' + thepos + ',0,0)';
            style.msTransform = style.OTransform = 'translateX(' + thepos + ')';
        }

        el = this.slides[index];
        style = el.style;
        style.display = "block";
        style.webkitTransitionDuration = style.MozTransitionDuration = style.msTransitionDuration = style.OTransitionDuration = style.transitionDuration = duration + 'ms';
        style.MozTransform = style.webkitTransform = 'translate3d(0,0,0)';
        style.msTransform = style.OTransform = 'translateX(0)';

        var jq = "";
        if (this.type === "course") {
            jq = "#gamecontent .slide";
        } else if (this.type === "coursemenu") {
            jq = "#bookmenu .bigbuttons";
        }

        if (lastmove >= 0 && lastmove < n) {
            thepos = firstmovedirection * this.width + "px";
            setTimeout(function() {
                $(jq).eq(lastmove).css({
                    '-webkit-transform': 'translate3d(' + thepos + ',0,0)',
                    '-moz-transform': 'translate3d(' + thepos + ',0,0)',
                    '-ms-Transform': 'translateX(' + thepos + ')',
                    '-o-Transform': 'translateX(' + thepos + ')'
                }).show();
            }, 0);
        }

        setTimeout(function() {
            if (index >= 2) {
                $(jq).slice(0, index - 1).hide();
            }
            if (index + 2 < n) {
                $(jq).slice(index + 2, n).hide();
            }
            $("#gamecontent .slide.current").show();
        }, 10);

        // set new index to allow for expression arguments
        this.index = parseInt(index);

        // if the swipe doesn't prompt a page change
        // then it shouldn't prompt changepage and playslide
        if (typeof(turnpage) !== "undefined" && turnpage === 0) {
            _sliding = 0;
        } else if (this.type === "course") {
            _sliding = 1;
            setTimeout(function() {
                playslide(index);
                changepage(index);
                _sliding = 0;
            }, duration);
        } else if (this.type === "coursemenu") {
            _sliding = 1;
            setTimeout(function() {
                organizepage($("#courseSlider .bigbuttons"), index);
                _sliding = 0;
            }, duration);
        } else {
            _sliding = 0;
        }
    },

    getPos: function() {
        // return current index position
        return this.index;
    },

    goprev: function(delay) {
        // cancel next scheduled automatic transition, if any
        this.delay = delay || 0;
        clearTimeout(this.interval);

        // if not at first slide
        if (this.index) {
            this.slide(parseInt(this.index) - 1, this.speed, -1);
        }
    },

    gonext: function(delay) {
        // cancel next scheduled automatic transition, if any
        this.delay = delay || 0;
        clearTimeout(this.interval);
        // if not last slide
        if (this.index < this.length - 1) {
            this.slide(parseInt(this.index) + 1, this.speed, 1);
        }
    },

    begin: function() {
        var _this = this;
        this.interval = (this.delay) ? setTimeout(function() {
            _this.next(_this.delay);
        }, this.delay) : 0;
    },

    stop: function() {
        this.delay = 0;
        clearTimeout(this.interval);
    },

    resume: function() {
        this.delay = this.options.auto || 0;
        this.begin();
    },

    handleEvent: function(e) {
        switch (e.type) {
            case 'touchstart':
                this.onTouchStart(e);
                break;
            case 'touchmove':
                this.onTouchMove(e);
                break;
            case 'touchend':
                this.onTouchEnd(e);
                break;
            case 'webkitTransitionEnd':
            case 'msTransitionEnd':
            case 'oTransitionEnd':
            case 'transitionend':
                this.transitionEnd(e);
                break;
            case 'resize':
                this.setup();
                break;
        }
    },

    transitionEnd: function(e) {
        if (this.delay) {
            this.begin();
        }
        this.callback(e, this.index, this.slides[this.index]);
    },

    onTouchStart: function(e) {
        if (/\b(notouchstart|notouchall)\b/.test(e.target.className)) {
            return;
        }

        this.start = {
            // get touch coordinates for delta calculations in onTouchMove
            pageX: e.touches[0].pageX,
            pageY: e.touches[0].pageY,
            // set initial timestamp of touch sequence
            time: Number(new Date())
        };

        // used for testing first onTouchMove event
        this.isScrolling = undefined;

        // reset deltaX
        this.deltaX = 0;

        _eventHistory.length = 0;
        _eventHistory.push({
            x: e.touches[0].pageX,
            y: e.touches[0].pageY,
            t: Number(new Date())
        });

        // set transition time to 0 for 1-to-1 touch movement
        var el;
        var n = this.slides.length;
        while (n--) {
            el = this.slides[n];
            el.style.MozTransitionDuration = el.style.webkitTransitionDuration = 0;
        }
        if (typeof wheelObject === "object") {
            wheelObject.style.webkitTransitionDuration = wheelObject.style.MozTransitionDuration = wheelObject.style.msTransitionDuration = wheelObject.style.OTransitionDuration = wheelObject.style.transitionDuration = 0;
        }
    },

    onTouchMove: function(e) {
        e.preventDefault();
        if (_sliding === 1 || _scrolling === 1) {
            return;
        }

        if (/\b(notouchmove|notouchall)\b/.test(e.target.className)) {
            return;
        }

        //record this movement
        _eventHistory.push({
            x: e.touches[0].pageX,
            y: e.touches[0].pageY,
            t: Number(new Date())
        });
        window.fingermoving = 1;

        // ensure swiping with one touch and not pinching
        if (e.touches.length > 1 || e.scale && e.scale !== 1) {
            return;
        }

        this.deltaX = e.touches[0].pageX - this.start.pageX;
        

        // determine if scrolling test has run - one time test
        if (typeof this.isScrolling === 'undefined') {
            this.isScrolling = !!(this.isScrolling || Math.abs(this.deltaX) < Math.abs(e.touches[0].pageY - this.start.pageY));
        }

        // if user is not trying to scroll vertically
        if (!this.isScrolling) {
            //if the user is panning, tell FTScroller not to scroll


            // prevent native scrolling 
            e.preventDefault();

            // cancel slideshow
            clearTimeout(this.interval);

            // increase resistance if first or last slide
            this.deltaX =
                this.deltaX /
                ((!this.index && this.deltaX > 0 || this.index === this.length - 1 && this.deltaX < 0) ? (Math.abs(this.deltaX) / this.width + 1) : 1);

            this.slides[this.index].style.MozTransform = this.slides[this.index].style.webkitTransform = 'translate3d(' + this.deltaX + 'px,0,0)';
            if (this.index - 1 >= 0 && this.deltaX > 0) {
                this.slides[this.index - 1].style.MozTransform = this.slides[this.index - 1].style.webkitTransform = 'translate3d(' + (this.deltaX - this.width) + 'px,0,0)';
            }
            if (this.index + 1 < this.length && this.deltaX < 0) {
                this.slides[this.index + 1].style.MozTransform = this.slides[this.index + 1].style.webkitTransform = 'translate3d(' + (this.deltaX + this.width) + 'px,0,0)';
            }

            if (typeof wheelObject === "object") {
                var wheelDeg = (90 * this.deltaX) / (this.width);
                wheelDeg = parseInt(wheelDeg, 10);
                //wheelObject.style.webKitTransform = 'rotate('+ wheelDeg +'deg)';
                wheelObject.style.webkitTransform = wheelObject.style.MozTransform = 'rotate(' + wheelDeg + 'deg)';
            }

        } else if (gFTScrollerActive === false && e.touches[0].pageY - this.start.pageY < -100 && _scrollerOn === 0 && !/\b(noscroll)\b/.test(e.target.className)) {
            openRail();
        } else if (gFTScrollerActive === false && e.touches[0].pageY - this.start.pageY > 100) {
            closeRail();
        }

        //console.log (typeof gFTScrollerActive);


    },

    onTouchEnd: function(e) {
        //record this movement
        //_eventHistory.push({ x: e.pageX, y: e.pageY, t: Number( new Date() ) });
        //alert (e.target.className);
        //window.gFTScrollerActive = false;
        if (/\b(notouchend|notouchall)\b/.test(e.target.className)) {
            return;
        }
        window.fingermoving = 0;
        if (_sliding === 1 || _scrolling === 1) {
            return;
        }



        // determine if slide attempt triggers next/prev slide
        var isValidSlide = Number(new Date()) - this.start.time < 250 && Math.abs(this.deltaX) > 20 || Math.abs(this.deltaX) > this.width / 4;
        var isPastBounds = !this.index && this.deltaX > 0 || this.index === this.length - 1 && this.deltaX < 0;
        // if not scrolling vertically
        if (!this.isScrolling) {

            //fling effect from FTScroller by Rowan Beentje <rowan.beentje@ft.com>
            var _kMinimumSpeed = 0.01;
            var _maxFlingDuration = 1000;
            var _CubicBezierFactor = 1.2; //As a decelerate CubicBezier is added, the scroll can use more time. >5 <=7.5
            var movementSpeed;
            var flingDuration;
            var lastPosition;
            var comparisonPosition;
            var i;

            // Get the last movement speed, in pixels per millisecond.  To do this, look at the events
            // in the last 100ms and average out the speed, using a minimum number of two points.
            lastPosition = _eventHistory[_eventHistory.length - 1];
            comparisonPosition = _eventHistory[_eventHistory.length - 2];
            for (i = _eventHistory.length - 3; i >= 0; i = i - 1) {
                if (lastPosition.t - _eventHistory[i].t > 100) {
                    break;
                }
                comparisonPosition = _eventHistory[i];
            }
            if (lastPosition && comparisonPosition && lastPosition.t !== comparisonPosition.t) {
                movementSpeed = (lastPosition.x - comparisonPosition.x) / (lastPosition.t - comparisonPosition.t);
            } else { //if the user click at the edge of the page, he/she means to turn page;if the user click the center of the page, he/she means to call up the options
                if (!/\b(notouch|large)\b/.test(e.target.className) && _clicktoTurnPage === "on") {
                    var touchX = lastPosition.x / this.width;
                    if (touchX <= 0.2) {
                        this.goprev();
                    } else if (touchX >= 0.8) {
                        this.gonext();
                    } else {
                        try {
                            switchRail();
                        } catch (err) {}
                    }
                    return;
                } else {
                    e.stopPropagation();
                }
            }
            if (Math.abs(movementSpeed) < _kMinimumSpeed) {
                flingDuration = _maxFlingDuration;
            } else {
                // Determine the new fling duration
                flingDuration = Math.min(_maxFlingDuration, _CubicBezierFactor * Math.abs((this.width - Math.abs(this.deltaX)) / movementSpeed));
            }



            // call slide function with slide end value based on isValidSlide and isPastBounds tests
            this.slide(this.index + (isValidSlide && !isPastBounds ? (this.deltaX < 0 ? 1 : -1) : 0), flingDuration, (isValidSlide && !isPastBounds ? (this.deltaX < 0 ? 1 : -1) : 0));
            if (typeof wheelObject === "object") {
                var wheelDeg = 0;
                if (isValidSlide && !isPastBounds) {
                    wheelDeg = (this.deltaX < 0) ? -90 : 90;
                }
                wheelObject.style.webkitTransitionDuration = wheelObject.style.MozTransitionDuration = wheelObject.style.msTransitionDuration = wheelObject.style.OTransitionDuration = wheelObject.style.transitionDuration = flingDuration + 'ms';
                wheelObject.style.webkitTransform = wheelObject.style.MozTransform = 'rotate(' + wheelDeg + 'deg)';
            }

        }

    }

};
