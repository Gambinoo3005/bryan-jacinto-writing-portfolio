---
title: "My thoughts on Gemini 3 (this model is insane)"
description: "After weeks of daily testing, Gemini 3 isn't just better at benchmarks—it's better at understanding what you actually need without excessive prompting."
author: "Bryan Jacinto"
category: "Tech"
tags: ["AI Tools", "Gemini", "Large Language Models", "Developer Experience"]
pubDate: 2025-11-29
heroImage: "/hero-images/gemini_3.webp"
ogImage: "/hero-images/gemini_3.webp"
draft: false
---

Google dropped Gemini 3 back on November 18th, and I'm just now getting around to writing about it.

I know, I know. I'm late to the party.

Everyone else was posting their hot takes the same day, and here I am showing up weeks later like "hey guys, did you hear about this new model?"

Look, I've been busy actually using it instead of rushing to publish thoughts after five minutes of testing. But also, yeah, I'm just slow sometimes.

Anyway, I've spent the past few weeks playing with Gemini 3, and I'm not exaggerating when I say this thing is wild.

I use AI every single day. Gemini for all-around tasks, Claude for coding, ChatGPT for research and brainstorming.

I'm not easily impressed by "new AI model" announcements anymore because they all start to blur together after a while. Faster, smarter, better at reasoning. Sure, whatever.

But Gemini 3 feels different. Not just incrementally better. Actually different in ways that made me stop and think "wait, how did it do that?"

## The Numbers Are Ridiculous

Let me get the benchmark stuff out of the way first because the scores are genuinely impressive.

Gemini 3 Pro topped LMArena with 1501 Elo.

For context, that's the highest score any model has achieved on that leaderboard. It got 37.5% on Humanity's Last Exam without using any tools, which is a benchmark designed to test PhD-level reasoning. It scored 91.9% on GPQA Diamond, another academic reasoning test.

On math specifically, it hit 23.4% on MathArena Apex, setting a new record for frontier models. For multimodal reasoning, it got 81% on MMMU-Pro and 87.6% on Video-MMMU.

These aren't small improvements. These are "what the hell happened" jumps.

But benchmarks are benchmarks. What matters is how it actually works when you use it.

## It Reads the Room

Here's what stood out immediately: Gemini 3 is way better at understanding what you're actually asking for without you having to spell everything out.

I asked it to help me understand a technical concept, and instead of giving me a wall of text, it generated code for an interactive visualization. I didn't ask for that. It just figured out that's what would be most helpful.

I gave it a dense research paper and asked it to help me learn the material. It generated interactive flashcards and suggested ways to break down the concepts. Again, I didn't specify the format. It inferred that from context.

Google's calling this "reading the room," and it's accurate.

The model picks up on subtle cues about what you need, not just what you said. It feels less like prompting an AI and more like working with someone who gets it.

## The Multimodal Stuff Is Where It Gets Crazy

Gemini's always been good at handling multiple types of input like text, images, video, audio. But Gemini 3 takes that to another level.

It can analyze videos and understand not just what's on screen, but the logic flow and spatial relationships across time. Google showed examples of it analyzing pickleball match videos to identify form issues and generate training plans.

The 1 million token context window means you can feed it massive amounts of information: entire codebases, long video lectures, stacks of research papers. And the best part is it actually processes all of it.

I tested this by giving it three hour-long YouTube tutorials on React and asking it to summarize the key differences in approach between them. It did. Accurately. That's insane.

## Gemini 3 Deep Think Pushes Even Further

There's also Gemini 3 Deep Think mode, which is basically Gemini 3 but with even more reasoning power.

It scored 41% on Humanity's Last Exam and 93.8% on GPQA Diamond. More impressively, it hit 45.1% on ARC-AGI-2, a benchmark designed to test novel problem-solving ability. That's a huge deal because ARC-AGI is specifically built to measure reasoning on challenges the model has never seen before.

Deep Think mode isn't available to everyone yet. Google's doing safety testing and will roll it out to Ultra subscribers soon. But the benchmarks suggest it's a step-change in capability, not just a slight bump.

## The Coding Improvements Are Real

I typically use Claude for general coding, Codex for intense backend stuff, and Gemini for tasks that need its large context window. Gemini 3 might actually be good at some front-end work now too.

It topped WebDev Arena with 1487 Elo, meaning it's now the best model for web development tasks according to that benchmark. On SWE-bench Verified, which measures coding agents, it scored 76.2%.

