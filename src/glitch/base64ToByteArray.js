import maps from './base64Map.js';

const reversedBase64Map = maps.reversedBase64Map;

// https://github.com/mutaphysis/smackmyglitchupjs/blob/master/glitch.html
// base64 is 2^6, byte is 2^8, every 4 base64 values create three bytes
export default function ( base64URL ) {	
	const result = [ ];
	let prev;

	for ( var i = 23, len = base64URL.length; i < len; i++ ) {
		const currrentChar = reversedBase64Map[ base64URL.charAt( i ) ];
		const digitNum = ( i - 23 ) % 4;

		switch ( digitNum ) {
			// case 0: first digit - do nothing, not enough info to work with
			case 1: // second digit
				result.push( prev << 2 | currrentChar >> 4 );
				break;
			
			case 2: // third digit
				result.push( ( prev & 0x0f ) << 4 | currrentChar >> 2 );
				break;
			
			case 3: // fourth digit
				result.push( ( prev & 3 ) << 6 | currrentChar );
				break;
		}

		prev = currrentChar;
	}

	return result;
}