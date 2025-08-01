import { Bot, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface ChatResponseProps {
  messages: Message[];
}

const ChatResponse = ({ messages }: ChatResponseProps) => {
  if (messages.length === 0) {
    return (
      <Card className="bg-gradient-card border-border/50">
        <CardContent className="p-8 text-center">
          <Bot className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground text-lg">
            Ask me anything about products! I'm here to help you find the perfect items.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <Card 
          key={message.id} 
          className={`animate-slide-up bg-gradient-card border-border/50 ${
            message.type === 'ai' ? 'mr-8' : 'ml-8'
          }`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardContent className="p-4">
            <div className="flex gap-3">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                message.type === 'ai' 
                  ? 'bg-gradient-primary' 
                  : 'bg-secondary'
              }`}>
                {message.type === 'ai' ? (
                  <Bot className="h-4 w-4 text-primary-foreground" />
                ) : (
                  <User className="h-4 w-4 text-secondary-foreground" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">
                  {message.type === 'ai' ? 'CommerceIQ AI' : 'You'}
                </p>
                <div className="prose prose-sm dark:prose-invert text-foreground">
                  {message.content}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ChatResponse;