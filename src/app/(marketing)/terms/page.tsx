import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

const TermsOfService = () => {
  return (
    <div className="container mx-auto px-4 pb-16 pt-28 md:pb-20 md:pt-32 xl:pb-40 xl:pt-56">
      <Card className="max-w-4xl mx-auto border border-black-50">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-white">
            Terms of Service
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4 text-white bg-[#000]">
            <section className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  1. Acceptance of Terms
                </h2>
                <p className="text-muted-foreground">
                  By accessing and using our service, you accept and agree to be
                  bound by the terms and provisions of this agreement. Our
                  service is provided under the Apache License, Version 2.0.
                </p>
              </div>

              <Separator className="border border-black-50" />

              <div>
                <h2 className="text-xl font-semibold mb-4">
                  2. Apache-2.0 License
                </h2>

                <div className="text-muted-foreground space-y-4">
                  <p>
                    Our software is licensed under the Apache License, Version
                    2.0 (the "License"). You may obtain a copy of the License
                    at:
                  </p>
                  <Link
                    href="http://www.apache.org/licenses/LICENSE-2.0"
                    className="font-mono bg-[#000] text-white"
                  >
                    http://www.apache.org/licenses/LICENSE-2.0
                  </Link>
                  <p>Key terms of the Apache-2.0 License include:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Right to use, reproduce, and distribute the software
                    </li>
                    <li>Ability to modify and create derivative works</li>
                    <li>
                      Requirement to preserve copyright and license notices
                    </li>
                    <li>No warranty or liability for the software</li>
                  </ul>
                </div>
              </div>

              <Separator className="border border-black-50" />

              <div>
                <h2 className="text-xl font-semibold mb-4">
                  3. User Rights and Responsibilities
                </h2>

                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Users must comply with the Apache-2.0 License terms</li>
                  <li>
                    Users may use, modify, and distribute the software under the
                    License
                  </li>
                  <li>
                    Attribution and original copyright notices must be
                    maintained
                  </li>
                  <li>
                    Users are responsible for compliance with the License terms
                  </li>
                </ul>
              </div>

              <Separator className="border border-black-50" />

              <div>
                <h2 className="text-xl font-semibold mb-4">
                  4. Intellectual Property
                </h2>

                <p className="text-muted-foreground">
                  Our software's source code and related materials are made
                  available under the Apache-2.0 License. This ensures
                  transparency, collaboration, and the right to use and modify
                  the software.
                </p>
              </div>

              <Separator className="border border-black-50" />

              <div>
                <h2 className="text-xl font-semibold mb-4">
                  5. Limitation of Liability
                </h2>

                <p className="text-muted-foreground">
                  As specified in the Apache-2.0 License, the software is
                  provided "AS IS", WITHOUT WARRANTIES OR CONDITIONS OF ANY
                  KIND. We are not liable for any damages or claims arising from
                  the use of the software.
                </p>
              </div>

              <Separator className="border border-black-50" />

              <div>
                <h2 className="text-xl font-semibold mb-4">6. Contributions</h2>
                <p className="text-muted-foreground">
                  Contributions to our project are welcome and will be subject
                  to the terms of the Apache-2.0 License. By submitting a
                  contribution, you agree to license your work under the same
                  terms.
                </p>
              </div>

              <Separator className="border border-black-50" />

              <div>
                <h2 className="text-xl font-semibold mb-4">7. Governing Law</h2>
                <p className="text-muted-foreground">
                  These terms and the Apache-2.0 License shall be governed by
                  and construed in accordance with the laws applicable to
                  open-source software licensing.
                </p>
              </div>
            </section>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsOfService;
