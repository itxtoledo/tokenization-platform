export default function Disclainer() {
  return (
    <>
      <div className="w-full max-w-4xl mx-auto py-12 md:py-16 px-4 md:px-6">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Terms of Service
            </h1>
            <p className="mt-4 text-muted-foreground">
              Welcome to our presale platform. By accessing or using our
              platform, you agree to be bound by these terms of service and our
              privacy policy. Please read these terms carefully before using our
              services.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Agreement to Terms</h2>
            <p className="mt-4 text-muted-foreground">
              These terms of service, together with any amendments, form a
              binding legal agreement between you and our company. By accessing
              or using our platform, you acknowledge that you have read,
              understood, and agree to be bound by these terms.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Eligibility</h2>
            <p className="mt-4 text-muted-foreground">
              Our platform is intended for use by individuals who are at least
              18 years of age and have the legal capacity to enter into a
              binding contract. By using our platform, you represent and warrant
              that you meet these eligibility requirements.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">User Accounts</h2>
            <p className="mt-4 text-muted-foreground">
              To use our platform, you must create an account. You are
              responsible for maintaining the confidentiality of your account
              credentials and for all activities that occur under your account.
              You agree to immediately notify us of any unauthorized use of your
              account or any other breach of security.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Prohibited Activities</h2>
            <p className="mt-4 text-muted-foreground">
              You agree not to engage in any of the following prohibited
              activities:
            </p>
            <ul className="mt-4 space-y-2 list-disc pl-6">
              <li>
                Violating any applicable laws, regulations, or these terms of
                service
              </li>
              <li>
                Interfering with or disrupting the integrity or performance of
                our platform
              </li>
              <li>
                Attempting to gain unauthorized access to our platform or
                related systems or networks
              </li>
              <li>Engaging in any activity that could be harmful to minors</li>
              <li>
                Uploading, posting, or transmitting any content that is
                unlawful, harmful, threatening, abusive, harassing, defamatory,
                vulgar, obscene, or otherwise objectionable
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Termination</h2>
            <p className="mt-4 text-muted-foreground">
              We reserve the right to suspend or terminate your access to our
              platform at any time, for any reason, including if we reasonably
              believe that you have violated these terms of service. You may
              also delete your account at any time, but you will not be entitled
              to any refund of any fees or other amounts paid.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Limitation of Liability</h2>
            <p className="mt-4 text-muted-foreground">
              In no event shall our company be liable for any indirect, special,
              incidental, or consequential damages arising out of or in
              connection with your use of our platform. Our total liability
              shall not exceed $100.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Governing Law</h2>
            <p className="mt-4 text-muted-foreground">
              These terms of service shall be governed by and construed in
              accordance with the laws of [Jurisdiction], without giving effect
              to any principles of conflicts of law.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Changes to Terms</h2>
            <p className="mt-4 text-muted-foreground">
              We reserve the right to modify these terms of service at any time.
              Any changes will be effective upon posting the revised terms on
              our platform. Your continued use of our platform after any such
              changes constitutes your acceptance of the new terms.
            </p>
          </div>
          <div className="mt-4">
            <button
              className="inline-flex items-center gap-2 text-primary hover:underline"
              onClick={() => window.close()}
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function ArrowLeftIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}
