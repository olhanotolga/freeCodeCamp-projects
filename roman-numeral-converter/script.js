function convertToRoman(num) {
    // define the exceptions:
    if (typeof num !== 'number' || !Number.isInteger(num)) {
      console.log("Please type a proper whole number");
      return "Please type a proper whole number";
    }
    if (num < 1 || num > 3999) {
      console.log("Your number is outside of the classic Roman numerals' range");
      return "Your number is outside of the classic Roman numerals' range";
    }
  
    // define a reference object for conversion:
    const romanNumerals = {
      thousands: { "1": "M", "2": "MM", "3": "MMM" },
      hundreds: { "1": "C", "2": "CC", "3": "CCC", "4": "CD", "5": "D", "6": "DC", "7": "DCC", "8": "DCCC", "9": "CM", "0": "" },
      tens: { "1": "X", "2": "XX", "3": "XXX", "4": "XL", "5": "L", "6": "LX", "7": "LXX", "8": "LXXX", "9": "XC", "0": "" },
      ones: { "1": "I", "2": "II", "3": "III", "4": "IV", "5": "V", "6": "VI", "7": "VII", "8": "VIII", "9": "IX", "0": "" }
    }
    const romanNumsByCharIndices = [romanNumerals.ones, romanNumerals.tens, romanNumerals.hundreds, romanNumerals.thousands];
  
    // convert the number to a string and store its length:
    const numToConvert = num.toString();
    const numLength = numToConvert.length;
    console.log("numToConvert:", numToConvert, typeof numToConvert, "length:", numLength);
    // here, we'll store a value that will be returned in the end:
    let romanNum = "";
  
    // iterating over each character in the Arabic number string, starting from the character at the last index:
    for (let i = 0; i < numLength; i++) {
      let currentDigit = numToConvert[numLength - 1 - i];
      // matching the current character's index to the Roman numerals category:
      let correspondingRomanNumCategory = romanNumsByCharIndices[i];
      // the current numeral character (key) is matched to its Roman numeral equivalent (value) within the Roman numerals category object:
      let romanEquivalent = correspondingRomanNumCategory[currentDigit];
      // prepending the corresponding Roman numeral character to the existing Roman numeral string:
      romanNum = romanEquivalent.concat(romanNum);
    }
  
    console.log(romanNum);
    return romanNum;
  }
  
  convertToRoman(3999);