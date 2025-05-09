
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";

export default function ReverseMapper() {
  const [inputText, setInputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<null | Array<{
    standard: string;
    confidence: number;
    description: string;
  }>>(null);

  const handleSubmit = () => {
    if (!inputText.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setResults([
        {
          standard: "FAS 32: Ijarah",
          confidence: 92,
          description: "Primary match - This standard deals with leases and right-of-use assets which are central to your entries."
        },
        {
          standard: "FAS 28: Murabaha",
          confidence: 45,
          description: "Partial match - Some elements of deferred payment structure might be relevant."
        },
        {
          standard: "FAS 31: Investment Agency",
          confidence: 28,
          description: "Low match - Peripheral relevance to agency arrangements."
        }
      ]);
      setIsProcessing(false);
    }, 2000);
  };

  const handleClear = () => {
    setInputText("");
    setResults(null);
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold text-islamic-blue mb-6">Reverse Mapper</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>FAS Standard Identification</CardTitle>
          <CardDescription>
            Enter journal entries or financial statement excerpts to identify applicable standards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Enter journal entries, accounting policies, or financial statement extracts..."
            className="min-h-[200px]"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleClear}>Clear</Button>
          <Button 
            className="bg-islamic-green hover:bg-islamic-green-light" 
            onClick={handleSubmit}
            disabled={isProcessing || !inputText.trim()}
          >
            {isProcessing ? "Analyzing..." : "Identify Standards"}
          </Button>
        </CardFooter>
      </Card>
      
      {results && (
        <div className="mt-6 space-y-4">
          <h3 className="text-xl font-semibold text-islamic-blue">Standards Match Results</h3>
          
          {results.map((result, idx) => (
            <Card key={idx} className={idx === 0 ? "border-islamic-blue" : ""}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{result.standard}</CardTitle>
                  <span className={`text-sm font-medium px-2 py-1 rounded ${
                    result.confidence > 80 ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" :
                    result.confidence > 40 ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" :
                    "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                  }`}>
                    {result.confidence}% Match
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={result.confidence} className="h-2" />
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">{result.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
