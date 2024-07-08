let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("#btn");
let fromcurr = document.querySelector(".from select");
let tocurr = document.querySelector(".to select");
let api =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

for (let select of dropdowns) {
  for (currcode in countryList) {
    let option = document.createElement("option");
    option.innerText = currcode;
    option.value = currcode;
    if (select.name === "from" && currcode === "USD") {
      option.selected = "selected";
    } else if (select.name === "to" && currcode === "BDT") {
      option.selected = "selected";
    }
    select.append(option);
  }
  select.addEventListener("change", (evt) => {
    updateflag(evt.target);
  });
}

const updateflag = (element) => {
  let currcode = element.value;
  console.log(currcode);
  let code = countryList[currcode];
  console.log(code);
  let flag = `https://flagsapi.com/${code}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = flag;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amt = amount.value;
  console.log(amt);
  if (amount.value === "" || amount.value <= 0) {
    amount.value = 1;
  }
  console.log(fromcurr.value, tocurr.value);

  const url = `${api}/${fromcurr.value.toLowerCase()}.json`;
  let json = await fetch(url);

  let data = await json.json();
  rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
  let pretotal = amt * rate;
  let total = Math.floor(pretotal);
  console.log(total);

  let msg = document.querySelector(".msg");
  msg.innerText = `${amt} ${fromcurr.value} = ${total} ${tocurr.value}`;
});
