import React, { useState, useRef, useEffect } from "react";
import "./GeminiChat.css";
import chatboticon from "../../assets/chatbot-icon.gif";
import sendicon from "../../assets/send-icon.png";
import LazyImage from "./LazyImage";

export default function GeminiChatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);
  const botIndexRef = useRef(null); // Ref stable pour l'index du bot

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

  // Intro message
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

  // Sauvegarde messages
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  // Scroll automatique
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    // Message utilisateur
    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setInput("");

    // Bulle vide pour le bot
    setMessages((prev) => {
      botIndexRef.current = prev.length; // index stable pour loader et updates
      return [...prev, { role: "model", text: "" }];
    });
    setLoading(true);

    try {
      const response = await fetch(
        "https://mon-chatbot-backend.onrender.com/api/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed }),
        }
      );

      if (!response.ok) throw new Error(`Erreur serveur: ${response.status}`);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n\n");

        for (const line of lines) {
          if (!line.startsWith("data:")) continue;
          const data = line.replace("data: ", "");
          if (data === "[DONE]") {
            setLoading(false);
            return;
          }

          try {
            const parsed = JSON.parse(data);
            if (!parsed.text) continue;

            // Split par phrases pour effet phrase par phrase
            const phrases = parsed.text.match(/[^.?!]+[.?!]+/g) || [
              parsed.text,
            ];

            for (const phrase of phrases) {
              assistantText += phrase;

              // Update la bulle du bot
              setMessages((prev) => {
                const updated = [...prev];
                updated[botIndexRef.current] = {
                  role: "model",
                  text: assistantText,
                };
                return updated;
              });

              // pause courte entre chunks
              await new Promise((r) => setTimeout(r, 80));
              // pause plus longue si fin de phrase
              await new Promise((r) => setTimeout(r, 300));
            }
          } catch (err) {
            console.warn("Chunk non JSON :", data);
          }
        }
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "This message could not be sent, please try again.",
        },
      ]);
      setLoading(false);
    }
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
        <LazyImage src={chatboticon} alt="Start chat" />
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
                {loading &&
                  index === botIndexRef.current &&
                  msg.role === "model" && (
                    <div className="loader">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  )}
              </div>
            ))}
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
