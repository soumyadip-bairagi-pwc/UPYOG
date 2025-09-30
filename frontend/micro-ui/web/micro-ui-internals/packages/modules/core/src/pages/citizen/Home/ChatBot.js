import React, { useState, useEffect } from "react";

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [langID,setLangID] = useState("en")
  const [accessToken,setAccessToken] = useState("NA")
  const {access_token}=Digit.UserService.getUser();
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleMessageSend = async () => {
    if (input.trim() !== "") {
      setMessages([...messages, { sender: "user", text: input }]);
      setInput("");
  
      try {
        const response = await fetch('https://oprwrt-demo.ddns.net/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: input, chatHistory: messages, lang_id: langID, accessToken: access_token }),
        });
        // console.log(body)
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        const botReply = data.response; 
        
        if (data.access_token !== undefined) {
          setAccessToken(data.access_token)
        }
        
        setTimeout(() => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "bot", text: botReply, lang_id: langID },
          ]);
        }, 1000);
      } catch (error) {
        console.error("Error fetching response:", error);
        // Handle error or fallback message
        setTimeout(() => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "bot", text: "Sorry, I'm having trouble understanding you right now.", lang_id: langID },
          ]);
        }, 1000);
      }
    }
  };
  

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleDropdown = (e) => {
    setLangID(e.target.value)
  };

  const handleChatbotClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      setMessages([
        {
          sender: "bot",
          text: "Welcome to Grievance Redressal Chatbot"
          , lang_id: langID
        },
        {
          sender: "bot",
          text: "How may I assist you."
          , lang_id: langID
        },
      ]);
    } else {
      setMessages([]);
    }
  }, [isOpen]);

  const ReplaceURL = (text) => {
    return text.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
    );
  };


  return (
    <div style={{ textAlign: "start" }}>
      {!isOpen && (
        <button
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            padding: "10px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#00599f",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
          onClick={toggleChatbot}
        >
          <svg xmlns="
            http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
            </svg>
        </button>
      )}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "400px",
            maxHeight: "400px",
            height: "500px",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              backgroundColor: "#00599f",
              color: "white",
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>SWAGAT</span>
    
            <div style={{
              backgroundColor: "#00599f",
              color: "white",
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <div style={{
              backgroundColor: "white",
              color: "black",
              padding: "10px",
              paddingBottom: "5px",
              paddingTop: "5px",
              marginRight: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: "10px",
            }}>
            <select value={langID} onChange={handleDropdown}>
              <option value={"en"}>English</option>
              <option value={"hi"} >Gujrati</option>
            </select>
            </div>
            <button
              onClick={handleChatbotClose}
              style={{
                background: "none",
                border: "none",
                color: "white",
                cursor: "pointer",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16.816"
                height="16.816"
                viewBox="0 0 16.816 16.816">
                <path
                  id="Icon_ionic-ios-close-circle"
                  data-name="Icon ionic-ios-close-circle"
                  d="M11.783,3.375a8.408,8.408,0,1,0,8.408,8.408A8.407,8.407,0,0,0,11.783,3.375Zm2.13,11.452-2.13-2.13-2.13,2.13a.646.646,0,1,1-.914-.914l2.13-2.13-2.13-2.13a.646.646,0,0,1,.914-.914l2.13,2.13,2.13-2.13a.646.646,0,0,1,.914.914l-2.13,2.13,2.13,2.13a.649.649,0,0,1,0,.914A.642.642,0,0,1,13.913,14.827Z"
                  transform="translate(-3.375 -3.375)"
                  fill="#fff"
                />
              </svg>
            </button>
              </div>
          </div>
          <div
            style={{
              flex: 1,
              padding: "10px",
              overflowY: "auto",
              backgroundColor: "#f1f1f1",
            }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent:
                    message.sender === "user" ? "flex-end" : "flex-start",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    maxWidth: "70%",
                    padding: "10px",
                    borderRadius: "10px",
                    backgroundColor:
                      message.sender === "user" ? "#00599f" : "#e4e6eb",
                    color: message.sender === "user" ? "white" : "black",
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                  }}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: ReplaceURL(message.text),
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              padding: "10px",
              borderTop: "1px solid #ddd",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleMessageSend();
                }
              }}
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "20px",
                border: "1px solid #ddd",
                outline: "none",
              }}
            />
            <button
              onClick={handleMessageSend}
              style={{
                marginLeft: "10px",
                padding: "15px",
                backgroundColor: "#00599f",
                color: "white",
                border: "none",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
                width="16"
                height="16"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBot;
