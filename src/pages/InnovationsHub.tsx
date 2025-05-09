
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function InnovationsHub() {
  const [proposal, setProposal] = useState({
    title: "",
    standard: "",
    description: "",
    rationale: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProposal(prev => ({ ...prev, [name]: value }));
  };
  
  const recentProposals = [
    {
      title: "Digital Asset Recognition Framework",
      author: "Dr. Ahmed Hassan",
      date: "2025-05-02",
      description: "Proposes adding a new subsection to FAS 35 to address digital asset recognition and measurement."
    },
    {
      title: "Green Sukuk Disclosure Requirements",
      author: "Sarah Al-Mahmoud",
      date: "2025-04-28",
      description: "Recommends additional disclosure requirements for environmentally focused Sukuk issuances."
    }
  ];

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold text-islamic-blue mb-6">Innovations Hub</h2>
      
      <Tabs defaultValue="propose">
        <TabsList className="w-full max-w-md mx-auto mb-6">
          <TabsTrigger value="propose">Propose</TabsTrigger>
          <TabsTrigger value="recent">Recent Proposals</TabsTrigger>
          <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
        </TabsList>
        
        <TabsContent value="propose">
          {isSubmitted ? (
            <Card className="border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="text-green-600 dark:text-green-400">Proposal Submitted Successfully</CardTitle>
                <CardDescription>
                  Your proposal has been received and will be analyzed by our AI system.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-lg">
                  <p className="mb-2">Thank you for contributing to Islamic finance standards innovation.</p>
                  <p>You will receive feedback on your proposal within 48 hours.</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => {
                    setProposal({ title: "", standard: "", description: "", rationale: "" });
                    setIsSubmitted(false);
                  }}
                  className="w-full"
                >
                  Submit Another Proposal
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Propose a New Interpretation</CardTitle>
                <CardDescription>
                  Submit your ideas for improving AAOIFI FAS standards or adding new interpretations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Proposal Title</Label>
                  <Input 
                    id="title" 
                    name="title" 
                    placeholder="Enter a descriptive title for your proposal" 
                    value={proposal.title}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="standard">Related FAS Standard</Label>
                  <Input 
                    id="standard" 
                    name="standard" 
                    placeholder="e.g., FAS 32, FAS 28, or 'New Standard'" 
                    value={proposal.standard}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    placeholder="Describe your proposed amendment or interpretation in detail" 
                    className="min-h-[100px]"
                    value={proposal.description}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="rationale">Shari'ah and Financial Rationale</Label>
                  <Textarea 
                    id="rationale" 
                    name="rationale" 
                    placeholder="Explain the Shari'ah basis and financial reasoning behind your proposal" 
                    className="min-h-[100px]"
                    value={proposal.rationale}
                    onChange={handleChange}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-islamic-blue hover:bg-islamic-blue-light"
                  onClick={handleSubmit}
                  disabled={isSubmitting || !proposal.title || !proposal.description}
                >
                  {isSubmitting ? "Submitting..." : "Submit Proposal"}
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="recent">
          <div className="space-y-6">
            {recentProposals.map((item, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>
                    By {item.author} • {item.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">View Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="guidelines">
          <Card>
            <CardHeader>
              <CardTitle>Innovation Submission Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-islamic-blue mb-2">Shari'ah Compliance</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  All proposals must be fully compliant with Shari'ah principles and should not contradict existing
                  fiqh rulings or scholarly consensus. Provide references to Shari'ah sources where applicable.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-islamic-blue mb-2">Accounting Rigor</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Proposals should demonstrate sound accounting principles and consideration of practical implementation.
                  Include specific wording for amendments or new standards where possible.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-islamic-blue mb-2">Industry Impact</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Explain how your proposal addresses a gap in current standards or improves existing practices.
                  Consider the potential impact on different stakeholders in the Islamic finance industry.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-islamic-blue mb-2">Review Process</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Submissions are initially analyzed by our AI system for compliance and feasibility. Promising
                  proposals are then forwarded to a panel of Shari'ah and accounting experts for detailed review.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
