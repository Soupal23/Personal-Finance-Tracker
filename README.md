# FinTrack — Personal Finance Dashboard

FinTrack is a responsive, single-page client-side budgeting application built from scratch to help users log financial transactions, manage income configurations, and evaluate categorical expense allocations in real time. 

Operating entirely as an in-memory data environment, all calculation pipelines compute transiently. This layout ensures absolute data privacy as zero transactional records persist on physical disk configurations or leave the client terminal sandbox.

**Live Project URL:** https://personal-finance-tracker-phi-seven.vercel.app/

---

## Key Architectural Capabilities

* **Dynamic Analytics Engine:** Processes incoming transactional multi-line state changes linearly to render instantaneous calculations for *Net Balance*, *Total Income*, and *Total Expenses*.
* **Functional Reduction Pipeline:** Aggregates variable expense records into atomic key-value data models using an optimized `Array.prototype.reduce` array-traversal engine.
* **Declarative Visual Analytics:** Configures an interactive vector Pie Chart layout that dynamically pairs custom semantic color vectors and precision tooltips to expense distributions.
* **Input Validation Guardrails:** Employs explicit data interceptor checking to guard structural logic against boundary anomalies, invalid text entries, or mutations where values $\le 0$.
* **Handcrafted Native UI:** Built completely on modular vanilla CSS3 flexbox and grid abstractions, featuring adaptive responsive breakdown triggers for both mobile terminals and wide-screen workspaces.

---

## System Tech Stack

* **Core Framework:** React.js (Functional architecture utilizing isolated State and Control lifecycle configurations)
* **Data Visualization:** Recharts (Declarative SVG charting components)
* **Layout Design:** CSS (Custom root variables, structural grid positioning, fluid sizing)
* **Build Configuration:** Vite (Next-generation high-performance frontend compilation tooling)
* **Hosting Pipeline:** Vercel (CI/CD integrated deployment automated via branch triggers)

---

## Technical Execution Highlights

### 1. The Optimization Reduction Matrix
Rather than invoking multiple iterative passes or mutating arrays inside visual presentation wrappers, category data transformations execute linearly over historical indices via mathematical aggregation closures:

### 2. State Input Interception Guardrails
Data handling functions sanitize input strings and verify mathematical boundaries before modifying state arrays to block zero values or structural data leakage:

## Local Installation & Development
To clone, set up, and evaluate this application workspace on your local environment, run the following commands:

### 1.Clone the Source Files:
git clone [https://github.com/Soupal23/Personal-Finance-Tracker.git](https://github.com/Soupal23/Personal-Finance-Tracker.git)

### 2.Navigate into the Project Root Directory:
cd FinTrack-App

### 3.Install Package Dependencies:
npm install

### 4.Launch the Local Development Server:
npm run dev

### 5.Examine the System:
Open your browser viewport and access the address provided in your execution terminal (typically http://localhost:5173).

