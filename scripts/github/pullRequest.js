const appNameSelector = new RegExp(/^[A-Z]{4,}\-[0-9]{1,}$/gm);
const jiraIdSelector = new RegExp(/\[BLACKOPAL-(.+)\]/gm);

const buttons = [];

function createButton(title, url, color) {
  const btn = document.createElement("button");
  btn.innerHTML = title;
  btn.addEventListener("click", function () {
    var win = window.open(url, "_blank");
    win.focus();
  });
  btn.style.backgroundColor = color;
  buttons.push(btn);
}

function addAppButton() {
  const metaHeader = document.getElementsByClassName("gh-header-meta");
  if (!metaHeader || !metaHeader.length) {
    return;
  }

  const branchNameList = metaHeader[0].getElementsByClassName(
    "css-truncate-target"
  );

  if (!branchNameList || !branchNameList.length) {
    return;
  }

  const branchNameFull = branchNameList[branchNameList.length - 1];
  const branchNameFullSplit = branchNameFull.innerHTML.split("/");
  const branchName = branchNameFullSplit[branchNameFullSplit.length - 1];

  const branchNameMatches = branchName.match(appNameSelector);
  if (branchNameMatches && branchNameMatches.length > 0) {
    createButton(
      "Open <strong>APP</strong>",
      `https://${branchName.toLocaleLowerCase()}.app.q-ctrl.com/`,
      "#680CE9"
    );
  }
}

function addJiraButton() {
  const headerList = document.getElementsByClassName("gh-header-show");
  if (headerList && headerList.length > 0) {
    const header = headerList[0];
    const titleList = header.getElementsByClassName("js-issue-title");

    for (let i = 0; i < titleList.length; i += 1) {
      const title = titleList[i];

      const jiraIdList = title.innerHTML.match(jiraIdSelector);
      if (jiraIdList && jiraIdList.length > 0) {
        let jiraId = jiraIdList[0];
        jiraId = jiraId.replace("[", "");
        jiraId = jiraId.replace("]", "");

        createButton(
          "Open <strong>JIRA</strong>",
          `https://q-ctrl.atlassian.net/browse/${jiraId}`,
          "#0052CC"
        );
      }
    }
  }
}

function addButtons() {
  const githubActionPanelList = document.getElementsByClassName(
    "gh-header-actions"
  );

  if (githubActionPanelList && githubActionPanelList.length > 0) {
    const githubActionPanel = githubActionPanelList[0];
    const actionButtons = githubActionPanel.getElementsByClassName("btn");
    if (actionButtons && actionButtons.length > 0) {
      const child = actionButtons[actionButtons.length - 1];

      for (let i = 0; i < buttons.length; i += 1) {
        const btn = buttons[i];
        btn.className = child.className;
        githubActionPanel.appendChild(btn);
      }
    }
  }
}

function init() {
  addJiraButton();
  addAppButton();
  addButtons();
}

init();
