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

// Mock data for demo - Real phones under ₹5000
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Redmi A3",
    brand: "Xiaomi",
    price: 4999,
    originalPrice: 5499,
    rating: 4.2,
    reviewCount: 15847,
    sales: "25K+ sold this month",
    image: "https://cdn1.smartprix.com/rx-iCqNdpGrj-w1200-h1200/Cqndpgrj.jpg",
    category: "Smartphone",
    features: ["6.71 HD+ Display", "5000mAh Battery", "8MP Camera"]
  },
  {
    id: "2",
    name: "POCO C65",
    brand: "POCO",
    price: 4799,
    originalPrice: 5299,
    rating: 4.3,
    reviewCount: 12234,
    sales: "18K+ sold this month",
    image: "https://cdn1.smartprix.com/rx-i5mUeBiV4-w1200-h1200/5muebiV4.jpg",
    category: "Smartphone",
    features: ["6.74 HD+ Display", "MediaTek Helio G85", "50MP Camera"]
  },
  {
    id: "3",
    name: "Realme Narzo N53",
    brand: "Realme",
    price: 4699,
    originalPrice: 5199,
    rating: 4.1,
    reviewCount: 9876,
    sales: "15K+ sold this month",
    image: "https://cdn1.smartprix.com/rx-iL8RRmUf2-w1200-h1200/L8rrmuf2.jpg",
    category: "Smartphone",
    features: ["6.74 90Hz Display", "Unisoc Tiger T612", "50MP Camera"]
  },
  {
    id: "4",
    name: "Samsung Galaxy M04",
    brand: "Samsung",
    price: 4999,
    rating: 4.0,
    reviewCount: 7543,
    sales: "12K+ sold this month",
    image: "https://cdn1.smartprix.com/rx-iW0vANpX1-w1200-h1200/W0vanpx1.jpg",
    category: "Smartphone",
    features: ["6.5 HD+ Display", "MediaTek Helio P35", "13MP Camera"]
  },
  {
    id: "5",
    name: "Infinix Smart 8",
    brand: "Infinix",
    price: 4999,
    originalPrice: 5499,
    rating: 4.2,
    reviewCount: 6892,
    sales: "10K+ sold this month",
    image: "https://cdn1.smartprix.com/rx-iEZGHQdks-w1200-h1200/EzghQdks.jpg",
    category: "Smartphone",
    features: ["6.6 HD+ Display", "Unisoc Tiger T606", "13MP Camera"]
  },
  {
    id: "6",
    name: "Tecno Pop 8",
    brand: "Tecno",
    price: 4799,
    rating: 3.9,
    reviewCount: 5234,
    sales: "8K+ sold this month",
    image: "https://cdn1.smartprix.com/rx-i0OKmAI9P-w1200-h1200/0okmAI9p.jpg",
    category: "Smartphone",
    features: ["6.6 HD+ Display", "Unisoc Tiger T606", "12MP Camera"]
  },
  // Additional products for other categories
  {
    id: "7",
    name: "boAt Airdopes 141",
    brand: "boAt",
    price: 1299,
    originalPrice: 1999,
    rating: 4.1,
    reviewCount: 45672,
    sales: "50K+ sold this month",
    image: "https://cdn.boat-lifestyle.com/spree/images/attachments/original/data/spree/products/23948/product_img/1701241915_4be62b22-7a12-486a-8b9b-2a89dd4b2b31.jpg",
    category: "Audio",
    features: ["42H Playback", "Beast Mode", "IWP Technology"]
  },
  {
    id: "8",
    name: "HP 15s Laptop",
    brand: "HP",
    price: 35000,
    originalPrice: 40000,
    rating: 4.3,
    reviewCount: 2156,
    sales: "2K+ sold this month",
    image: "https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c08143462.png",
    category: "Laptop",
    features: ["Intel Core i3", "8GB RAM", "256GB SSD"]
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

  const handleViewDetails = (product: Product) => {
    // You can customize this action - for now, it shows an alert
    alert(`View details for: ${product.name}\nPrice: ₹${product.price}\nBrand: ${product.brand}`);
    // Later you can replace this with navigation to a detailed product page
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
                    <ProductCard product={product} onViewDetails={handleViewDetails} />
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