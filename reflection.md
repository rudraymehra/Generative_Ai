# Reflection — Scaler Persona Chatbot

## What Worked

Building this chatbot made the gap between vague prompts and specific prompts very obvious. My first drafts read like "you are a tech leader who values education." Every persona output the same polished, generic answer — confident and useless. The turning point was adding real, specific grounding: Anshuman's IIT Bombay background, his data-driven habits, his real founder journey from InterviewBit to Scaler. Once the prompt described a real person instead of a role, the outputs started sounding like that person.

The most surprising lesson was that few-shot examples carry more weight than the descriptive text. The description tells the model *what* the persona values; the examples show it *how* those values turn into actual sentences. When I gave Abhimanyu three examples of him explaining algorithms with complexity analysis, every later response followed that pattern — even on topics the examples never touched. Few-shot establishes a stylistic fingerprint the model holds onto.

Adding chain-of-thought instructions ("before answering, think through...") also produced a clear quality lift on complex questions. Without it, responses pattern-matched to the closest plausible answer. With it, they engaged with what was actually being asked.

## What the GIGO Principle Taught Me

GIGO is easy to repeat and surprisingly hard to internalize. My first prompt for Kshitij said "be a friendly teacher." The output was friendly — and shallow. Just motivational phrases. Once I rewrote it with specific pedagogy (build from what students already know, use analogies, never give direct LeetCode solutions), the output became a real teacher. The quality of the instruction directly capped the quality of the output.

The same showed up with constraints. "Be accurate" did nothing. "Do not fabricate specific statistics — use qualitative statements instead" actually changed behavior. Specific, testable constraints beat vague ones every time. Prompt engineering isn't about magic phrases; it's about giving the model a coherent, concrete picture of what it should be — like briefing a contractor.

## What I Would Improve

Two things stand out. First, each message is processed in isolation without summarized context, so long conversations drift. A production version would inject a running summary of prior turns into the system prompt. Second, persona evaluation is currently subjective. A proper version would use a second model as a judge — scoring whether each response matches the expected persona traits — which is exactly the kind of evaluation step we discussed in class.

I would also research the personas more deeply. Watching their actual talks and reading their LinkedIn posts would let me capture verbal tics and specific phrases each one actually uses, which is the difference between a good persona and one indistinguishable from the real person.
