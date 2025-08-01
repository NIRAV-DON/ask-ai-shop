import { Bot, Sparkles } from "lucide-react";

const Header = () => {
  return (
    <header className="relative bg-gradient-hero border-b border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Bot className="h-12 w-12 text-primary animate-pulse-glow" />
              <Sparkles className="h-6 w-6 text-accent absolute -top-2 -right-2 animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              CommerceIQ
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your AI-powered shopping assistant. Ask about products, get smart recommendations, 
            and discover the best deals with the power of artificial intelligence.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;