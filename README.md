# Smart Tab Groups

An extension to create an automatic shallow tree of tab groups as you
open new tabs from existing ones. Especially useful for vertical tabs.

It keeps track of the groups it creates and if the smart group gets down
to one tab, it removes the group.

## The Problem

In Firefox and Chrome, if you create a tab group, and open a tab in that group,
and then open a link in a new tab, the new tab is automatically joined to the
group that spawned the tab.

However you have to remember to create that group beforehand. This extension
takes care of that part for you.

## The Solution

**When**: you open a new tab from an existing tab, and the existing tab is not pinned, nor is it already in a group.

**Then**: this extension creates a new group, and joins the parent and child tabs to that group.

**When**: you close a tab, if any smart groups have only one tab left

**Then**: they're ungrouped.

## The Details

There are preferences if you want to opt out of the smart un-grouping.

Also you can choose the naming strategy (only Firefox v139 and above) :

Use Title:
The name of the group is set to the title of the parent tab, if it has
one, otherwise the domain name is used.

Use URL:
The domain name is used.

Use None:
The group name is blank.

### The Permissions

- `tabs`: to access the tab title and URL for naming the group
- `tabGroups`: to set the group name
- `sessions`: to keep track of groups auto created, so they can be auto
  removed when back down to one tab

## Try it out!

https://addons.mozilla.org/en-US/firefox/addon/smart-tab-groups/
