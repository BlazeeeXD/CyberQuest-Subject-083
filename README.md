# CyberQuest

### A Narrative Cybersecurity Awareness Game Built with Phaser.js

CyberQuest is a browser-based educational game that teaches common cybersecurity mistakes through a short interactive story.

The player follows **Subject 083 ("Bob")** as he unknowingly encounters a series of everyday digital threats. Each scenario presents a simple decision where one poor choice results in compromise, while the correct decision allows Bob to continue his journey home.

Rather than presenting cybersecurity as lectures or quizzes, the game teaches through consequence-driven storytelling and environmental interaction.

---

## Why This Exists

Traditional cybersecurity awareness training is often presented through lengthy documents or static multiple-choice quizzes.

CyberQuest instead demonstrates common attacks through interactive scenarios where the player experiences the consequences of poor decisions firsthand.

The project was created for a cybersecurity-themed hackathon with the goal of combining education and humor into a short narrative experience.

---

## Design Goals

* **Interactive Learning** — Teach cybersecurity through gameplay rather than instruction
* **Narrative Driven** — A continuous story connecting every security scenario
* **Scene Isolation** — Each level functions as an independent Phaser scene
* **Reusable Systems** — Dynamic UI and death rendering shared across all levels
* **Minimal Controls** — Decision making over mechanical gameplay
* **Humorous Presentation** — Dry narration inspired by observational storytelling

---

## System Architecture

### Scene Flow

The game progresses through a linear scene pipeline.

1. Main Menu
2. Level One — Unknown USB Device
3. Level Two — Phishing Email
4. Level Three — Public Wi-Fi
5. Final Level — Smart Home Security
6. Ending Screen

Incorrect choices transition into a shared `DeathScene`, while successful choices advance to the next scenario.

---

## Core Systems

### Scene Management

Each level is implemented as an independent Phaser Scene responsible for loading its own assets, dialogue, interactions, and success conditions.

This keeps gameplay logic isolated while allowing shared systems to remain reusable.

---

### Dialogue System

Narration is displayed using a custom typewriter effect built with Phaser timed events.

Dialogue is rendered character-by-character while player interaction remains disabled until narration has completed.

This prevents accidental skipping and keeps pacing consistent across every level.

---

### Choice System

Each scenario presents contextual choices through dynamically generated UI components.

Selecting an option immediately locks all remaining interactions before routing either to the next scene or the shared death screen.

---

### Death Database

Rather than creating individual failure scenes, every incorrect decision routes into a centralized DeathScene.

Each failure references an internal database containing:

* Failure title
* Description
* Narrator commentary
* Background style

The scene dynamically builds the appropriate layout based on the supplied identifier.

---

### Animation System

Bob's movement is driven entirely through Phaser Tweens.

Each level automatically moves the character toward an interaction point before dialogue begins.

Sprite-sheet animations transition between idle and walking states throughout the sequence.

---

## Core Features

* Narrative-driven cybersecurity scenarios
* Typewriter dialogue system
* Dynamic choice interface
* Shared death rendering system
* Scene-based architecture
* Custom UI generated with Phaser Graphics
* Animated sprite workflow
* Browser-based gameplay with no backend

---

## Tech Stack

* **Language:** JavaScript (ES6)
* **Framework:** Phaser 3
* **Bundler:** Vite
* **Rendering:** HTML5 Canvas / WebGL
* **Deployment:** Vercel

---

## Project Structure

```text
CyberQuest/
├── public/
│   ├── assets/
│   ├── audio/
│   └── fonts/
├── src/
│   ├── scenes/
│   ├── objects/
│   ├── ui/
│   └── main.js
├── package.json
├── vite.config.js
└── index.html
```

---

## Gameplay Scenarios

### Level One — Unknown USB Device

Demonstrates the risks of connecting unknown removable media.

---

### Level Two — Phishing Email

Introduces social engineering through a fraudulent email requesting account confirmation.

---

### Level Three — Public Wi-Fi

Challenges the player to distinguish legitimate wireless networks from malicious access points.

---

### Final Level — Smart Home

Concludes the story with a physical cybersecurity scenario involving a compromised fingerprint scanner.

---

## Deployment

The project is deployed as a static web application using Vercel.

Each commit pushed to the main branch automatically triggers:

1. Dependency installation
2. Production build using Vite
3. Static asset optimization
4. Global deployment

No backend infrastructure is required.

---

## What This Project Demonstrates

* Scene-based game architecture
* Object-oriented game organization
* Event-driven UI systems
* Dynamic scene rendering
* Interactive dialogue systems
* State management
* Phaser.js development
* Browser game deployment

---

## Project Status

* Feature complete
* Playable from start to finish
* No backend dependencies
* Stable browser deployment

CyberQuest is a completed educational game demonstrating interactive storytelling, reusable scene architecture, and browser-based game development using Phaser.js.
