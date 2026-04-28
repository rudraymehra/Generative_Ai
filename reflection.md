# Reflection — Scaler Persona Chatbot

## Prompt Engineering Effectiveness

Building this chatbot forced a close look at how much system prompt design matters. The first drafts of each persona were broad and generic — "you are a tech leader who values education." The outputs were indistinguishable: confident, polished, and utterly bland. Adding specificity was the turning point. Once Anshuman's prompt included his actual background (IIT Bombay, Goldman, Facebook, InterviewBit founding story) and his specific habits (citing metrics, first-principles framing), the outputs started sounding like a real person with a real worldview, not a generic executive.

The most instructive moment was realizing that the few-shot examples carry more weight than the descriptive text. The description tells the model *what* the persona values. The examples show it *how* those values translate into actual sentences and reasoning patterns. When I gave Abhimanyu three examples of him explaining algorithms step-by-step with complexity analysis, subsequent responses consistently maintained that pattern — even for topics the examples didn't cover. This matches what was discussed in class: few-shot prompting adds roughly 10% improvement, but for persona fidelity the effect is more dramatic because the examples establish a stylistic fingerprint.

## The GIGO Principle in Practice

"Garbage in, garbage out" is easy to say and surprisingly hard to internalize. My first system prompt for Kshitij read: "You are a friendly teacher. Be warm and encouraging." The outputs were warm but shallow — motivational phrases without substance. The persona felt like an auto-reply bot, not a mentor. Once I rewrote the prompt to include his specific pedagogy (build from what students already know, use analogies, end every answer with a next step, never give direct LeetCode solutions), the outputs improved substantially. The quality of the instruction directly set the ceiling on the output quality.

The same issue appeared with constraints. "Be accurate" produced the same vague responses as no constraint at all. "Do not fabricate specific statistics — use qualitative statements instead" actually changed behavior. Specific, testable constraints outperform general ones every time.

## Chain-of-Thought Instruction

Adding chain-of-thought framing to each persona's prompt ("before answering, think through...") had a measurable effect on response depth, especially for complex or ambiguous questions. Without it, the model tended to pattern-match to the nearest plausible response. With it, responses showed more deliberate engagement with what the question was really asking. The tradeoff is that CoT prompting adds latency since the model reasons before outputting — worth it for quality-sensitive interactions, less so for quick factual lookups.

## What I Would Improve

Two things stand out. First, the personas currently lack any memory of prior conversation — each message is processed in isolation without summarized context, which means long conversations can become incoherent. A production version would include a summarized conversation history injected into the system prompt. Second, persona evaluation is currently subjective. A proper assignment would include a rubric and an automated evaluation step — a second model judging whether the response matches the expected persona characteristics — which the class also discussed as a technique for improving output reliability through model-as-judge.

Overall, this project reinforced that prompt engineering is not about finding magic phrases but about giving the model a coherent, specific, and grounded picture of what it should be — the same way you would brief a skilled contractor. Precision in the brief determines the quality of the output.
