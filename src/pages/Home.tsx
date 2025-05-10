import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";

const CHALLENGE1_API_URL = "http://localhost:8000";
const CHALLENGE2_API_URL = "http://localhost:8001";

interface ContractTypeScore {
  type: string;
  confidence: number;
  description: string;
}

interface AnalysisResponse {
  scores: ContractTypeScore[];
  primary_type: string;
  analysis: string;
}

interface JournalEntry {
  account: string;
  debit?: number;
  credit?: number;
}

interface AccountingResponse {
  journal_entries: Array<{
    date: string;
    description: string;
    entries: JournalEntry[];
  }>;
  calculations: Record<string, any>;
  explanation: string;
  fas_references: Array<{
    section: string;
    relevance: string;
  }>;
}

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<null | {
    scores: ContractTypeScore[];
    primary_type: string;
    analysis: string;
  }>(null);
  const [accountingResult, setAccountingResult] = useState<null | AccountingResponse>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!inputText.trim()) return;
    
    setIsProcessing(true);
    setError(null);
    setResult(null);
    setAccountingResult(null);
    
    try {
      // First, detect the contract type using challenge2 API
      const detectionResponse = await axios.post<AnalysisResponse>(
        `${CHALLENGE2_API_URL}/detect-contract-type`,
        { query: inputText },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          withCredentials: true
        }
      );

      if (!detectionResponse.data) {
        throw new Error('Invalid response format from server');
      }

      setResult(detectionResponse.data);

      // Then, get the accounting calculations using challenge1 API
      const accountingResponse = await axios.post<AccountingResponse>(
        `${CHALLENGE1_API_URL}/generate-entries`,
        {
          input_text: inputText,
          fas_standard: `FAS${detectionResponse.data.primary_type === 'ijara' ? '32' : 
            detectionResponse.data.primary_type === 'murabaha' ? '28' :
            detectionResponse.data.primary_type === 'musharaka' ? '4' :
            detectionResponse.data.primary_type === 'salam' ? '7' :
            detectionResponse.data.primary_type === 'istisna' ? '10' : '32'}`
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          withCredentials: true
        }
      );

      if (!accountingResponse.data) {
        throw new Error('Invalid accounting response format from server');
      }

      setAccountingResult(accountingResponse.data);
    } catch (err: any) {
      console.error("Error analyzing input:", err);
      setError(err.response?.data?.detail || err.message || "Failed to analyze the input. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    setInputText("");
    setResult(null);
    setAccountingResult(null);
    setError(null);
  };

  const examples = [
    "A bank has entered into an Ijarah contract with a customer for a building worth $100,000 for a period of 5 years with annual payments of $25,000.",
    "A company has issued a Sukuk worth $1,000,000 to finance a new project with expected returns of 5% annually for 3 years.",
    "Record the journal entries for a Mudarabah contract where the bank (Rab-al-mal) contributes $500,000 and the entrepreneur (Mudarib) provides expertise."
  ];

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-islamic-blue flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-islamic-blue flex items-center justify-center">
                  <span className="text-white text-xs">1</span>
                </span>
                Input Console
              </CardTitle>
              <CardDescription>
                Describe your Islamic finance accounting scenario or question
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="e.g., A bank has entered into an Ijarah contract with a customer for a building worth $100,000 for a period of 5 years with annual payments of $25,000."
                className="min-h-[200px]"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleClear}>Clear</Button>
              <Button 
                onClick={handleSubmit} 
                disabled={isProcessing || !inputText.trim()}
              >
                {isProcessing ? "Analyzing..." : "Analyze"}
              </Button>
            </CardFooter>
          </Card>

          {error && (
            <Card className="mt-6 border-red-500">
              <CardContent className="pt-6">
                <p className="text-red-500">{error}</p>
              </CardContent>
            </Card>
          )}

          {accountingResult && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-islamic-blue">Accounting Entries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {accountingResult.journal_entries.map((entry, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold">{entry.description}</h3>
                        <span className="text-sm text-gray-500">{entry.date}</span>
                      </div>
                      <div className="border rounded-lg overflow-hidden">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-2 text-left">Account</th>
                              <th className="px-4 py-2 text-right">Debit</th>
                              <th className="px-4 py-2 text-right">Credit</th>
                            </tr>
                          </thead>
                          <tbody>
                            {entry.entries.map((line, lineIndex) => (
                              <tr key={lineIndex} className="border-t">
                                <td className="px-4 py-2">{line.account}</td>
                                <td className="px-4 py-2 text-right">
                                  {line.debit ? `$${line.debit.toLocaleString()}` : ''}
                                </td>
                                <td className="px-4 py-2 text-right">
                                  {line.credit ? `$${line.credit.toLocaleString()}` : ''}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-2">Calculations</h3>
                      <div className="space-y-2">
                        {Object.entries(accountingResult.calculations).map(([key, value], index) => (
                          <div key={index} className="flex justify-between">
                            <span className="font-medium">{key}:</span>
                            <span>${typeof value === 'number' ? value.toLocaleString() : value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">FAS References</h3>
                      <div className="space-y-2">
                        {accountingResult.fas_references.map((ref, index) => (
                          <div key={index} className="text-sm">
                            <span className="font-medium">Section {ref.section}:</span> {ref.relevance}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Explanation</h3>
                    <div className="text-sm text-gray-600">{accountingResult.explanation}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-islamic-blue">Example Scenarios</CardTitle>
              <CardDescription>
                Click on any example to load it into the input console
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {examples.map((example, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left h-auto py-3 whitespace-normal break-words"
                    onClick={() => setInputText(example)}
                  >
                    {example}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
