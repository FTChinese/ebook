/*!
  * $script.js Async loader & dependency manager
  * https://github.com/ded/script.js
  * (c) Dustin Diaz, Jacob Thornton 2011
  * License: MIT
  */

/*
(function(a,b,c){typeof c["module"]!="undefined"&&c.module.exports?c.module.exports=b():typeof c["define"]!="undefined"&&c["define"]=="function"&&c.define.amd?define(a,b):c[a]=b()})("$script",function(){function p(a,b){for(var c=0,d=a.length;c<d;++c)if(!b(a[c]))return j;return 1}function q(a,b){p(a,function(a){return!b(a)})}function r(a,b,i){function o(a){return a.call?a():d[a]}function t(){if(!--n){d[m]=1,l&&l();for(var a in f)p(a.split("|"),o)&&!q(f[a],o)&&(f[a]=[])}}a=a[k]?a:[a];var j=b&&b.call,l=j?b:i,m=j?a.join(""):b,n=a.length;return setTimeout(function(){q(a,function(a){if(h[a])return m&&(e[m]=1),h[a]==2&&t();h[a]=1,m&&(e[m]=1),s(!c.test(a)&&g?g+a+".js":a,t)})},0),r}function s(c,d){var e=a.createElement("script"),f=j;e.onload=e.onerror=e[o]=function(){if(e[m]&&!/^c|loade/.test(e[m])||f)return;e.onload=e[o]=null,f=1,h[c]=2,d()},e.async=1,e.src=c,b.insertBefore(e,b.firstChild)}var a=document,b=a.getElementsByTagName("head")[0],c=/^https?:\/\//,d={},e={},f={},g,h={},i="string",j=!1,k="push",l="DOMContentLoaded",m="readyState",n="addEventListener",o="onreadystatechange";return!a[m]&&a[n]&&(a[n](l,function t(){a.removeEventListener(l,t,j),a[m]="complete"},j),a[m]="loading"),r.get=s,r.order=function(a,b,c){(function d(e){e=a.shift(),a.length?r(e,d):r(e,b,c)})()},r.path=function(a){g=a},r.ready=function(a,b,c){a=a[k]?a:[a];var e=[];return!q(a,function(a){d[a]||e[k](a)})&&p(a,function(a){return d[a]})?b():!function(a){f[a]=f[a]||[],f[a][k](b),c&&c(e)}(a.join("|")),r},r},this)

window.__review_panel_script = __review_panel_script = 0;

function noop() {}

var __review_option = {
        "name": "FT商学院", 
        "app_link": "itms-apps://itunes.apple.com/app/ft-shang-xue-yuan/id493892004",
        "comment_link": 'dialog{"url":"http://m.ftchinese.com/forum/mbagym"}'
    };

window.__reviewer = __reviewer = null;
if (navigator.onLine) {
    $script("http://m.ftchinese.com/js/review.js", function() {
        __reviewer = new ftcReview(__review_option);
    });
}

function reviewPanel(e) {
    //e = e || window.event.target || window.event.srcElement;

    if (!navigator.onLine) return;

    // performance was so appalling in iPad 1 that I think it's better to disable it
    if (!event.acceleration) return;

    if (!("ftcReview" in window)) {
        $script("http://m.ftchinese.com/js/review.js");
        return;
    }

    else {
        if (__reviewer === null) {
            __reviewer = new ftcReview(__review_option);
            return;
        }
        else __reviewer.show();       
    }
}
*/

//alert ('yes');


var gFTScrollerActive = false;
var gChartId = '';
//全局变量,所有slide的数量，现在播放的slide号码，当前slide下的action数量，当前action号码
var testcount=0;
var uniqueL;
var uniqueK;
var uniqueA;
var uniqueB;
var allslides,allaction;
var pagemoving = 0;
var fingermoving = 0;
var ce = "";
var cs = 0;
var ca = 0;
var cer = "";
var csr = 0;
var car = 0;
var currentMenu = 0;
var testindex = 0;
var remember = 1; //remember这个参数用来区分课程和每日更新，课程需要记住上次的位置，而每日更新不需要
var gameback = "intro";
//var topic_object_id = "";
var username;
var thisday = new Date();
var themi = thisday.getHours()*10000 + thisday.getMinutes()*100 + thisday.getSeconds();
var thed = thisday.getFullYear()*10000 + thisday.getMonth()*100 + thisday.getDate();
var prevpage;
var scroller,contentScroller,sectionScroller,foodScroller;
var currentArticle, allArticle, currentPage=0, currentPageCount=0, articleCount, startSlide;
var currentTitle=document.title;
var contentScrollTop=0;
var screenType="small";//600像素以上的，定义为big
var fontPreference="medium";
var bgMode="";
var mpuAmount=0;
//var currentMPU=0;
var userinfo=navigator.userAgent||navigator.vendor||window.opera;
var isipad;
var deviceType = 'other';
var isRetinaDevice = (window.devicePixelRatio > 1);
var islocal = 1;
var tap = "click";
var tapstart = "click";
var slider;
var courseSlider;
var coverheight;
var FTChartStyle;
var highchartsOptions;
var Highcharts;
var rtime = new Date(1, 1, 2000, 120000);
var timeout = false;
var delta = 200;
var gWebRootForVideo = '';


function setChart() {
    var titleSize=25;
    var enableLegend=true;
    if ($(window).width()<=600) {
        titleSize=17;
        //enableLegend=false;
    }
    FTChartStyle = {
        colors: ['#9e2f50', '#4781aa', '#eda45e', '#a6a471', '#736e7e', '#94826b', '#936971', '#c36256', '#8ab5cd'],
        chart: {
            backgroundColor: '#fff1e0',
            borderWidth: 0,
            plotBackgroundColor: '#fff1e0',
            plotShadow: false,
            plotBorderWidth: 0,
            spacingRight: 20
        },
        title: {
            align : 'center',
            style: { 
                color: '#333',
                padding: '0 14px 0 14px',
                font: 'bold '+titleSize+'px arial,"Hiragino Sans GB","Heiti SC",STHeiti,"Microsoft Yahei",SimSun'
                //lineHeight:'162%'
            }
        },
        subtitle: {
            align: 'center',
            y: titleSize * 2,
            style: { 
                color: '#333333',
                font: '12px arial,"Hiragino Sans GB","Heiti SC",STHeiti'
            }
        },


        xAxis: {
            lineColor: '#333',
            lineWidth: 2,
            tickColor: '#333',
            tickWidth: 1,
            tickPosition: 'outside',
            allowDecimals: false,
            showFirstLabel: true,
            labels: {
                style: {
                    color: '#333',
                    font: '12px arial,"Hiragino Sans GB","Heiti SC",STHeiti'
                }
            }
        },

        yAxis: {
            gridLineColor: '#999',
            labels: {
                style: {
                    color: '#333',
                    font: '12px arial,"Hiragino Sans GB","Heiti SC",STHeiti'
                }
            }
        },

        //设定两个Ｙ轴的格式，可以避免在双Ｙ轴的情况下程序出错

        /*
        yAxis: [{
            gridLineColor: '#999',
            labels: {
                style: {
                    color: '#333',
                    font: '12px arial,"Hiragino Sans GB","Heiti SC",STHeiti'
                }
            }
        }
        
        {
            gridLineColor: '#999',
            labels: {
                style: {
                    color: '#333',
                    font: '12px arial,"Hiragino Sans GB","Heiti SC",STHeiti'
                }
            }
        }],
        {
            gridLineColor: '#999',
            labels: {
                style: {
                    color: '#333',
                    font: '12px arial,"Hiragino Sans GB","Heiti SC",STHeiti'
                }
            }
        }],*/
        plotOptions: {
            column: {
                borderWidth: 1,
                borderColor: '#000',
                shadow: false
            },	
            bar: {
                borderWidth: 1,
                borderColor: '#000',
                shadow: false
            },
            line: {
                shadow: false
            },
            pie: {
                lineWidth:1,
                slicedOffset:15,
                shadow:false,
                showInLegend:true,
                center: ["50%", "45%"],
                size: "85%",
                series: {
                    showCheckbox: true
                },
                dataLabels: {
                    enabled: false,
                    color: '#333',		
                    softConnector: false,					
                    connectorColor: '#333',
                    style: {
                        font: '12px arial,"Hiragino Sans GB","Heiti SC",STHeiti',
                    },	
                }
            }
        },
        legend: {
            layout: 'vertical',
            backgroundColor: '#FFFFFF',
            align: 'right',
            verticalAlign: 'top',
            floating: true,
            enabled: enableLegend,
            shadow: false,
            borderRadius: 0,
            itemStyle: {	
                font: '12px arial,"Hiragino Sans GB","Heiti SC",STHeiti',
                color: '#333'
            },
            itemHiddenStyle: {
                color: 'gray'
            },

            itemHoverStyle: {
                color: '#4781aa'
            }
        },
        labels: {
            style: {
                color: '#333'
            }
        },
        credits: {
            position: {
                align: 'right',
                x: -14,
                verticalAlign: 'bottom',
                y: -3
            }
        },
        tooltip: {
            style: {
                color: '#333',
                font: '12px arial,"Hiragino Sans GB","Heiti SC",STHeiti'
            },
            borderRadius: 0,
            shadow:false
        }
    };
    highchartsOptions = Highcharts.setOptions(FTChartStyle);
}
function addNote(noteContent, notePosition) {
  var $ani=$("#gamecontent .slide").eq(cs).find(".animation").eq(0);
  var noteClass = '';
  var chartMargin = '';
  gChartId="container"+currentArticle;

  //console.log ('container:' + container1);
  //清空现有的图片
  $ani.empty();

  //插入图表和说明的Dom
  if (typeof notePosition !== 'undefined' && notePosition !== '') {
    noteClass = ' ' + notePosition;
  }
  $ani.css("position","relative");
  $ani.append('<div class="note01' + noteClass + '"></div>');

  //第一个需要修改的地方：底部显示的说明文章，不要写得太长
  $ani.find(".note01").html(noteContent);
  var chartHeight = $(window).height();
  var noteHeight = $ani.find(".note01").outerHeight();
  if (noteHeight !== null && noteHeight > 0) {
    chartHeight = chartHeight - noteHeight - 60;
  } else if (chartHeight > 60) {
    chartHeight = chartHeight - 60;
  }

  if (noteClass === ' top') {
    noteHeight = noteHeight + 24;
    chartMargin = 'margin-top: ' + noteHeight + 'px;';
  }

  $ani.append('<div class=container id="' + gChartId + '" style="height:' + chartHeight + 'px;' + chartMargin + '"></div>');
  setChart();
}

function isTouchDevice() {
  return !!('ontouchstart' in window) || !!('onmsgesturechange' in window); 
}

function getCookie(name){
    var start = document.cookie.indexOf(name+" = ");
    var len = start+name.length+1;
    if (!start && (name !== document.cookie.substring(0,name.length))) {
    	return null;	
    } 
    if (start  ===  -1) {
    	return null;
    }
    var end = document.cookie.indexOf(";",len);
    if (end  ===  -1) {
    	end = document.cookie.length;
    }
    return decodeURIComponent(document.cookie.substring(len,end));
}

function setCookie(name, value , sec , path , domain) {
    var argv = setCookie.arguments;
    var argc = setCookie.arguments.length;

    var expires = new Date();
        if(!sec) {
        	sec = 600 * (24 * 60 * 60 * 1000);
        } else {
        	sec = 1000*sec;
        }
    expires.setTime (expires.getTime() + sec);

    path = (argc > 3) ? argv[3] : null;
    domain = (argc > 4) ? argv[4] : null;
    var secure = (argc > 5) ? argv[5] : false;
    document.cookie = name + " = " + escape(value) +
        ((expires  ===  null) ? "" : ("; expires = " + expires.toGMTString())) +
        ((path  ===  null) ? "/" : ("; path = " + path)) +
        ((domain  ===  null) ? "" : ("; domain = " + domain)) +
        ((secure  ===  true) ? "; secure" : "");
}

function deleteCookie(name) {
    var exp = new Date();
    exp.setTime (exp.getTime() - 1);
    var cval = getCookie (name);
    document.cookie = name + " = " + cval + "; expires = " + exp.toGMTString();
}