But what matters more than scores is how it feels to use. I asked it to build a simple interactive data visualization. Not only did it generate the code, but the result was actually usable. Not placeholder code I'd have to fix. Working, interactive UI with smooth animations.

I then asked it to modify the visualization to show different data. It did that too, understanding the structure of what it had built and making targeted changes without breaking anything.

Google also launched something called Google Antigravity, an agentic development platform where AI agents can autonomously plan and execute complex software tasks.

The demo showed an agent building a flight tracker app from scratch: planning, coding, testing, all autonomously. That's the agentic future everyone's been talking about, actually shipping.

I tried Antigravity right away when they launched the public preview on November 20th. I like the features like the planning view, task breakdown, implementation plan.

But honestly, it feels like a copy of Windsurf. The rate limits are generous but not quite enough, and there are some QoL features missing. It needs more work before it feels like a complete product.

## Long-Horizon Planning That Actually Works

One of the big improvements is Gemini 3's ability to plan and execute over longer time horizons without getting distracted or drifting off task.

Google tested this with something called Vending-Bench 2, which simulates managing a vending machine business for a full year. The model needs to make consistent decisions, use tools correctly, and stay on task for an extended period. Gemini 3 Pro dominated it, maintaining consistent performance and driving higher returns than other models.

This matters for real-world use. AI that can handle multi-step workflows from start to finish without you babysitting every step is actually useful.

Google AI Ultra subscribers can try these agentic capabilities with Gemini Agent, which can handle tasks like booking local services or organizing your inbox.

I haven't tried Gemini Agent yet since I'm not an Ultra subscriber, but the demos look promising. If it actually works as advertised, this is the kind of AI assistance that changes how you work, not just speeds up what you already do.

## Where It's Available

Gemini 3 rolled out on November 18th across Google's ecosystem. It's in the Gemini app for everyone, in AI Mode in Search for Pro and Ultra subscribers, and available to developers through AI Studio, Vertex AI, and the new Antigravity platform.

It's also available in third-party tools like Cursor, GitHub Copilot, JetBrains, and Replit. That's huge because it means I can start using it in my actual workflow immediately without switching tools.

Deep Think mode rolled out to Ultra subscribers a few weeks after launch, following additional safety testing. By the time I'm writing this, it's already available if you're subscribed.

## The "But" Section

No model is perfect, and Gemini 3 has limitations.

It has rate limits. Gemini 3 is free to try on the Gemini website and app, but free users hit limits pretty quickly. If you're using it heavily, you'll run into those caps. Antigravity is also free to try with rate limits, which are generous but can still be restrictive if you're doing intensive work.

It's still new. New models have bugs and weird behaviors that only surface after widespread use. I've already hit a few quirks where it misunderstood what I wanted or generated code that didn't quite work.

The agentic stuff needs refinement. Gemini Agent is available to Ultra subscribers, but it's still early. Multi-step autonomous workflows sound great in demos but can be fragile in practice. Antigravity has potential but feels incomplete compared to more mature tools like Windsurf.

It's competing in a crowded space. Claude Sonnet 4.5 is excellent. GPT 5.1 is excellent. Gemini 3 is excellent. They're all good!

At this level, choosing between them comes down to specific use cases and personal preference.

## Takeaway

I'm impressed. Genuinely.

And look, I've had a few weeks to actually live with this model instead of forming opinions after a few hours of testing. That extra time confirmed my initial reaction: Gemini 3 isn't just "better at benchmarks." It's better at understanding what I need, handling complex multimodal inputs, and generating useful outputs without excessive prompting.

The coding improvements are noticeable. The long-horizon planning capabilities suggest we're getting closer to AI that can actually handle end-to-end workflows autonomously. And the fact that it's been stable and consistent over weeks of daily use says something about how well it was tested before launch.

Will I switch from Claude to Gemini 3 entirely? I actually thought about it, maybe next month, I will give the subscription a shot.

I like Claude's writing style, and I'm already integrated into that workflow. But for certain tasks, especially multimodal reasoning, long-context analysis, and coding, Gemini 3 has become my first choice over the past few weeks.

The fact that it's available in Cursor means I can use it for tab completion and coding assistance without changing my setup. That's huge.

If you use AI regularly and somehow haven't tried Gemini 3 yet (join the club, I guess), it's worth checking out. Not because of the benchmark scores, but because it genuinely feels like a step forward in how these models understand and respond to what you're asking.

Better late than never, right?
