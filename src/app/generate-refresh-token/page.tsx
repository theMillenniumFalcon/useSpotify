"use client"

import { Curl } from "@/components/generate-refresh-token/curl";
import { Generate } from "@/components/generate-refresh-token/generate";
import { Redirect } from "@/components/generate-refresh-token/redirect";

export default function GenerateRefreshToken() {
  return (
      <main className="font-[family-name:var(--font-geist-mono)]">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-8">Steps to generate Refresh Token:</h2>
          <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            <li className="mb-4">
                Visit the spotify for developers website,{" "}
                <a
                    href="https://developer.spotify.com"
                    rel="noopenner noreferrer"
                    target="_blank"
                    className="underline underline-offset-4"
                >
                    https://developer.spotify.com
                </a>
                {" "}and create a new app by clicking at the Create App button.
            </li>
            <li className="mb-4">
                In the settings tab, set{" "}
                <code className="bg-white/[.1] px-1 py-0.5 rounded font-semibold">
                    http://localhost:3000
                </code>
                {" "}in placeholder for Redirect URIs.
            </li>
            <li className="mb-4">
                For the question,{" "}
                <code className="bg-white/[.1] px-1 py-0.5 rounded font-semibold">
                    Which API/SDKs are you planning to use?
                </code>
                {" "} select Web APIs and click on Save button.
            </li>
            <li className="mb-4">
                Now we need to generate refresh token, which will further be used to generate access token, copy and paste
                the below code in your desired browser.
                <Generate />
            </li>
            <li className="mb-4">
                Authorize spotify to access your application, after that you be redirected
                to a URI. Save the code attribute in the URL, make sure to save it as it
                will be used further.
                <Redirect />
            </li>
            <li className="mb-4">
                To obtain a refresh token, you'll need to create a base64 encoded string.
                This string should combine your client ID and client secret in the format{" "}
                <code className="bg-white/[.1] px-1 py-0.5 rounded font-semibold">
                    'clientid:clientsecret'
                </code>
                . To generate the string, you can use an online encoder
                such as{" "}
                <a
                    href="https://www.base64encode.org"
                    rel="noopenner noreferrer"
                    target="_blank"
                    className="underline underline-offset-4"
                >
                    https://www.base64encode.org
                </a>.
            </li>
            <li className="mb-4">
                Once the encoded string is generated, run the following cURL command:
                <Curl />
            </li>
            <li>
                A json file which looks quite similar to the given below will be generated,
                the refresh token is the value of the{" "}
                <code className="bg-white/[.1] px-1 py-0.5 rounded font-semibold">
                    refresh_token
                </code>{" "}key. There is no expiration date for this refresh token.
            </li>
        </ol>
        </section>
      </main>
  );
}
