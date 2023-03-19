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
  renewalCalc(renewalValue, expiringValue);
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
  if (percentageChange < 0.01 && premChange > 0) {
    messageEl.innerHTML = `Per DL FT$${renewalValue} (was $${expiringValue}) <1% increase`;
    premChangeEl.classList.remove("over");
  } else if (percentageChange < 0.1 && premChange > 0) {
    messageEl.innerHTML = `Per DL FT$${renewalValue} (was $${expiringValue}) approx ${
      percentageChange.toFixed(2) * 100
    }% increase`;
    premChangeEl.classList.remove("over");
  } else if (percentageChange < 0.1 && premChange < 0) {
    messageEl.innerHTML = `Per DL FT$${renewalValue} (was $${expiringValue}) approx ${
      percentageChange.toFixed(2) * 100
    }% decrease`;
    premChangeEl.classList.remove("over");
  } else if (percentageChange >= 0.1 && premChange < 100) {
    messageEl.innerHTML = `Per DL FT$${renewalValue} (was $${expiringValue}) approx ${
      percentageChange.toFixed(2) * 100
    }% increase. Within our $100 threshold`;
    premChangeEl.classList.remove("over");
  } else if (percentageChange >= 0.1 && premChange >= 100) {
    messageEl.innerHTML = "ren.prem.over.threshold";
    premChangeEl.classList.add("over");
  } else if (premChange < 0) {
    messageEl.innerHTML = `Per DL FT$${renewalValue} (was $${expiringValue}) approx ${
      percentageChange.toFixed(2) * 100
    }% decrease`;
    premChangeEl.classList.remove("over");
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
