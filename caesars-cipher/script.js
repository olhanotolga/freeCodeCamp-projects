const inputField = document.getElementById("encodedPhraseInput");
const exceptionDisplay = document.querySelector(".section2");
const outputDisplay = document.getElementById("decodedRot13Phrase");
const convertRot13 = str => {
    //make sure the string is always uppecase:
    str = str.toUpperCase();
    
    //create the ROT13 cipher map using two half-alphabet strings:
    const firstHalfAlphabet = 'ABCDEFGHIJKLM';
    const secondHalfAlphabet = 'NOPQRSTUVWXYZ';
    let cipherMap = {};
    
    const generateCipherMap = (halfStringOne, HalfStringTwo) => {
        for (let i = 0; i < halfStringOne.length; i ++) {
            cipherMap[halfStringOne[i]] = HalfStringTwo[i];
        }
    };
    generateCipherMap(firstHalfAlphabet, secondHalfAlphabet);
    generateCipherMap(secondHalfAlphabet, firstHalfAlphabet); 
    
    //use the ROT13 cipher map to decode the passed string:
    let decodedString = "";

    for (let el of str) {
        if (cipherMap.hasOwnProperty(el)) {
            decodedString = decodedString.concat(cipherMap[el]);
        } else {
            decodedString = decodedString.concat(el);
        }
    }

    outputDisplay.textContent = decodedString;

    console.log(decodedString);
    return decodedString;
}

//   rot13("SERR PBQR PNZC");
//   rot13("SERR CVMMN!");
//   rot13("SERR YBIR?");
//   rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.");
