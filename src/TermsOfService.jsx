import { Link } from "react-router-dom";

function TermsOfService() {
  return (
    <div className="terms-page">
      <div className="terms-card">
        <h1>Terms of Service</h1>
        <p className="updated">Last Updated: April 22, 2026</p>

        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using this authentication system ("Service"), you
            accept and agree to be bound by these terms. If you do not agree, do
            not use this service.
          </p>
        </section>

        <section>
          <h2>2. Use License</h2>
          <p>
            Permission is granted to temporarily use the materials on this
            service for personal, non-commercial purposes only. This is a
            license, not a transfer of ownership.
          </p>
          <p>You may not:</p>
          <ul>
            <li>Modify or copy the materials</li>
            <li>Use the materials for commercial purposes</li>
            <li>Attempt to decompile or reverse engineer the software</li>
            <li>Remove copyright or proprietary notices</li>
            <li>Transfer or mirror the materials on another server</li>
          </ul>
        </section>

        <section>
          <h2>3. Disclaimer</h2>
          <p>
            The materials on the service are provided on an "as is" basis. We
            make no warranties, express or implied, including warranties of
            merchantability, fitness for a particular purpose, or
            non-infringement.
          </p>
        </section>

        <section>
          <h2>4. Limitations</h2>
          <p>
            We shall not be liable for any damages, including loss of data,
            profit, or business interruption, arising from the use or inability
            to use the service.
          </p>
        </section>

        <section>
          <h2>5. Accuracy of Materials</h2>
          <p>
            The materials on the service may contain technical, typographical,
            or other errors. We do not guarantee that the content is accurate,
            complete, or current.
          </p>
        </section>

        <section>
          <h2>6. Links</h2>
          <p>
            We are not responsible for the content of external linked websites.
            Inclusion of a link does not imply endorsement.
          </p>
        </section>

        <section>
          <h2>7. Modifications</h2>
          <p>
            We may revise these terms at any time without notice. By continuing
            to use the service, you agree to the current version.
          </p>
        </section>

        <section>
          <h2>8. Governing Law</h2>
          <p>
            These terms are governed by the laws of your jurisdiction. Any
            disputes will be subject to the courts of that jurisdiction.
          </p>
        </section>

        <section>
          <h2>9. Contact Information</h2>
          <p>
            If you have questions about these Terms of Service, contact us at
            support@example.com.
          </p>
        </section>

        <Link className="back-link" to="/">
          Go to home page
        </Link>
      </div>
    </div>
  );
}

export default TermsOfService;
