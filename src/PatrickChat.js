// PatrickChat.js
import React, { useState, useEffect, useRef } from "react";
import "./PatrickChat.css";

const PATRICK_AVATAR = "./patrick.png";
const USER_AVATAR = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

// URL de votre backend FastAPI
const API_URL = "https://chat-bruti-back-end.onrender.com/chat";

const PatrickChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Patrick Lmubeydel. Do you want to go jellyfishing?",
      sender: "bot",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (inputText.trim() === "") return;

    const newMessage = {
      id: Date.now(),
      text: inputText,
      sender: "user",
    };

    setMessages((prev) => [...prev, newMessage]);
    const userInput = inputText;
    setInputText("");
    setIsTyping(true);
    setError(null);

    try {
      // Appel API au backend FastAPI
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Ajouter la réponse du bot
      const botResponse = {
        id: Date.now() + 1,
        text: data.response || "Hmm... je suis perdu dans mes pensées 🤔",
        sender: "bot",
        status: data.status,
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    } catch (err) {
      console.error("Erreur lors de l'appel API:", err);
      setError("Oups! Patrick a perdu la connexion 🌊");

      const errorMessage = {
        id: Date.now() + 1,
        text: "Désolé, j'ai perdu ma connexion au fond de l'océan... 🐚 Réessaye plus tard!",
        sender: "bot",
      };

      setMessages((prev) => [...prev, errorMessage]);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      {/* Animated underwater background */}
      <div className="ocean-background">
        {/* Rayons de soleil */}
        <div className="sun-rays" />

        {/* SOL SABLEUX SEULEMENT */}
        <div className="sandy-floor" />

        {/* Bulles flottantes */}
        {[...Array(25)].map((_, i) => (
          <div
            key={`bubble-${i}`}
            className="bubble"
            style={{
              width: `${Math.random() * 40 + 15}px`,
              height: `${Math.random() * 40 + 15}px`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 8 + 6}s`,
              animationDelay: `${Math.random() * 5}s`,
              "--drift": `${(Math.random() - 0.5) * 100}px`,
            }}
          />
        ))}

        {/* Particules de plancton */}
        {[...Array(40)].map((_, i) => (
          <div
            key={`plankton-${i}`}
            className="plankton-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 15 + 10}s`,
              animationDelay: `${Math.random() * 10}s`,
              "--x-drift": `${(Math.random() - 0.5) * 100}px`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="chat-header">
        <div className="avatar-wrapper">
          <img src={PATRICK_AVATAR} alt="Patrick Star" className="avatar-img" />
          <div className="status-dot" />
        </div>
        <div className="header-info">
          <h1>Patrick Lmoubeydel </h1>
          <p>Chat bruitant </p>
        </div>
      </header>

      {/* Error Display */}
      {error && <div className="error-banner">⚠️ {error}</div>}

      {/* Messages Area */}
      <div className="messages-area">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message-row ${
              msg.sender === "user" ? "user-row" : "bot-row"
            }`}
          >
            {msg.sender === "bot" && (
              <img src={PATRICK_AVATAR} alt="Bot" className="chat-avatar" />
            )}

            <div
              className={`message-bubble ${
                msg.sender === "user" ? "user-bubble" : "bot-bubble"
              } ${msg.status === "amnesia" ? "amnesia-bubble" : ""} ${
                msg.status === "paywall" ? "paywall-bubble" : ""
              }`}
            >
              {msg.text}
            </div>

            {msg.sender === "user" && (
              <img src={USER_AVATAR} alt="User" className="chat-avatar" />
            )}
          </div>
        ))}

        {isTyping && (
          <div className="message-row bot-row">
            <img src={PATRICK_AVATAR} alt="Bot" className="chat-avatar" />
            <div className="message-bubble bot-bubble typing-bubble">
              <span className="dot">.</span>
              <span className="dot">.</span>
              <span className="dot">.</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="input-area">
        <input
          type="text"
          placeholder="Say something to Patrick... "
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          className="chat-input"
          disabled={isTyping}
        />
        <button
          onClick={handleSendMessage}
          disabled={!inputText.trim() || isTyping}
          className="send-button"
        >
          {isTyping ? "..." : "SEND 🪼"}
        </button>
      </div>
    </div>
  );
};

export default PatrickChat;
