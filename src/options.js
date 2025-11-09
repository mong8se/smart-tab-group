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
    let shouldUngroup = result.shouldUngroup;
    if (typeof shouldUngroup === "undefined") shouldUngroup = true;
    document.querySelector("#shouldUngroup").checked = shouldUngroup;
    document.querySelector(`#${result.nameStrategy}`).checked = true;
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = browser.storage.sync.get(["shouldUngroup", "nameStrategy"]);
  getting.then(setCurrentChoices, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
