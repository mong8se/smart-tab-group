export default async function autoGroup({ tabs, tabGroups }, tab) {
  // if tab has a groupId or doesn't have an opener, do nothing
  if (tab.groupId !== -1 || !tab.openerTabId) return;

  const opener = await tabs.get(tab.openerTabId);

  // if the opener has a groupId or is pinned, do nothing
  if (opener.groupId !== -1 || opener.pinned) return;

  const groupId = await tabs.group({
    tabIds: [opener.id, tab.id],
  });

  let title = opener.title;

  if (!title) {
    title = new URL(opener.url).hostname;

    if (title.startsWith("www.")) {
      title = title.slice(4);
    }
  }

  await tabGroups.update(groupId, {
    title,
  });
}
