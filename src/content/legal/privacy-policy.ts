import type { LegalDocument } from "@/content/legal/types";

export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  lastUpdated: "March 24, 2024",
  intro: ["This website collects certain personal data from its users."],
  sections: [
    {
      title: "Owner and Data Controller",
      paragraphs: ["Hostyler Group", "Email: Support@Hostyler.com"],
    },
    {
      title: "Types of Data Collected",
      paragraphs: [
        "Among the types of personal data that Hostyler Group collects, either directly or through third parties, are cookies, usage data, first name, last name, phone number, and email address.",
        "For detailed information on each type of personal data collected, please refer to the dedicated sections of this privacy policy or specific explanation texts provided before data collection.",
        "Personal data may be freely provided by the user, or, in the case of usage data, collected automatically while using the website. Unless specified otherwise, all data requested by Hostyler Group is mandatory, and failure to provide this data may make it impossible for the website to provide its services.",
        "Any use of cookies or other tracking tools by Hostyler Group or third-party service providers used by the website is for the purpose of providing the required service to the user, as well as other purposes described in this document.",
        "Users are responsible for any third-party personal data obtained, published, or shared through the Hostyler Group website.",
      ],
    },
    {
      title: "Methods and Place of Data Processing",
      paragraphs: [
        "Hostyler Group takes appropriate security measures to prevent unauthorized access, disclosure, alteration, or unauthorized destruction of data. Data processing is carried out using computers and/or IT-enabled tools, following organizational procedures and modes strictly related to the purposes indicated.",
        "Data processing may occur at Hostyler Group's operating offices and other locations where parties involved in the processing are located. Data transfers may involve transferring the user's data to a country other than their own.",
      ],
    },
    {
      title: "Retention Time",
      paragraphs: [
        "Personal data is processed and stored for as long as necessary for the purposes it was collected for, and may be retained longer due to legal obligations or user consent.",
      ],
    },
    {
      title: "Purposes of Processing",
      paragraphs: [
        "Hostyler Group collects user data to provide its services, comply with legal obligations, respond to enforcement requests, protect its rights and interests, detect malicious or fraudulent activity, and for purposes such as remarketing, behavioral targeting, contacting users, advertising, analytics, hosting, and backend infrastructure, among others.",
        'For specific information about the personal data used for each purpose, users may refer to the "Detailed Information on the Processing of Personal Data" section.',
      ],
    },
    {
      title: "Users' Rights",
      paragraphs: [
        "Users have the right to withdraw consent, object to processing, access their data, verify and seek rectification, restrict processing, request erasure or removal of data, receive their data and have it transferred to another controller, and lodge complaints. Users may exercise these rights by contacting Hostyler Group.",
      ],
    },
    {
      title: "Changes to This Privacy Policy",
      paragraphs: [
        "Hostyler Group reserves the right to make changes to this privacy policy at any time by notifying users on the website. It is recommended to check this page often for updates.",
        "This privacy policy relates solely to Hostyler Group's website.",
      ],
    },
  ],
};
