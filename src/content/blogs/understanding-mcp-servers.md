---
title: "Understanding MCP servers: AI's answer to USB-C"
description: "A plain-language guide to the Model Context Protocol: what MCP servers are, the problem they solve, how they actually work, and why everyone's suddenly building them."
author: "Bryan Jacinto"
category: "Tech"
tags: ["MCP", "Model Context Protocol", "AI Tools", "Developer Experience"]
pubDate: 2026-06-24
heroImage: "/hero-images/mcp.webp"
ogImage: "/hero-images/mcp.webp"
draft: false
---

If you've spent any time around AI tools this past year, you've probably seen the letters "MCP" thrown around like everyone already knows what they mean. I nodded along for a while too, honestly. It sounded like one more acronym in a field that invents three new ones a week.

Then I started actually using MCP servers in my own workflow, and it clicked. This is one of those things that changes how you think about what AI is good for.

So let me explain it the way I wish someone had explained it to me. From the ground up, no assumed knowledge.

## What even is MCP?

MCP stands for **Model Context Protocol**. Anthropic open-sourced it near the end of 2024, and it's since become something close to an industry standard, with other major AI players adopting it too.

In plain terms, MCP is a standard way for AI applications to connect to external tools, data, and systems. That's the whole idea. It gives AI assistants and the outside world a shared language, a common set of rules they both follow so they can talk to each other without custom wiring every single time.

The analogy that finally made it stick for me, and the one Anthropic uses itself, is **USB-C**.

Before USB-C, every device had its own plug. Your phone, your camera, your laptop, your headphones. Each one needed a specific cable, and half the fun of travel was figuring out which tangle of cords you forgot. USB-C replaced all of that with one connector. One port, and suddenly everything talks to everything.

MCP is that, but for AI. Instead of every AI app inventing its own way to connect to Google Drive, then Slack, then your database, then your CRM, there's now one standard plug. Build a connector once, and any MCP-aware AI app can use it.

## The problem it actually solves

To appreciate why this matters, you have to understand the mess it replaces.

Say you're building an AI assistant, and you want it to read files from Google Drive, send messages in Slack, and pull records from a Postgres database. Without a standard, you'd write three custom integrations, one for each service, each with its own quirks, auth, and edge cases.

Now say there are five different AI apps that all want those same three integrations. That's fifteen separate integrations to build and maintain. The math gets ugly fast. Developers call this the **M×N problem**: M apps times N tools equals a combinatorial explosion of glue code that nobody wants to write or maintain.

MCP turns that M×N problem into a tidy **M+N**. Each AI app implements the MCP standard once. Each tool implements it once. Now any app can talk to any tool, no bespoke glue required. The filesystem connector you wrote doesn't care whether it's talking to Claude, or some other assistant, or a script you cobbled together at 2am. It just speaks MCP.

That shift, from "rebuild the same integration over and over" to "build it once, plug in everywhere," is what makes MCP worth caring about.

## The three moving parts

MCP has a simple architecture once you see the shape of it. There are three roles:

- **The Host.** The AI application you're actually using. Claude Desktop, an IDE extension, a coding agent, a chat app. This is the thing the user interacts with.
- **The Client.** Lives *inside* the host and manages a one-to-one connection to a single server. Think of it as the host's diplomat: one client per server, handling the back-and-forth.
- **The Server.** A lightweight program that exposes some capability to the AI. A GitHub server, a Google Drive server, a "read my company's internal docs" server. This is the part people usually mean when they say "an MCP server."

The short version: the **host** is the application, the **client** is the connection, and the **server** is the thing on the other end offering up tools and data. A host can run several clients at once, each wired to a different server. That's how a single AI app ends up connected to your files, your calendar, and your codebase all at the same time.

## Tools, resources, and prompts

So what does a server *give* the AI? MCP servers offer up to three kinds of things, and understanding these three is most of understanding MCP:

