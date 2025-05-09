
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function JournalEntries() {
  const journalEntries = [
    {
      title: "Ijarah Contract - Building Lease",
      date: "2025-05-04",
      fasStandard: "FAS 32: Ijarah",
      entries: [
        { account: "Right of Use Asset - Building", debit: 100000 },
        { account: "Lease Liability", credit: 100000 },
        { account: "Depreciation Expense", debit: 20000 },
        { account: "Accumulated Depreciation", credit: 20000 },
        { account: "Finance Cost", debit: 5000 },
        { account: "Lease Liability", credit: 5000 }
      ]
    },
    {
      title: "Murabaha Financing",
      date: "2025-05-03",
      fasStandard: "FAS 28: Murabaha",
      entries: [
        { account: "Murabaha Receivables", debit: 50000 },
        { account: "Cash", credit: 50000 },
        { account: "Unearned Murabaha Income", credit: 7500 }
      ]
    }
  ];

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold text-islamic-blue mb-6">Journal Entries</h2>
      
      <div className="space-y-6">
        {journalEntries.map((journal, idx) => (
          <Card key={idx}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{journal.title}</CardTitle>
                  <CardDescription>Date: {journal.date}</CardDescription>
                </div>
                <span className="fas-badge">{journal.fasStandard}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="journal-entry">
                {journal.entries.map((entry, entryIdx) => (
                  <div key={entryIdx} className="journal-row">
                    <div className={entry.debit ? "" : "pl-8"}>
                      {entry.account}
                    </div>
                    <div className="journal-debit">{entry.debit ? `$${entry.debit.toLocaleString()}` : ""}</div>
                    <div className="journal-credit">{entry.credit ? `$${entry.credit.toLocaleString()}` : ""}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
