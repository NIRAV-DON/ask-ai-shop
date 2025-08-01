import { useState } from "react";
import { Mic, Send, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface SearchInterfaceProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

const SearchInterface = ({ onSearch, isLoading = false }: SearchInterfaceProps) => {
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery("");
    }
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      setIsListening(true);
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    }
  };

  return (
    <Card className="bg-gradient-card shadow-card border-border/50 backdrop-blur-sm">
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask me about any product... e.g., 'Best smartphone under $500'"
                className="bg-input/50 border-border text-foreground placeholder:text-muted-foreground text-lg py-6"
                disabled={isLoading}
              />
            </div>
            <Button
              type="button"
              onClick={startListening}
              variant="outline"
              size="lg"
              className={`px-4 transition-all duration-300 ${
                isListening 
                  ? 'animate-pulse-glow border-primary bg-primary/20' 
                  : 'hover:border-primary hover:bg-primary/10'
              }`}
              disabled={isLoading}
            >
              {isListening ? (
                <MicOff className="h-5 w-5 text-primary" />
              ) : (
                <Mic className="h-5 w-5" />
              )}
            </Button>
            <Button
              type="submit"
              size="lg"
              disabled={!query.trim() || isLoading}
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 px-8"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-foreground border-t-transparent" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>
        </form>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            "Best phones under $500",
            "Gaming laptops",
            "Wireless headphones",
            "Smart watches",
            "Home fitness equipment"
          ].map((suggestion) => (
            <Button
              key={suggestion}
              variant="outline"
              size="sm"
              onClick={() => setQuery(suggestion)}
              className="text-xs hover:border-accent hover:text-accent transition-colors"
              disabled={isLoading}
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default SearchInterface;