- **Tools.** Actions the model can take. "Create a calendar event." "Run this query." "Open a pull request." Tools are how the AI actually gets things done in the world. The model decides when to call them.
- **Resources.** Data the host can pull in for context. A file, a database record, a document. Resources are read-oriented: they feed your actual information into the conversation, so the AI has something real to work with.
- **Prompts.** Reusable templates or workflows a server can offer. Think pre-baked starting points, like "summarize this PR using our team's format," that the user can trigger on demand.

Tools get most of the attention, because they're what turn a chatbot into something that can act. But resources matter just as much. They're what let an AI work from *your* actual context: your files, your data, your specifics.

## The wiring underneath

At the message level, MCP messages are sent using **JSON-RPC 2.0**, a long-established and pleasantly boring standard for structured request and response messaging. You don't need to memorize that. The takeaway is that MCP runs on proven, well-understood plumbing.

There are two main ways a host and server connect:

- **Locally, over stdio.** The server runs as a process right on your machine and communicates through standard input and output. Good for things that touch local files or local apps.
- **Remotely, over HTTP.** The server runs somewhere else and the host talks to it over the network, using what's called the Streamable HTTP transport. Good for hosted services and team-wide tools.

In practice, wiring up a local server can be as simple as a few lines of config telling your AI app what to run. Here's roughly what connecting a filesystem server looks like:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/me/Documents"
      ]
    }
  }
}
```

That's the host being told: "start this server, point it at my Documents folder, and let the AI use it." Once it's connected, the assistant can read and work with those files directly. No copy-pasting, no uploading the same document for the fifth time.

## Where it earns its keep

This stopped being abstract for me the moment I connected a few servers to my own setup.

Suddenly the AI I was working with could pull from my Google Drive, draft inside my email, look things up in design tools, and reach into analytics, all without me playing courier between a dozen tabs. The work that used to be "ask the AI, copy the answer, paste it into the real tool, repeat" collapsed into the AI just *doing it* where the work actually lives.

For someone whose job is content and SEO, that's a big deal. A lot of my value is in connecting information: what's ranking, what competitors are doing, what the client actually needs. MCP lets an AI assistant tap into those sources directly, instead of me being the slow manual bridge between them.

And because it's a standard, the same connectors work across tools, so the setup I build isn't tied to any single app.

## The catch (because there's always one)

I'm not going to pretend this is all upside. A few honest caveats.

**You're handing AI real access.** A tool that can send emails or delete records is a tool that can send the *wrong* email or delete the *wrong* record. The convenience cuts both ways, and you want to think carefully about what you connect and what permissions you grant.

**Trust matters a lot.** An MCP server is just a program. If you install one from a random source, you're running someone else's code with access to your data. Stick to servers you trust, the same way you'd be careful about browser extensions or npm packages. "It's open source" does not automatically mean "it's safe."

**Auth is still maturing.** Hosted servers usually need real authentication, like OAuth, and getting credentials wired up correctly isn't always frictionless yet. It's getting better fast, but it's not always plug-and-play.

**It's young.** MCP is barely more than a year old. The ecosystem is growing quickly, but you'll occasionally hit rough edges, half-documented servers, and things that change between versions. That's the cost of being early.

None of this is a dealbreaker. It just means you should treat MCP like what it is: a powerful tool with real access to your stuff. Respect that and you're fine.

## Takeaway

MCP is a standard that lets AI applications connect to tools and data without custom integrations for every combination. USB-C for AI. A **host** (your AI app) runs **clients** that connect to **servers**, and those servers expose **tools** (actions), **resources** (data), and **prompts** (templates). It all runs on boring, proven plumbing, and it works locally or over the network.

But the architecture isn't the interesting part. What matters is the reach. Once an assistant can plug into the systems where your work actually lives, your files, your tools, your data, it becomes a real part of how you get things done. MCP is what's turning that into the normal way of working, and it's happening fast.

If you want to go deeper, the [official MCP documentation](https://modelcontextprotocol.io/) is the place to start, and there's already a healthy library of ready-made servers you can connect today. I'd start by plugging one into a tool you already use and watching what changes. That's when it clicks.
