---
title: "Git good: the commands you'll actually use"
description: "A plain-language guide to the handful of Git commands that actually power day-to-day work."
author: "Bryan Jacinto"
category: "Tech"
tags: ["Git", "Version Control", "Developer Experience", "Learning to Code"]
pubDate: 2025-10-28
heroImage: "/hero-images/git.webp"
ogImage: "/hero-images/git.webp"
draft: false
---

Git is one of those tools that everyone tells you to learn, but nobody really explains properly.

I remember my first time using it. I was trying to push some code to GitHub, and the terminal threw an error I didn't understand. I Googled it, found a Stack Overflow thread, copied a command I barely comprehended, and hoped for the best. It worked, but I had no idea why.

That's how most people learn Git. Copy commands, pray they work, repeat.

After using Git consistently for a few months now, I've figured out which commands I actually use and which concepts matter versus which are just nice-to-know. And honestly, it's way less overwhelming than tutorials make it seem.

## Understanding the basics first

Before diving into commands, you need to understand what Git is actually doing.

Git is a distributed version control system created by Linus Torvalds in 2005. Unlike older systems where there's one central repository everyone connects to, Git gives everyone their own complete copy of the entire project history.

Think of it like Google Docs' version history, but for code. And instead of one master document, everyone has their own copy that they can sync with others.

The three states of files:

- **Working Directory:** Where you actually edit files
- **Staging Area:** Where you prepare changes before committing
- **Repository:** Where Git permanently stores committed snapshots

This three-stage workflow is what confused me at first. Why do I need to "add" files before committing them? Why not just commit everything I changed?

The staging area exists so you can be selective about what goes into each commit. You might have modified five files but only want to commit three of them. The staging area lets you control that.

## The commands I use every day

`git status` — This is my most-used command. It shows what's changed, what's staged, and what's untracked. I run it constantly, sometimes multiple times between other commands, just to know where I am.

```bash
git status
```

Always check status before committing to understand what you're actually about to save.

`git add` — Stage changes for commit. You can add specific files or use `git add .` to stage everything. I usually stage specific files so I know exactly what's going into each commit.

```bash
git add filename.js
git add .  # stages all changes
```

`git commit` — Save your staged changes. Write clear messages that explain what changed and why. Not just "fixed bug" but "fixed authentication bug caused by expired session tokens."

```bash
git commit -m "Add user authentication validation"
```

`git pull` — Fetch and merge changes from the remote repository. I learned the hard way to always pull before starting work. Otherwise, you end up with merge conflicts that could've been avoided.

```bash
git pull origin main
```

`git push` — Upload your commits to the remote repository. This is how you share your work with others or back up to GitHub.

```bash
git push origin branch-name
```

## Branching is what makes Git powerful

Branches let you work on new features without breaking the main codebase. This is essential for parallel development and keeping the main branch stable.

I didn't understand why branches mattered until I accidentally broke my main branch while experimenting with something. Had to revert everything. That's when it clicked: branches let you experiment safely.

```bash
git branch              # list branches
git branch feature-x    # create new branch
```

`git switch` — Move between branches. Older tutorials use `git checkout`, but `switch` is clearer.

```bash
git switch main
git switch -c new-feature  # create and switch in one command
```

`git merge` — Combine changes from one branch into another. Switch to the branch you want to merge into, then merge the other branch.

```bash
git switch main
git merge feature-x
```

Sometimes you'll hit merge conflicts. Git can't automatically combine changes, so you manually edit the conflicting files, then stage and commit the resolution. It's annoying but straightforward once you've done it a few times.

## When things go wrong

`git log` — View commit history. Use `--oneline` for a compact view or `--graph` to see branch structure.

```bash
git log --oneline --graph
```

`git diff` — See what changed. Without arguments, it shows unstaged changes. Use `--staged` to see what's ready to commit.

```bash
git diff              # unstaged changes
git diff --staged     # staged changes
```

`git reset` — Unstage files or undo commits. Be careful with this. `--soft` keeps your changes, `--hard` deletes them permanently.

```bash
git reset filename.js        # unstage a file
git reset --soft HEAD~1      # undo last commit, keep changes
git reset --hard HEAD~1      # undo last commit, delete changes
```

I've used `--hard` exactly once and immediately regretted it. Lost an hour of work. Double-check before using that flag.

`git stash` — Temporarily save changes without committing. Useful when you need to switch branches but aren't ready to commit.

```bash
git stash              # save current changes
git stash pop          # restore saved changes
```

## Setting up Git properly

Before anything else, configure Git with your name and email. This info appears in every commit.

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Check your current config anytime:

```bash
git config --list
```

## What actually helps in practice

- **Commit often.** Small, focused commits are easier to understand and revert if needed. Don't let changes pile up for days.
- **Write clear commit messages.** Your future self will thank you. Explain what changed and why, not just what you did.
- **Pull before you push.** Always sync with the remote first to avoid rejected pushes and unnecessary conflicts.
- **Branch for new work.** Don't work directly on `main`. Create a branch, make your changes, merge when it's tested.
- **Review before committing.** Use `git diff` and `git status` to see exactly what you're about to commit. Catch mistakes before they're permanent.

## Mistakes I've made

- **Committing to the wrong branch.** I've done this more than I care to admit. Always check which branch you're on before committing.
- **Forgetting to pull first.** Then you push and Git rejects it because the remote has changes you don't have. Annoying but fixable: pull, merge, then push.
- **Using `git add .` without thinking.** This stages everything, including files you didn't mean to commit. Always check `git status` first.
- **Not understanding merge conflicts.** Git marks conflicts clearly, but you need to actually resolve them and test that your code still works. Don't just pick one version blindly.
- **Committing sensitive data.** Once it's in Git history, it's incredibly hard to remove. Use `.gitignore` for config files, API keys, and anything sensitive.

## Advanced stuff you don't need yet

Once you're comfortable with the basics, these become useful:

- `git rebase` — Rewrite commit history for a cleaner sequence. Controversial because it changes history, but useful for keeping branches tidy.
- `git cherry-pick` — Apply specific commits from one branch to another. Handy for pulling hotfixes into multiple branches.
- `git tag` — Mark specific commits as milestones like releases.

But honestly, you don't need these right away. Master the basics first. Everything else you can learn when you actually need it.

## Takeaway

Git seems complicated, but you'll use maybe ten commands regularly: `status`, `add`, `commit`, `pull`, `push`, `branch`, `switch`, `merge`, `log`, and `diff`. Master these and you'll handle most daily work.

The key is understanding the three-stage workflow and committing often with clear messages. Branch for new work, pull before you push, and always check what you're about to commit. Everything else you can learn as you need it.
