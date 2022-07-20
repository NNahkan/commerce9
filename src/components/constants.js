import VISA_ICON from './assets/visa.png';
import AMERICAN_EXPRESS_ICON from './assets/amex.png';
import MASTER_CARD_ICON from './assets/masterCard.png';
import DISCOVER_ICON from './assets/discover.png';

export const OTHERCARDS = [
	/[1-9]/,
	/\d/,
	/\d/,
	/\d/,
	'',
	/\d/,
	/\d/,
	/\d/,
	/\d/,
	'',
	/\d/,
	/\d/,
	/\d/,
	/\d/,
	'',
	/\d/,
	/\d/,
	/\d/,
	/\d/,
];

export const AMERICANEXPRESS = [
	/[1-9]/,
	/\d/,
	/\d/,
	/\d/,
   '',
	/\d/,
	/\d/,
	/\d/,
	/\d/,
	/\d/,
	/\d/,
	'',
	/\d/,
	/\d/,
	/\d/,
	/\d/,
	/\d/,
	
];

export const CARD = [
	'VISA',
	'MASTERCARD',
	'AMERICAN_EXPRESS',
	'DISCOVER'
];

export const CARDICON = {
	VISA: VISA_ICON,
	MASTERCARD: MASTER_CARD_ICON,
	AMERICAN_EXPRESS: AMERICAN_EXPRESS_ICON,
	DISCOVER: DISCOVER_ICON,
}


export const promo = [
	{name: 'devslopes15', percentage: 0.15},
	{name: 'yolo', percentage: 0.20},
	{name: 'madness25', percentage: 0.25},
	{name: 'makeitcheap', percentage: 0.5}
];