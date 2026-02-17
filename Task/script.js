let currentDigit = 0;
let phoneNumber = "";
let fullname="";

    function increase() {
      if (currentDigit < 9) {
        currentDigit++;
        document.getElementById("currentDigit").innerText = currentDigit;
      }
    }

    function decrease() {
      if (currentDigit > 0) {
        currentDigit--;
        document.getElementById("currentDigit").innerText = currentDigit;
      }
    }

    function addDigit() {
      if (phoneNumber.length >= 10) {
        alert("Phone number cannot exceed 10 digits.");
        return;
      }

      phoneNumber += currentDigit;
      document.getElementById("phonenum").innerText =
        "Phone Number: " + phoneNumber;
      currentDigit=0;
      document.getElementById("currentDigit").innerText=currentDigit;
    }

    function resetNumber() {
      phoneNumber = "";
      document.getElementById("phonenum").innerText = "Phone Number: ";
      currentDigit=0;
      document.getElementById("currentDigit").innerText=currentDigit;
    }

    function pos(){
        const x=Math.random()*200;
        const y=Math.random()*200;
        btn.style.top= x + "px";
        btn.style.left= y + "px";
    }
    