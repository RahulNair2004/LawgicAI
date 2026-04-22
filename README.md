# 🧠 LawgicAI – AI-Powered Legal Document Assistant

LawgicAI is a **Retrieval-Augmented Generation (RAG)-based legal assistant** that enables users to query and understand complex legal documents using natural language. It combines **semantic search** with **LLM reasoning** to deliver accurate, context-aware, and explainable responses.

---

## 🚀 Features

- 🔍 **Semantic Search (Vector Retrieval)**  
  Converts legal documents into embeddings for efficient similarity search

- 🧠 **RAG Pipeline**  
  Retrieves relevant context and feeds it to an LLM for grounded responses

- 📄 **Document Ingestion Pipeline**  
  Supports scalable indexing of large legal datasets

- ⚡ **Low-Latency Querying**  
  Optimized for real-time interaction

- 🛡️ **Reduced Hallucination**  
  Responses are grounded in retrieved legal context

---

## 🏗️ Architecture


User Query
↓
Embedding Model
↓
Vector Database (FAISS / Pinecone)
↓
Top-K Relevant Chunks
↓
LLM (LLaMA / OpenAI)
↓
Final Context-Aware Answer


---

## 🧰 Tech Stack

**Backend**
- Python
- FastAPI / Flask
- FAISS / Pinecone

**Frontend**
- React
- Tailwind CSS
- Vite

**AI/ML**
- RAG Architecture
- LLMs (LLaMA / OpenAI)

---

## 📁 Project Structure


LawgicAI/
├── backend/
│ ├── api/
│ ├── services/
│ ├── utils/
│ ├── vector_store/
│ ├── app.py
│ └── config.py
│
├── frontend/
│ ├── src/
│ ├── public/
│ └── package.json
│
├── .gitignore
├── README.md
└── .env.example


---

## ⚙️ Setup Instructions

### 1. Clone the repository

git clone https://github.com/your-username/LawgicAI.git

cd LawgicAI


---

### 2. Backend Setup

cd backend
pip install -r requirements.txt


Create `.env` file:

OPENAI_API_KEY=your_api_key


Run backend:

python app.py


---

### 3. Frontend Setup

cd frontend
npm install
npm run dev


---

## 🔐 Environment Variables

Create a `.env` file in `backend/`:


OPENAI_API_KEY=your_key_here
VECTOR_DB_PATH=your_path


---

## 🧪 Example Query


"What are the legal consequences of breach of contract?"


---

## 📈 Future Improvements

- Real-time document updates  
- Citation highlighting  
- Explainability dashboard  
- Multi-language support  

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.

---

## 📜 License

This project is licensed under the MIT License.

---

## 💡 Why This Project Matters

Legal documents are complex and time-consuming to analyze. LawgicAI simplifies this by providing **instant, context-aware insights**, making legal understanding more accessible.

---

⭐ If you found this project useful, consider starring the repo!
