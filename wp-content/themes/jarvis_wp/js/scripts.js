jQuery(document).ready(function($){

	
var   window_height = $(window).height(),
      testMobile,
	  loadingError = '<p class="error">The Content cannot be loaded.</p>',
      current,
	  next, 
	  prev,
	  target, 
	  hash,
	  url,
	  page,
	  title,	  	  	  
	  projectIndex,
	  scrollPostition,
	  projectLength,
	  ajaxLoading = false,
	  wrapperHeight,
	  pageRefresh = true,
	  content =false,
	  loader = $('div#loader'),
	  portfolioGrid = $('div#portfolio-wrap'),
	  projectContainer = $('div#ajax-content-inner'),
	  projectNav = $('#project-navigation ul'),
	  exitProject = $('div#closeProject a'),
	  easing = 'easeOutExpo',
	  folderName ='listing-item';	
	    
	  $.browser.safari = ($.browser.webkit && !(/chrome/.test(navigator.userAgent.toLowerCase())));	 	

	 
	 if ( !$.browser.safari ) {
		  $('.home3').children('.container').addClass('no-safari');
	 }


	$('.home-slide').each(function(){
	    contentSize = $(this).find('.home-slide-content');  
        contentSize.fitText(1.2);			
	});

	
	 var init = function() {
	  
		  // Function to slabtext the H1 headings
		  function slabTextHeadlines() {
			  $(".home-quote h1").slabText({
				   // Don't slabtext the headers if the viewport is under 479px
				  "viewportBreakpoint":200
			
			
			});
    };
	
 


    $(window).load(function() {
        setTimeout(slabTextHeadlines, 5);
    });
	
 
  $.fn.homeVideo = function(){   
	
		  $(".player").mb_YTPlayer();
	 
  } 	
  
	 
/*----------------------------------------------------*/
/* FULLSCREEN IMAGE HEIGHT
/*----------------------------------------------------*/	     
	
	  function fullscreenImgHeight(){

		  $('.fullscreen, .background-video').css({height:window_height});
/*		  var headerH = $('nav').outerHeight();
          $("#home").css('marginBottom',-headerH);*/
		  
	  }
		  
	  fullscreenImgHeight();
		  
		  
		  
	  $(window).bind('resize',function() {
	  
		  fullscreenImgHeight();
		  home_parallax();
		 		  
	  });	 
	  
/*----------------------------------------------------*/
/* FULLWIDTH SECTION
/*----------------------------------------------------*/	
	function fullWidthSection(){
		$offset_block = (($(window).width() - parseInt($('.sixteen').width())) / 2); 
		
		$('.full-width').each(function(){
			
		
				$(this).css({
					'margin-left': - $offset_block,
					'padding-left': $offset_block,
					'padding-right': $offset_block
				});	
			
			
		});
	}
	
	
	fullWidthSection();
	$(window).resize(fullWidthSection);   	  
	  
};	


  jQuery(window).load(function(){   
  jQuery(document).ready(function($){     
// cache container
	var container = $('#portfolio-wrap');	
	

	container.isotope({
		animationEngine : 'best-available',
	  	animationOptions: {
	     	duration: 200,
	     	queue: false
	   	},
		layoutMode: 'fitRows'
	});	


	// filter items when filter link is clicked
	$('#filters a').click(function(){
		$('#filters a').removeClass('active');
		$(this).addClass('active');
		var selector = $(this).attr('data-filter');
	  	container.isotope({ filter: selector });
        setProjects();		
	  	return false;
	});
		
		
		function splitColumns() { 
			var winWidth = $(window).width(), 
				columnNumb = 1;
			
			
			if (winWidth > 1500) {
				columnNumb = 5;
			} else if (winWidth > 980) {
				columnNumb = 4;
			} else if (winWidth > 768) {
				columnNumb = 3;
			} else if (winWidth > 320) {
				columnNumb = 2;
			} else if (winWidth < 320) {
				columnNumb = 1;
			}
			
			return columnNumb;
		}		
		
		function setColumns() { 
			var winWidth = $(window).width(), 
				columnNumb = splitColumns(), 
				postWidth = Math.floor(winWidth / columnNumb);
			
			container.find('.portfolio-item').each(function () { 
				$(this).css( { 
					width : postWidth + 'px' 
				});
			});
		}		
		
		function setProjects() { 
			setColumns();
			container.isotope('reLayout');
		}		
		
		container.imagesLoaded(function () { 
			setColumns();
		});
		
	
		$(window).bind('resize', function () { 
			setProjects();			
		});

});
});



function home_parallax() {
	        $(window).scroll(function() {
	            var yPos = -($(window).scrollTop() / 2); 
         
	            // Put together our final background position
	            var coords = '50%'+ yPos + 'px';
	 
	            // Move the background
	            //$('.page-title-wrapper').css({ backgroundPosition: coords });
	            $('.home-parallax').css({ backgroundPosition: coords });
	        
	        }); 
}

 home_parallax();


/*----------------------------------------------------*/
/* MOBILE DETECT FUNCTION
/*----------------------------------------------------*/

	var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };	  
	  
	 	   



	 
/*----------------------------------------------------*/
// CONTACT FORM WIDGET
/*----------------------------------------------------*/
	var contactFormDefaults=new Array();
	contactFormDefaults['contactName']=rnr_global_vars.contactFormDefaults_name;
	contactFormDefaults['contactEmail']=rnr_global_vars.contactFormDefaults_email;
	contactFormDefaults['contactSubject']=rnr_global_vars.contactFormDefaults_subject;
	contactFormDefaults['contactMessage']=rnr_global_vars.contactFormDefaults_message;
	contactFormDefaults['msg']=$('.contactForm span#msg').html();
	
	$('.contactForm input[type="text"], .contactForm textarea').focus(function() {
		$(this).addClass('inputHighlight').removeClass('errorOutline');
		if($(this).hasClass('required')) {
			$('.contactForm span#msg').html(rnr_global_vars.contact_form_required_fields_label_ajax).removeClass('errorMsg successMsg');
		} else {
			$('.contactForm span#msg').html(contactFormDefaults['msg']).removeClass('errorMsg successMsg');
		}
		if($(this).val()==contactFormDefaults[$(this).attr('id')]) {
			$(this).val('');
		}
	});
	$('.contactForm input[type="text"], .contactForm textarea').blur(function() {
		$(this).removeClass('inputHighlight');
		$('.contactForm span#msg').html(contactFormDefaults['msg']).removeClass('errorMsg successMsg');
		if($(this).val()=='') {
			$(this).val(contactFormDefaults[$(this).attr('id')]);
		}
	});
	
	$('.contactForm input[type="text"], .contactForm textarea').hover(function() {
			$(this).addClass('inputHighlight');
		},
		function() {	
			$(this).not(':focus').removeClass('inputHighlight');
		}
	);
	
	$('.contactForm').submit(function() {
		$form = $('.contactForm');
		$('.contactForm .submit').attr("disabled", "disabled");
		$('#msg').html('<span class="loading-animation"></span>').removeClass('errorMsg successMsg');
		var isError=false;
		$('.contactForm input, .contactForm textarea').each(function() {
			if($(this).hasClass('required') && ($.trim($(this).val())==contactFormDefaults[$(this).attr('id')] || $.trim($(this).val())=='')) {
				$(this).addClass('errorOutline');
				$('#msg').html(rnr_global_vars.contact_form_warning).addClass('errorMsg');
				isError=true;
			}
			if($(this).attr('id')=='contactEmail') {
				var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
				if(reg.test($(this).val())==false) {
					$(this).addClass('errorOutline');
					if(!isError) {
						$('#msg').html(rnr_global_vars.contact_form_email_warning).addClass('errorMsg');
					}
					isError=true;
				}
			}
		});
		if(isError) {
			$('.contactForm .submit').removeAttr("disabled");
			return false;
		} else {
			var name = $('#contactName').val(), email = $('#contactEmail').val(), subject = $('#contactSubject').val(), message = $('#contactMessage').val();
			$.ajaxSetup ({
				cache: false
			});
			var str = $form.serialize();
			$.ajax({
				type: "POST",
				url: $('#contact-form').attr('action'),
				data: str,
				success: function(msg) {
					// Check to see if the mail was successfully sent

						// Update the progress bar
						$('#msg').html(rnr_global_vars.contact_form_success_message).addClass('successMsg');
												// Reset the subject field and message textbox
						if(contactFormDefaults['contactSubject']) {
							$('#contactSubject').val(contactFormDefaults['contactSubject']);
						} else {
							$('#contactSubject').val('');
						}
						if(contactFormDefaults['contactMessage']) {
							$('#contactMessage').val(contactFormDefaults['contactMessage']);
						} else {
							$('#contactMessage').val('');
						}

					// Activate the submit button
					$('.contactForm .submit').removeAttr("disabled");
				},
				error: function(ob,errStr) {
					$('#msg').html(rnr_global_vars.contact_form_error).addClass('errorMsg');
					//Activate the submit button
					$('.contactForm .submit').removeAttr("disabled");
				}
			});
			return false;
		}
	});
	

  

/*----------------------------------------------------*/
// LOAD PROJECT
/*----------------------------------------------------*/ 


	  
$(function(){	


  $(window).bind( 'hashchange', function() {
	  
	  		 
 hash = $(window.location).attr('hash'); 
 var root = '#!'+ folderName +'/';
 var rootLength = root.length;	
 
 	 
	if( hash.substr(0,rootLength) != root ){
		return;						
	} else {	

		 var correction = 50;
		 var headerH = $('nav').outerHeight()+correction;
		 hash = $(window.location).attr('hash'); 
	     url = hash.replace(/[#\!]/g, '' ); 
		 
		 
       
		portfolioGrid.find('div.portfolio-item.current').children().removeClass('active');
		portfolioGrid.find('div.portfolio-item.current').removeClass('current' );
		
		


		/* IF URL IS PASTED IN ADDRESS BAR AND REFRESHED */
		if(pageRefresh == true && hash.substr(0,rootLength) ==  root){	

				$('html,body').stop().animate({scrollTop: (projectContainer.offset().top-20)+'px'},800,'easeOutExpo').promise().done(function(){											
				});
				
		/* CLICKING ON PORTFOLIO GRID OR THROUGH PROJECT NAVIGATION */
		}else if(pageRefresh == false && hash.substr(0,rootLength) == root){				
					$('html,body').stop().animate({scrollTop: (projectContainer.offset().top-headerH)+'px'},800,'easeOutExpo').promise().done(function(){ 		
					//if(content == false){						
						loadProject();							
					/*}else{	
						projectContainer.animate({opacity:0,height:wrapperHeight},function(){
						loadProject();
						});
					}*/
					projectNav.fadeOut('100');
					exitProject.fadeOut('100');
							
					});
			
		/* USING BROWSER BACK BUTTON WITHOUT REFRESHING */	
		}else if(hash=='' && pageRefresh == false || hash.substr(0,rootLength) != root && pageRefresh == false || hash.substr(0,rootLength) != root && pageRefresh == true){	
		        scrollPostition = hash; 
				console.log(scrollPostition);
				$('html,body').stop().animate({scrollTop: scrollPostition+'px'},1000,function(){				
							
					deleteProject();								
							
				});
				
		/* USING BROWSER BACK BUTTON WITHOUT REFRESHING */	
		}
		
		
		
		/* ADD ACTIVE CLASS TO CURRENTLY CLICKED PROJECT */
		 portfolioGrid.find('div.portfolio-item .portfolio a[href$="#!' + url + '"]' ).parent().parent().addClass( 'current' );
		 portfolioGrid.find('div.portfolio-item.current').find('.portfolio').addClass('active');
		

	
  }
	  
	});	  
	  	/* LOAD PROJECT */		
		function loadProject(){
			loader.fadeIn().removeClass('projectError').html('');
			
			
			if(!ajaxLoading) {				
	            ajaxLoading = true;
								
				projectContainer.load( url +' div#ajaxpage', function(xhr, statusText, request){
																   
						if(statusText == "success"){				
								
								ajaxLoading = false;
								
									//page =  $('div#ajaxpage'); FUCKING UNUSED VARIABLE		
		
										//showProject();				  
										$(".container").fitVids();	
													
										$('.flexslider').flexslider({
													
													animation: "fade",
													slideDirection: "horizontal",
													slideshow: true,
													slideshowSpeed: 3500,
													animationDuration: 500,
													directionNav: true,
													controlNav: true,
													
													
													after: function(slider) {
													  slider.removeClass('loading');
													}
													
											});
                                            hideLoader();
								
						}
						
						if(statusText == "error"){
						
								loader.addClass('projectError').append(loadingError);
								
								loader.find('p').slideDown();

						}
					 
					});
				
			}
			
		}
		

		
		function hideLoader(){
			loader.fadeOut('fast', function(){													  
					showProject();					
			});			 
		}	
		
		
		function showProject(){
            /*if( $(window).width() < 768 ) {
                wrapperHeight*/
            wrapperHeight = projectContainer.children('div#ajaxpage').outerHeight()+'px';
			//if(content==false){
					projectContainer.animate({opacity:1,height:wrapperHeight}, function(){
				        $(".container").fitVids();
						scrollPostition = $('html,body').scrollTop();
						projectNav.fadeIn();
						exitProject.fadeIn();
						//content = true;	
								
					});
					
			/*}else{
					projectContainer.animate({opacity:1,height:wrapperHeight}, function(){																		  
					$(".container").fitVids();
						scrollPostition = $('html,body').scrollTop();
						projectNav.fadeIn();
						exitProject.fadeIn();
						
					});					
			}*/
			projectIndex = portfolioGrid.find('div.portfolio-item.current').index();
			projectLength = $('div.portfolio-item .portfolio').length-1;
			
			
			if(projectIndex == projectLength){
				
				$('ul li#nextProject a').addClass('disabled');
				$('ul li#prevProject a').removeClass('disabled');
				
			}else if(projectIndex == 0){
				
				$('ul li#prevProject a').addClass('disabled');
				$('ul li#nextProject a').removeClass('disabled');
				
			}else{
				
				$('ul li#nextProject a,ul li#prevProject a').removeClass('disabled');
				
			}
		
	  }
	  
	  
	  
	  function deleteProject(closeURL){
				projectNav.fadeOut(100);
				exitProject.fadeOut(100);				
				projectContainer.animate({opacity:0,height:'0px'});
				projectContainer.empty();
				
			if(typeof closeURL!='undefined' && closeURL!='') {
				location = '#_';
			}
			portfolioGrid.find('div.portfolio-item.current').children().removeClass('active');
			portfolioGrid.find('div.portfolio-item.current').removeClass('current' );			
	  }
	  
	  
     /* LINKING TO PREIOUS AND NEXT PROJECT VIA PROJECT NAVIGATION */
	  $('#nextProject a').on('click',function () {											   							   
					 
		    current = portfolioGrid.find('.portfolio-item.current');
		    next = current.next('.portfolio-item');
		    target = $(next).children('div').children('a').attr('href');
			$(this).attr('href', target);
			
		
			if (next.length === 0) { 
				 return false;			  
			 } 
		   
		   current.removeClass('current'); 
		   current.children().removeClass('active');
		   next.addClass('current');
		   next.children().addClass('active');
		   
		  
		   
		});



	    $('#prevProject a').on('click',function () {			
			
		  current = portfolioGrid.find('.portfolio-item.current');
		  prev = current.prev('.portfolio-item');
		  target = $(prev).children('div').children('a').attr('href');
		  $(this).attr('href', target);
			
		   
		   if (prev.length === 0) {
			  return false;			
		   }
		   
		   current.removeClass('current');  
		   current.children().removeClass('active');
		   prev.addClass('current');
		   prev.children().addClass('active');
		   
		});
		
		
         /* CLOSE PROJECT */
		 $('#closeProject a').on('click',function () {
			 
		    deleteProject($(this).attr('href')); 			
			portfolioGrid.find('div.portfolio-item.current').children().removeClass('active');			
			loader.fadeOut();
			return false;
			
		});
		 

		 
		 pageRefresh = false;	  


});
		 

	
//BEGIN DOCUMENT.READY FUNCTION
$(document).ready(function() 
{ 
  init(); 

	
$("#nav").superfish({
	delay:       500,
	animation:   {opacity:'show',height:'show'},
	speed:       300,
	autoArrows:  false, 
	dropShadows: false,
});
	
  

/* ------------------------------------------------------------------------ */
/* BACK TO TOP 
/* ------------------------------------------------------------------------ */

	$(window).scroll(function(){
		if($(window).scrollTop() > 800){
			$("#back-to-top").fadeIn(200);
		} else{
			$("#back-to-top").fadeOut(200);
		}
	});
	
	$('#back-to-top, .back-to-top').click(function() {
		  $('html, body').animate({ scrollTop:0 }, '800');
		  return false;
	});
		
      

/*----------------------------------------------------*/
// ADD PRETTYPHOTO
/*----------------------------------------------------*/
	$("a[data-rel^='prettyPhoto']").prettyPhoto();
	
	
/*----------------------------------------------------*/
// ADD VIDEOS TO FIT ANY SCREEN
/*----------------------------------------------------*/
	 $(".container").fitVids();	 		
					
  
/*----------------------------------------------------*/
// PRELOADER CALLING
/*----------------------------------------------------*/    
    $("body.onepage").queryLoader2({
        barColor: "#111111",
        backgroundColor: "#ffffff",
        percentage: true,
        barHeight: 3,
        completeAnimation: "fade",
        minimumTime: 200
    });  
	


/*----------------------------------------------------*/
// MENU SMOOTH SCROLLING
/*----------------------------------------------------*/  
    $(".main-menu a, .logo a, .home-logo-text a, .home-logo a, .scroll-to").bind('click',function(event){
		
		var headerH = $('nav').height();
		
		$(".main-menu a").removeClass('active');
		$(this).addClass('active');		
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top + "px" //GD fixed tocompensate for negative margin in nav!
        }, {
            duration: 1200,
            easing: "easeInOutExpo"
        });

        return false;
		event.preventDefault();
    });
	



	
	jQuery('.milestone-counter').appear(function() {
		$('.milestone-counter').each(function(){
			dataperc = $(this).attr('data-perc'),
			$(this).find('.milestone-count').delay(6000).countTo({
            from: 0,
            to: dataperc,
            speed: 2000,
            refreshInterval: 100
        });
     });
 });	

 
    //img overlays
    $('.team-thumb').on('mouseover', function()
    {
        var overlay = $(this).find('.team-overlay');
        var content = $(this).find('.overlay-content');

        overlay.stop(true,true).fadeIn(600);
        content.stop().animate({'top': "40%",
			                     opacity:1 }, 600);
        
    }).on('mouseleave', function()
    {
        var overlay = $(this).find('.team-overlay');
        var content = $(this).find('.overlay-content');
        
        content.stop().animate({'top': "60%",
			                     opacity:0  }, 300, function(){
			content.css('top',"20%")});
			
        overlay.fadeOut(300);
		
    }); 	
  
});
//END DOCUMENT.READY FUNCTION
		


// BEGIN WINDOW.LOAD FUNCTION		
$(window).load(function(){
	
	$('#load').fadeOut().remove();
	$(window).trigger( 'hashchange' );
	$(window).trigger( 'resize' );
  $('[data-spy="scroll"]').each(function () {
    var $spy = $(this).scrollspy('refresh');
	
  }); 	
 
/* ------------------------------------------------------------------------ */
/* FLEX SLIDER */
/* ------------------------------------------------------------------------ */    

	 if ( $.browser.safari ) {
		  $('.flexslider').flexslider({						
			animation: "slide",
			direction: "horizontal", 
			slideshow: false,
			slideshowSpeed: 3500,
			animationDuration: 500,
			directionNav: true,
			controlNav: false,						
			useCSS: false
		  });
	 }
	$('.flexslider').flexslider({						
			animation: "slide",
			direction: "horizontal", 
			slideshow: false,
			slideshowSpeed: 3500,
			animationDuration: 500,
			directionNav: true,
			controlNav: false
				
	 });
	 
/* ------------------------------------------------------------------------ */
/* Skillbar */
/* ------------------------------------------------------------------------ */	
	jQuery('.skillbar').appear(function() {
		$('.skillbar').each(function(){
			dataperc = $(this).attr('data-perc'),
			$(this).find('.skill-percentage').animate({ "width" : dataperc + "%"}, dataperc*10);
		});
	 });  
 
/* ------------------------------------------------------------------------ */
/* TEXT FITTING FOR HOME STYLING 2 */
/* ------------------------------------------------------------------------ */ 	    
     $('.home-slide-content').fitText(1.2);
	  $('.fittext-content').fitText(2);
	   $('.team-member').parents('.section').css('z-index','inherit');
 
/* ------------------------------------------------------------------------ */
/* STICKY NAVIGATION */
/* ------------------------------------------------------------------------ */ 
 
	$("nav.sticky-nav").sticky({ topSpacing: 0, className: 'sticky', wrapperClassName: 'main-menu-wrapper' });
	

	if ($(window).scrollTop() > $(window).height()){
		$('nav.transparent').addClass('scroll');		
	} else {
		$('nav.transparent').removeClass('scroll');				
	}
	
	
	$(window).on("scroll", function(){
		var winHeight = $(window).height();
		var windowWidth = $(window).width();
		var windowScroll = $(window).scrollTop();
		var home_height =  $('#home').outerHeight();

			if ($(window).scrollTop() > home_height){
				$('nav.transparent').addClass('scroll');										
			} else {
				$('nav.transparent').removeClass('scroll');									
			}

		
	  });

/* ------------------------------------------------------------------------ */
/* SELECTNAV - A DROPDOWN NAVIGATION FOR SMALL SCREENS */
/* ------------------------------------------------------------------------ */ 
	selectnav('nav', {
		nested: true,
		indent: '-'
	}); 
/*----------------------------------------------------*/
// MOBILE NAVIGATION SELECT UPDATE ON SCROLL
/*----------------------------------------------------*/  
    //get the nav items sans MENU option, loop through and assign waypoint for each
    //first remove the MENU from the select because it does nothing!
    var $selectnav = $('.selectnav');
    $selectnav.children().eq(0).remove();
    $selectnav.children().each(function(i,v){
        var attr_arr = $(this).attr('value').split('/');
        var el_id = attr_arr[attr_arr.length-1];
        if (el_id === "#header-section") {
             $(el_id).waypoint(function(){
                //assuming selectnav1 is the right id might be dangerous DEPENDENCY 
                $('#selectnav1 option[value="'+window.location.origin+'/'+el_id+'"]').attr('selected','selected');
            },
            { offset: function() {return -$(this).height();}
            });
        }
        else {
            $(el_id).waypoint(function(){
                //assuming selectnav1 is the right id might be dangerous DEPENDENCY 
                $('#selectnav1 option[value="'+window.location.origin+'/'+el_id+'"]').attr('selected','selected');
            });
        }
    });

});
// END OF WINDOW.LOAD FUNCTION
	
  
 $('#home-slider.flexslider').flexslider({						
		animation: "swing",
		direction: "vertical", 
		slideshow: true,
		slideshowSpeed: 3500,
		animationDuration: 1000,
		directionNav: false,
		controlNav: true,
		smootheHeight:true,
		after: function(slider) {
		  slider.removeClass('loading');
		}
			
 });
 
});
 
 
 (function($) {
    $.fn.countTo = function(options) {
        // merge the default plugin settings with the custom options
        options = $.extend({}, $.fn.countTo.defaults, options || {});

        // how many times to update the value, and how much to increment the value on each update
        var loops = Math.ceil(options.speed / options.refreshInterval),
            increment = (options.to - options.from) / loops;

        return $(this).delay(1000).each(function() {
            var _this = this,
                loopCount = 0,
                value = options.from,
                interval = setInterval(updateTimer, options.refreshInterval);

            function updateTimer() {
                value += increment;
                loopCount++;
                $(_this).html(value.toFixed(options.decimals));

                if (typeof(options.onUpdate) == 'function') {
                    options.onUpdate.call(_this, value);
                }

                if (loopCount >= loops) {
                    clearInterval(interval);
                    value = options.to;

                    if (typeof(options.onComplete) == 'function') {
                        options.onComplete.call(_this, value);
                    }
                }
            }
        });
    };

    $.fn.countTo.defaults = {
        from: 0,  // the number the element should start at
        to: 100,  // the number the element should end at
        speed: 1000,  // how long it should take to count between the target numbers
        refreshInterval: 100,  // how often the element should be updated
        decimals: 0,  // the number of decimal places to show
        onUpdate: null,  // callback method for every time the element is updated,
        onComplete: null,  // callback method for when the element finishes updating
    };
	
})(jQuery);


	 
