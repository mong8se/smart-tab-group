function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    shouldUngroup: document.querySelector("#shouldUngroup").checked,
    nameStrategy: document.querySelector("input[name='nameStrategy']:checked")
      .value,
  });
}

function restoreOptions() {
  function setCurrentChoices(result) {
    let { shouldUngroup, nameStrategy } = result;
    if (typeof shouldUngroup === "undefined") shouldUngroup = true;
    document.querySelector("#shouldUngroup").checked = shouldUngroup;

    if (typeof nameStrategy === "undefined") nameStrategy = "useTitle";
    document.querySelector(`#${nameStrategy}`).checked = true;
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = browser.storage.sync.get(["shouldUngroup", "nameStrategy"]);
  getting.then(setCurrentChoices, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
document
  .querySelector("#shouldUngroup")
  .addEventListener("change", saveOptions);

const radios = document.querySelectorAll("input[name='nameStrategy']");
radios.forEach((radio) => {
  radio.addEventListener("change", saveOptions);
});
