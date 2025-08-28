# 🎛️ Tone Picker AI Text Tool

The Tone Picker is a modern web application that allows users to adjust the tone of their text using a simple, intuitive interface. By leveraging the Mistral AI API, it can rewrite text to be more formal, casual, direct, or diplomatic. This project was developed as a take-home assessment, showcasing a full-stack implementation with a focus on code quality, user experience, and robust architecture.

---

## 🚀 Final Output & Links
- **Live Application:** [Tone Picker](https://tone-picker-tool.vercel.app/)
- **Backend Link:** (https://tonepickertool.onrender.com/)
- **Live Demo:** 


https://github.com/user-attachments/assets/0931b344-cb60-477d-b162-83e0b9118a0a


---

## Technical Decisions & Architecture

This section provides a deep dive into the architectural choices, trade-offs, and implementation details as required by the evaluation criteria.

### 1. 🏗 Technical Architecture

I opted for a **decoupled full-stack architecture** with a clear separation between the frontend and backend.

*   **Frontend:** A modern React single-page application (SPA) built with Vite. It is responsible for all UI rendering and client-side state management.
*   **Backend:** A lightweight Node.js server using the Express framework. Its sole responsibilities are to act as a secure proxy for the Mistral AI API and to handle request caching.

#### Architectural Trade-offs & Reasoning:

*   **Why a Decoupled Backend?**
    *   **Security:** This was the primary driver. Exposing an API key on the client-side is a major security vulnerability. By routing requests through a backend I control, the `MISTRAL_API_KEY` remains secure on the server and is never exposed to the user's browser.
    *   **Scalability & Control:** This architecture allows for future enhancements like implementing more complex caching strategies , rate limiting, or user authentication without needing to change the core frontend.
    *   **Trade-off:** The main trade-off is a slight increase in latency due to the additional network hop (Client -> Backend -> Mistral AI). However, for a user-facing tool where requests are not happening in rapid succession, the security and control benefits far outweigh this minor performance cost.

### 2. 🔄 State Management: The Undo/Redo Feature

The undo/redo functionality is a critical part of the user experience. I implemented this using a **custom React hook (`useHistory`)** to avoid unnecessary dependencies.

*   **Data Structure:** The core of the hook is an array (`history`) that stores a complete snapshot of the text at each change, and an index (`historyIndex`) that points to the current state in that array.

*   **How it Works:**
    1.  **Initial State:** The `useHistory` hook is initialized with the starting text. This becomes the first entry in the `history` array.
    2.  **Adding a New State:** When a user types or a tone is changed via the API, a new text state is created. The hook then truncates the `history` array from the current `historyIndex` onwards (this is crucial, as it clears any "redo" history when a new action is taken) and pushes the new state onto the end. The `historyIndex` is then updated to point to this new entry.
    3.  **Undo:** The `undo` function simply decrements the `historyIndex`, making the application render the previous state in the array. It cannot go below `0`.
    4.  **Redo:** The `redo` function increments the `historyIndex`, moving forward in the history. It cannot go beyond the last item in the array.

*   **Trade-offs & Reasoning:**
    *   **Why a Custom Hook?** For a feature this specific, bringing in a full state management library like Redux or MobX would be over-engineering. A custom hook keeps the logic encapsulated, reusable, and easy to understand without adding to the bundle size.
    *   **State Snapshots vs. Command Pattern:** I chose to save full snapshots of the text instead of commands (e.g., "inserted 'a' at index 5"). While this may use more memory for very large documents, it is far simpler to implement and less prone to bugs for this use case. Given the expected size of text inputs, this is a very reasonable trade-off for simplicity and reliability.

### 3. ⚠️ Error Handling and Edge Cases

A robust application must anticipate and gracefully handle failures.

*   **Client-Side:**
    *   **API Service Layer:** All `axios` calls are wrapped in a `try...catch` block. This catches network errors (e.g., user is offline) and non-successful HTTP status codes from the server.
    *   **UI Feedback:** The main `App` component maintains `isLoading` and `error` states.
        *   If an error occurs, the `error` state is updated with a user-friendly message, which is then displayed in the UI.
        *   The `finally` block in the API call handler ensures `setIsLoading(false)` is always called, preventing the UI from getting permanently stuck in a loading state.
    *   **Edge Case:** The undo/redo buttons are disabled (`disabled={!canUndo}`) when there is no history to move to, preventing invalid state changes.

*   **Server-Side:**
    *   **Input Validation:** The `/api/transform` endpoint first validates that the request body contains both `text` and `tone`. If not, it immediately returns a `400 Bad Request` response with a clear error message.
    *   **External API Failures:** The call to the Mistral AI API is also wrapped in a `try...catch` block. If Mistral's API is down or the API key is invalid, the server catches the error, logs it for debugging, and returns a generic `500 Internal Server Error` to the client. This prevents leaking sensitive implementation details about external services.

---

## 📊 Key features

### 1. Code Quality & Organization
- **Clean Monorepo Structure**: Client (React) + Server (Node.js) separation.  
- **Reusable Components**: `TextEditor`, `TonePicker`, `LoadingSpinner`, `useHistory`.  
- **Backend MVC**: Routes, Controllers, Services, Middleware structured clearly.

### 2. State Management (Undo/Redo)
- Custom hook **`useHistory`** handles text history.  
- Maintains an array of text states and a pointer (`historyIndex`).  
- **Undo/Redo** simply moves the pointer → efficient & lightweight.  

### 3. API Integration (Mistral AI)
- **Secure Proxy** via Express backend (API key hidden in `.env`).  
- **Loading Feedback**: Spinner + disabled UI during calls.  
- **Caching**: Identical `(text, tone)` requests cached in-memory for speed & cost reduction.

### 4. UI/UX Design    
- **Clear Feedback**: Disabled buttons, loading states, friendly error messages.
- **Clean Interface**: Simple interface with smooth interactions.

### 5. Documentation (README)
- Includes setup guide, tech stack, deployment, and architecture breakdown.

### 6. Error Handling
- **Frontend**: `try/catch` + non-blocking error UI.  
- **Backend**: Validation, proper HTTP status codes, and detailed server logs.  

---

## 🛠️ Technical Stack

**Frontend**  
- React (Vite)  
- Axios  
- React Icons 

**Backend**  
- Node.js + Express  
- Dotenv  
- In-memory caching  

**AI Service**  
- Mistral AI (`mistral-small-latest` model)  

**Deployment**  
- Frontend → Vercel  
- Backend → Render  

---

## ⚙️ Local Setup & Installation

### 🔑 Prerequisites
- Node.js **v20.19+** or **v22.12+**  
- npm **v10+**  
- A **Mistral AI API Key**

---

### 1. Clone the Repository
```
git clone https://github.com/Abhi-shek26/TonePickerTool.git
cd tone-picker-app
```

### 2. Backend Setup

Navigate to the server directory
```
cd server
```
Install dependencies
```
npm install
```

Create environment file and add your API key
```
cp .env
```

Now edit the .env file with your key

### 3. Frontend Setup

Navigate to the client directory
```
cd ../client
```

Install dependencies
```
npm install
```

### 4. Running the Application

Run both servers simultaneously in two separate terminals.

**Terminal 1 (Backend):**

From the /server directory
```
npm run dev
```


**Terminal 2 (Frontend):**

From the /client directory
```
npm run dev
```

The application will open at `http://localhost:5173`.


