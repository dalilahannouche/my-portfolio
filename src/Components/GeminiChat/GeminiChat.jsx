import React, { useState, useRef, useEffect } from "react";
import "./GeminiChat.css";
import chatboticon from "../../assets/chatbot-icon.gif";
import sendicon from "../../assets/send-icon.png";
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
    recognition.lang = "fr-FR"; // FR par défaut
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
  }

  const startListening = () => {
    if (!recognition) return alert("Reconnaissance vocale non supportée.");

    recognition.start();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => prev + " " + transcript);
    };
    recognition.onerror = (event) =>
      console.error("Erreur vocale :", event.error);
  };

  // Initialisation des messages
  useEffect(() => {
    const introMessage = {
      role: "model",
      text: "Hi! I'm Dalila, Gemini by sign and by API 😄 Would you like to know more about my experience, technical skills, or projects?",
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
    if (chatRef.current)
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, loading]);

  const sendMessage = (trimmed) => {
    if (!trimmed) return;

    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setInput("");
    setLoading(true);

    const url = `https://mon-chatbot-backend.onrender.com/api/chat?message=${encodeURIComponent(
      trimmed
    )}`;
    const evtSource = new EventSourcePolyfill(url);

    evtSource.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.done) {
          evtSource.close();
          setLoading(false);
        } else if (data.text) {
          setMessages((prev) => [...prev, { role: "model", text: data.text }]);
        }
      } catch (err) {
        console.error("Erreur parsing SSE :", err);
      }
    };

    evtSource.onerror = (err) => {
      console.error("Erreur SSE :", err);
      evtSource.close();
      setLoading(false);
    };
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input.trim());
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
                placeholder="Write or Talk ..."
              />
              <button
                type="button"
                className="mic-inside"
                onClick={startListening}
              >
                🎤
              </button>
            </div>
            <button onClick={() => sendMessage(input.trim())}>
              <img src={sendicon} alt="Send" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
