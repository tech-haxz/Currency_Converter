import codes from "./codes.js";

const select = document.querySelectorAll(".dropdown select");
let amount = document.querySelector(".amount input");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msgBox = document.querySelector(".msgBox");

select.forEach((selectElm) => {
  for (const currCode in codes) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    selectElm.append(newOption);

    if (selectElm.name == "from" && currCode == "USD") {
      newOption.selected = "selected";
    } else if (selectElm.name == "to" && currCode == "INR") {
      newOption.selected = "selected";
    }
  }

  selectElm.addEventListener("change", (evt) => {
    // console.log(evt.target);
    updateFlag(evt.target);
  });
});

const updateFlag = (elm) => {
  let currCode = elm.value;
  let countryCode = codes[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let image = elm.parentElement.querySelector("img");
  image.src = newSrc;
};

btn.addEventListener("click", (e) => {
  e.preventDefault();
  let amtValue = amount.value;
  if (amtValue === "" || amtValue < 1) {
    amtValue = 1;
    amount.value = "1";
  }
  console.log(fromCurr.value);

  currency_converter();
});

const currency_converter = async () => {
  const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(url);
  // console.log(response);

  let data = await response.json();
  // console.log(data);
  let rate = data[fromCurr.value.toLowerCase()];
  let finalRate = rate[toCurr.value.toLowerCase()];

  const finalExRate = amount.value * finalRate;
  btn.style.marginTop = "0px";
  msgBox.style.display = "block";
  msgBox.innerText = `${amount.value} ${fromCurr.value} = ${finalExRate} ${toCurr.value}`;
};
