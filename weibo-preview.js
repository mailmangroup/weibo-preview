/*
 * Weibo Preview
 * Author: Fergus Jordan
 * Version: 1.0.1
 *
 * Real-time preview of content on Sina Weibo's iOS app
 */
(function ( root, factory ) {

	// AMD
	if ( typeof define === 'function' && define.amd ) define( [], factory );

	// COMMONJS
	else if ( typeof exports === 'object' ) module.exports = factory();

	// BROWSER GLOBAL
	else root.Preview = factory();

}(this, function () {
	'use strict';

	// DECLARE ACCEPTED CONTAINER SIZES
	var sizes = {
		iphone4: { 
			height: '480px', 
			width: '320px' 
		},
		iphone5: { 
			height: '568px', 
			width: '320px' 
		},
		iphone6: { 
			height: '667px', 
			width: '375px' 
		},
		iphone6plus: { 
			height: '736px', 
			width: '414px' 
		}
	};

	// EXTEND JAVASCRIPT OBJECT
	function extend ( defaults, options ) {
	    
	    var extended = {};	    
	    var prop;
	   
	    for (prop in defaults) {        
	        if (Object.prototype.hasOwnProperty.call(defaults, prop)) extended[prop] = defaults[prop];    
	    }
	    
	    for (prop in options) {
	        if (Object.prototype.hasOwnProperty.call(options, prop)) extended[prop] = options[prop];
	    }

	    return extended;

	};

	// CONVERT STRING TO LOWERCASE AND STRIP SPACES TO ENSURE INPUT MATCHES ACCEPTED SIZES
	function normalizeString ( string ) {

		var normalized = string.toLowerCase().replace(/ /g,'');

		return normalized;

	};

	// IF LENGTH OF INPUT IS 0 > REVERT TO DEFAULT
	function testDefaults ( defaultValue, inputValue ) { 

		if ( inputValue != null ) inputValue = inputValue.length === 0 ? defaultValue : inputValue;
			else if ( inputValue === null ) inputValue = defaultValue;
		
		return inputValue;

	}

	// PARSE STRING: IF LINK OR HASHTAG > WRAP IN <A> TAG / IF VIDEO LINK > RETURN VIDEO TRUE
	// ===============================================================================
	function parseString ( string ) {

		// DO WE HAVE A STRING
		if ( string ) {

			string = string.replace( /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi, function(url, http, displayUrl) {

				// URL LONGER THAN 10 CHARS › OK
				if ( url.length > 10 ) {

					if ( !displayUrl ) var displayUrl = url;

					// HTTP MISSING › ADD IT TO HREF
					if ( !http ) url = 'http://' + url;

					// HAS HTTP › REMOVE IT FOR DISPLAY
					else var displayUrl = '网页链接'; // TODO: IF VIDEO > SET DISPLAY URL TO VIDEO TITLE

					// REMOVE PERIOD AND SEMI-COLON FROM END OF URL
					var last = url.substr(-1),
						end = '';
					if ( last == '.' || last == ';' ) {
						url = url.substr(0, -1);
						end = last;
					}

					// TODO: BUILD THIS OUT MORE TO STORE URL TO BE FETCHED FURTHER DOWN

					var link = '<a href="' + url + '" title="' + url + '"' + ' class="link preview-link"' + ' target="_blank">' + displayUrl + '</a>' + end;

					// IF URL IS A VIDEO > ADD PREVIEW-VLINK CLASS TO RETURN LINK
					// TODO: IF URL CONTAINS SINA > ADD CLASSNAME TO VIDEO TO STYLE DIFFERENTLY
					// RETURN HTML ELEMENT
					if ( url.match( /(http|https):\/\/(\w+:{0,1}\w*@)?((youku|pptv|sohu|tudou)+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi ) ) return '<a href="' + url + '" title="' + url + '"' + ' class="link preview-vlink preview-link" target="_blank">' + displayUrl + '</a>' + end;
					else return link; 
					
				// URL TOO SHORT › DO NOTHING
				} else return url;

			});

			// PARSE A TEXT STRING AND CONVERT WEIBO MENTIONS '@' TO LINKS
			string = string.replace( /@([^\s;\/\\():]+)/gi, function( matches, tag ) {

				return '<a href="http://weibo.com/n/' + tag + '" class="link" target="_blank">@' + tag + '</a>'; 

			});

			// PARSE A TEXT STRING AND CONVERT WEIBO #HASHTAGS# TO LINKS
			return string.replace( /#([^\s]+?)#/gi, function( matches, tag ) {

				return '<a href="http://huati.weibo.com/k/' + tag + '" class="link" target="_blank">#' + tag + '#</a>';

			});

		}

	};


	// PREVIEW CLASS CONSTRUCTOR
	// ===============================================================================
	function Preview ( options ) {
		
		// ENSURE THAT THE CLASS IS CALLED WITH THE `new` CONSTRUCTOR
		if ( !( this instanceof Preview ) ) {
			throw new TypeError( 'Preview constructor cannot be called as a function.' );
		}

		// NEW PREVIEW OBJECT
		var options = extend({
			container: 'iphone4'
		}, options);

		// BUILD CONTAINER ELEMENT
		// ===========================================================================
		this.create( 'el', 'div', 'preview-container' );

		// IF CONTAINER IS AN OBJECT > OBJECT VALUES MUST BE HEIGHT AND WIDTH
		// ===========================================================================
		if ( typeof options.container === 'object' && options.container.width && options.container.height ) {

			if ( typeof options.container.width === 'number' && typeof options.container.height === 'number' ) {

				options.container.width = options.container.width + 'px';
				options.container.height = options.container.height + 'px';

			}
				
			this.el.style.width = options.container.width;
			this.el.style.height = options.container.height;
				
		}

		// IF CONTAINER IS AN STRING > SET HEIGHT AND WIDTH ACCORDING TO WHITELIST SIZES
		// ===========================================================================
		else if ( typeof options.container == 'string' ) {

			for ( var prop in sizes ) {
									
				if ( sizes.hasOwnProperty( prop ) && prop == normalizeString( options.container ) ) {

					this.el.style.width = sizes[ prop ].width;
					this.el.style.height = sizes[ prop ].height;

				}
							
			}

		} else throw new TypeError( 'Container object contains invalid values' );

	};

	// BUILD PREVIEW PROTOTYPE
	// ===============================================================================
	Preview.prototype = {

		// SET PROTOTYPE CONSTRUCTOR AS PREVIEW
		constructor: Preview,

		// CREATE ELEMENT
		create: function ( name, element, className, target ) {

			this[ name ] = document.createElement( element );
			if ( className ) this[ name ].className = className;
			if ( target ) target.appendChild( this[ name ] );

		},

		// GENERATE THE CONTENT OF THE PREVIEW
		// ============================================================================
		generate: function ( content ) {


			// SET CONTENT
			// =========================================================================
			
			// IF CONTENT IS STRING > SET AS POST TEXT ON OBJECT
			if ( typeof( content ) == 'string' ) content = { postText: content };

			// SET DEFAULT VALUES
			var defaults = {
				postText: 'Post text...',
				accountName: 'Account Name',
				accountImage: null,
				postTime: '刚刚',
				postSource: '微博 weibo.com'
			}


			// IF NO PREVIOUS VALUES ARE SET > SET DEFAULTS > OVERRIDE WITH USER SET VALUES
			if ( !this.previous ){
				
				var post = extend({
						postText: defaults.postText,
						accountName: defaults.accountName,
						accountImage: defaults.accountImage,
						postTime: defaults.postTime,
						postSource: defaults.postSource,
						postImages: [],
						originalPost: null,
						verified: false
					}, content );

			} else {
				
				// IF PREVIOUS VALUES ARE SET > EXTEND TO POST
				var post = extend( this.previous, content );

				// IF VALUE OF INPUT IS 0 > REVERT VALUE TO DEFAULT
				post.postText = testDefaults( defaults.postText, post.postText );
				post.accountName = testDefaults( defaults.accountName, post.accountName );
				post.accountImage = testDefaults( defaults.accountImage, post.accountImage );
				post.postTime = testDefaults( defaults.postTime, post.postTime );
				post.postSource = testDefaults( defaults.postSource, post.postSource );

			}

			// IF POST WRAPPER DOESNT EXIST > CREATE POST WRAPPER
			// =========================================================================
			if ( !this.postWrapper ) {

				this.create( 'postWrapper', 'div', 'post-wrapper' );

				// APPEND HEADER TO POST WRAPPER
				this.create( 'postHeader', 'div', 'post-header', this.postWrapper );
				
				// IF VERIFIED IS TRUE > SET CLASSNAME OF HEADER TO BE VERIFIED
				if ( post.verified === true ) this.postHeader.className += ' verified';

				// APPEND SECTION TO POST WRAPPER
				this.create( 'postBody', 'div', 'post-body', this.postWrapper );

				// APPEND POST WRAPPER TO PREVIEW CONTAINER
				this.el.appendChild( this.postWrapper );

			}

			// APPEND ENGAGEMENT SECTION TO POST WRAPPER
			// =========================================================================
			if ( !this.postEngagementEl ) {

				this.create( 'postEngagementEl', 'div', 'post-engagement', this.postWrapper );

				// CREATE POST FORWARDS
				this.create( 'postForwardsEl', 'div', 'post-forwards', this.postEngagementEl );
				this.create( 'postForwards', 'span', null, this.postForwardsEl );
				this.postForwards.innerHTML = '转发';

				// CREATE POST COMMENTS
				this.create( 'postCommentsEl', 'div', 'post-comments', this.postEngagementEl );
				this.create( 'postComments', 'span', null, this.postCommentsEl );
				this.postComments.innerHTML = '评论';
				
				// CREATE POST LIKES
				this.create( 'postLikesEl', 'div', 'post-likes', this.postEngagementEl );
				this.create( 'postLikes', 'span', null, this.postLikesEl );
				this.postLikes.innerHTML = '赞';

			}

			// CREATE ACCOUNT IMAGE
			// =========================================================================	
			if ( !this.accountImageEl ) this.create( 'accountImageEl', 'div', 'account-image', this.postHeader );
			
			// IF ACCOUNT IMAGE IS DEFINED > SET AS BACKGROUND IMAGE OF IMAGE WRAPPER
			if ( post.accountImage && ( !this.previous || post.accountImage != this.previous.accountImage ) ) this.accountImageEl.style.backgroundImage = 'url(' + post.accountImage + ')';
				
			// CREATE ACCOUNT INFO
			// =========================================================================
			// IF ACCOUNT INFO ELEMENT DOESNT EXIST > CREATE AND APPEND TO HEADER
			if ( !this.accountInfoEl ) this.create( 'accountInfoEl', 'div', 'account-info', this.postHeader );
			
			// CREATE ACCOUNT NAME
			// =========================================================================

			// IF ACCOUNT NAME ELEMENT DOESNT EXIST > CREATE AND APPEND TO ACCOUNT INFO ELEMENT
			if ( !this.accountNameEl ) this.create( 'accountNameEl', 'span', 'account-name', this.accountInfoEl );
			
			// SET VALUE OF ACCOUNT NAME ELEMENT
			if ( post.accountName && ( !this.previous || post.accountName != this.previous.accountName ) ) this.accountNameEl.innerHTML = post.accountName;

			// CREATE POST META DATA
			// =========================================================================
					
			// IF POST META DATA ELEMENT DOESNT EXIST > CREATE AND APPEND TO ACCOUNT INFO ELEMENT
			if ( !this.postMetaDataEl ) this.create( 'postMetaDataEl', 'div', 'post-meta', this.accountInfoEl );
			
			// IF POST TIME ELEMENT DOESNT EXIST > CREATE AND APPEND TO POST META DATA ELEMENT
			if ( !this.postTimeEl ) this.create( 'postTimeEl', 'span', null, this.postMetaDataEl );
	
			// SET VALUE OF POST TIME ELEMENT
			if ( post.postTime && this.postTimeEl ) {

				// FORMAT POST TIME
				if ( !isNaN( parseInt( post.postTime ) ) ) {
				
					var date = new Date( parseInt( post.postTime ) ),
						minutes = date.getMinutes(),
						hours = date.getHours(),
						day = date.getDate(),
						month = date.getMonth() + 1;

					// FORMAT 1 DIGIT NUMBERS
					if ( minutes <= 9 ) minutes = '0' + minutes;
					if ( hours == 0 ) hours = '00';

					// CHECK IF DATE IS EQUAL TO TODAY
					if ( date.setHours( 0, 0, 0, 0 ) == new Date().setHours( 0, 0, 0, 0 ) ) post.postTime = '今天 ' + hours + ':' + minutes;
						else post.postTime = month + '月' + day + '日 ' + hours + ':' + minutes;

				} else post.postTime = '刚刚';


				// SET POST TIME TO INNER HTML OF POST TIME ELEMENT
				if ( !this.previous || post.postTime != this.previous.postTime ) this.postTimeEl.innerHTML = post.postTime;

			}

			// IF POST SOURCE ELEMENT DOESNT EXIST > CREATE AND APPEND TO POST META DATA ELEMENT
			if ( !this.postSourceEl ) this.create( 'postSourceEl', 'span', null, this.postMetaDataEl );
			
			// SET VALUE OF POST SOURCE ELEMENT
			if ( post.postSource && ( !this.previous || post.postSource != this.previous.postSource ) ) this.postSourceEl.innerHTML = '来自 ' + post.postSource;

			// CREATE POST CONTENT
			// =========================================================================
			
			// POST TEXT EXISTS
			if ( !this.postTextEl ) this.create( 'postTextEl', 'p', null, this.postBody );

			// SET VALUE OF POST TEXT ELEMENT
			if ( post.postText && ( !this.previous || parseString( post.postText ) != parseString( this.previous.postText ) ) ) this.postTextEl.innerHTML = parseString( post.postText );


			// CREATE POST IMAGES
			// =========================================================================
			if ( !this.postImageListEl && post.postImages.length > 0 && typeof post.postImages == 'object' ) this.create( 'postImageListEl', 'div' );
				else if ( typeof post.postImages != 'object' ) throw new TypeError( 'Error: postImages expects an Array, ' + typeof post.postImages + ' was given.' );
				// TODO: HAVE THIS CALL ON UPDATE INSTEAD OF JUST FIRST TIME

			// IF IMAGE LIST EXISTS BUT HASNT BEEN APPENDED TO BODY > APPEND TO BODY
			if ( this.postImageListEl && this.postImageListEl.parentNode != this.postBody && post.postImages.length > 0 ) this.postBody.appendChild( this.postImageListEl );

			if ( this.postImageListEl ) this.postImageListEl.className = 'post-images image-layout-' + post.postImages.length;

			// IF POST IMAGES IS DEFINED AND DOESNT EQUAL PREVIOUS IMAGES
			if ( post.postImages && ( !this.previous || post.postImages != this.previous.postImages ) ) {

				// ONLY CREATE IMAGES IF ARRAY LENGTH IS NOT GREATER THAN MAXIMUM AMOUNT OF IMAGES ALLOWED IN WEIBO
				if ( post.postImages.length <= 9 && post.postImages.length != 0 ) {

					for ( var imageNumber in post.postImages ) {
							
						// IF IMAGE ELEMENT AT THIS INDEX DOESNT EXIST > CREATE IMAGE ELEMENT
						if ( !this[ 'imageEl' + imageNumber ] ) {
							
							this.create( 'imageEl' + imageNumber, 'div', 'post-image ' + 'post-image-' + ( parseInt( [ imageNumber ] ) + 1 ) );

							// IF BACKGROUND IMAGE FOR IMAGE ELEMENT IS NOT YET SET > SET THE BACKGROUND
							if ( !this.previous ) this[ 'imageEl' + imageNumber ].style.backgroundImage = 'url(' + post.postImages[ imageNumber ] + ')';

						}

						// IF THE IMAGE FOR THIS EXISTS BUT IS NOT APPENDED > APPEND TO THE IMAGE LIST WRAPPER
						if ( this[ 'imageEl' + imageNumber ] && this[ 'imageEl' + imageNumber ].parentNode != this.postImageListEl ) this.postImageListEl.appendChild( this[ 'imageEl' + imageNumber ] );

						// IF VALUE OF IMAGES HAS CHANGED > UPDATE THE BACKGROUND IMAGE OF CHANGED IMAGES
						if ( this.previous && this.previous.postImages[ imageNumber ] != post.postImages[ imageNumber ] ) this[ 'imageEl' + imageNumber ].style.backgroundImage = 'url(' + post.postImages[ imageNumber ] + ')';

					}

				}
				
				// IF THERE ARE NO IMAGES IN CALL AND IMAGE LIST EXISTS > REMOVE IMAGE LIST
				if ( post.postImages.length == 0 && this.postImageListEl ) this.postBody.removeChild( this.postImageListEl );

				// IF THERE ARE LESS IMAGES THAN LAST CALL > REMOVE ECCESS IMAGES
				if ( this.previous && this.previous.postImages.length > post.postImages.length ) {

					for ( var imageNumber in this.previous.postImages ) {

						if ( imageNumber >= post.postImages.length ) this.postImageListEl.removeChild( this[ 'imageEl' + imageNumber ] );

					}
					
				}

			}

			// CREATE VIDEO PREVIEW
			// =========================================================================
			// IF VIDEO LINK EXISTS > STORE THE HREF OF THE FIRST VIDEO LINK
			var videoPreviewLink = this.postTextEl.innerHTML.match( /<a[^>]*?.(class=[‘|"][a-zA-Z ^"’]*preview-vlink).*?">((?:.(?!\<\/a\>))*.)<\/a>/i );
			if ( videoPreviewLink ) {

				var videoUrl = videoPreviewLink[ 0 ];
				videoUrl = videoUrl.match( /<a\s+(?:[^>]*?\s+)?href="([^"]*)"/i )[ 1 ];
			
			}

			// IF VIDEO URL IS STORED AND VIDEO LINK ELEMENT EXISTS > UPDATE VIDEO LINK ELEMENT HREF AND SET CLASSNAME OF POSTTEXT <P> TO HIDE VIDEO URL
			if ( videoUrl && this.videoLinkEl ) { 

				this.videoLinkEl.setAttribute( 'href', videoUrl );
				this.postTextEl.className = 'vpreview';

			} else this.postTextEl.className = '';

			// IF VIDEO LINK ELEMENT DOESNT EXIST AND THERE ARE NO IMAGES IN POST > CREATE VIDEO LINK ELEMENT AND APPEND TO POST BODY
			if ( videoUrl && !this.videoLinkEl && ( !this.postImageListEl || this.postImageListEl.parentNode != this.postBody ) ) {
				
				this.videoLinkEl = document.createElement( 'a' );
				this.videoLinkEl.setAttribute( 'target', '_blank' );
				this.videoLinkEl.setAttribute( 'href', videoUrl );

			}

			// IF VIDEO LINK ELEMENT EXISTS AND ISNT APPENDED TO POST BODY > APPEND TO POST BODY
			else if ( this.videoLinkEl && this.videoLinkEl.parentNode != this.postBody ) this.postBody.appendChild( this.videoLinkEl );

			// IF POST TEXT DOESNT HAVE VIDEO <A> AND VIDEO LINK ELEMENT EXISTS > REMOVE THE VIDEO LINK ELEMENT
			if ( ( !videoUrl && this.videoLinkEl && this.videoLinkEl.parentNode == this.postBody ) || this.videoLinkEl && post.postImages.length > 0 ) {

				this.postTextEl.className = '';
				this.postBody.removeChild( this.videoLinkEl );
				
			} 

			// IF VIDEO PREVIEW ELEMENT DOESNT EXIST > CREATE VIDEO PREVIEW ELEMENT
			if ( !this.videoPreviewEl && this.videoLinkEl ) this.create( 'videoPreviewEl', 'div', 'video-preview', this.videoLinkEl );

			// IF VIDEO IMAGE ELEMENT DOESNT EXIST > CREATE AND APPEND TO VIDEO PREVIEW EL
			if ( !this.videoImageEl && this.videoPreviewEl ) this.create( 'videoImageEl', 'div', 'video-preview-image', this.videoPreviewEl );

			// IF VIDEO IMAGE ELEMENT EXISTS AND DOESNT HAVE CLASSNAME OF MATCHED VIDEO > SET CLASSNAME ACCORDING TO MATCHED VIDEO
			if ( this.videoImageEl ) {

				var videoClass = this.videoImageEl.className,
					exp = /(\w+:{0,1}\w*@)?((youku|pptv|sohu|tudou)+)/gi;

				if ( videoClass && videoUrl && videoClass.indexOf( videoUrl.match( exp ) ) == -1 ) this.videoImageEl.className = 'video-preview-image ' + videoUrl.match( exp );

			}

			// IF VIDEO META DATA ELEMENT DOESNT EXIST > CREATE AND APPEND TO VIDEO PREVIEW ELEMENT
			if ( !this.videoMetaData && this.videoPreviewEl ) this.create( 'videoMetaData', 'div', 'video-meta', this.videoPreviewEl );

			// IF VIDEO TITLE ELEMENT DOESNT EXIST > CREATE AND APPEND TO VIDEO META DATA EL
			if ( !this.videoTitle && this.videoMetaData ) {
				
				this.create( 'videoTitle', 'p', null, this.videoMetaData );
				this.videoTitle.innerHTML = 'Video Title';

			}

			// IF VIDEO DESCRIPTION ELEMENT DOESNT EXIST > CREATE AND APPEND TO VIDEO META DATA EL
			if ( !this.videoDescription && this.videoMetaData ) {

				this.create( 'videoDescription', 'span', null, this.videoMetaData );
				this.videoDescription.innerHTML = 'Lorem ipsum dolor sit amet sit galor.'

			}

			// SET CURRENT OPTIONS AS PREVIOUS TO COMPARE WITH NEXT TIME GENERATE IS RUN
			this.previous = post;
			
		}

	};

	return Preview;

}));