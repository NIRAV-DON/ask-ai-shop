import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, BarChart3, Zap, Target, Brain } from "lucide-react";

interface SalesInsight {
  category: string;
  trend: "up" | "down" | "stable";
  percentage: number;
  reason: string;
  topProducts: string[];
}

interface MarketAnalysis {
  summary: string;
  insights: SalesInsight[];
  predictions: string[];
  recommendations: string[];
}

const AIAgent = () => {
  const [analysis, setAnalysis] = useState<MarketAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Mock AI analysis data - in real app, this would come from AI API
  const generateAnalysis = () => {
    setIsAnalyzing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const mockAnalysis: MarketAnalysis = {
        summary: "2024 માર્કેટ ટ્રેન્ડ એનાલિસિસ મુજબ, ટેકનોલોજી અને હેલ્થ પ્રોડક્ટ્સમાં સૌથી વધુ વૃદ્ધિ જોવા મળી છે. ફેસ્ટિવલ સીઝનમાં ઇલેક્ટ્રોનિક્સ અને ફેશનની માંગ 40% વધી છે.",
        insights: [
          {
            category: "Smartphones",
            trend: "up",
            percentage: 45,
            reason: "5G adoption અને budget phones નો trend",
            topProducts: ["Redmi 13C", "Realme Narzo 60", "Samsung Galaxy M14"]
          },
          {
            category: "Laptops",
            trend: "up",
            percentage: 32,
            reason: "Work from home અને online education",
            topProducts: ["HP Pavilion", "Lenovo IdeaPad", "ASUS VivoBook"]
          },
          {
            category: "Fashion",
            trend: "up",
            percentage: 28,
            reason: "Festival season અને online shopping trend",
            topProducts: ["Ethnic wear", "Casual shirts", "Footwear"]
          },
          {
            category: "Home Appliances",
            trend: "stable",
            percentage: 12,
            reason: "Steady demand with seasonal variations",
            topProducts: ["Air Coolers", "Water Purifiers", "Kitchen appliances"]
          }
        ],
        predictions: [
          "📱 Smartphone market માં ₹10,000-₹15,000 range સૌથી hot segment રહેશે",
          "💻 Gaming laptops અને productivity tools નો demand વધશે",
          "🎮 Gaming accessories અને tech gadgets trend માં આવશે",
          "🏠 Smart home devices નો adoption વધુ થશે"
        ],
        recommendations: [
          "🎯 Budget smartphones પર focus કરો - highest conversion rate",
          "⚡ Festival season માટે electronics inventory વધારો",
          "🔥 Bundle offers અને combo deals લાવો",
          "📊 Social media marketing માં invest કરો - Gen Z targets માટે"
        ]
      };
      
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-success" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-destructive" />;
      default:
        return <BarChart3 className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-success";
      case "down":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card className="bg-gradient-card border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          AI Sales Analytics Agent
          <Badge variant="secondary" className="ml-auto">
            <Zap className="h-3 w-3 mr-1" />
            Smart Insights
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {!analysis ? (
          <div className="text-center py-8">
            <Target className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Market Trends & Sales Analysis</h3>
            <p className="text-muted-foreground mb-6">
              AI Agent તમારા માટે current year ના sales trends, hot products, અને market insights generate કરશે
            </p>
            <Button 
              onClick={generateAnalysis}
              disabled={isAnalyzing}
              className="bg-gradient-primary hover:shadow-glow"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  AI Analysis Running...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  Generate AI Insights
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Summary */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-primary mb-2">📊 Market Summary</h3>
                <p className="text-sm">{analysis.summary}</p>
              </CardContent>
            </Card>

            {/* Sales Insights */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                Category-wise Sales Trends
              </h3>
              <div className="grid gap-4">
                {analysis.insights.map((insight, index) => (
                  <Card key={index} className="border-border/50">
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getTrendIcon(insight.trend)}
                          <span className="font-medium">{insight.category}</span>
                          <Badge variant={insight.trend === "up" ? "default" : "secondary"}>
                            <span className={getTrendColor(insight.trend)}>
                              {insight.trend === "up" ? "+" : insight.trend === "down" ? "-" : ""}
                              {insight.percentage}%
                            </span>
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{insight.reason}</p>
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-foreground">Top Selling Products:</p>
                        <div className="flex flex-wrap gap-1">
                          {insight.topProducts.map((product, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {product}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Predictions */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border-border/50">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3 text-primary">🔮 AI Predictions for Next Quarter</h3>
                <div className="space-y-2">
                  {analysis.predictions.map((prediction, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <p className="text-sm">{prediction}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 border-border/50">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3 text-success">💡 AI Recommendations</h3>
                <div className="space-y-2">
                  {analysis.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-success mt-2 flex-shrink-0"></div>
                      <p className="text-sm">{recommendation}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Button 
              onClick={() => setAnalysis(null)}
              variant="outline"
              className="w-full"
            >
              Generate New Analysis
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIAgent;