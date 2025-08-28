# 🎛️ Tone Picker AI Text Tool

The **Tone Picker** is a modern web application that allows users to adjust the tone of their text using a simple, intuitive interface.  
By leveraging the **Mistral AI API**, it can rewrite text to be more **formal, casual, direct, or diplomatic**.  



---

## 🚀 Final Output & Links
- **Live Application:** [Tone Picker](https://tone-picker-tool.vercel.app/)
- **Backend Link:** (https://tonepickertool.onrender.com/)
- **Live Demo:** 


https://github.com/user-attachments/assets/0931b344-cb60-477d-b162-83e0b9118a0a


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

