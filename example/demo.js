var preview = new Preview( { container: 'iphone 4' } );

document.getElementById( 'preview' ).appendChild( preview.el );

preview.generate( { 
	postImages: [
		'./example/images/img1.jpg',
		'./example/images/img2.jpg',
		'./example/images/img3.jpg'
	],
	verified: true,
	likes: 14,
	forwards: 15,
	comments: 123
});

var a = document.getElementById( 'post-text' );
a.addEventListener( 'input', function() {
	preview.generate( { postText: a.value } ) 
});

var b = document.getElementById( 'account-image-input' );
b.addEventListener( 'focusout', function() {
	preview.generate( { accountImage: b.value } )
});

var c = document.getElementById( 'account-name' );
c.addEventListener( 'input', function() {
	preview.generate( { accountName: c.value } )
});

var d = document.getElementById( 'post-source' );
d.addEventListener( 'input', function() {
	preview.generate( { postSource: d.value } )
});

// TODO: GENERATE IMAGES RANDOMLY FROM FOLDER OF 100 SMALL IMAGES
var button = document.getElementsByClassName( 'add-image' );

// LOOP THROUGH BUTTONS TO ADD CLICK EVENT LISTENER
for ( var i = 0; i < button.length; i++ ) {

	button[ i ].addEventListener( 'click', function(){

		var images = [];
		
		// IF ID CONTAINS A NUMBER
		if ( this.id.match( /[0-9]+/i ) ) {

			// ADD IMAGES TO BASED ON ID NAME MATCHING THE IMAGE NUMBER
			for ( var i = 0; i < parseInt( this.id.match( /[0-9]+/i ) ); i++ ) {

				images.push( './example/images/img' + ( i + 1 ) + '.jpg' );

			}

		}

		// GENERATE THE POST IMAGES TO PREVIEW
		preview.generate( { postImages: images });

	});

}