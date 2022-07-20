import moment from "moment";

const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
const validPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/;
const validPostcode = /^[0-9]{5}(-[0-9]{4})?$/;
const validPhoneNumber = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;

/* export const value = ( value ,validation ,error) => {
	if (value) {
		if (validation.test(value)) {
			return undefined
		} else {
			return error;
		}
	}
}; */



export const emailValidation = (value) => {
	if (value) {
		if (validEmail.test(value)) {
			return undefined;
		} else {
			return "Not a valid Email"
		}
	}
};

export const passwordValidation = (value) => {
	if (value) {
		if ( validPassword.test(value)) {
			return undefined;
		} else {
			return "This does not fit the requirement"
		}
	} 
};

export const passwordMatch = (pass, val) => {
	if (pass && val) {
		if (pass=== val) {
			return undefined;
		} else {
			return "Passwords do not match"
		}
	}
}

export const onlyTextValidation = (value) => {
	if (value) {
	  if (/^[a-zA-Z ]*$/i.test(value)) {
		 return undefined;
	  } else {
		 return "Alphabetical letters only";
	  }
	} else {
	  return undefined;
	}
 };

 export const postcodeValidation = (value) => {
	 if (value) {
		 if (validPostcode.test(value)) {
			 return undefined
		 } else {
			 return "This is not a valid postcode"
		 }
	 }
 };

 export const phoneValidation = (value) => {
	 if (value) {
		 if (validPhoneNumber.test(value)) {
			 return undefined
		 } else {
			 return "This is not a valid phone number"
		 }
	 }
 };

 export const cardNumberValidation = (cardNumber) => {
	const regexPattern = {
	  MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
	  VISA: /^4[0-9]{2,}$/,
	  AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
	  DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
	};
	for (const card in regexPattern) {
	  if (cardNumber.replace(/[^\d]/g, "").match(regexPattern[card])) {
		 if (cardNumber) {
			return cardNumber &&
			  /^[1-6]{1}[0-9]{14,15}$/i.test(
				 cardNumber.replace(/[^\d]/g, "").trim()
			  )
			  ? undefined
			  : "Enter a valid Card";
		 }
	  }
	}
	return "Enter a valid Card";
 };
 
 export const cardExpireValidation = (value) => {
	if (value) {
	  if (/^(0[1-9]|1[0-2])\/[0-9]{2}$/i.test(value.trim())) {
		 let today = new Date();
		 const date = `${today.getFullYear()}-${today.getMonth() + 1}-${new Date(
			today.getFullYear(),
			today.getMonth() + 1,
			0
		 ).getDate()}`;
		 let currentDate = moment(new Date(date));
		 let visaValue = value.split("/");
		 let visaDate = new Date(`20${visaValue[1]}`, visaValue[0], 0);
		 return currentDate < moment(visaDate)
			? undefined
			: "Please enter a valid date";
	  } else {
		 return "Invalid date format";
	  }
	}
 };
 
 export const securityCodeValidation = (value) => 
	(value && value.length < 3) ? "Must be 3 characters or more" : undefined;

