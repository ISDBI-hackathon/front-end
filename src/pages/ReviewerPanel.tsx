
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ReviewerPanel() {
  const reviews = [
    {
      agent: "Shari'ah Compliance Agent",
      avatar: "SA",
      review: "The journal entries for this Ijarah transaction correctly follow FAS 32 requirements. However, note that if this were a variable rate Ijarah, the ROU asset would need periodic reassessment. Otherwise, the treatment is compliant with Shari'ah principles.",
      rating: "Compliant"
    },
    {
      agent: "Accounting Standards Agent",
      avatar: "AA",
      review: "Entries for ROU asset and lease liability are correctly recognized. Depreciation calculation is appropriate, but consider adding disclosures about the useful life assumptions made, as required by paragraph 32 of FAS 32.",
      rating: "Mostly Compliant"
    },
    {
      agent: "Financial Reporting Agent",
      avatar: "FA",
      review: "The accounting treatment is sound, but additional disclosure is recommended regarding the nature of the Ijarah contract, including any purchase options at the end of the term and whether it contains any service components.",
      rating: "Enhancement Recommended"
    }
  ];

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold text-islamic-blue mb-6">Reviewers Panel</h2>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Multi-Agent Review Summary</CardTitle>
          <CardDescription>AI-based review of your accounting treatment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between px-4 py-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
            <span className="font-medium">Overall Assessment:</span>
            <span className="font-medium text-green-600 dark:text-green-400">Shari'ah Compliant with Minor Enhancements</span>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="reviews">
        <TabsList className="w-full max-w-md mx-auto mb-6">
          <TabsTrigger value="reviews">Agent Reviews</TabsTrigger>
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
          <TabsTrigger value="references">References</TabsTrigger>
        </TabsList>
        
        <TabsContent value="reviews">
          <div className="space-y-6">
            {reviews.map((review, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarFallback className="bg-islamic-blue text-white">{review.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{review.agent}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        Rating: 
                        <span className={`text-xs px-2 py-1 rounded ${
                          review.rating === "Compliant" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" :
                          review.rating === "Mostly Compliant" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" :
                          "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        }`}>
                          {review.rating}
                        </span>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300">{review.review}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="suggestions">
          <Card>
            <CardHeader>
              <CardTitle>Enhancement Suggestions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                <h4 className="font-medium text-islamic-blue mb-2">Additional Disclosures</h4>
                <p className="text-sm">Consider adding the following disclosures to enhance compliance:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                  <li>Description of the underlying asset and its useful life assumptions</li>
                  <li>Terms of variable lease payments, if any</li>
                  <li>Information about purchase options at the end of the Ijarah term</li>
                </ul>
              </div>
              
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-100 dark:border-yellow-800">
                <h4 className="font-medium text-yellow-800 dark:text-yellow-300 mb-2">Clarification Needed</h4>
                <p className="text-sm">The following points require clarification for complete assessment:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                  <li>Is this an Ijarah Muntahia Bittamleek (IMB) or a standard Ijarah?</li>
                  <li>Does the contract include any service components?</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="references">
          <Card>
            <CardHeader>
              <CardTitle>Shari'ah and Accounting References</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-islamic-blue mb-2">FAS 32: Ijarah</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Paragraphs 10-15 specify the recognition criteria for Ijarah assets and liabilities. Paragraph 32 outlines the disclosure requirements.</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-islamic-blue mb-2">Shari'ah Standard 9: Ijarah</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Sections 3.1 to 3.5 outline the fundamental Shari'ah requirements for valid Ijarah contracts, including the lessor's responsibility for asset ownership risks.</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-islamic-blue mb-2">AAOIFI Conceptual Framework</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Section 4.8 discusses the substance over form principle within the context of Islamic finance transactions.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
