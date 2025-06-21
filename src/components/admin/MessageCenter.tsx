
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Reply, User, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  from: string;
  email: string;
  subject: string;
  message: string;
  property?: string;
  timestamp: string;
  status: "unread" | "read" | "replied";
}

const MessageCenter = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: "Sarah Johnson",
      email: "sarah@photoagency.com",
      subject: "Inquiry about Boracay Beach Resort",
      message: "Hi! I'm interested in booking your Boracay location for a fashion photoshoot next month. Could you provide more details about availability and pricing?",
      property: "Boracay Beach Resort",
      timestamp: "2 hours ago",
      status: "unread"
    },
    {
      id: 2,
      from: "Mike Chen",
      email: "mike@filmcorp.com",
      subject: "Mountain Location for Film Project",
      message: "We're scouting locations for an upcoming film and your Baguio property caught our attention. Would love to discuss rates for a 5-day shoot.",
      property: "Baguio Mountain View",
      timestamp: "1 day ago",
      status: "read"
    },
    {
      id: 3,
      from: "Lisa Wong",
      email: "lisa@weddings.com",
      subject: "Wedding Photography Session",
      message: "Looking for a romantic beach location for a pre-wedding shoot. Your Boracay property seems perfect. What's your availability in February?",
      property: "Boracay Beach Resort",
      timestamp: "3 days ago",
      status: "replied"
    }
  ]);

  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  const handleReply = (messageId: number) => {
    if (!replyText.trim()) return;
    
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, status: "replied" as const } : msg
    ));
    
    toast({
      title: "Reply Sent",
      description: "Your reply has been sent successfully."
    });
    
    setReplyingTo(null);
    setReplyText("");
  };

  const markAsRead = (messageId: number) => {
    setMessages(messages.map(msg => 
      msg.id === messageId && msg.status === "unread" 
        ? { ...msg, status: "read" as const } 
        : msg
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "unread": return "bg-red-500";
      case "read": return "bg-yellow-500";
      case "replied": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const unreadCount = messages.filter(msg => msg.status === "unread").length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-coral-500" />
          Message Center ({messages.length})
          {unreadCount > 0 && (
            <Badge className="bg-red-500 ml-2">{unreadCount} unread</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {messages.map((message) => (
            <Card key={message.id} className={`border-l-4 ${message.status === "unread" ? "border-l-red-500 bg-red-50/50" : "border-l-gray-300"}`}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold">{message.subject}</h4>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {message.from} ({message.email})
                    </p>
                    {message.property && (
                      <p className="text-sm text-coral-600 font-medium">
                        Re: {message.property}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(message.status)}>
                      {message.status}
                    </Badge>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3" />
                      {message.timestamp}
                    </p>
                  </div>
                </div>
                
                <p className="text-sm mb-3 p-3 bg-gray-50 rounded-md">
                  {message.message}
                </p>

                <div className="flex gap-2">
                  {message.status === "unread" && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => markAsRead(message.id)}
                    >
                      Mark as Read
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    className="bg-coral-500 hover:bg-coral-600"
                    onClick={() => setReplyingTo(message.id)}
                  >
                    <Reply className="h-4 w-4 mr-1" />
                    Reply
                  </Button>
                </div>

                {replyingTo === message.id && (
                  <div className="mt-4 p-4 border rounded-md bg-white">
                    <Textarea
                      placeholder="Type your reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      rows={4}
                      className="mb-3"
                    />
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="bg-coral-500 hover:bg-coral-600"
                        onClick={() => handleReply(message.id)}
                      >
                        Send Reply
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setReplyingTo(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MessageCenter;
