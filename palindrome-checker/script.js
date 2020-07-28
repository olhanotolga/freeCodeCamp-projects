const inputField = document.getElementById("palindrome-input");
const isSpan = document.querySelector(".is");
const notSpan = document.querySelector(".not");
const displayPhrase = document.querySelector(".palindrome-to-check");
isSpan.classList.add("overlaying-is");

function palindrome(str = inputField.value) {
    isSpan.classList.remove("overlaying-is");
    
    // use split, reverse, join
    // reduce the string to an array of alphanumerical symbols
    let deconstructedString = str.toLowerCase().split('').filter(symbol => symbol.match(/[0-9a-zA-Z]/));

    // save the reduced string into a variable
    let reducedString = deconstructedString.join('');
    // reverse the reduced string and save the result into a variable
    let reversedString = deconstructedString.reverse().join('');

    // compare the strings and save the boolean value to a variable:
    let isPalindrome = reducedString === reversedString;
  
    console.log(str, isPalindrome);

    if (isPalindrome) {
        notSpan.classList.add("disappear");
        isSpan.classList.remove("disappear");
    } else {
        notSpan.classList.remove("disappear");
    }

    displayPhrase.textContent = `"${inputField.value}"`;
  
    return isPalindrome;
}

// palindrome("eye");
// palindrome("_eye");
// palindrome("race car");
// palindrome("not a palindrome");
// palindrome("A man, a plan, a canal. Panama");
// palindrome("never odd or even");
// palindrome("nope");
// palindrome("almostomla");
// palindrome("My age is 0, 0 si ega ym.");
// palindrome("1 eye for of 1 eye.");
// palindrome("0_0 (: /-\\ :) 0-0");
// palindrome("five|\\_/|four");
// palindrome("In girum imus nocte et consumimur igni.");