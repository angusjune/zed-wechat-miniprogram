# Issue tracker: GitHub

Issues and specs for this repo live in GitHub Issues for `angusjune/zed-wechat-miniprogram`. Use the `gh` CLI with `--repo angusjune/zed-wechat-miniprogram` for all operations.

## Conventions

- **Create an issue**: `gh issue create --repo angusjune/zed-wechat-miniprogram --title "..." --body "..."`. Use a heredoc for multi-line bodies.
- **Read an issue**: `gh issue view <number> --repo angusjune/zed-wechat-miniprogram --comments`, filtering comments with `jq` and also fetching labels.
- **List issues**: `gh issue list --repo angusjune/zed-wechat-miniprogram --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'` with appropriate `--label` and `--state` filters.
- **Comment on an issue**: `gh issue comment <number> --repo angusjune/zed-wechat-miniprogram --body "..."`
- **Apply or remove labels**: `gh issue edit <number> --repo angusjune/zed-wechat-miniprogram --add-label "..."` / `--remove-label "..."`
- **Close**: `gh issue close <number> --repo angusjune/zed-wechat-miniprogram --comment "..."`

## Pull requests as a triage surface

**PRs as a request surface: no.** _(Set to `yes` if this repo treats external PRs as feature requests; `/triage` reads this flag.)_

When set to `yes`, PRs run through the same labels and states as issues, using the `gh pr` equivalents:

- **Read a PR**: `gh pr view <number> --comments` and `gh pr diff <number>` for the diff.
- **List external PRs for triage**: `gh pr list --state open --json number,title,body,labels,author,authorAssociation,comments`, then keep only `authorAssociation` values of `CONTRIBUTOR`, `FIRST_TIME_CONTRIBUTOR`, or `NONE`.
- **Comment, label, or close**: use `gh pr comment`, `gh pr edit`, and `gh pr close`.

GitHub shares one number space across issues and PRs, so a bare `#42` may be either. Resolve it with `gh pr view 42` and fall back to `gh issue view 42`.

## When a skill says "publish to the issue tracker"

Create a GitHub issue in `angusjune/zed-wechat-miniprogram`.

## When a skill says "fetch the relevant ticket"

Run `gh issue view <number> --repo angusjune/zed-wechat-miniprogram --comments`.

## Wayfinding operations

Used by `/wayfinder`. The **map** is a single issue with **child** issues as tickets.

- **Map**: a single issue labelled `wayfinder:map`, holding the Notes, Decisions-so-far, and Fog body.
- **Child ticket**: an issue linked to the map as a GitHub sub-issue. Where sub-issues aren't enabled, add the child to a task list in the map body and put `Part of #<map>` at the top of the child body. Labels use `wayfinder:<type>` (`research`, `prototype`, `grilling`, or `task`). Once claimed, assign the ticket to the driving developer.
- **Blocking**: use GitHub's native issue dependencies. Add an edge with `gh api --method POST repos/angusjune/zed-wechat-miniprogram/issues/<child>/dependencies/blocked_by -F issue_id=<blocker-db-id>`, where `<blocker-db-id>` is the blocker's numeric database ID. Where dependencies aren't available, use a `Blocked by: #<n>, #<n>` line at the top of the child body.
- **Frontier query**: list the map's open children, drop any with an open blocker or assignee, and take the first in map order.
- **Claim**: `gh issue edit <n> --repo angusjune/zed-wechat-miniprogram --add-assignee @me`.
- **Resolve**: comment with the answer, close the ticket, then append a context pointer to the map's Decisions-so-far.
