/**
 * v0 by Vercel.
 * @see https://v0.dev/t/TiWbFQHPb7q
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function FAQ() {
  return (
    <>
      <Header />
      <div className="w-full bg-muted">
        <main className="container mx-auto py-12 px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
            <div>
              <h1 className="text-3xl font-bold">FAQ & Support</h1>
              <p className="mt-4 text-muted-foreground">
                Find answers to your questions or reach out for personalized
                support.
              </p>
              <div className="mt-8 space-y-8">
                <Collapsible>
                  <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-background px-4 py-3 text-lg font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none">
                    What is the Presale Platform?
                    <div className="h-5 w-5 transition-transform [&[data-state=open]]:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="rounded-b-md bg-background px-4 py-3 text-muted-foreground">
                    The Presale Platform is a comprehensive solution for
                    launching and managing successful presale campaigns. It
                    provides a range of features to help you engage your
                    community, manage token sales, and ensure a smooth
                    fundraising process.
                  </CollapsibleContent>
                </Collapsible>
                <Collapsible>
                  <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-background px-4 py-3 text-lg font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none">
                    How do I set up a presale campaign?
                    <div className="h-5 w-5 transition-transform [&[data-state=open]]:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="rounded-b-md bg-background px-4 py-3 text-muted-foreground">
                    To set up a presale campaign, you'll need to create an
                    account on the Presale Platform and follow the step-by-step
                    guide. This includes configuring your token details, setting
                    up the sale structure, and customizing the campaign's
                    appearance and messaging. Our team is also available to
                    provide personalized support throughout the process.
                  </CollapsibleContent>
                </Collapsible>
                <Collapsible>
                  <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-background px-4 py-3 text-lg font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none">
                    What are the benefits of using the Presale Platform?
                    <div className="h-5 w-5 transition-transform [&[data-state=open]]:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="rounded-b-md bg-background px-4 py-3 text-muted-foreground">
                    The Presale Platform offers a range of benefits to help you
                    run a successful presale campaign, including:
                    <ul className="mt-2 list-disc space-y-2 pl-4">
                      <li>
                        Customizable and mobile-responsive landing pages to
                        engage your community
                      </li>
                      <li>
                        Secure and reliable token sale management with real-time
                        tracking and reporting
                      </li>
                      <li>
                        Automated KYC and whitelisting processes to ensure
                        compliance
                      </li>
                      <li>
                        Integrated marketing and communication tools to
                        streamline your outreach efforts
                      </li>
                      <li>
                        Dedicated support from our experienced team to guide you
                        through the process
                      </li>
                    </ul>
                  </CollapsibleContent>
                </Collapsible>
                <Collapsible>
                  <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-background px-4 py-3 text-lg font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none">
                    How long does the support process take?
                    <div className="h-5 w-5 transition-transform [&[data-state=open]]:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="rounded-b-md bg-background px-4 py-3 text-muted-foreground">
                    Our support team is committed to providing a timely response
                    to all inquiries. We aim to respond to all support requests
                    within 1 business day. For more complex issues, our team
                    will work closely with you to ensure a resolution as quickly
                    as possible.
                  </CollapsibleContent>
                </Collapsible>
                <Collapsible>
                  <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-background px-4 py-3 text-lg font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none">
                    Can I get personalized support?
                    <div className="h-5 w-5 transition-transform [&[data-state=open]]:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="rounded-b-md bg-background px-4 py-3 text-muted-foreground">
                    Absolutely! Our team is dedicated to providing personalized
                    support to all our users. If you have any specific questions
                    or need assistance with your presale campaign, please don't
                    hesitate to reach out to us. You can submit a support
                    request using the form below, and one of our experts will be
                    in touch to address your needs.
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>
            <div className="rounded-md border bg-background p-6 shadow-sm">
              <h2 className="text-xl font-bold">Contact Support</h2>
              <p className="mt-2 text-muted-foreground">
                Have a question or need help with your presale campaign? Fill
                out the form below and our support team will get back to you
                within 1 business day.
              </p>
              <form className="mt-6 space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Describe your question or issue"
                    className="min-h-[120px]"
                  />
                </div>
                <Button type="submit" className="w-full bg-black text-zinc-400">
                  Submit Request
                </Button>
              </form>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
