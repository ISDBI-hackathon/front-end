import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

interface ContractTypeScore {
  type: string;
  confidence: number;
  description: string;
}

interface AnalysisResponse {
  scores: ContractTypeScore[];
  primary_type: string;
}

export default function ReverseMapper() {
  const [inputText, setInputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<ContractTypeScore[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!inputText.trim()) return;
    
    setIsProcessing(true);
    setError(null);
    setResults(null);
    
    try {
      console.log('Sending request to:', `${API_BASE_URL}/detect-contract-type`);
      const response = await axios.post<AnalysisResponse>(
        `${API_BASE_URL}/detect-contract-type`,
        { query: inputText },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          withCredentials: true
        }
      );

      console.log('Response:', response.data);

      if (!response.data || !response.data.scores) {
        throw new Error('Invalid response format from server');
      }

      setResults(response.data.scores);
    } catch (err: any) {
      console.error("Error analyzing input:", err);
      setError(err.response?.data?.detail || err.message || "Failed to analyze the input. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    setInputText("");
    setResults(null);
    setError(null);
  };

  const getFASNumber = (type: string) => {
    switch (type.toLowerCase()) {
      case "ijara": return "32";
      case "murabaha": return "28";
      case "musharaka": return "4";
      case "salam": return "7";
      case "istisna": return "10";
      default: return "";
    }
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
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
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
                  <CardTitle className="text-lg">
                    FAS {getFASNumber(result.type)}: {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                  </CardTitle>
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
