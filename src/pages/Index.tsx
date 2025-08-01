import { useState } from "react";
import Header from "@/components/Header";
import SearchInterface from "@/components/SearchInterface";
import ChatResponse from "@/components/ChatResponse";
import ProductCard from "@/components/ProductCard";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  sales: string;
  image: string;
  category: string;
  features: string[];
}

// Mock data for demo
const mockProducts: Product[] = [
  {
    id: "1",
    name: "iPhone 15 Pro Max 256GB",
    brand: "Apple",
    price: 1199,
    originalPrice: 1299,
    rating: 4.8,
    reviewCount: 2847,
    sales: "5K+ sold this month",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400",
    category: "Smartphone",
    features: ["A17 Pro chip", "Titanium build", "48MP camera"]
  },
  {
    id: "2",
    name: "MacBook Pro 14-inch M3",
    brand: "Apple",
    price: 1999,
    rating: 4.9,
    reviewCount: 1523,
    sales: "2K+ sold this month",
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400",
    category: "Laptop",
    features: ["M3 chip", "14-inch display", "18hr battery"]
  },
  {
    id: "3",
    name: "AirPods Pro 2nd Gen",
    brand: "Apple",
    price: 249,
    originalPrice: 279,
    rating: 4.7,
    reviewCount: 8934,
    sales: "10K+ sold this month",
    image: "https://images.unsplash.com/photo-1501286353178-1ec881214838?w=400",
    category: "Audio",
    features: ["Active noise cancellation", "Spatial audio", "USB-C"]
  },
  {
    id: "4",
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    price: 1299,
    rating: 4.6,
    reviewCount: 3421,
    sales: "3K+ sold this month",
    image: "https://images.unsplash.com/photo-1441057206919-63d19fac2369?w=400",
    category: "Smartphone",
    features: ["S Pen included", "200MP camera", "AI features"]
  },
  {
    id: "5",
    name: "Sony WH-1000XM5",
    brand: "Sony",
    price: 399,
    originalPrice: 449,
    rating: 4.8,
    reviewCount: 5672,
    sales: "7K+ sold this month",
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400",
    category: "Audio",
    features: ["30hr battery", "Industry-leading ANC", "Touch controls"]
  },
  {
    id: "6",
    name: "iPad Air 5th Gen",
    brand: "Apple",
    price: 599,
    rating: 4.7,
    reviewCount: 2156,
    sales: "4K+ sold this month",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400",
    category: "Tablet",
    features: ["M1 chip", "10.9-inch display", "Apple Pencil support"]
  }
];

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: query,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate AI response (mock)
    const aiResponse = generateMockResponse(query);
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: aiResponse,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, aiMessage]);
    
    // Show relevant products
    const relevantProducts = getRelevantProducts(query);
    setProducts(relevantProducts);
    
    setIsLoading(false);
  };

  const generateMockResponse = (query: string): string => {
    const responses = {
      phone: "I found some excellent smartphones that match your criteria! Here are the top-rated options with the best value for money. The iPhone 15 Pro Max and Samsung Galaxy S24 Ultra are leading choices with cutting-edge features.",
      laptop: "Great choice! I've curated the best laptops currently available. The MacBook Pro M3 stands out for its performance and battery life, perfect for professional work and creative tasks.",
      headphones: "For audio enthusiasts, I recommend these top-rated headphones and earbuds. The Sony WH-1000XM5 offers industry-leading noise cancellation, while AirPods Pro provide seamless Apple ecosystem integration.",
      default: `Based on your search for "${query}", I've found some excellent products that match your needs. These recommendations are based on current market trends, user reviews, and value for money. Each product has been carefully selected for quality and performance.`
    };

    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes('phone') || lowerQuery.includes('smartphone')) return responses.phone;
    if (lowerQuery.includes('laptop') || lowerQuery.includes('computer')) return responses.laptop;
    if (lowerQuery.includes('headphone') || lowerQuery.includes('audio') || lowerQuery.includes('earbuds')) return responses.headphones;
    return responses.default;
  };

  const getRelevantProducts = (query: string): Product[] => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('phone') || lowerQuery.includes('smartphone')) {
      return mockProducts.filter(p => p.category === 'Smartphone');
    }
    if (lowerQuery.includes('laptop') || lowerQuery.includes('computer')) {
      return mockProducts.filter(p => p.category === 'Laptop');
    }
    if (lowerQuery.includes('headphone') || lowerQuery.includes('audio') || lowerQuery.includes('earbuds')) {
      return mockProducts.filter(p => p.category === 'Audio');
    }
    
    // Return random selection for general queries
    return mockProducts.slice(0, 4);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <SearchInterface onSearch={handleSearch} isLoading={isLoading} />
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="bg-gradient-primary bg-clip-text text-transparent">AI Response</span>
            </h2>
            <ChatResponse messages={messages} />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="bg-gradient-primary bg-clip-text text-transparent">Recommended Products</span>
            </h2>
            {products.length > 0 ? (
              <div className="grid gap-6">
                {products.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gradient-card border border-border/50 rounded-lg p-8 text-center">
                <p className="text-muted-foreground">
                  Product recommendations will appear here after you search
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;