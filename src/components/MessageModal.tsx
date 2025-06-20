
import { useState } from "react";
import { X, Send, Paperclip, Image } from "lucide-react";

interface Location {
  id: string;
  title: string;
  location: string;
}

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  location: Location;
}

interface Message {
  id: string;
  sender: "user" | "scout";
  content: string;
  timestamp: Date;
  type: "text" | "image" | "file";
}

const MessageModal = ({ isOpen, onClose, location }: MessageModalProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "scout",
      content: "Hi! Thanks for your interest in my location. I'd be happy to help with your shoot. What kind of project are you working on?",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      type: "text"
    }
  ]);

  if (!isOpen) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: message,
      timestamp: new Date(),
      type: "text"
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage("");

    // Simulate scout response
    setTimeout(() => {
      const responses = [
        "That sounds like a great project! I'd love to help.",
        "The space would be perfect for that type of shoot.",
        "Let me know if you have any specific questions about the location.",
        "I can definitely accommodate those requirements."
      ];
      
      const autoResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: "scout",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        type: "text"
      };

      setMessages(prev => [...prev, autoResponse]);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full h-[600px] flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 p-4 flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-gray-900">{location.title}</h2>
            <p className="text-sm text-gray-600">{location.location}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  msg.sender === "user"
                    ? "bg-coral-500 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <p
                  className={`text-xs mt-1 ${
                    msg.sender === "user" ? "text-coral-100" : "text-gray-500"
                  }`}
                >
                  {formatTime(msg.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="border-t border-gray-200 p-4">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full p-3 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent outline-none"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-1">
                <button
                  type="button"
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Attach file"
                >
                  <Paperclip className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Attach image"
                >
                  <Image className="h-4 w-4" />
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={!message.trim()}
              className="bg-coral-500 text-white p-3 rounded-xl hover:bg-coral-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
