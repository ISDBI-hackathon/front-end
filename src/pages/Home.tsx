
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<null | {
    journalEntries: Array<{
      account: string;
      debit?: number;
      credit?: number;
    }>;
    fasStandard: string;
    explanation: string;
  }>(null);

  const handleSubmit = async () => {
    if (!inputText.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setResult({
        journalEntries: [
          { account: "Right of Use Asset - Building", debit: 100000 },
          { account: "Lease Liability", credit: 100000 },
          { account: "Depreciation Expense", debit: 20000 },
          { account: "Accumulated Depreciation", credit: 20000 },
          { account: "Finance Cost", debit: 5000 },
          { account: "Lease Liability", credit: 5000 }
        ],
        fasStandard: "FAS 32: Ijarah",
        explanation: "This scenario involves an Ijarah (lease) contract for a building. According to FAS 32, the lessee should recognize a right-of-use (ROU) asset and a lease liability at the commencement date. The ROU asset is then depreciated over its useful life, and finance costs are recognized over the lease term."
      });
      setIsProcessing(false);
    }, 2000);
  };

  const handleClear = () => {
    setInputText("");
    setResult(null);
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
                className="bg-islamic-blue hover:bg-islamic-blue-light" 
                onClick={handleSubmit}
                disabled={isProcessing || !inputText.trim()}
              >
                {isProcessing ? "Processing..." : "Generate Journal Entries"}
              </Button>
            </CardFooter>
          </Card>
          
          {result && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-islamic-green flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-islamic-green flex items-center justify-center">
                    <span className="text-white text-xs">2</span>
                  </span>
                  AI Journal Entry Output
                </CardTitle>
                <CardDescription>
                  Generated according to <span className="fas-badge">{result.fasStandard}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="journal-entry">
                  {result.journalEntries.map((entry, idx) => (
                    <div key={idx} className="journal-row">
                      <div className={entry.debit ? "" : "pl-8"}>
                        {entry.account}
                      </div>
                      <div className="journal-debit">{entry.debit ? `$${entry.debit.toLocaleString()}` : ""}</div>
                      <div className="journal-credit">{entry.credit ? `$${entry.credit.toLocaleString()}` : ""}</div>
                    </div>
                  ))}
                  <hr className="my-4" />
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    <h4 className="font-medium mb-2">Explanation:</h4>
                    <p>{result.explanation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Examples</CardTitle>
              <CardDescription>Try these sample scenarios</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {examples.map((example, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className="w-full justify-start h-auto p-4 text-left"
                  onClick={() => setInputText(example)}
                >
                  {example}
                </Button>
              ))}
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>AAOIFI FAS References</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="fas32">
                <TabsList className="w-full">
                  <TabsTrigger value="fas32">FAS 32</TabsTrigger>
                  <TabsTrigger value="fas28">FAS 28</TabsTrigger>
                  <TabsTrigger value="fas10">FAS 10</TabsTrigger>
                  <TabsTrigger value="fas4">FAS 4</TabsTrigger>
                </TabsList>
                <TabsContent value="fas32" className="mt-4">
                  <h4 className="font-medium">FAS 32: Ijarah</h4>
                  <p className="text-sm mt-2">This standard establishes the principles for classification, recognition, measurement, presentation and disclosure for Ijarah (lease) transactions.</p>
                </TabsContent>
                <TabsContent value="fas28" className="mt-4">
                  <h4 className="font-medium">FAS 28: Murabaha</h4>
                  <p className="text-sm mt-2">This standard sets out accounting principles for Murabaha and other deferred payment sales transactions.</p>
                </TabsContent>
                <TabsContent value="fas10" className="mt-4">
                  <h4 className="font-medium">FAS 10: Salam and Parallel Salam</h4>
                  <p className="text-sm mt-2">This standard prescribes accounting treatment for Salam financing and Parallel Salam transactions.</p>
                </TabsContent>
                <TabsContent value="fas4" className="mt-4">
                  <h4 className="font-medium">FAS 4: Musharaka</h4>
                  <p className="text-sm mt-2">This standard covers accounting for Musharaka financing and joint equity transactions.</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
