
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Pill, AlertCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant", 
      content: "Hello, I'm MedGPT! I can help you with information about medications, symptoms, and health conditions. How may I assist you today?", 
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "40px";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  // Function to send message to the Gemini API
  const sendMessageToGemini = async (userMessage: string) => {
    try {
      const API_KEY = "AIzaSyChX3ObhMxcH2lg8GoEv-DK_kINq4-QICA";
      const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
      
      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: `You are MedGPT, a medical AI assistant specializing in medications, drug interactions, 
                and health information. Respond to the following query with accurate medical information. 
                If uncertain, state the limitations of your knowledge. 
                For serious medical concerns, always advise consulting a healthcare professional.
                User query: ${userMessage}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      };
      
      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error("Unexpected response format from Gemini API");
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      return "I'm sorry, I encountered an error processing your request. Please try again later.";
    }
  };

  // Function to send message to the backend
  const sendMessageToBackend = async (userMessage: string) => {
    try {
      // Add logic here to call your backend API
      // This is a placeholder for the actual implementation
      const response = await fetch("https://your-medgpt-backend-url.com/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });
      
      if (!response.ok) {
        throw new Error(`Backend API Error: ${response.status}`);
      }
      
      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("Error calling backend API:", error);
      // Fall back to Gemini if backend fails
      return sendMessageToGemini(userMessage);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    const userMessage = inputValue.trim();
    setInputValue("");
    
    // Add user message to chat
    setMessages(prev => [
      ...prev, 
      { role: "user", content: userMessage, timestamp: new Date() }
    ]);
    
    setIsLoading(true);
    
    try {
      // First try the backend
      const response = await sendMessageToGemini(userMessage);
      
      // Add assistant response to chat
      setMessages(prev => [
        ...prev, 
        { role: "assistant", content: response, timestamp: new Date() }
      ]);
    } catch (error) {
      console.error("Error in chat flow:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
      
      // Add error message to chat
      setMessages(prev => [
        ...prev, 
        { 
          role: "assistant", 
          content: "I'm sorry, I encountered an error processing your request. Please try again later.", 
          timestamp: new Date() 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto p-4">
      <Card className="flex flex-col h-full">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-medBlue-500" />
            <CardTitle>MedGPT Chat</CardTitle>
          </div>
          <CardDescription>
            Ask about medications, symptoms, or health conditions. For emergencies, please contact a healthcare professional.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex-1 p-0 border-y">
          <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
            <div className="flex flex-col gap-4">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`flex gap-3 max-w-[80%] ${
                      message.role === "user" 
                        ? "flex-row-reverse" 
                        : "flex-row"
                    }`}
                  >
                    <Avatar className={
                      message.role === "user" 
                        ? "bg-medTeal-100 text-medTeal-700" 
                        : "bg-medBlue-100 text-medBlue-700"
                    }>
                      {message.role === "user" 
                        ? <User className="h-5 w-5" /> 
                        : <Bot className="h-5 w-5" />
                      }
                    </Avatar>
                    
                    <div className={`flex flex-col gap-1 ${
                      message.role === "user" 
                        ? "items-end" 
                        : "items-start"
                    }`}>
                      <div className={`rounded-lg px-4 py-2 ${
                        message.role === "user" 
                          ? "bg-medTeal-100 text-medTeal-900" 
                          : "bg-medBlue-100 text-medBlue-900"
                      }`}>
                        <div className="whitespace-pre-wrap">{message.content}</div>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(message.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3">
                    <Avatar className="bg-medBlue-100 text-medBlue-700">
                      <Bot className="h-5 w-5" />
                    </Avatar>
                    <div className="flex flex-col gap-1 items-start">
                      <div className="bg-medBlue-100 text-medBlue-900 rounded-lg px-4 py-2">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-medBlue-500 rounded-full animate-bounce"></div>
                          <div className="h-2 w-2 bg-medBlue-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                          <div className="h-2 w-2 bg-medBlue-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
        
        <CardFooter className="p-4">
          <form onSubmit={handleSubmit} className="flex w-full gap-2">
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask MedGPT about medications, symptoms, or health conditions..."
                className="min-h-[40px] max-h-[160px] pr-12 resize-none"
                disabled={isLoading}
              />
              <div className="absolute bottom-3 right-3">
                <Badge variant="outline" className="text-xs bg-background">
                  <Pill className="h-3 w-3 mr-1" />
                  MedGPT
                </Badge>
              </div>
            </div>
            <Button 
              type="submit" 
              size="icon" 
              disabled={isLoading || !inputValue.trim()}
              className="h-full aspect-square"
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </CardFooter>
      </Card>
      
      <div className="mt-2 flex justify-center">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <AlertCircle className="h-3 w-3" />
          <span>MedGPT is an AI assistant. Always consult healthcare professionals for medical advice.</span>
        </div>
      </div>
    </div>
  );
};

export default Index;
