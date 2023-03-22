const renewalEl = document.querySelector(".renewing input");
const expiringEl = document.querySelector(".expiring input");
const submitBtn = document.querySelector(".btn");
const premChangeEl = document.querySelector(".prem-change");
const percentageChangeEl = document.querySelector(".percentage-change");
const messageEl = document.querySelector(".message");

// Submit button
submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  let renewalValue = renewalEl.value.toString();
  let expiringValue = expiringEl.value.toString();

  // If renewalValue and expiringValue are not numbers it alerts the user
  if (isNaN(renewalValue) || isNaN(expiringValue)) {
    alert("Please enter a number");
    renewalEl.value = "";
    expiringEl.value = "";
    premChangeEl.innerHTML = "";
    percentageChangeEl.innerHTML = "";
  } else if (renewalValue === "" || expiringValue === "") {
    alert("Please enter a number");
    renewalEl.value = "";
    expiringEl.value = "";
    premChangeEl.innerHTML = "";
    percentageChangeEl.innerHTML = "";
  } else {
    renewalCalc(renewalValue, expiringValue);
  }
});

// Calculates premium and percentage change
function renewalCalc(renewal, expiring) {
  let renewalValue = parseFloat(renewal);
  let expiringValue = parseFloat(expiring);
  let percentageChange = (renewalValue - expiringValue) / expiringValue;
  let premChange = renewalValue - expiringValue;

  // Premium change display
  premChangeEl.innerHTML = `$${premChange}`;

  // Percentage change display
  percentageChangeEl.innerHTML = `${percentageChange.toFixed(2) * 100}%`;

  // Message display
  if (Math.abs(percentageChange) < 0.01) {
    if (premChange > 0) {
      messageEl.innerHTML = `Per DL FT$${renewalValue} (was $${expiringValue}) <1% increase`;
      premChangeEl.classList.remove("over");
    } else if (premChange < 0) {
      messageEl.innerHTML = `Per DL FT$${renewalValue} (was $${expiringValue}) <1% decrease`;
      premChangeEl.classList.remove("over");
    } else if (premChange === 0) {
      messageEl.innerHTML = `Per DL FT$${renewalValue} (was same)`;
    }
  } else if (percentageChange < 0.1) {
    let percentChange = (percentageChange * 100).toFixed(0);
    if (premChange > 0) {
      messageEl.innerHTML = `Per DL FT$${renewalValue} (was $${expiringValue}) approx ${percentChange}% increase`;
      premChangeEl.classList.remove("over");
    } else if (premChange < 0) {
      messageEl.innerHTML = `Per DL FT$${renewalValue} (was $${expiringValue}) approx ${Math.abs(
        percentChange
      )}% decrease`;
      premChangeEl.classList.remove("over");
    } else if (premChange === 0) {
      messageEl.innerHTML = `Per DL FT$${renewalValue} (was same)`;
    }
  } else {
    if (premChange < 100) {
      let percentChange = (percentageChange * 100).toFixed(0);
      messageEl.innerHTML = `Per DL FT$${renewalValue} (was $${expiringValue}) approx ${percentChange}% increase. Within our $100 threshold`;
      premChangeEl.classList.remove("over");
    } else if (premChange >= 100) {
      messageEl.innerHTML = "ren.prem.over.threshold";
      premChangeEl.classList.add("over");
    }
  }

  if (navigator.clipboard) {
    navigator.clipboard.writeText(messageEl.innerText).then(
      function () {
        console.log("Copied to clipboard");
      },
      function () {
        console.error("Unable to copy to clipboard");
      }
    );
  } else {
    console.error("Clipboard API not supported");
  }
}
