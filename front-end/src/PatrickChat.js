// PatrickChat.js
import React, { useState, useEffect, useRef } from "react";
import "./PatrickChat.css";

const PATRICK_AVATAR = "./patrick.png";
const USER_AVATAR = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const PATRICK_QUOTES = [
  "Is mayonnaise an instrument?",
  "No, this is Patrick!",
  "I wumbo, you wumbo, he she me wumbo...",
  "Leedle leedle leedle lee.",
  "I can't see my forehead!",
  "Knowledge cannot replace friendship. I prefer to be an idiot!",
  "I'm ready, I'm ready, I'm ready!",
  "Is this the Krusty Krab?",
  "Tubby? No, I'm not tubby!",
  "Once there was an ugly barnacle. He was so ugly that everyone died. The end.",
  "Rectangles!",
  "The inner machinations of my mind are an enigma.",
  "Firmly grasp it!",
  "Who you callin' Pinhead?",
];

const PatrickChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Patrick. Do you want to go jellyfishing?",
      sender: "bot",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (inputText.trim() === "") return;

    const newMessage = {
      id: Date.now(),
      text: inputText,
      sender: "user",
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText("");
    setIsTyping(true);

    // Animation surprise aléatoire (20% de chance)
    if (Math.random() < 0.2) {
      setTimeout(() => {
        setShowSurprise(true);
        setTimeout(() => setShowSurprise(false), 2000);
      }, 500);
    }

    setTimeout(() => {
      const randomQuote =
        PATRICK_QUOTES[Math.floor(Math.random() * PATRICK_QUOTES.length)];
      const botResponse = {
        id: Date.now() + 1,
        text: randomQuote,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
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

      {/* Surprise Patrick */}
      <div className={`surprise-patrick ${showSurprise ? "show" : ""}`}>
        <img
          src={PATRICK_AVATAR}
          alt="Surprise Patrick"
          className="surprise-img"
        />
      </div>

      {/* Header */}
      <header className="chat-header">
        <div className="avatar-wrapper">
          <img src={PATRICK_AVATAR} alt="Patrick Star" className="avatar-img" />
          <div className="status-dot" />
        </div>
        <div className="header-info">
          <h1>Patrick lmoubeydel </h1>
          <p>Chat bruitant </p>
        </div>
      </header>

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
        />
        <button
          onClick={handleSendMessage}
          disabled={!inputText.trim()}
          className="send-button"
        >
          SEND 🪼
        </button>
      </div>
    </div>
  );
};
export default PatrickChat;
