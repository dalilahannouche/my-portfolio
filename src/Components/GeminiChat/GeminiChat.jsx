import React, { useState, useRef, useEffect } from "react";
import "./GeminiChat.css";
import chatboticon from "../../assets/chatbot-icon.gif";
import sendicon from "../../assets/send-icon.png";
// EventSourcePolyfill si tu veux supporter POST SSE
import { EventSourcePolyfill } from "event-source-polyfill";

export default function GeminiChatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  if (recognition) {
    recognition.lang = "en-EN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
  }

  const startListening = () => {
    if (!recognition) {
      alert("La reconnaissance vocale n’est pas supportée par ce navigateur.");
      return;
    }

    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => prev + " " + transcript);
    };

    recognition.onerror = (event) => {
      console.error("Erreur reconnaissance vocale :", event.error);
    };
  };

  // Message d'intro
  useEffect(() => {
    const introMessage = {
      role: "model",
      text: "Hi! I'm Dalila, Gemini by sign and by API 😄 Would you like to know more about my experience, technical skills, or the projects I’ve worked on?",
    };

    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      const parsed = JSON.parse(savedMessages);
      const exists = parsed.some(
        (msg) => msg.role === "model" && msg.text.includes("Gemini by sign")
      );
      setMessages(exists ? parsed : [introMessage, ...parsed]);
    } else {
      setMessages([introMessage]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // =========================
  // sendMessage modifié pour SSE
  // =========================
  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    // Ajouter le message utilisateur
    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setInput("");
    setLoading(true);

    // EventSourcePolyfill permet POST SSE
    const eventSource = new EventSourcePolyfill(
      "https://mon-chatbot-backend.onrender.com/api/chat",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      }
    );

    let botMessage = "";

    eventSource.onmessage = (e) => {
      const data = JSON.parse(e.data);

      if (data.done) {
        // Fin du message : remplacer le message "model-typing"
        setMessages((prev) => [
          ...prev.filter((m) => m.role !== "model-typing"),
          { role: "model", text: botMessage },
        ]);
        setLoading(false);
        eventSource.close();
      } else if (data.text) {
        // Affichage progressif du texte
        botMessage += data.text;
        setMessages((prev) => {
          // Supprimer ancien message temporaire
          const others = prev.filter((m) => m.role !== "model-typing");
          return [...others, { role: "model-typing", text: botMessage }];
        });
      } else if (data.error) {
        setMessages((prev) => [
          ...prev,
          { role: "model", text: data.error },
        ]);
        setLoading(false);
        eventSource.close();
      }
    };

    eventSource.onerror = (err) => {
      console.error("Erreur SSE:", err);
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "Erreur serveur, veuillez réessayer." },
      ]);
      setLoading(false);
      eventSource.close();
    };
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <div className="chat-button" onClick={() => setOpen(true)}>
        <img src={chatboticon} alt="Start chat" />
      </div>

      {open && (
        <div className="chat-window open">
          <button className="close" onClick={() => setOpen(false)}>
            Close
          </button>

          <div className="chat" ref={chatRef}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.role === "user"
                    ? "user"
                    : msg.role === "model-typing"
                    ? "model-typing"
                    : msg.text.includes("could not")
                    ? "error-model"
                    : "model"
                }
              >
                <p>{msg.text}</p>
              </div>
            ))}
            {loading && <div className="loader"></div>}
          </div>

          <div className="input-area">
            <div className="input-wrapper">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Write or speak ..."
              />
              <button
                type="button"
                className="mic-inside"
                onClick={startListening}
              >
                🎤
              </button>
            </div>
            <button onClick={sendMessage}>
              <img src={sendicon} alt="Send" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
