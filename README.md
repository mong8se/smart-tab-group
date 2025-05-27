# Smart Tab Groups

An extension to create an automatic shallow tree of tab groups as you
open new tabs from existing ones. Especially useful for vertical tabs.

## The Problem
In Firefox and Chrome, if you create a tab group, and open a tab in that group,
and then open a link in a new tab, the new tab is automatically joined to the
group that spawned the tab.

However you have to remember to create that group beforehand. This extension
takes care of that part for you.

## The Solution
**When**: you open a new tab from an existing tab, and the existing tab is not pinned, nor is it already in a group.

**Then**: this extension creates a new group, and joins the parent and child tabs to that group.

## The Details
The name of the group is set to the title of the parent tab, if it has
one, otherwise the domain name is used.

### The Permissions
- `tabs`: to access the tab title and URL for naming the group
- `tabGroups`: to set the group name

## Try it out!

https://addons.mozilla.org/en-US/firefox/addon/smart-tab-groups/
