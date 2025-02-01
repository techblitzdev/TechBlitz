import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { createMetadata } from '@/utils/seo'

export async function generateMetadata() {
  return createMetadata({
    title: 'Privacy Policy | TechBlitz',
    description: 'Privacy Policy for TechBlitz',
    image: {
      text: 'Privacy Policy | TechBlitz',
      bgColor: '#000',
      textColor: '#fff',
    },
    canonicalUrl: '/privacy',
  })
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 pb-16 pt-28 md:pb-20 md:pt-32 xl:pb-40 xl:pt-56 flex flex-col gap-y-5 items-center">
      <Card className="max-w-4xl mx-auto border border-black-50">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-white">
            Privacy Policy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4 text-white bg-[#000]">
            <section className="space-y-6">
              <div>
                <p className="text-muted-foreground mb-4">
                  This Privacy Policy describes how techblitz (the "Site", "we",
                  "us", or "our") collects, uses, and discloses your personal
                  information when you visit, use our services, or subscribe to
                  techblitz.dev (the "Site") or otherwise communicate with us
                  (collectively, the "Services").
                </p>
              </div>

              <Separator className="border border-black-50" />

              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Changes to This Privacy Policy
                </h2>
                <p className="text-muted-foreground">
                  We may update this Privacy Policy from time to time to reflect
                  changes to our practices or for operational, legal, or
                  regulatory reasons. We will post the revised Privacy Policy on
                  the Site and update the "Last updated" date.
                </p>
              </div>

              <Separator className="border border-black-50" />

              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Information We Collect
                </h2>
                <div className="text-muted-foreground space-y-4">
                  <h3 className="font-semibold">
                    Information You Provide Directly:
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Account information (email address, password), passwords
                      never stored on our servers
                    </li>
                    <li>
                      Payment information (processed securely through Stripe)
                    </li>
                    <li>Communications with our support team</li>
                    <li>Profile information you choose to provide</li>
                  </ul>

                  <h3 className="font-semibold mt-4">
                    Information Collected Automatically:
                  </h3>
                  <p>
                    We use Posthog analytics to collect usage data about how you
                    interact with our services, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Device and browser information</li>
                    <li>IP address and location data</li>
                    <li>Pages visited and features used</li>
                    <li>Time spent on the platform</li>
                  </ul>

                  <h3 className="font-semibold mt-4">
                    Information from Third Parties:
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Payment processing information from Stripe</li>
                    <li>Service providers who assist with our operations</li>
                  </ul>
                </div>
              </div>

              <Separator className="border border-black-50" />

              <div>
                <h2 className="text-xl font-semibold mb-4">
                  How We Use Your Information
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>
                    <span className="font-semibold">Service Provision:</span>{' '}
                    Processing subscriptions, providing access to our platform,
                    and managing your account
                  </li>
                  <li>
                    <span className="font-semibold">
                      Analytics and Improvement:
                    </span>{' '}
                    Using Posthog to analyze usage patterns and improve our
                    services
                  </li>
                  <li>
                    <span className="font-semibold">Security:</span> Protecting
                    against unauthorized access and ensuring platform security
                  </li>
                  <li>
                    <span className="font-semibold">Communication:</span>{' '}
                    Sending important updates about our services and responding
                    to your requests
                  </li>
                </ul>
              </div>

              <Separator className="border border-black-50" />

              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Data Processing Partners
                </h2>
                <div className="text-muted-foreground space-y-4">
                  <p>We work with the following key service providers:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <span className="font-semibold">Stripe:</span> For secure
                      payment processing. Their privacy policy can be viewed at
                      https://stripe.com/us/privacy
                    </li>
                    <li>
                      <span className="font-semibold">Posthog:</span> For
                      analytics and platform improvement. Their privacy policy
                      can be viewed at https://posthog.com/privacy
                    </li>
                    <li>
                      <span className="font-semibold">Supabase:</span> For
                      authentication, file and data storage. Their privacy
                      policy can be viewed at https://supabase.com/privacy
                    </li>
                  </ul>
                  <p>
                    These partners are contractually bound to handle your data
                    securely and cannot use it for their own purposes. We do not
                    sell your personal information to third parties.
                  </p>
                </div>
              </div>

              <Separator className="border border-black-50" />

              <div>
                <h2 className="text-xl font-semibold mb-4">Data Security</h2>
                <p className="text-muted-foreground">
                  We implement industry-standard security measures to protect
                  your data. Payment information is handled securely by Stripe,
                  user data is handled by Supabase and is never stored on our
                  servers.
                </p>
              </div>

              <Separator className="border border-black-50" />

              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Your Rights and Choices
                </h2>
                <div className="text-muted-foreground space-y-4">
                  <p>You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate data</li>
                    <li>Request deletion of your data</li>
                    <li>Export your data</li>
                    <li>Opt out of analytics collection</li>
                    <li>Cancel your subscription</li>
                  </ul>
                </div>
              </div>

              <Separator className="border border-black-50" />

              <div>
                <h2 className="text-xl font-semibold mb-4">
                  International Data Transfers
                </h2>
                <p className="text-muted-foreground">
                  We process data in the United Kingdom. By using our services,
                  you consent to your data being transferred to and processed in
                  the United States, with appropriate safeguards in place as
                  required by law.
                </p>
              </div>

              <Separator className="border border-black-50" />

              <div>
                <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
                <p className="text-muted-foreground">
                  For questions about this Privacy Policy or to exercise your
                  rights, contact us at{' '}
                  <Link
                    href="mailto:team@techblitz.dev"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    team@techblitz.dev
                  </Link>
                </p>
              </div>
            </section>
          </ScrollArea>
        </CardContent>
      </Card>
      <div className="">Last updated: 19/12/2024</div>
    </div>
  )
}
