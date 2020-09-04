const inputField = document.getElementById("phone-input");
const outputMessage = document.getElementById("output-message");
const phoneNumberDisplay = document.getElementById("phone-number-to-check");
const notSpan = document.querySelector(".not");

const deTelephoneCheck = dePhoneNumberToValidate => {

    outputMessage.classList.add("disappear");
    phoneNumberDisplay.textContent = "";
    notSpan.classList.remove("disappear");

    const dePhonePatternRegex = /^((((((00)|\+)?(49)( |-)?)|(0))(\d{2,4}))|(\(0(\d{2,4})\)))( |-)?(\d{3})( |-)?(\d{2,3})( |-)?(\d{2})$/;

    let isNumberValid = dePhonePatternRegex.test(dePhoneNumberToValidate);

    outputMessage.classList.remove("disappear");
    phoneNumberDisplay.textContent = dePhoneNumberToValidate;

    if (isNumberValid) {
        console.log("number is valid!");
        // #output-message add class show-message
        
        notSpan.classList.add("disappear");
        // .not add class disappear
    }

    return isNumberValid;
}

const telephoneCheck = phoneNumberToValidate => {

    outputMessage.classList.add("disappear");
    phoneNumberDisplay.textContent = "";
    notSpan.classList.remove("disappear");

    const phonePatternRegex = /^(1 ?)?((\d{3})|(\(\d{3}\)))[ -]?(\d{3})[ -]?(\d{4})$/;

    let isNumberValid = phonePatternRegex.test(phoneNumberToValidate);

    outputMessage.classList.remove("disappear");
    phoneNumberDisplay.textContent = phoneNumberToValidate;

    if (isNumberValid) {
        console.log("number is valid!");
        // #output-message add class show-message
        
        notSpan.classList.add("disappear");
        // .not add class disappear
    }

    return isNumberValid;
}