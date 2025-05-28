export default async function autoGroup(
  { api: { tabs, tabGroups }, internalTab },
  newTab,
) {
  // if the new tab already has a groupId or doesn't have an opener, do nothing
  switch (true) {
    case newTab.groupId !== tabGroups.TAB_GROUP_ID_NONE:
    case !newTab.openerTabId:
      return;
  }

  const openerTab = await tabs.get(newTab.openerTabId);

  // if the opener already has a groupId or is pinned, do nothing
  switch (true) {
    // due to this issue in Chrome: https://issues.chromium.org/issues/406427231
    case openerTab.url.startsWith(internalTab):
    case openerTab.groupId !== tabGroups.TAB_GROUP_ID_NONE:
    case openerTab.pinned:
      return;
  }

  const groupId = await tabs.group({
    tabIds: [openerTab.id, newTab.id],
  });

  let title = openerTab.title;

  if (!title) {
    title = new URL(openerTab.url).hostname;

    if (title.startsWith("www.")) {
      title = title.slice(4);
    }
  }

  await tabGroups.update(groupId, {
    title,
  });
}
