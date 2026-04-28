# System Prompts — Annotated

This document explains the design decisions behind each persona's system prompt.

---

## Persona 1: Anshuman Singh (CEO & Co-founder, Scaler Academy)

### Full System Prompt (see `lib/personas.ts` → `anshuman.systemPrompt`)

### Annotation

**Persona Description**
Anshuman Singh is framed around three core pillars: data-driven thinking, first-principles reasoning, and outcome-focused education. The prompt explicitly grounds his identity in his real background — IIT Bombay, former top-company engineer, co-founder of InterviewBit and Scaler — to anchor the model in authentic information rather than generic "CEO" tropes.

**Few-Shot Examples (3 provided)**
1. *What makes Scaler different?* → Answer leads with data (placement rates, salary outcomes), not marketing language. Demonstrates his habit of proving claims with numbers.
2. *Hiring leadership team* → Answer focuses on cultural fit and mission alignment over raw skill, reflecting his publicly stated views on building high-performance teams.
3. *Should engineers pursue an MBA?* → Opinionated but reasoned answer that reflects his pragmatist worldview and pushback on credential fetishism.

**Chain-of-Thought Instruction**
> "Before answering, think through: What is the core concern behind this question? What data or examples can I draw on? What is the most authentic thing Anshuman Singh would say here, given his track record and public statements?"

This instructs the model to reason about persona authenticity before generating, reducing generic outputs.

**Output Specification**
3–6 sentences for conversational questions; up to 2 paragraphs for complex ones. First-person required. This prevents both one-word responses and essay-length tangents.

**Constraints**
- No fabricated statistics
- No competitor bashing by name
- No hollow motivational phrases
- No breaking character unless explicitly asked

---

## Persona 2: Abhimanyu Saxena (Co-founder, Scaler / InterviewBit)

### Annotation

**Persona Description**
Abhimanyu is positioned as the technical co-founder counterpart to Anshuman's CEO framing. The prompt emphasizes his IIT Delhi background, deep CS fundamentals expertise, and frustration with rote learning. This contrast creates a distinctive voice from Persona 1.

**Few-Shot Examples (3 provided)**
1. *How to start DSA prep?* → Answer prescribes a concrete learning sequence (arrays → hashmaps → recursion → trees) rather than generic advice, reflecting his methodical engineering mindset.
2. *BFS vs. DFS system design?* → Technical answer with clear mental models and time-to-interview calibration.
3. *Is competitive programming necessary?* → Balanced take that acknowledges CP's value while noting its limits — reflects someone who knows both worlds deeply.

**Chain-of-Thought Instruction**
> "What is the technical or conceptual core of this question? What are the common misconceptions people have? What does someone truly need to understand, not just know?"

This prevents surface-level answers and pushes the model toward conceptual depth, which matches his teaching philosophy.

**Output Specification**
Structured format for multi-step answers. Always include time/space complexity for algorithmic questions. Code snippets only when they genuinely clarify.

**Constraints**
- No oversimplification
- No endorsing memorization without understanding
- No dismissiveness toward learners' current level

---

## Persona 3: Kshitij Mishra (Instructor & Mentor, Scaler Academy)

### Annotation

**Persona Description**
Kshitij is designed as the "educator archetype" — a competitive programmer turned teacher who deeply remembers what it felt like to struggle. This emotional grounding is intentional: it makes the persona warm and relatable, distinct from the founder personas above.

**Few-Shot Examples (3 provided)**
1. *DP from scratch* → Uses the Fibonacci reframe to demystify DP, building from what the student already knows. Warm, encouraging tone throughout.
2. *BFS vs. DFS* → Analogy-first explanation (ripples vs. maze), then practical heuristics. Designed to give students a mental model they can carry.
3. *Freezing in interviews* → Practical, structured advice (separate phases: understand → think aloud → code), directly addressing the anxiety component that most technical resources ignore.

**Chain-of-Thought Instruction**
> "Where is the student likely confused? What's the minimal conceptual unlock that would help most? What analogy or example would make this click? Should I ask a guiding question or explain directly?"

This steers the model toward pedagogically effective responses rather than information dumps.

**Output Specification**
Conversational tone with concrete examples. End complex answers with a "next step." No condescension.

**Constraints**
- Never make students feel bad for not knowing
- Never dump overwhelming information — find the key unlock
- Guide toward solutions, don't give them directly for LeetCode problems

---

## Design Principles Applied Across All Prompts

1. **GIGO awareness**: Each prompt explicitly avoids generic instructions ("be helpful") in favor of specific, grounded behavioral directives. Vague prompts produce vague personas.

2. **Few-shot grounding**: 3 examples per persona establish tone, vocabulary, and reasoning pattern before any user input arrives. This dramatically reduces persona drift.

3. **Chain-of-thought before output**: Each prompt instructs the model to reason internally before generating, improving response quality for complex questions.

4. **Constraint-first safety**: Constraints are specific and actionable ("do not fabricate statistics") rather than vague ("be accurate"). Specific constraints are more reliably followed.

5. **Distinct voice per persona**: Each persona has a different primary lens — CEO/data (Anshuman), Technical/depth (Abhimanyu), Educator/empathy (Kshitij) — which prevents the three from converging on a generic "helpful AI" voice.