function savevalue(thekey,thevalue) {
    try {
        thekey = thekey.toString();
        if (typeof(thevalue) === "undefined" || thevalue === null) {
            thevalue=0;
        }
        thevalue = thevalue.toString();
        //首先清理非法字符
        thekey = thekey ? thekey.replace(/\//g,"-").replace(/\?\:\;\,/g,"") : thekey;
        thevalue =  thevalue ? thevalue.replace(/\//g,"-").replace(/\?\:\;\,/g,"") : thevalue;

        if (localStorage){
            localStorage.removeItem(thekey);localStorage.setItem(thekey,thevalue);
        } else {
            //setCookie(thekey,thevalue,"","/");
        }
    } catch (ignore) {
    
    }
}


function getvalue(thekey){
    try {
        var kl;
        if (localStorage){
        	kl = localStorage.getItem(thekey);
        } else {
        	kl = getCookie(thekey);
        }
        return kl;
    } catch (ignore) {
        return "";
    }
}

function getpvalue(theurl, thep) {
    var k,thev;
    if (theurl.toLowerCase().indexOf(thep + "=")>1) {
        k = theurl.toLowerCase().indexOf(thep) + thep.length + 1;
        thev = theurl.toLowerCase().substring(k,theurl.length);
        thev = thev.replace(/\&.*/g,"");
    } else {
        thev = "";
    }
    return thev;
}

function checkScreenType() {
if ($(window).width()>=600) {
    screenType="big";
} else {
    screenType="small";
}
}


function clickcoursemenu() {
    $(".coursemenu .bigbuttons div,.bookmenu .bigbuttons div").unbind().bind("click",function() {
        if ($(this).attr("book")){
            $(this).addClass("tilt");
            remember = 0;
            window.location.href = $(this).attr("book")+".html?"+themi;
        }
    });
}

function calculateWH() {
    checkScreenType();
    var w=$(window).width();
    var h=$(window).height();
	var headerHeight=$("#allcontent .contentpage .header").eq(0).height();
	headerHeight=parseInt(headerHeight);
	var thecontentHeight=h-headerHeight;
   	$("#allcontent .theContent").css("height",thecontentHeight+"px");
    if (w>1024) {
        $("#allcontent ul.navigation").css("width","1024px");
    } else {
    	$("#allcontent ul.navigation").css("width",w+"px");
    }
    $(".layout-5 .page").css({"width":w+"px","height":h+"px"});
    w=parseInt(w*0.85);
    $("body,#coverintro").css("height",h+"px");
    $("#gamecontent,#swipe").css("height",h+"px");
    h=h-20;
    if (screenType !== "small") {
    	h=h-30;
    }
    $(".articleviewport").css("height",h+"px");
    coverheight=h;
    if (h>120) {
    	h=parseInt((h-120)*0.9);
    }
    $(".layout-5 img.coverImage").css({"max-width":w+"px","max-height":h+"px"});
}


function cloneArticles(articlenumber) {
    $("#gamecontent").empty();
    var allpages = $("#allcontent .slide").length;
    if (articlenumber>0) {
        var $prevSlide=$("#allcontent .slide").eq(articlenumber-1);
        $prevSlide.clone().appendTo($("#gamecontent"));
    }
    var $currentSlide=$("#allcontent .slide").eq(articlenumber);
    $currentSlide.clone().appendTo($("#gamecontent"));
    if (articlenumber<allpages-1) {
        var $nextSlide=$("#allcontent .slide").eq(articlenumber+1);
        $nextSlide.clone().appendTo($("#gamecontent"));
    }
}

function openRail() {
	$("#contentRail").addClass("on");
    //底部滑轨滚动到相应的文章
    $("#imageRailInner .rail").removeClass("current");
    var currentRail=$("#imageRailInner .rail[n1target='"+currentArticle+"']");
    if (currentRail.length>0) {
        currentRail.addClass("current");
        var currentRailLeft= currentRail.offset().left;
        var currentRailWidth=currentRail.outerWidth();
        var startRailLeft=$("#imageRailInner .rail").eq(0).offset().left;
        var currentRailScroll=currentRailLeft-startRailLeft-$(window).width()/2+currentRailWidth/2;
        if (currentRailScroll<0) {
            currentRailScroll=0;
        }
        if (typeof(scroller) !== "undefined") {
            scroller.scrollTo(currentRailScroll,0);
        }
    }
}

function closeRail() {
	$("#contentRail").removeClass("on");
}

function switchRail() {
	if ($("#contentRail").hasClass("on") === true && _scrollerOn === 0) {
		closeRail();
	} else {
		openRail();
	}
}

//利用FT的ColumnFlow插件将长文章分到不同的Slide中，注意里面引用图片的话，要申明图片的min-height，否则排版会出错。
function paginate($theObject) {

    //First, Paginate article pages using FTColumn Flow
    var articleNumber = $theObject.length;
    var windowWidth = $(window).width();
    var windowHeight = coverheight;
    var pagePadding = windowWidth * 60 / 1024;
    $theObject.each(function (slidenumber) {
        var $currentSlide = $(this).parent();
        slidenumber=$currentSlide.attr("articlenumber");
        slidenumber=parseInt(slidenumber);
        $currentSlide.show();
        var $articleviewport = $currentSlide.find(".articleviewport").eq(0);
        var $articletarget = $currentSlide.find(".articletarget").eq(0);
        var $flowedContent = $currentSlide.find(".flowedContent").eq(0);
        var $fixedContent = $currentSlide.find(".fixedContent").eq(0);
        $articleviewport.attr("id","articleviewport"+slidenumber);
        $articletarget.attr("id","articletarget"+slidenumber);
        $flowedContent.attr("id","flowedContent"+slidenumber);
        $fixedContent.attr("id","fixedContent"+slidenumber);

        if ($currentSlide.find(".article").length>0 && $articleviewport.length>0 && $articletarget.length>0) {
            var headline = $currentSlide.find('.headline').html() || '';
            var leadinfo = $currentSlide.find('.lead').html() || '';
            var headcut = $currentSlide.find('img.headshot').attr('src') || $currentSlide.find('figure.headshot').attr('data-url') || '';
            var headcutPosition = '';
            var datestamp = $currentSlide.find('.datestamp').eq(0).html() || '';
            var inlineVideo = $currentSlide.find('.fixedContent .inlinevideo').eq(0).prop('outerHTML') || '';
            var inlineVideoClass = '';
            if (datestamp !== null && datestamp !== "") {
                datestamp='<p class=datestamp>'+datestamp+'</p>';
            } else {
                datestamp='';
            }
            var imageMaxHeight=parseInt(coverheight - 25 * 1.8);
            var fixedContent = "";
            var large="";
            var figCaption="";
            if ($currentSlide.find("img.headshot.large").length>0){
                large=" class=large";
                figCaption='<figcaption><span class="icon zoombg"></span>点击看大图</figcaption>';
            }
            var mpuPage=" attach-page-3";
            var columnGapWidth = 21;
            if (300 + columnGapWidth*2 > windowWidth && windowWidth > 300) {
                columnGapWidth = parseInt ((windowWidth - 300)/2, 10);
                pagePadding = columnGapWidth;
            }
            var cf = new FTColumnflow("articletarget"+slidenumber, "articleviewport"+slidenumber, {
                    columnWidth:            300,
                    viewportWidth:          windowWidth,
                    viewportHeight:         coverheight,
                    columnGap:              columnGapWidth,
                    standardiseLineHeight:  true, //useful when you have subTitle or varied fonts
                    pagePadding:            pagePadding,
                    minFixedPadding:        0.5
            });
            var videoHeight = cf.layoutDimensions.columnWidth * 9 / 16 + 30;
            var inlineImgHeight = cf.layoutDimensions.columnWidth * 3 / 4;
            //handle images in flowed content
            var flowedBlocks = $flowedContent.find('.midPic img, .leftPic img, .rightPic img');
            if (flowedBlocks.length > 0) {
                flowedBlocks.each(function(){
                    //assume .rightPic wraps img immediately
                    var flowedImgWidth = $(this).attr('data-width') || 0;
                    var flowedImgHeight = $(this).attr('data-height') || 0;
                    // var flowedImgSrc = $(this).attr('src') || '';
                    flowedImgWidth = parseInt(flowedImgWidth, 10);
                    flowedImgHeight = parseInt(flowedImgHeight, 10);
                    if (flowedImgWidth > 0 && flowedImgHeight > 0) {
                        if (cf.layoutDimensions.columnWidth > flowedImgHeight) {
                            flowedImgHeight = flowedImgHeight;
                        } else {
                            flowedImgHeight = cf.layoutDimensions.columnWidth * flowedImgHeight / flowedImgWidth;
                        }
                        flowedImgHeight = flowedImgHeight + 28;
                        //alert (flowedImgHeight);
                    } else {
                        flowedImgHeight = inlineImgHeight;
                    }
                    $(this).parent().css({
                        'width': cf.layoutDimensions.columnWidth, 
                        'height': flowedImgHeight
                    });
                });
            }
            var flowedVideoContainer = $flowedContent.find('.inlinevideo');
            if (flowedVideoContainer.length > 0) {
                flowedVideoContainer.css({
                    'width': cf.layoutDimensions.columnWidth, 
                    'height': videoHeight
                });
            }
            //针对屏幕大小、有无自定义固定内容、页面内广告配置等处理fiexedContent内容  var mpuAmount=0;var currentMPU=0;
            if ($currentSlide.find(".articleinfo").length>0) {
                if (screenType === "small") {
                    var headlinePage="";
                    if (headcut !== "") {
                        headcutPosition = 'anchor-top-col-1';
                        fixedContent = '<div class="' + headcutPosition + ' headcut" style="display:table;height:' + coverheight + 'px;"><div style="display:table-cell;vertical-align:middle;text-align:center;"><img src="' + headcut + '" style="max-width:100%;max-height:' + imageMaxHeight + 'px" /><div style="text-align:center;font-weight:bold;">' + headline + '</div></div></div>'; 
                        headlinePage=" attach-page-2";
                        if (inlineVideo !== '') {
                            inlineVideoClass = 'attach-page-3';
                            mpuPage = ' attach-page-4';
                        } else {
                            mpuPage = ' attach-page-3';
                        }
                    } else {
                        if (inlineVideo !== '') {
                            inlineVideoClass = 'attach-page-1';
                            mpuPage = ' attach-page-3';
                        } else {
                            mpuPage = ' attach-page-3';
                        }
                    }
                    fixedContent += '<div class="anchor-top-col-1' + headlinePage + '"><div class=headline style="text-align:center;font-size:25px;font-weight:bold">' + headline + '</div><div class=lead>' + leadinfo + '</div>'+datestamp+'</div>';
                    $currentSlide.find(".headcut").css({"height":coverheight+"px"});	
                } else {
                    fixedContent = '<div class="col-span-2"><div class=headline style="text-align:center;">' + headline + '</div><div class=lead>' + leadinfo + '</div>'+datestamp+'</div>';
                    if (headcut !== "") {
                        imageMaxHeight=parseInt(coverheight - 200);
                        var imageHeight=431;
                        if ($("#game").hasClass("landscapeImage") === true) {
                            imageHeight=200;
                        }
                        if ($currentSlide.hasClass('list') === true) {
                            headcutPosition = 'anchor-bottom-col-8 animated fadeIn';
                        } else {
                            headcutPosition = 'anchor-bottom-col-2';
                        }
                        fixedContent += '<div class="' + headcutPosition + '" style="display:table;"><figure style="display:table-cell;text-align:center;height:'+imageHeight+'px;width:300px;vertical-align:bottom;"><img'+large+' src="' + headcut + '" style="max-width:100%;max-height:'+imageMaxHeight+'px;" />'+figCaption+'</figure></div>';
                        if (inlineVideo !== '') {
                            inlineVideoClass = 'attach-page-3';
                            mpuPage = ' attach-page-3';
                        } else {
                            mpuPage = ' attach-page-2';
                        }
                    } else {
                        if (inlineVideo !== '') {
                            inlineVideoClass = 'attach-page-1';
                            mpuPage = ' attach-page-2';
                        } else {
                            mpuPage="";
                        }
                    }
                }
                if (inlineVideo !== '') {
                    inlineVideoClass += ' inline-video-container anchor-bottom-col-2';
                    fixedContent += '<div class="' + inlineVideoClass + '" style="width: '+ cf.layoutDimensions.columnWidth +'px; height: ' + videoHeight + 'px;">' + inlineVideo + '</div>';
                }
                
                //如果没有自定义的fixedContent，才投放MPU广告
                if ($currentSlide.find(".myFixedContent").length>0) {
                    fixedContent += $currentSlide.find(".myFixedContent").eq(0).html();
                } else{
                    var mpuHeight=250;
                    fixedContent +='<div class="anchor-bottom-col-10'+mpuPage+'" style="display:table;width:300px;height:'+mpuHeight+'px;"><div style="display:table-cell;text-align:center;height:100%;width:100%;vertical-align:bottom;"><div class="MPU"></div></div></div>';
                }
            } else {
                    fixedContent = $currentSlide.find(".fixedContent").html();
            }

            $currentSlide.find(".flowedContent .datestamp,.flowedContent .byline").remove();
            //flow the content to create the view
            cf.flow(document.getElementById("flowedContent"+slidenumber), fixedContent);
            $currentSlide.hide();
            $currentSlide.find(".cf-preload,.cf-preload-fixed,.fixedContent,.flowedContent").remove();
            $currentSlide.find(".articletarget").css("width","100%");
            $currentSlide.find(".cf-page").css("left",0);
            $currentSlide.find(".cf-page").each(function(cp){
                if (cp>0) {
                    var c = $currentSlide.attr("class");
                    var s = $currentSlide.attr("n1");
                    $currentSlide.clone().attr("allpages",cf.pageCount).attr("thispage",cp).attr("headline",headline).insertAfter($("#gamecontent .slide[n1 = "+s+"]:last"));
                    $("#gamecontent .slide[n1 = "+s+"]:last").find(".cf-render-area").empty().append($(this));
                }
            });
            $currentSlide.find(".cf-page").slice(1,cf.pageCount).remove();
            $currentSlide.attr("allpages",cf.pageCount).attr("thispage",0);
            //var ls = $currentSlide.attr("n1");
            //$("#fullpageads .slide").eq(0).clone().insertAfter($("#gamecontent .slide[n1 = "+ls+"]:last"));
        }
    });
}

function jumptoarticle(articlenumber,startPage) {
    articlenumber=parseInt(articlenumber);
    closeRail();
    $("#bookname,#startstatus").empty();
    $("#screenstart .instartscreen").removeClass("instartscreen");
    $("#loadstatus").empty();
    var $currentarticle=$("#allcontent .slide").eq(articlenumber);
    if ($currentarticle.find("img.headshot,img.coverImage").length>0) {
        $currentarticle.find("img.headshot,img.coverImage").eq(0).clone().appendTo("#bookname");
        var imageMaxHeight=parseInt((coverheight - 60)*0.9);
        var imageMaxWidth=parseInt($(window).width()*0.85);
        $("#bookname img").css({"max-height":imageMaxHeight+"px","max-width":imageMaxWidth+"px"});
    }
    if ($currentarticle.find(".headline").length>0) {
        $("#startstatus").append($currentarticle.find(".headline").eq(0).html());
    } else if ($currentarticle.attr("topic") !== ""){
        $("#startstatus").append($currentarticle.attr("topic"));
    }
    $("#startbar").animate({width:"5%"},100,function(){
        $("#screenstart").show();
        cloneArticles(articlenumber);
        $("#startbar").animate({width:"33%"},100,function(){
            paginate($("#gamecontent .slide .article"));
            $("#startbar").animate({width:"66%"},1000,function(){
                slider.length=$("#gamecontent .slide").length;
				slider.width=$(window).width();//necessary for web app. Without it, on IOS 6 iPad, when you launch from landscape and rotate to portrait, slider.width won't change, resulting large gaps between pages. 
                var listItem = $("#gamecontent .slide[articlenumber='"+articlenumber+"']").eq(0);
				var p=0;
				var k=$("#gamecontent .slide").index(listItem);
				if (currentPage !== null && currentPageCount !== null && typeof(startPage) === "undefined") {
					currentPage=parseInt(currentPage);
					currentPageCount=parseInt(currentPageCount);
					if (currentPageCount>1 && currentPage>0 && currentPage<currentPageCount) {
						var $currentArticle=$("#gamecontent .slide[articlenumber='"+ articlenumber +"']");
						var newpage=parseInt(parseInt(listItem.attr("allpages"))*(currentPage)/currentPageCount);
						if ($("#gamecontent .slide[articlenumber='"+articlenumber+"']").length>=newpage+1) {
							p=newpage;
						}
					}
				}
                slider.slide(k+p);
                $("#startbar").animate({width:"100%"},500,function(){
                    currentArticle=articlenumber;
                    savevalue(ce+"_article",currentArticle);
                    $("#screenstart").hide();
                });
            });
        });
    });

}

function reflowarticle(){
    calculateWH();
    jumptoarticle(currentArticle);
}



function articlepage() {
    slider = new Swipe(document.getElementById('swipe'),{
        type: "course",
        startSlide:startSlide
    });
    if (isTouchDevice() === false) {//if you are on a none-touch device, add click functions
        /*
        $("#swipe").click(function(e){
            
            if (/\b(notouch|notouchall|notouchmove|notouchstart|notouchend)\b/.test(e.target.className)) {//如果是点击Navigation横滚动条一类的object，则不翻页，也不调出底部滑轨
                return;
            }
            var touchX = e.pageX/slider.width;
            if (touchX<=0.2) {
                slider.goprev();
            } else if (touchX>=0.8) {
                slider.gonext();
            } else {
				try{
					//switchRail();
				}catch(err){
				}
			}
            
        });
        */
        $("#swipe .arrow-prev div, #swipe .arrow-next div").click(function(e){
            if ($(this).parent().hasClass('arrow-prev') === true) {
                slider.goprev();
            } else {
                slider.gonext();
            }
        });
    }
}

function bullet($theobject) {
    $theobject.parent().find("li").removeClass("on");
    $theobject.addClass("on");
}

function onechoiceSelect($theobject) {
    $theobject.addClass("selected");
    var rightorwrong = "";
    $theobject.find(".optionButton").remove();
    if ($theobject.attr("type") === "r"){
        $theobject.css("background","transparent");
        $theobject.append("<div class = ro></div>");
        rightorwrong = "回答正确。";
    } else if ($theobject.attr("type") === "w") {
        $theobject.css("background","transparent");
        $theobject.append("<div class = wo></div>");
        $theobject.parent().find('p[type = "r"]').addClass("correctAnswer");
        rightorwrong = "回答错误。";
    } else {
        $theobject.css({"background-image":"url(img/point.png)"});
    }
    var thisexplain = rightorwrong;
    if ($theobject.attr("explain")) {thisexplain = "<p style = 'font-weight:bold;'>"+thisexplain+$theobject.attr("explain")+"</p>";}
    var jumpid = "";
    if ($theobject.parent().attr("jumpid")&&$theobject.parent().attr("jumpid") !== "") {
        jumpid = $theobject.parent().attr("jumpid");
        var hl = $("#gamecontent .slide[storyid = "+jumpid+"] .headline").eq(0).html();
        if (hl === null){
        	hl = '';
        }
        if (hl !== ""){
        	hl = "："+hl;
        }
        jumpid = "<br><br><b><a onclick = 'jumptostory(\""+jumpid+"\")'>参考文章"+hl+"</a></b>";
    }

    if (jumpid !== ""||($theobject.attr("explain")&&$theobject.attr("explain") !== "")||($theobject.parent().attr("explain")&&$theobject.parent().attr("explain") !== "")) {
        $theobject.parent().parent().parent().append("<div class = 'explain movein'><div class='explaincontentContainer'><div class = explaincontent><div class='nutmeg-content -bg-checkered notouchall'><div class='nutmeg-content_left'>答案解释</div><div class='nutmeg-content_right'><button onclick='hideExplain($(this))' class='notouch'>关闭</button></div></div><div class=explaincontentInner>"+thisexplain+$theobject.parent().attr("explain")+jumpid+"</div></div></div></div>");
        $theobject.parent().parent().parent().parent().find(".quiztip").remove();
    }
}

function showtap($theobject) {
    if ($theobject.find(".tapcontent").length>0){return;}
    $("#gamecontent .slide").find(".tapcontent,.taparrow").remove();
    var k = $theobject.attr("tap");
    var w = $theobject.css("width");
    w = w.replace("px","");
    w = parseInt(w/2);
    w = w-10;
    var h = $theobject.css("height");
    h = h.replace("px","");
    h = parseInt(h);
    var l = $theobject.css("left");
    l = l.replace("px","");
    l = parseInt(l);
    var t = $theobject.css("top");
    t = t.replace("px","");
    t = parseInt(t);
    w = w+l;
    h = h+t;
    var w1 = w;w1 = w1-150+10;
    var h1 = h+30;
    var rh = '';

    //调整位置，以保证Bubble出现在屏幕内。

    if (h<350){
        if (w1<0) {
        	w1 = 0;
        }  else if (w1>642){
        	w1 = 642;
        }
        $theobject.parent().append("<div class = 'taparrow movein' style = 'left:"+w+"px;top:"+h+"px;'></div><div class = 'tapcontent movein' style = 'left:"+w1+"px;top:"+h1+"px;'><div class = close><div class = closeinner>×</div></div><div class = 'explaincontent'>"+k+"</div></div>");
        rh = $theobject.parent().find('.explaincontent').eq(0).outerHeight();
        $theobject.parent().find('.tapcontent').eq(0).css({"height":rh+"px"});
    } else {
        w1 = w1-50;
        if (w1<0) {
        	w1 = 0;
        } else if (w1>542) {
        	w1 = 542;
        }
        h = t-20;
        h1 = h-20;
        $theobject.parent().append("<div class = 'taparrow inverse movein' style = 'left:"+w+"px;top:"+h+"px;'></div><div class = 'tapcontent movein' style = 'width:400px;height:100px;background:#E3D3BC;-webkit-border-radius:5px;-moz-border-radius:5px;left:"+w1+"px;top:"+h1+"px;'><div class = close><div class = closeinner>×</div></div><div class = 'explaincontent'>"+k+"</div></div>");
        rh = $theobject.parent().find('.explaincontent').eq(0).outerHeight();
        h1 = h-rh;
        $theobject.parent().find('.tapcontent').eq(0).css({"top":h1+"px","height":rh+"px"});
    }

    //如果用户点击了框，就可以把说明去掉
    $theobject.parent().find(".tapreminder").remove();

    $theobject.parent().find(".close").bind("click",function(){
    	$(this).parent().parent().parent().find(".taparrow,.tapcontent").animate({opacity:0}, 2000,function(){
    		$(this).remove();
    	});
    });
}

function showtapfixed($theobject) {
    $("#gamecontent .slide").find(".tapcontent2").animate({opacity:0}, 2000,function(){
    	$(this).remove();
    });
    var k = $theobject.attr("tapfixed");
    var w = $theobject.css("width");w = w.replace("px","");w = parseInt(w);
    var h = $theobject.css("height");h = h.replace("px","");h = parseInt(h/2);
    var l = $theobject.css("left");l = l.replace("px","");l = parseInt(l);l = l+w;
    var t = $theobject.css("top");t = t.replace("px","");t = parseInt(t);t = t+h;
    w = 590-l;
    $theobject.parent().append("<div class = 'tapcontent2 movein on tap'>"+k+"</div>");

    //如果Class有rect或者pic，则不加箭头，突出显示，否则用箭头指向说明
    if ($theobject.hasClass("circle") === true) {
        $theobject.parent().find(".circle").removeClass("orange");
        $theobject.addClass("orange");
    } else if ($theobject.hasClass("rect") === true) {
        $theobject.parent().find(".rect").css("opacity",0.5);
        $theobject.css("opacity",1);
    } else {
        //$theobject.parent().append("<div class = 'arrow on tap orange' style = 'width:"+w+"px;left:"+l+"px;top:"+t+"px'></div>");
    }
}

function addhand($theobject,$tap) {
    if ($tap.hasClass("done") === false){
        $tap.addClass("on").addClass("done");
        var l = $tap.css("left");l = l.replace("px");l = parseInt(l);
        var t = $tap.css("top");t = t.replace("px");t = parseInt(t);
        var w = $tap.css("width");w = w.replace("px");w = parseInt(w);
        var h = $tap.css("height");h = h.replace("px");h = parseInt(h);
        l = l+w*0.8;t = t+h*0.8;
        l = parseInt(l);t = parseInt(t);
        $theobject.append("<div class = 'hand on'></div>");
        $theobject.find(".hand").css("left",l+"px").css("top",t+"px");
    }
}

function showChain($theobject,thename) {
    $theobject.find(".hand").remove();
    if($theobject.find("[name = "+thename+"]:not(.on)").length) {
        $theobject.find("[name = "+thename+"]:not(.on)").eq(0).addClass("on");
        setTimeout(function(){
        	showChain($theobject,thename);
        },400);
    } else {
        var nextname = $theobject.find(".tappable[name = "+thename+"][next]").attr("next");
        if ($theobject.find(".tappable[name = "+nextname+"]").length>0) {
            var $tap = $theobject.find(".tappable[name = "+nextname+"]");		
            addhand($theobject,$tap);
        }
    }
}





function onechoiceClick($theobject) {
    if ($theobject.parent().hasClass("done") === false ) {
        if (fingermoving === 1) {return;}
        onechoiceSelect($theobject);
        if ($theobject.attr("type") === "r"){
            $("#allcontent .slide").eq(currentArticle).find(".option").attr("score",$theobject.attr("value"));
        }
        setTimeout(function(){
            $theobject.parent().addClass("done");
            var k=$theobject.parent().find("p").index($theobject);
            $("#allcontent .slide").eq(currentArticle).find(".option").addClass("done").attr("done",k);
            $(".optionalert").remove();
            $theobject.parent().parent().parent().find(".notouchall").removeClass("notouchall");
        },10);
    }
}



function hideExplain($theobject) {
    $theobject.parent().parent().parent().parent().parent().hide();
    $theobject.parent().parent().parent().parent().parent().after('<div class="showexplain"><div class="notouchall" onclick="showExplain($(this))">查看解释</div></div>');
}

function showExplain($theobject) {
    $theobject.parent().parent().find(".explain").show();
    $theobject.parent().remove();
}


//FT精选集的效果
function bookeffect() {
    allslides = $("#gamecontent .slide").length;

    //Bullet Point
    $("#gamecontent .slide .bullet ul li:first-child").each(function(){bullet($(this));});
    $("#gamecontent .slide .bullet li").unbind().bind(tapstart,function(){bullet($(this));});
    $("#gamecontent .slide .bullet ul").each(function(){
        if ($(this).find("li").length >= 7) {$(this).find("li div").css("height","448px");$(this).find("li").css("margin","15px 0 31px 0");} else if ($(this).find("li").length >= 6) {$(this).find("li div").css("height","430px");} else if ($(this).find("li").length >= 5) {$(this).find("li div").css("height","346px");}
    });


    //对比图
    $('#gamecontent .slide .JLController > .JLbutton').each(function(){
        $(this).click(function(){
            var el = $(this).attr('trigger');
            $(this).siblings().css({background: '#777'});
            $(this).css({background: el});
            $('.JLsideA, .JLsideB').find('div').hide();
            $('.JLsideA, .JLsideB').find('.'+ el).toggle();
        });
    });
    $('.JLsideA, .JLsideB').find('div:first').show();
    //$('.JLController').find('.JLbutton:first').css({background: $('.JLController').find('.JLbutton:first').attr('trigger')});


    //Tappable Content
    $("#gamecontent .slide [tap]").bind("click",function(){showtap($(this));});
    $("#gamecontent .slide [tap]").css("-webkit-box-shadow","0 0 10px #666");
    $("#gamecontent .slide [tapfixed]").bind("click",function(){showtapfixed($(this));});

    //给图片页加上手势功能
    $("#gamecontent .fullpage .threecolumn").each(function(){
        if ($(this).find(".addhand").eq(0).length>0) {
            addhand($(this),$(this).find(".addhand").eq(0));
            $(this).find(".addhand").bind("click",function(){
                $(this).parent().parent().find(".hand").remove();
            });
        }
    });




    articlepage();
    
}

function resizeend() {
    if (new Date() - rtime < delta) {
        setTimeout(resizeend, delta);
    } else {
        timeout = false;
        reflowarticle();
    }
}

function startFromArticle(articlenumber, pageNumber, pageCount) {
    articlenumber=parseInt(articlenumber);
    currentArticle=articlenumber;
    savevalue(ce+"_article",articlenumber);
    cloneArticles(articlenumber);
    
    $("#loadstatus").html("加载内容");
    calculateWH();
    $("#startbar").animate({width:"15%"},300,function(){
        $("#game").addClass("on");
        //获取高度和宽度，然后对格式进行修正，以适应各种浏览器，在reSize和rotate的时候，需要重新计算        
        $("#loadstatus").html("内容分页处理...");
        $("#startbar").animate({width:"50%"},300,function(){
            paginate($("#gamecontent .slide .article"));
            $("#startbar").animate({width:"90%"},300,function(){
                $("#loadstatus").html("正在加载效果...");
                var k;
				var p=0;
                if (articlenumber>0) {
                    var listItem = $("#gamecontent .slide[articlenumber='"+ articlenumber +"']").eq(0);
                    listItem.show();
                    k=$("#gamecontent .slide").index(listItem);
                    k=parseInt(k);
                    if (k<0) {
                        k=0;
                    }
                } else {
                    k=0;
                }
				if (pageNumber && pageCount && pageNumber !== null && pageCount !== null) {
					pageNumber=parseInt(pageNumber);
					pageCount=parseInt(pageCount);
					if (pageCount>1 && pageNumber>0 && pageNumber<pageCount) {
						var $currentArticle=$("#gamecontent .slide[articlenumber='"+ articlenumber +"']");
						var newpage=parseInt(parseInt($currentArticle.eq(0).attr("allpages"))*(pageNumber)/pageCount);
						if ($currentArticle.length>=newpage+1) {
							p=newpage;
						}
					}
				} 
                startSlide=k+p;
                bookeffect();
                $("#startbar").animate({width:"100%"},300,function(){
                    $("#screenstart").hide().addClass("success");
                    $("#screenstart .backuplinks,#screenstart .backuplinks").remove();

                    //底部滑轨的滑动效果，必须在#screenstart移除之后才能正常开启
                    if (document.getElementById('imageRail')) {
                    scroller = new FTScroller(document.getElementById('imageRail'), {
                        scrollingY: false,
                        snapping: false,
                        scrollbars: false,
						updateOnChanges: true,
						updateOnWindowResize: true
                    });
                    }
                    //如果支持屏幕旋转，则监听旋转，否则监听resize
                    if (window.orientation){
                        $(window).bind('orientationchange', function() {
                            reflowarticle();
                        });
                    } else {
                        $(window).resize(function() {
                            rtime = new Date();
                            if (timeout === false) {
                                timeout = true;
                                setTimeout(resizeend, delta);
                            }
                        });
                    }
                });
            });
        });
    });
}



function multimenu(theid) {
    var $ani = $("#"+theid);
    var pagenumber = $("#"+theid).find(".bigbuttons").length;
    if (pagenumber>1) {
        $ani.parent().before('<div class = "tap menutopic"></div>');
        $ani.parent().after("<div class = menudot></div>");
        var $bigbuttons = $ani.find(".bigbuttons");
        var lasttopic = "";
        var thistopic;
        for (var i = 0;i<pagenumber;i++) {
            $(".menudot").append("<span>&nbsp;&#149;&nbsp;</span>");
            thistopic = $bigbuttons.eq(i).attr("topic");
            $bigbuttons.eq(i).attr("n",i);
            if (!!thistopic && thistopic !== lasttopic) {
                $(".menutopic").append('&nbsp;&nbsp;<span topic = "'+thistopic+'">'+$bigbuttons.eq(i).attr("topic")+'</span>');
                lasttopic = thistopic;
            }
        }
        $(".menutopic span").unbind().bind("click",function(){
            var thtopic = $(this).attr("topic");
            var ntopic = $ani.find(".bigbuttons[topic = '"+thtopic+"']").eq(0).attr("n");
            ntopic = parseInt(ntopic);
            courseSlider.slide(ntopic);
        });
        currentMenu = getvalue(theid);
        if (currentMenu === null) {
        	currentMenu = 0;
        }
        currentMenu = parseInt(currentMenu);
        $(".menudot span").eq(currentMenu).addClass("white");
        $bigbuttons.css({"position":"absolute"});
        courseSlider = new Swipe(document.getElementById('courseSlider'),{
            type: "coursemenu",
            startSlide: currentMenu,
            callback: function(event, index, elem) {
                savevalue(theid, index);
            }
        });		
    }
}

function startgame() {
    $("#startscreen").remove();
    $(".fullbody").removeClass("on");$("#bookmenu").addClass("on");
    clickcoursemenu();
    multimenu("coursemenu");
}


function trackTraffic(i) {
    var url = 'http://www1.ftchinese.com/log/new_log.php?vpage=' + location.href.replace(/#$/g,'') + '?p=' + i;
    //url = url.replace(/[\/]+/g,'/');
    var urlGa = location.pathname + '?p=' + i;
    //alert (urlGa);
    if (location.href.indexOf("http://")>=0) {
        ga('send', 'pageview',  urlGa);
        if (typeof fa === 'function') {
            fa('send', 'pageview',  urlGa);
        }
        new Image().src = url;
    } else {
        //gaTrack('UA-1608715-1', 'm.ftchinese.com', ce+'/mbagym/article/'+i, encodeURIComponent(document.title)+"/"+i);
        new Image().src = 'http://m.ftchinese.com/track/ga.php?utmac=MO-1608715-1&utmn='+thed+''+themi+'&utmr=-&utmp='+ce+'/mbagym/article/'+i+'&utmdt='+encodeURIComponent(document.title).replace(/[\s\r\n\t]/g,'')+'&guid=ON';
    }
}

function setting() {
	$("#setting").addClass("on");
}

function closeSetting() {
	$("#setting").removeClass("on");
}

function setFontSize() {
	$("#fontsetting").addClass("on");
	$(".fontpreferences div").removeClass("-selected");
	$(".fontpreferences ."+fontPreference).addClass("-selected");
}

function closeFontSize() {
	$("#fontsetting").removeClass("on");
	if (fontPreference !== $('#gamecontent').attr('class')) {
		$('#gamecontent').attr('class',fontPreference);
		savevalue('fontPreference',fontPreference);
		reflowarticle();
	}
}

function switchNightReading() {
    if ($("body").hasClass("night")) {
        $("body").attr("class","pink");
        bgMode="pink";
        $("#"+bgMode).addClass("-selected");
        savevalue("bgMode","pink");
    } else {
        $("body").attr("class","night");
        $(".bgpreferences div").removeClass("-selected");
        savevalue("bgMode","night");
    }
}

function showFullScreen(picID) {
    $("#largepic").addClass("on");
    $("#largepic .cell").empty();
    $("#"+picID).clone().appendTo($("#largepic .cell"));
}

function closeFullScreen() {
    if (isTouchDevice() === true) {
        document.getElementById("largepic").addEventListener('gestureend', function(event) {
            event.preventDefault();
            if (event.scale < 0.7) {
                $("#largepic").removeClass("on");
                closeRail();
            }
        });
    }
    $("#largepic .cherry_button").unbind().bind("click",function(){
        $("#largepic").removeClass("on");
        closeRail();
    });
}

function enableFullScreen(largePic) {
    largePic.removeClass("large");
    largePic.addClass("notouch");
    var picID=largePic.attr("id");
    largePic.unbind().bind("click",function(evt) {
        evt.stopPropagation();
        showFullScreen(picID);
    });
    if (isTouchDevice() === true) {
        document.getElementById(picID).addEventListener('gestureend', function(event) {
            event.stopPropagation();
            event.preventDefault();
            if (event.scale > 1.25) {
                showFullScreen(picID);
            }
        });
    }
}

function openbook() {
    //在文章页后面添加全屏广告位置
    //id=fullpageads startPage=0 everyPage=5
    var adcount=0;
    var fullpageadsLength=$("#fullpageads .slide").length;
    $('#allcontent .slide').each(function(index){
        var startPage=$('#fullpageads').attr('startPage');
        var everyPage=$('#fullpageads').attr('everyPage');
        var fixedBG = $(this).attr('data-fixed-bg') || '';
        var fixedBGPosition = $(this).attr('data-fixed-bg-position') || '';
        startPage=parseInt(startPage, 10);
        everyPage=parseInt(everyPage, 10);
        //必须要在文章后面才能加广告，唯一的例外是第一个广告
        if (($(this).find(".article").length>=0 && index-startPage>=0 && (index-startPage) % everyPage === 0) || index===startPage) {
            if (adcount>=fullpageadsLength) {
                adcount=0;
            }
            $("#fullpageads .slide").eq(adcount).clone().insertAfter($(this));
            //alert (adcount);
            adcount=adcount+1;
        }
        //如果是iOS和安卓等移动设备，则去除背景的Video
        if (deviceType !== 'other') {
            $(this).find('.video-bg').remove();
        }

        //固定背景图片的页面
        if (fixedBG !== '') {
            $(this).css('background', 'transparent');
            $(this).attr('data-fixed-bg-0', fixedBG);
            $(this).prev().attr('data-fixed-bg-0', fixedBG);
            $(this).next().attr('data-fixed-bg-0', fixedBG);
        }

      //设置图片背景，依据屏幕尺寸大小来抓取合适的尺寸
        var thisBG;
        var thisBGPortrait;
        var bgWidth = $(window).width();
        var bgHeight = $(window).height();
        if (isRetinaDevice === true) {
            bgWidth = bgWidth * 2;
            bgHeight = bgHeight * 2;
        }

        thisBG = $(this).attr('data-bg') || '';
        thisBGPortrait = $(this).attr('data-bg-portrait') || '';
        if (bgWidth < bgHeight && thisBGPortrait !== '') {
            thisBG = thisBGPortrait;
        }
        if (thisBG !== '') {
            thisBG = thisBG.replace('i.ftimg.net', 'i.ftmailbox.com');
            thisBG = encodeURIComponent(thisBG);
            thisBG = 'https://image.webservices.ft.com/v1/images/raw/' + thisBG + '?source=ftchinese&width=' + bgWidth + '&height=' + bgHeight + '&fit=cover';
            $(this).css('background-image', 'url(' + thisBG + ')');
        }

        //固定背景图片的对齐方式
        if (fixedBGPosition !== '') {
            $(this).attr('data-fixed-bg-position-0', fixedBGPosition);
            $(this).prev().attr('data-fixed-bg-position-0', fixedBGPosition);
            $(this).next().attr('data-fixed-bg-position-0', fixedBGPosition);
            //alert (fixedBGPosition);
        }
    });
    //获取MPU广告的数量
    mpuAmount=$("#mpuads .mpuad").length;
	
	//发送反馈邮件正文附上用户的相关信息 
	userinfo = "\n\n\n\n"+userinfo;
	$("#feedbackEmail").attr("href","mailto:ftchinese.feedback@gmail.com?subject=Lunch with the FT App Feedback&body="+encodeURIComponent(userinfo));

    var bookid = "mbagym";
    if (location.href.indexOf("interactive/")>0) {
        bookid = location.href.replace(/^.*(interactive\/.*$)/g,"/mbagym/$1");
    } else if (location.href.indexOf("photonews/")>0) {
        bookid = location.href.replace(/^.*(photonews\/.*$)/g,"$1");
    } else if (location.href.indexOf(".html")>0) {
        bookid = location.href.replace(/^.*\/([a-zA-Z0-1\_\-]+)\.html.*$/g,"$1");
    } else if (location.href.indexOf("?")>0) {
        bookid = location.href.replace(/^.*\/([a-zA-Z0-1\_\-]+)\?.*$/g,"$1");
    }
    bookid = encodeURIComponent(bookid);
    ce = bookid;
    var k = getvalue(ce+"_article");
	currentPage=parseInt(getvalue(ce+"_thispage"));
	currentPageCount=parseInt(getvalue(ce+"_allpages"));
	if (currentPageCount === null || currentPageCount<1) {
		currentPageCount=0;
		currentPage=0;
	} else {
		currentPage=parseInt(currentPage);
		currentPageCount=parseInt(currentPageCount);
	}
    var allpages = $("#allcontent .slide").length;
    articleCount=allpages;
    $("#allcontent .slide").each(function(index){
        $(this).attr("articlenumber",index);
    });
    //对格式进行修正
    //目录页的简介设为黑色字
    $("#allcontent .slide[topic = '目录'] .contentintro").css("color","#000");
    //删除文章中的图片、时间戳和作者名
    $("#allcontent .flowedContent .byline").remove();
    // add nowrap class for inline images
    $("#allcontent .flowedContent").find('img, .leftPic, .rightPic, .midPic, .inlinevideo').addClass('nowrap');
    var currenttopic = "";
    var storyid = "";
    var n = 0;
    
	//获取读者的字号偏好
	if (getvalue("fontPreference") && getvalue("fontPreference") !== null && getvalue("fontPreference") !== "") {
		fontPreference=getvalue("fontPreference");
	}
	$("#gamecontent").attr("class",fontPreference);
	$(".fontpreferences div").unbind().bind("click",function(){
		$(".fontpreferences div").removeClass("-selected");
		$(this).addClass("-selected");
		fontPreference=$(this).attr("id");
	});
	$(".fontpreferences div").removeClass("-selected");
	$(".fontpreferences ."+fontPreference).addClass("-selected");
    
    //获取读者对背景色的偏好
    if (getvalue("bgMode") && getvalue("bgMode") !== null && getvalue("bgMode") !== "") {
        bgMode=getvalue("bgMode");
		$("body").attr("class",bgMode);
        if (bgMode === null || bgMode === "") {
            bgMode="pink";
        }
        $("#"+bgMode).addClass("-selected");
	}
    $(".bgpreferences div").unbind().bind("click",function(){
		$(".bgpreferences div").removeClass("-selected");
		$(this).addClass("-selected");
		bgMode=$(this).attr("id");
        $("body").attr("class",bgMode);
        savevalue("bgMode",bgMode);
	});

    //遍历所有页面，加上navigation和翻页的效果
    //如果内容在目录页之前，则不进入目录页．
    //这一块需要分开，先把目录页生成，进行一次排序(n1), 再进行分页，再进行一次排序n，并根据n1找到n，对目录页生成的标题添加链接
    var contentpage = 0;
    //$("#allcontent .contentcategory").append("<div class=headline>目录</div>");
    var imageRailInnerHTML = '';
    $("#allcontent .slide").each(function(i){
        var newheadline;
        $(this).find(".question").prepend("<b>小测试</b>");
        $(this).find(".option p").addClass("notouchall").append("<div class='optionButton notouchall'></div>");
        if ($(this).find(".option p[value][type = 'r']").length>0) {
            var k = $(this).find(".option p[value][type = 'r']").eq(0).attr("value");
            if (k === 0) {
                $(this).find(".quiz").parent().append("<div class = quiztip>本题不计分</div>");
            } else {
                $(this).find(".quiz").parent().append("<div class = quiztip>本题分值："+k+"分</div>");
            }
        }
        if ($(this).find(".articleinfo .datestamp").length === 0) {
            $(this).find(".flowedContent .datestamp").appendTo($(this).find(".articleinfo"));
        }
        if ($(this).find(".articleinfo .headline").html()) {
            newheadline=$(this).find(".articleinfo .headline").html();
            $(this).find(".articleinfo .headline").html(newheadline.replace(/与(.*)共进.*/g,"$1"));
        }
        $(this).find(".flowedContent .datestamp").remove();        
        if ($(this).find(".contentcategory").length>0){contentpage = contentpage+1;}
        $(this).attr("n1",i);
        if ($(this).attr("topic") && $(this).attr("topic") !== "" && $(this).attr("topic") !== currenttopic) {
            currenttopic = $(this).attr("topic");
            if (i>0 && currenttopic !== "目录"&& currenttopic !== "记分卡" && contentpage === 1 && $(this).find(".contentcategory").length === 0) {
                $("#allcontent .contentcategory").append('<p class="category Section'+i+'" n1target='+i+' onclick="jumptoarticle('+i+',0)">'+currenttopic+'</p>');
				if (currenttopic !== "目录") {
					$("#allcontent ul.navigation").append('<li class="notouchall notouch section_'+i+'" onclick="scrollToSection('+i+')">'+currenttopic+'</li>');
				}
            }
            n = n+1;
        }
		
        var headshotImg="";
		//添加底部的滑轨
		var borderColor="";
		if (currenttopic === "艺术" || currenttopic === "时尚") {
			borderColor=" purple";
		} else if (currenttopic === "政治") {
			borderColor=" red";
		} else if (currenttopic === "经济" || currenttopic === "时尚") {
			borderColor=" green";
		} else if (currenttopic === "思想" || currenttopic === "宗教") {
			borderColor=" blue";
		}
		if ($(this).attr('title') && ($(this).css('background-image') !== 'none' || $(this).attr('thumbnail') || $(this).attr('data-fixed-bg'))) {
            var thumbImg = $(this).attr('thumbnail') || $(this).attr('data-fixed-bg') || $(this).css('background-image');
            //console.log ($(this).attr('title') + ': ' + thumbImg);
            headshotImg = thumbImg.replace(/^url\(/, '').replace(/\)$/, '');
            headshotImg = '<img src="' + headshotImg + '" class=rightimage>';
            if (thumbImg.indexOf('url') < 0) {
                thumbImg = 'url(' + thumbImg + ')';
            }
            thumbImg = thumbImg.replace(/"/g, '');
            //alert ($(this).attr('title') + ': ' + thumbImg);

            imageRailInnerHTML += '<div class="rail'+borderColor+'" n1target = '+i+' onclick="jumptoarticle('+i+',0)"><div class="railImage"><div class=railImageTable><div class=railImageCell style="background-image:' + thumbImg + ';"></div></div></div><div class="railText">'+$(this).attr('title') + '</div></div>';
        } else if ($(this).find("img.headshot").length>0) {
			imageRailInnerHTML += '<div class="rail'+borderColor+'" n1target = '+i+' onclick="jumptoarticle('+i+',0)"><div class="railImage"><div class=railImageTable><div class=railImageCell style="background-image:url(' + $(this).find("img.headshot").attr("src") + ');"></div></div></div><div class="railText">'+$(this).find(".headline").eq(0).html()+'</div></div>';
            headshotImg='<img src="'+$(this).find("img.headshot").attr("src")+'" class=rightimage>';
		} else if ($(this).find("video").length>0 && $(this).find("video").attr("poster") && $(this).attr('title')) {
            imageRailInnerHTML += '<div class="rail'+borderColor+'" n1target = '+i+' onclick="jumptoarticle('+i+',0)"><div class="railImage"><div class=railImageTable><div class=railImageCell style="background-image:url(' + $(this).find('video').attr("poster") + ');"></div></div></div><div class="railText">'+$(this).attr('title')+'</div></div>';
            headshotImg='<img src="'+$(this).find("video.headshot").attr("poster")+'" class=rightimage>';
        } else if ($(this).find(".secStart").length>0) {
            imageRailInnerHTML += '<div class="rail'+borderColor+'" n1target = '+i+' onclick="jumptoarticle('+i+',0)"><div class="railImage"><div class=railImageTable><div class=railImageCell style="font-size:25px;background:#333;color:white;font-weight:bold;">'+$(this).find(".secStart").eq(0).html()+'</div></div></div><div class="railText">'+$(this).find(".secStart").eq(0).html()+'</div></div>';                
            //headshotImg='<img src="'+$(this).find("video.headshot").attr("poster")+'" class=rightimage>';
        }
        
        
        

        var lead = "";
        if ($(this).attr('lead') && $(this).attr('lead') !== '') {
            lead = "<div class = contentlead>"+$(this).attr('lead')+"</div>";
        } else if ($(this).find(".excerpt .lead,.article .lead,.page .lead").length>0) {
            lead = "<div class = contentlead>"+$(this).find(".excerpt .lead,.article .lead,.page .lead").eq(0).html()+"</div>";
        }
        if ($(this).attr('title') && $(this).attr('title') !== '' && $(this).attr('title') !== '封面') {
            $("#allcontent .contentcategory").append('<div class=contentheadline n1target = '+i+' onclick="jumptoarticle('+i+',0)">'+headshotImg+'<b>'+$(this).attr('title')+'</b>'+lead+'<div class=clearfloat></div></div>');
            //alert ($(this).attr('title'));
        } else if ($(this).find(".excerpt .headline,.article .headline,.page .headline").length>0 && i>0 && contentpage === 1 && $(this).find(".contentcategory").length === 0) {
            $("#allcontent .contentcategory").append('<div class=contentheadline n1target = '+i+' onclick="jumptoarticle('+i+',0)">'+headshotImg+'<b>'+$(this).find('.headline').html()+'</b>'+lead+'<div class=clearfloat></div></div>');
            //alert ($(this).find('.headline').html());
        }
        //alert (lead);
        


    });

    //alert (imageRailInnerHTML);
    $('#imageRailInner').html(imageRailInnerHTML);


    
    //底部滑轨的右边Margin
    $("#imageRailInner .rail:last").css({"margin-right":"20px"});


    //第一个自然段不缩进
    $("#allcontent .flowedContent").each(function(){
        $(this).find("p").eq(0).css("text-indent",0);
    });


    //处理小标题    
    $("#allcontent .flowedContent p strong,#allcontent .flowedContent p b,#allcontent .flowedContent b p").each(function(){
        var _this = $(this);
        var _paren = _this.parent();
        var w1 = _this.html();
        w1 = w1.replace(/[\r\n\s<>]/g,"");
        var w2 = _this.html();
        w2 = w2.replace(/[\r\n\s<>]/g,"");

        if (w1.length>2 && w2.length-w1.length<4 && w1.length < 80) {
            _this.css("text-indent",0);
            _paren.css({"text-indent":0});
            if (!_paren.hasClass("contentheadline")) {
                $("<p class=placeholder><br></p>").insertBefore(_paren);
            }
            _paren.next().css("text-indent",0);
            _paren.addClass("keepwithnext").addClass("subTitle");
        } else if (w1.length>0 && w2.length-w1.length<4) {
            _this.css({"text-indent":0,"font-weight":"normal","color": "#555"});
            _paren.css({"text-indent":0,"font-weight":"normal"});
        }
    });

    //处理文章中inline图片
    //<figure class="inline keepwithnext loading" data-url="http://i.ftimg.net/picture/4/000061034_piclink.jpg"></figure>
    $("#allcontent .flowedContent p img").each(function(){
        //$(this).parent().css("text-indent",0);
        $(this).unwrap().wrap('<figure class="inline keepwithnext"></figure>');
    });

    //菜谱第一行的空白删除
    $(".food .placeholder").remove();
   
    calculateWH();
    closeFullScreen();
    
    if (k !== null && k !== "" && k >= 0 && k<allpages && allpages>=30) {
        startFromArticle(k,currentPage,currentPageCount);
    } else {
        startFromArticle(0,0,0);
    }
    
    //点击设置的背景则关闭设置菜单
    $("#setting").unbind().bind("click",function(e){
       	if (/\b(cell)\b/.test(e.target.className)) {
            closeSetting();
        }
    });
    
    
    $("#fontsetting").unbind().bind("click",function(e){
       	if (/\b(cell)\b/.test(e.target.className)) {
            closeFontSize();
        }
    });

    if ($('#allcontent [storyid=contentpage]').length === 0 ) {
        $('#index-title').html('封面');
    }
    
    allArticle=$("#allcontent .slide").length;



    //针对桌面浏览器的便捷操作方式
    if (deviceType === 'other') {
        window.onkeydown = function(e){
            if (e.keyCode === 39 || e.keyCode === 40 || ((e.keyCode === 32 || e.keyCode === 13) && $('form, input, textarea').length === 0)) {
                slider.gonext();
            } else if (e.keyCode === 37 || e.keyCode === 38) {
                slider.goprev();
            }
        };

        $("#swipe").css("position","relative").append('<a class="arrow-prev" href="#"><div></div></a><a class="arrow-next" href="#"><div></div></a>');
        $(".arrow-prev,.arrow-next").bind("click",function(){
            var arrowId=$(this).attr("class");
            if (arrowId === "arrow-prev") {
                slider.goprev();
            } else {
                slider.gonext();
            }
        });
    }

    //monitor ad click
    $('body').on('click','.ad-link',function(){
        var adLink = $(this).attr('href') || '';
        var adTitle = $(this).attr('title') || 'untitled ad';
        ga('send','event', 'Full Page Ad Click', adTitle, adLink);
        //alert (adTitle);
    });

}





function scrollToSection(articlenumber) {
	var sectionOffsetTop=$("#gamecontent .contentcategory .Section"+articlenumber).offset().top;
	var headerHeight=$("#allcontent .contentpage .header").eq(0).height();
	var sectionScrollTop=contentScroller.scrollTop + sectionOffsetTop - headerHeight;
	contentScroller.scrollTo(0, sectionScrollTop, 300);
}









function openpage(pagenumber) {
    pagenumber = parseInt(pagenumber);
    cs = pagenumber;
    slider.slide(cs);
}


function turnpage(direction) {
    var n = cs+direction;
    if (n >= 0&&n <= allslides-1) {
        slider.slide(n);
    }
}

function changepage(pagenumber) {
    pagenumber = parseInt(pagenumber, 10);
    var p = pagenumber+1;
    $("#game .pagenumber span").eq(0).html(p);
    p = 705*pagenumber/allslides;
    $("#game .pagenow div").eq(0).animate({left:p+"px"},500);
    savevalue(ce,pagenumber);


    var $ani = $("#gamecontent .slide").eq(pagenumber);

    if ($ani.find(".hidetopicbar").length>0){
        $(".topicbar").removeClass("on");
    } else {
        $(".topicbar").addClass("on");
    }


    var currenttopic = $ani.attr("topic");
    $("#game .channel div").removeClass("on");
    $("#game .channel div").css("background","transparent");
    if (currenttopic !== null && currenttopic !== "") {
        $("#game .channel div").each(function(){

            if ($(this).html() === currenttopic) {
                $(this).addClass("on");
                var b = $ani.css("background-image");
                if (b === ""||b === null||b === "none"){		
                    b = $ani.css("background-color");
                    $(this).css("background-color",b);
                } else {
                    $(this).css("background-image",b);
                }
            }
        });
    }
    //如果发现是翻页的行为，则动态加载或删除Viewport前后页
    $("#gamecontent .slide").removeClass("current");
    $ani.addClass("current");
    var addArticle=-1;
    var removeArticle=-1;
    var currentArticleNumber=$ani.attr("articlenumber");
	currentPage=$ani.attr("thispage");
	currentPageCount=$ani.attr("allpages");
    currentArticleNumber=parseInt(currentArticleNumber);
    if (currentArticleNumber === currentArticle-1 || currentArticleNumber === currentArticle+1) {
        if (currentArticleNumber === currentArticle-1) {
            addArticle=currentArticleNumber-1;
            removeArticle=currentArticleNumber+2;
        } else {
            addArticle=currentArticleNumber+1;
            removeArticle=currentArticleNumber-2;
        }
        if (removeArticle>=0 && removeArticle<articleCount) {
            $("#gamecontent .slide[articlenumber='"+removeArticle+"']").remove();
        }

        if (addArticle>=0 && addArticle<articleCount) {//如果在#gamecontent里面新加载文章，则进行分页，添加进来的新文章要定位好
            var thepos=slider.width;
            thepos=parseInt(thepos);
            if (currentArticleNumber === currentArticle-1) {
                thepos=-thepos;
                thepos=thepos+"px";
                $("#allcontent .slide[articlenumber='"+addArticle+"']").clone().css({'-webkit-transform':'translate3d(' + thepos + ',0,0)','-moz-transform':'translate3d(' + thepos + ',0,0)','-ms-Transform':'translateX(' + thepos + ')','-o-Transform':'translateX(' + thepos + ')'}).show().addClass("new").prependTo($("#gamecontent"));
            } else {
                thepos=thepos+"px";
                $("#allcontent .slide[articlenumber='"+addArticle+"']").clone().css({'-webkit-transform':'translate3d(' + thepos + ',0,0)','-moz-transform':'translate3d(' + thepos + ',0,0)','-ms-Transform':'translateX(' + thepos + ')','-o-Transform':'translateX(' + thepos + ')'}).show().addClass("new").appendTo($("#gamecontent"));
            }
            paginate($("#gamecontent .slide.new .article"));
            $("#gamecontent .slide.new").removeClass("new");
        }
        
        
        //重新计算页数
        slider.length=$("#gamecontent .slide").length;
        var listItem = $("#gamecontent .slide.current").eq(0);
        setTimeout(function(){listItem.show();},1000);//add a delay to make sure the current slide always displays
        slider.index=$("#gamecontent .slide").index(listItem);
        //slider.slide(slider.index);
    }
    $ani.prev().show();
    $ani.next().show();

    /*
    if ($ani.next().find('.video-bg video').length > 0) {
        $ani.next().find('.video-bg video').get(0).play();
    } 
    */

    
    currentArticle=currentArticleNumber;
    savevalue(ce+"_article",currentArticle);
	savevalue(ce+"_thispage",currentPage);
	savevalue(ce+"_allpages",currentPageCount);
    $("#gamecontent .slide").removeClass("current");
}





function chainreaction($theobject) {
    if ($theobject.hasClass("done") !== true) {
        //根据circle中的字数调整其大小
        $theobject.find(".circle span").each(function(){
            if ($(this).parent().hasClass("start") === true) {$(this).parent().addClass("four");} else if ($(this).html().length>12) {$(this).parent().addClass("three");} else if ($(this).html().length>6) {$(this).parent().addClass("two");} else if ($(this).html().length === 4) {var k = $(this).html().replace(/^(..)/g,"$1<br>");$(this).html(k);}
        }
        );

        //添加手指提示读者点击
        addhand($theobject,$theobject.find(".tappable.on").eq(0));

        //设置点击的行为
        $theobject.find("[name]").each(function(){
            //alert($(this).attr("name"));
            $(this).bind("click",function(){
                var thename = $(this).attr("name");
                showChain($theobject,thename);
                if ($(this).attr("hide")) {$(this).parent().find("."+$(this).attr("hide")).remove();}
            });
        }
        );
        $theobject.addClass("done");
    }
}


function checkSectionScroller(){
	//alert (sectionScroller.scrollLeft + ":" + sectionScroller.scrollWidth);
	if (sectionScroller.scrollLeft>0) {
		$("#gamecontent .navleftcontainer").show();
	} else {
		$("#gamecontent .navleftcontainer").hide();			
	}
	if (sectionScroller.scrollLeft+$(window).width()<sectionScroller.scrollWidth) {
		$("#gamecontent .navrightcontainer").show();
	} else {
		$("#gamecontent .navrightcontainer").hide();			
	}
}



function scrollToMiddle($theObject) {
    var currentSectionLeft=$theObject.offset().left;
    var currentSectionScroll=parseInt(currentSectionLeft+sectionScroller.scrollLeft-$(window).width()/2+$theObject.outerWidth()/2);
    if (currentSectionScroll<0) {
        currentSectionScroll=0;
    }
    sectionScroller.scrollTo(currentSectionScroll,0,300);
}


function showscore() {
    var csscore = 0;
    var fullscore = 0;
    var scorerate = "不可能的";
    var k = '';
    var scorecomment;
    $("#allcontent [score]").each(function(){
        if ($(this).attr("score")) {var i = $(this).attr("score");i = parseInt(i);csscore = csscore+i;}
    });
    $('#allcontent .option p[type = "r"]').each(function(){
        var i = $(this).attr("value");i = parseInt(i);fullscore = fullscore+i;
    });
    fullscore = fullscore+$(".yesorno p").length;
    $("#gamecontent .myscore").html(csscore);
    $("#gamecontent .fullscore").html(fullscore);
    if (fullscore>0){scorerate = 100*csscore/fullscore;scorerate = parseInt(scorerate);}else{scorerate = 0;}
    $("#gamecontent .scorerate").html(scorerate+"分");

    //提醒还有一些未回答的题目
    var openquiz = $("#allcontent .option:not(.done)").length;


    //根据分数的不同给出不同的评价
    if (currentArticle === allArticle-1){
    	k = "<a onclick = 'jumptostory(\"contentpage\")' class = 'greybutton notouchall'>返回目录</a>";
    }
    k = "<br><br>"+k;
    if ($("#allcontent .option.done").length === 0) {
        scorecomment = '您还没有开始答题。<br><br><a onclick="jumptoquiz()"" class="greybutton notouchall">开始答题</a>';
        $(".scorerate").css("color","#666");
    } else if (openquiz>0) {
        scorecomment = '您还有一些问题没有回答。<br><br><a onclick="jumptoquiz()" class="greybutton notouchall">继续答题</a>';
        $(".scorerate").css("color","#666");
    } else if (scorerate >= 90) {
        scorecomment = "完美的表现！"+k;
        $(".scorerate").css("color","#9E2F50");
    } else if (scorerate >= 60) {
        scorecomment = "分数及格，希望您更上一层楼。"+k;
        $(".scorerate").css("color","#308F6A");
    } else {
        scorecomment = "分数没有及格，请加油。"+k;
        $(".scorerate").css("color","#666");
    }


$("#gamecontent .scorecomment").html(scorecomment);


    //scoreimg = "picture/people/"+scoreimg+".png";
    //$("#gamecontent .scoreimg").attr("src",scoreimg);
    


/*
    //如果分数比上次高，则保存
    var lastscore = getvalue(ce);
    if (lastscore === null||scorerate>lastscore) {
        savevalue(ce,scorerate);
        scorechange = "";
    } else {
        scorechange = "";
    }
    $("#gamecontent .scorechange").html(scorechange);

    //更新Episode号
    var k = $("#tipmenu .coursemenu div[episode = "+ce+"]").next().attr("episode");
    if (k !== null && k !== "" && remember === 1) {savevalue("ce",k);savevalue("cs",0);savevalue("ca",0);}
    */
}



//确定播放何种自定义动画
function playanimation() {
    var $ani = $("#gamecontent .slide").eq(cs).find(".animation").eq(0);

    if (!$ani.attr("played")||$ani.attr("played") !== 1) {
        var thefunction = $ani.attr("function");
        try {
        	playFunction(thefunction);
    	} catch (ignore) {
    		console.log (ignore);
    	}
        //eval(thefunction+"();");
    }

}

        //$currentSlide.find('.MPU').html(writeAd('mpu'));
        // var m = $currentSlide.find('.MPU');
        // var c = m.attr('data-adcode') || '11000003';
        // var iframeSrc = '/m/marketing/a.html?v=10#adid='+ c + '&pid=MPU'+c;
        // var iframeHTML = '<iframe class="banner-iframe" id="MPU' + c + '" width="300" height="250" frameborder="0" scrolling="no" marginwidth="0" marginheight="0" src="'+ iframeSrc +'" data-src="'+ iframeSrc +'"></iframe>';
        // m.html(iframeHTML);

var currentMPUNumber = 0;
var mpuAds = {
    'iphone':['0003','0004'],
    'android':['0003','0004'],
    'ipad':['0003','0004','0005'],
    'desktop':['0003','0004','0005','0012','0013']
};
var halfPageMPUs = ['0106'];
var fullPageAds = {
    'iphone':['0117'],
    'android':['0117'],
    'ipad':['0117'],
    'desktop':['0117']
};

function writeAd(adType) {
    var ad;
    var adPositions = [];
    var currentAdch = '1100';
    var adPositionsCount;
    var c;
    var iframeSrc;
    var iframeHTML = '';
    var mpuWidth = '300';
    var mpuHeight = '250';
    if (adType === 'mpu') {
        ad = mpuAds;
    } else if (adType === 'fullpage') {
        ad = fullPageAds;
        mpuWidth = '1';
        mpuHeight = '1';
        window.adchId = '2050';
    }
    if (deviceType === 'iPad') {
        adPositions = ad.ipad;
        currentAdch = '2021';
    } else if (deviceType === 'iPhone') {
        adPositions = ad.iphone;
        currentAdch = '2022';
    } else if (deviceType !== 'other') {
        adPositions = ad.android;
        currentAdch = '2023';
    } else {
        adPositions = ad.desktop;
        currentAdch = (typeof window.adchId === 'string')? window.adchId: '1100';
    }
    adPositionsCount = adPositions.length;
    currentMPUNumber = currentMPUNumber % adPositionsCount;
    c = currentAdch + adPositions[currentMPUNumber];
    if (halfPageMPUs.indexOf(adPositions[currentMPUNumber])>=0) {
        mpuHeight = 600;
    }
    iframeSrc = '/m/marketing/a.html?v=11#adid='+ c + '&pid=AD' + c + '&device=' + deviceType;
    iframeHTML = '<iframe style="width: ' + mpuWidth + 'px; height: ' + mpuHeight + 'px;" class="banner-iframe" id="AD' + c + '" width="' + mpuWidth + '" height="' + mpuHeight + '" frameborder="0" scrolling="no" marginwidth="0" marginheight="0" src="'+ iframeSrc +'"></iframe>';
    currentMPUNumber += 1;
    //alert (iframeHTML);
    return iframeHTML;

}

//处理某个slide的内容
function playslide(slidenumber) {
    cs = slidenumber;
    cs = parseInt(cs, 10);
    var gameContent = $("#gamecontent");
    var fixedBG = '';
    var fixedBGPosition = '';
    var $currentSlide = $("#gamecontent .slide").eq(slidenumber);
    var currentArticleNumber=$currentSlide.attr("articlenumber");
    var videoInSlide;
    var ccVideoDiv;
    var n1Number;
    var signForNoRotate = 0;
    currentArticleNumber=parseInt(currentArticleNumber);
    n1Number=$currentSlide.attr("n1");
    n1Number=parseInt(n1Number, 10);
    $("#gamecontent .slide").removeClass("is-current");
    $currentSlide.addClass("is-current");


    //if there's video, allow rotate even on small screen
    signForNoRotate = $currentSlide.find('video, .inlinevideo, .article').length;
    if (signForNoRotate > 0) {
        $('html').addClass('no-rotation');
    } else {
        $('html').removeClass('no-rotation');
    }
    
    //选择题
    if ($currentSlide.find(".option p").length>0) {
        if ($currentSlide.find(".option").eq(0).hasClass("done") === false) {
            $currentSlide.find(".option p").unbind().bind("click",function(){onechoiceClick($(this));});
        } else if ($currentSlide.find(".option p.selected").length<=0) {
            var k=$currentSlide.find(".option").attr("done");
            k=parseInt(k);
            if (k<0) {k=0;}
            onechoiceSelect($currentSlide.find(".option p").eq(k));
        }
    }


    

    //在翻到新的页面的时候，暂停所有的视频，避免造成页面卡顿
    $("#gamecontent .slide video").each(function(){
	   try {
        	this.pause();
        } catch(ignore){

        }
    });

    /*
    if ($currentSlide.hasClass('ask-for-review') && 'reviewPanel' in window) {
    	reviewPanel();
    }
    */

    
    //在IOS 6上有严重Bug导致视频在显示的时候乱跳，因此首先隐藏所有视频，然后将视频高度和宽度缩小到0，再通过动画放大

    videoInSlide = $currentSlide.find('.video-bg video');
    if (videoInSlide.length > 0) {
        videoInSlide.get(0).play();
        //alert ($currentSlide.find('.video-bg video').length);
    } else if (1<0 && $currentSlide.find("video").length > 0) {
        var w = $(window).width();
        var h = $(window).height();
        if (w>h) {
            w = parseInt(w*0.6);
        } else {
            w = parseInt(w*0.9);
        }        
        h = w*9/16;
        h = Math.round(h);
        $currentSlide.find(".videocontainer").css({"width":w+"px","height":h+"px"});        
        $currentSlide.find("video").css({"width":0,"height":0}).addClass("on").animate({"width":w+"px","height":h+"px"},500,"easeInOutCubic");
    }
    
    // if there are CCVideo tag in this slide
    ccVideoDiv = $currentSlide.find('.inlinevideo');
    if (ccVideoDiv.length > 0) {
        ccVideoDiv.each(function() {
            var touchOverlay = '';
            var touchClickClass = '';
            var videoContainerId = '';
            if ($(this).attr('vid') !== '') {
                videoContainerId = 'story-vid-' + $(this).attr('vid');
                $(this).addClass('o-responsive-video-container').addClass(touchClickClass).html('<div class="o-responsive-video-wrapper-outer"><div class="o-responsive-video-wrapper-inner"><iframe height="100%" width="100%" src="' + gWebRootForVideo + '/index.php/ft/video/' + $(this).attr('vid') + '?i=1&w=100%&h=100%&autostart=false" scrolling="no" frameborder="0" allowfullscreen=""></iframe></div>' + touchOverlay + '</div><a class="o-responsive-video-caption" id="' + videoContainerId + '">' + $(this).attr('title') + '</a></div>');
                /*
                if (deviceType !== 'other') {
                    $currentSlide.find('.page').css('position', 'relative').remove('.arrow-prev, .arrow-next').append('<a class="arrow-prev on" href="#"><div></div></a><a class="arrow-next on" href="#"><div></div></a>');
                    $currentSlide.find('.arrow-prev,.arrow-next').bind('click', function() {
                        var arrowId = $(this).attr("class");
                        if (arrowId === "arrow-prev") {
                            slider.goprev();
                        } else {
                            slider.gonext();
                        }
                    });
                }
                */
            }
        });
    }




    //如果这个slide是自定义的动画，则播出
    var animation = $currentSlide.find(".animation").length;
    if (animation>0) {
        playanimation();
    }

    //将gamecontent的背景设置为固定的图片
    fixedBG = $currentSlide.attr('data-fixed-bg-0') || '';
    if (fixedBG !== '') {
        gameContent.css('background-image', 'url(' + fixedBG + ')');
    } else {
        gameContent.css({'background-image':'none','background-color':'#333'});
    }

    //自定义固定图片的定位方式
    fixedBGPosition = $currentSlide.attr('data-fixed-bg-position-0') || '';
    if (fixedBGPosition !== '') {
        gameContent.css('background-position', fixedBGPosition);
        //alert (fixedBGPosition);
    } else {
        gameContent.css('background-position', 'center center');
    }
    

    //连锁反应
    if ($currentSlide.find(".chainreaction").length>0){
        chainreaction($currentSlide.find(".chainreaction").eq(0));
    }

    //向FT的服务器请求正好合适的大小的图片
    var figures = $currentSlide.find('figure.loading');
    var figureCount;
    for (figureCount=0; figureCount<figures.length; figureCount++) {
      var thisFigure = figures.eq(figureCount);
      var imageWidth = thisFigure.innerWidth();
      var imageHeight = thisFigure.innerHeight();
      var imageUrl = thisFigure.attr('data-url');
      var figureClass = thisFigure.attr('class') || '';
      var fitType = 'cover';
      if (isRetinaDevice === true) {
        imageWidth = imageWidth * 2;
        imageHeight = imageHeight * 2;
      }
      if (imageWidth > 0 && imageHeight > 0) {
        imageUrl = imageUrl.replace('i.ftimg.net', 'i.ftmailbox.com');
        imageUrl = encodeURIComponent(imageUrl);
        imageUrl = 'https://image.webservices.ft.com/v1/images/raw/' + imageUrl + '?source=ftchinese&width=' + imageWidth + '&height=' + imageHeight + '&fit=' + fitType;
        thisFigure.html('<img src="' + imageUrl + '">');
        thisFigure.removeClass('loading');
      }
    }

    //有自定义动画和其他功能的页面，关闭点击页面边缘翻页和点击页面中间调出Rail的功能
    if (animation>0 || $currentSlide.find("video").length > 0) {
        _clicktoTurnPage = "off";
        $('html').addClass('has-animation');
    } else {
        _clicktoTurnPage = "on";
        $('html').removeClass('has-animation');
    }


    //记分卡显示分数
    if ($currentSlide.find(".myscore").length>0) {showscore();}

    //显示长文章的页数
    var $pagedots = $("#game .pagedots").eq(0);

    if ($currentSlide.attr("allpages") && $currentSlide.attr("allpages")>0 && screenType !== "small") {
        $pagedots.empty().show();
        var i = 0;
        for (i = 0;i<$currentSlide.attr("allpages");i++) {
            $pagedots.append("<span>&nbsp;•&nbsp;</span>");		
        }

        $pagedots.find("span").eq($currentSlide.attr("thispage")).addClass("grey");
    } else {
        $pagedots.empty().hide();
    }
	
	//文章顶部显示小标题
	var $pagetitle = $("#game .pagetitle").eq(0);
	if ($currentSlide.attr("allpages") && $currentSlide.attr("allpages")>0 && $currentSlide.find(".headline").length === 0 && $currentSlide.find(".headcut").length === 0 && $currentSlide.attr("headline")) {
        $pagetitle.empty().show();
        $pagetitle.html($currentSlide.attr("headline"));
    } else {
        $pagetitle.empty().hide();
    }
	
	//关闭底部的内容滑轨
	try{closeRail();}catch(err){}
    
    //目录页加上两个scroller
    if (typeof FTScroller === 'function' && $currentSlide.hasClass("contentpage") === true && $currentSlide.find("#contentScroller"+currentArticleNumber).length === 0) {
        $currentSlide.find(".scrollPage").attr("id","contentScroller"+currentArticleNumber);
        contentScroller = new FTScroller(document.getElementById('contentScroller'+currentArticleNumber), {
            scrollingX: false,
            snapping: true,
            scrollbars: true,
			updateOnChanges: true,
			updateOnWindowResize: true
        });
        contentScroller.addEventListener("scrollend", function(){
           contentScrollTop=contentScroller.scrollTop;
           //_scrolling=0;
		   $("#gamecontent .contentcategory .category").each(function(){
		   		var sectionNumber = '';
		   		var headerHeight = 0;
		   		var theScrollHeight = 0;
				if ($(this).html() !== "目录") {
					headerHeight=$("#allcontent .contentpage .header").eq(0).height();
					theScrollHeight=$(this).offset().top-headerHeight;
					if (theScrollHeight>=0 && theScrollHeight<=$("#gamecontent .theContent").height()) {
						sectionNumber=$(this).attr("n1target");
						$("#gamecontent ul.navigation li").removeClass("on");
						$("#gamecontent ul.navigation li.section_"+sectionNumber).addClass("on");
                        scrollToMiddle($("#gamecontent ul.navigation li.section_"+sectionNumber));
						return false;
					}
					if (theScrollHeight>=$("#gamecontent .theContent").height()) {
						sectionNumber=$(this).attr("n1target");
						$("#gamecontent ul.navigation li").removeClass("on");
						$("#gamecontent ul.navigation li.section_"+sectionNumber).prev().addClass("on");
                        scrollToMiddle($("#gamecontent ul.navigation li.section_"+sectionNumber).prev());
						return false;
					}
				}
		   });
		});
        /*
        contentScroller.addEventListener("scrollstart", function(){
            _scrolling=1;
        });
        */
        try {
            contentScroller.scrollTo(0,contentScrollTop);
        } catch (ignore) {

        }
		
        $currentSlide.find(".navigationScroller").attr("id","sectionScroller"+currentArticleNumber);
        sectionScroller = new FTScroller(document.getElementById('sectionScroller'+currentArticleNumber), {
            scrollingY: false,
            snapping: true,
            scrollbars: false,
			updateOnChanges: true,
			updateOnWindowResize: true
        });
		if (sectionScroller.scrollWidth<=$(window).width() && sectionScroller.scrollWidth<=1024) {//如果用scroller算出来Navigation的宽度小于窗口宽度，且小于1024像素
            var liNumber=$("#gamecontent ul.navigation li").length;
            var newPadding=10;
            var liWidth=0;
            $("#gamecontent ul.navigation li").each(function(){
                liWidth+=$(this).outerWidth();
            });
            if (liNumber>0 && liWidth<sectionScroller.scrollWidth) {
                newPadding=10+parseInt((sectionScroller.scrollWidth-liWidth)/(2*liNumber));
            }
            $("#gamecontent ul.navigation li").css("padding","0 "+newPadding+"px");
        } else {
			$("#gamecontent ul.navigation li").css("padding","0 10px");
			checkSectionScroller();
			sectionScroller.addEventListener("scrollend", function(){
				checkSectionScroller();
			});
		}
    }
	


    
    //处理高度超过屏幕的菜单和图片

    var scrollFood=0;
    if ($currentSlide.find(".food.nowrap").length>0 || $currentSlide.find(".longPicture").length>0 || $currentSlide.find(".o-text-block").length>0 || $currentSlide.find("table").length>0) {
        var currentFood=$currentSlide.find(".food.nowrap, .longPicture, .o-text-block").eq(0);
        var foodMaxHeight=coverheight-50;
        if ($currentSlide.find(".longPicture").length>0) {
            foodMaxHeight=$(window).height();
        }
        //alert (foodMaxHeight);
        if (foodMaxHeight>0 && currentFood.outerHeight()>foodMaxHeight) {
            scrollFood=1;
            currentFood.css({"height":foodMaxHeight+"px","overflow":"hidden","display":"block"});
            currentFood.attr("id","foodScroller"+currentArticleNumber);
            
            foodScroller = new FTScroller(document.getElementById("foodScroller"+currentArticleNumber), {
                scrollingX: false,
                snapping: false,
                bouncing: false,
                scrollbars: true,
                windowScrollingActiveFlag: 'gFTScrollerActive'
            });
            
            //alert (foodScroller.scrollHeight);
        }
    }
    
    if ($currentSlide.hasClass("contentpage") === true || scrollFood === 1) {
        _scrollerOn=1;
    } else {
        _scrollerOn=0;
    }
    
    //如果页面中有大幅的图片，用放大和双击手势全屏查看
    if ($currentSlide.find(".cf-fixed figure img.large").length>0) {
        $currentSlide.find("img.large").eq(0).attr("id","largePic"+currentArticleNumber);
        enableFullScreen($currentSlide.find("img.large").eq(0));
        $currentSlide.find("figcaption").addClass("fadeInOut");
    }

    //如果页面中有广告位
    if ($currentSlide.find('.MPU').length >0) {
        $currentSlide.find('.MPU').html(writeAd('mpu'));
        // var m = $currentSlide.find('.MPU');
        // var c = m.attr('data-adcode') || '11000003';
        // var iframeSrc = '/m/marketing/a.html?v=10#adid='+ c + '&pid=MPU'+c;
        // var iframeHTML = '<iframe class="banner-iframe" id="MPU' + c + '" width="300" height="250" frameborder="0" scrolling="no" marginwidth="0" marginheight="0" src="'+ iframeSrc +'" data-src="'+ iframeSrc +'"></iframe>';
        // m.html(iframeHTML);
    }

    //如果页面是全屏广告
    
    if ($currentSlide.find('.fullpage-ad').length >0) {
        $currentSlide.find('.fullpage-ad').html(writeAd('fullpage'));
        // var m = $currentSlide.find('.MPU');
        // var c = m.attr('data-adcode') || '11000003';
        // var iframeSrc = '/m/marketing/a.html?v=10#adid='+ c + '&pid=MPU'+c;
        // var iframeHTML = '<iframe class="banner-iframe" id="MPU' + c + '" width="300" height="250" frameborder="0" scrolling="no" marginwidth="0" marginheight="0" src="'+ iframeSrc +'" data-src="'+ iframeSrc +'"></iframe>';
        // m.html(iframeHTML);
    }

    
    //记录一次PV，由于本地文件不支持cookie，所以无法记录UU
    //gaTrack('UA-1608715-1', 'm.ftchinese.com', '/mbagym/book/'+ce+'/'+cs, 'MBA GYM: '+ce);
    if (typeof(currentPageCount) === "undefined") {currentPageCount=0;}
    if (typeof(currentPage) === "undefined") {currentPage=0;}
    //console.log(currentPageCount);
    trackTraffic(currentArticle+"/"+currentPageCount+"/"+currentPage);
    //console.log (n1Number + 'allArticle: ' + allArticle);
    if (n1Number === allArticle - 1) {
        $('html').addClass('article-last');
    } else {
        $('html').removeClass('article-last');
    }
    $("body").attr("class","article-" + n1Number);
}





function jumptoquiz() {
    var k = $("#allcontent .option:not(.done)").eq(0).parent().parent().parent().attr("articlenumber");
    jumptoarticle(k);
}

function jumptostory(storyid){
    var n = $("#allcontent .slide[storyid = "+storyid+"]").attr("articlenumber");
    if (typeof n === 'undefined') {
    	n=0;
    }
    if (n === null || n === '') {
    	n=0;
    }
    n=parseInt(n);
    jumptoarticle(n);
}





function speedquiz() {
    var $ani = $("#gamecontent .slide").eq(cs).find(".animation").eq(0);
    $ani.empty();
    $ani.attr("score",0);
    var timelimit = $ani.attr("timelimit");
    timelimit = parseInt(timelimit)+3;
    $ani.append("<div class = sentense></div>");
    $ani.find(".sentense").append($ani.parent().find(".yesorno").html());
    $ani.find(".sentense p").css({"text-align":"center","font-size":"32px"});

    $ani.append("<div class = 'yes tap' style = 'background:#E3D3BC;position:absolute;left:298px;top:250px;width:200px;height:100px;line-height:100px;font-size:32px;text-align:center;-webkit-border-radius:0.2em;-moz-border-radius:0.2em;border:1px solid #93857C;'>正确</div>");
    $ani.append("<div class = 'no tap' style = 'background:#E3D3BC;position:absolute;left:532px;top:250px;width:200px;height:100px;line-height:100px;font-size:32px;text-align:center;-webkit-border-radius:0.2em;-moz-border-radius:0.2em;border:1px solid #93857C;'>错误</div>");
    $ani.append("<div class = 'currentquiz tap' style = 'position:absolute;left:0;top:150px;width:1024px;height:100px;line-height:170%;font-size:32px;text-align:center;'></div>");
    $ani.append("<div class = 'quizperformance tap' style = 'position:absolute;left:266px;top:400px;width:512px;height:200px;line-height:170%;font-size:32px;text-align:center;background:#FFF1E0;'></div>");

    //插入总结
    $ani.append("<div class = 'tap tstable movein' style = 'display:none;'><table><thead><tr><th scope = col class = header></th><th style = 'text-align:center' scope = 'col' class = header nowrap>正确</th><th style = 'text-align:right' scope = col class = header nowrap>错误</th></tr></thead><tbody></tbody></table></div>");


    //设置时间
    $ani.append("<div class = 'timelimit tap'>"+timelimit+"</div><div class = 'tap timelimittext' style = ''>限时答题</div>");
    //如果翻到了别的页面，则cs与clockpage会不相等
    var clockpage = cs;
    var _timelimit = function(){
        timelimit = timelimit-1;
        if (timelimit < 0) {
            timelimit = 0;
            _endquiz();
            $ani.find(".quizresult").prepend("时间到，");
        } else if ($ani.find(".sentense p").length>0&&clockpage === cs) {
            setTimeout(_timelimit, 1000);
        }
        if (timelimit <= 10){
            $ani.find(".timelimit").css("color","#9E2F50");
        }
        $ani.find(".timelimit").html(timelimit);
    };



    _timelimit();

    //随机抽取一道题目
    function _popquiz() {
        $ani.find(".sentense").hide();
        var quiznumber = $ani.find(".sentense p").length;
        if (quiznumber>0) {
            var k = Math.floor(Math.random()*quiznumber);
            $ani.find(".currentquiz").empty().append($ani.find(".sentense p").eq(k));
        }
    }

    //快问快答结束
    function _endquiz() {
        $ani.find(".yes,.no,.currentquiz").remove();
        $ani.find(".tstable").show();
        var myscore = $ani.find(".quizperformance .quizcorrect").length;
        $ani.find(".tstable th").eq(0).html('您答对'+myscore+'题').css({"font-size":"21px","text-align":"center","font-family":"arial"});
        $ani.append("<div class = 'quizcomment tap' style = 'position:absolute;left:30px;top:50px;width:964px;line-height:170%;font-size:26px;text-align:center;'></div>");
        $ani.find(".endquiz").unbind().bind("click",function(){
            turnpage(1);
            timelimit = 0;
        });
        var quizcomment = "";
        var allquiz = $(".yesorno p").length;
        allquiz = parseInt(allquiz);
        var quizrate = Math.round(100 * myscore/allquiz);

/*
        if (quizrate > 70) {
        	reviewPanel();
        }
*/
        $ani.find(".quizcomment").html(quizcomment);
        $("#gamecontent .slide").eq(cs).attr("score", myscore);
        $ani.find(".quizperformance").remove();
        $ani.find(".timelimit,.timelimittext").remove();

    }



    _popquiz();



    //选择答案
    $(".yes.tap,.no.tap").unbind().bind("click",function(){
        var quiznumber = $ani.find(".sentense p").length;

        if (quiznumber >= 0){
            //插入summary

            var k1 = $ani.find(".currentquiz p").eq(0).html();
            var k2;
            var k3;

            if ($(this).hasClass("yes")&&$ani.find(".currentquiz p").eq(0).hasClass("yes")) {
                k2 = "<img src = img/tsright.png>";
                k3 = "<img src = img/tsfalse.png>";
            } else if ($(this).hasClass("no")&&!$ani.find(".currentquiz p").eq(0).hasClass("yes")){
                k2 = "<img src = img/tsfalse.png>";
                k3 = "<img src = img/tsright.png>";
            } else if ($(this).hasClass("yes")&&!$ani.find(".currentquiz p").eq(0).hasClass("yes")) {
                k2 = "<img src = img/tswrong.png>";
                k3 = "<img src = img/tstrue.png>";
            } else {
                k2 = "<img src = img/tstrue.png>";
                k3 = "<img src = img/tswrong.png>";
            }


            $ani.find(".tstable tbody").append("<tr><td class = td1>"+k1+"</td><td>"+k2+"</td><td>"+k3+"</td></tr>");



            if (($(this).hasClass("yes")&&$ani.find(".currentquiz p").eq(0).hasClass("yes"))||($(this).hasClass("no")&&!$ani.find(".currentquiz p").eq(0).hasClass("yes"))) {
                $ani.find(".quizperformance").append("<div class = 'quizcorrect ro' style = 'height:75px;width:100px;float:left;'></div>");
            } else {
                $ani.find(".quizperformance").append("<div class = 'wo' style = 'height:75px;width:100px;float:left;'></div>");
            }


            if (quiznumber>0) {
                _popquiz();
            }else {
                _endquiz();
            }
        } 
    });
}




//在本地运行的GA Track，可以向GA发送访问信息，以记录PV，来源：http://remysharp.com/2009/02/27/analytics-for-bookmarklets-injected-scripts/
function c(e,j){return e+Math.floor(Math.random()*(j-e));}
function gaTrack(g,h,i,o){var f = 1000000000,k = c(f,9999999999),a = c(10000000,99999999),l = c(f,2147483647),b = (new Date()).getTime(),d = window.location,m = new Image(),n = 'http://www.google-analytics.com/__utm.gif?utmwv = 5.3.8&utms = 5&utmn = '+uniqueK+'&utmcs = UTF-8&utmsr = 1024x768&utmsc = 32-bit&utmul=zh-cn&utmje=1&utmfl=11.6%20r602&utmdt='+o+'&utmhid=1113132287&utmhn='+h+'&utmr=0&utmp='+i+'&utmac='+g.replace(/\//g,"%2F")+'&utmcc=__utma%3D'+uniqueA+'.'+uniqueL+'.'+uniqueB+'.'+uniqueB+'.'+uniqueB+'.10%3B%2B__utmb%3D'+uniqueA+'%3B%2B__utmc%3D'+uniqueA+'%3B%2B__utmz%3D'+uniqueA+'.'+uniqueB+'.1.1.utmcsr%3D(direct)%7Cutmccn%3D(direct)%7Cutmcmd%3D(none)%3B&utmu=DAC~';m.src = n;}



//在本地测试
if (window.location.hostname.indexOf('ftchinese.com') < 0 && window.location.hostname.indexOf('ftmailbox.com') < 0) {
    gWebRootForVideo = 'http://m.ftchinese.com';
}

uniqueL = c(1000000000,2147483647);
uniqueK = c(1000000000,9999999999);
uniqueA = c(10000000,99999999);
uniqueB = (new Date()).getTime();
username = getvalue("USER_NAME");
//使用feature detect并不能真正发现设备是否只支持Touch
//所以还是用agent sniffing来检查设备，针对常见的情况进行处理
if (/ipad/i.test(userinfo)) {
    deviceType = 'iPad';
} else if (/ipod|iphone/i.test(userinfo)) {
    deviceType = 'iPhone';
} else if (/android/i.test(userinfo)) {
    deviceType = 'Android';
} else if (/bb10/i.test(userinfo)) {
    deviceType = 'BB10';
}
if (deviceType === 'other') {
    $('html').addClass('is-desktop');
} else {
    $('html').addClass('is-touch');
}
if(isipad === 1) {
	tap = "touchend";
}
if(isipad === 1){
	tapstart = "touchstart";
}
(function(a,b){if(/ipad;/i.test(a)) {isipad = 1;return;}})(navigator.userAgent||navigator.vendor||window.opera,'http://m.ftchinese.com/');
if (isipad === 1) {document.body.addEventListener("touchmove", function(e) {e.preventDefault();});}
(function(a,b){if(/ftmailbox/i.test(a) || /ftchinese/i.test(a)) {islocal = 0;return;}})(window.location.href,'http://m.ftchinese.com/');