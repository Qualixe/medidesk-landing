import type { LegalDocument } from "./privacy-policy";

/**
 * The Terms of Service shown on /terms.
 *
 * Text rules (same as privacy-policy.ts): each block is a paragraph, or
 * `{ list: [...] }` for a bullet list. **Double asterisks** make text bold.
 * `{email}` becomes the support email and `{privacy}` a link to the Privacy Policy.
 *
 * The plan prices are written out here, so update this text if they change
 * in src/config/pricing.ts. Have a lawyer who knows Bangladesh law review it.
 */
export const termsOfService: LegalDocument = {
  title: "Terms of Service",
  updated: "2026-10-12",
  placeholder: false,
  note: "",
  intro: [
    "These terms govern your use of the MediDesk desktop application and related services (\"MediDesk\"), provided by Qualixe (\"we\", \"us\"). By creating an account or using MediDesk you agree to these terms. If you don't agree, please don't use MediDesk.",
  ],
  summary: "",
  sections: [
    {
      h: "Your account",
      blocks: [
        {
          list: [
            "**Who may sign up.** You must be at least 18 years old, and a medical practitioner or someone authorised to act for a clinic or chamber.",
            "**Your details.** Give a real name and a working email address. We send a code to that address to verify it.",
            "**Your clinic.** The person who creates a clinic is its owner. The owner is responsible for the clinic's subscription, its settings, and what the people working in it do in MediDesk.",
            "**Keeping it secure.** Keep your password private, don't share one account between people, and tell us straight away if you think someone else has used your account. You are responsible for activity under your account.",
            "**Your computers.** MediDesk keeps a copy of your clinic's records on each computer where you sign in, so it works without internet. You are responsible for keeping those computers secure.",
          ],
        },
      ],
    },
    {
      h: "Free trial and subscription",
      blocks: [
        {
          list: [
            "**Free trial.** Every new clinic gets a 7-day free trial with all features. No payment details are needed. One trial per clinic.",
            "**Plans and prices.** The Basic plan costs ৳500 per month or ৳5,000 per year. Prices are shown in the app. A plan covers one doctor.",
            "**Payment.** You pay by bKash to the number shown in the app, using the reference the app gives you, and then enter the transaction ID (TrxID). We check the payment and activate your plan, usually within a few hours. If your plan had already ended, you get up to 48 hours of access while we check.",
            "**Activation codes.** If you bought MediDesk for cash or from an agent, you can enter an activation code instead. A code works once.",
            "**Renewal.** Plans do not renew automatically, and we never take money from you without your action. To continue, pay again before your plan ends. Time you have already paid for is kept when you renew early.",
            "**When a plan ends.** Your records are not deleted. You can still open and read them, but you cannot add or change records until you renew.",
            "**Refunds.** Payments are not refundable once your plan has been activated. If you paid twice by mistake, or paid and we could not activate your plan, contact us and we will refund that payment or add the time to your plan.",
            "**Price changes.** We may change prices. A new price applies from your next payment, never to time you have already paid for.",
            "**Upcoming features.** Features shown as \"coming soon\" are plans, not promises. Don't buy a subscription because of a feature that is not available yet.",
          ],
        },
      ],
    },
    {
      h: "Acceptable use",
      blocks: [
        "You may not:",
        {
          list: [
            "use MediDesk for anything illegal, or to store records you have no right to hold",
            "access, or try to access, another clinic's data",
            "share your account, or resell, rent or sublicense MediDesk without our written permission",
            "copy, modify, reverse-engineer or try to get around the software's protections or plan limits",
            "attack the service, test it for weaknesses without permission, or overload it with automated requests",
            "upload viruses or other harmful material",
            "submit false payment details or transaction IDs",
          ],
        },
        "We may suspend or close an account that breaks these terms, or where a payment turns out to be false. Where we reasonably can, we will warn you first and give you a chance to fix the problem.",
      ],
    },
    {
      h: "Clinical responsibility",
      blocks: [
        "MediDesk is a record-keeping and practice management tool. It is not a medical device and does not give medical advice.",
        {
          list: [
            "Medicine lists, diagnosis lists, test lists and templates in MediDesk are there for convenience. They are not recommendations.",
            "MediDesk does not check prescriptions for correct dose, drug interactions or allergies.",
            "Every diagnosis, prescription and clinical decision is made by the practitioner, who remains fully responsible for it and for checking everything before it is printed or given to a patient.",
            "You are responsible for the accuracy of what you enter, for obtaining any consent your patients must give, and for keeping patient records as the law and your professional body require.",
          ],
        },
      ],
    },
    {
      h: "Your data",
      blocks: [
        "Your clinic's records belong to your clinic. You give us permission to store and process them only to provide MediDesk to you. How we handle and protect information is described in our {privacy}.",
      ],
    },
    {
      h: "Availability and changes",
      blocks: [
        "We work to keep MediDesk available and your data safe, but we do not promise that it will always be available or free of errors. MediDesk works without internet on your computer and syncs when the connection returns. We may update, change or remove features. If we ever stop the service, we will give you reasonable notice and a way to get a copy of your records.",
      ],
    },
    {
      h: "Limitation of liability",
      blocks: [
        "MediDesk is provided \"as is\". To the extent the law allows:",
        {
          list: [
            "we are not liable for clinical decisions, or for any harm to a patient arising from the use of MediDesk",
            "we are not liable for indirect losses such as lost income, lost profit or lost business",
            "we are not liable for loss caused by events outside our reasonable control, including internet, power or bKash outages",
            "our total liability to you for any claim is limited to the amount you paid us for MediDesk in the 12 months before the claim",
          ],
        },
        "Nothing in these terms limits liability that cannot be limited by law.",
      ],
    },
    {
      h: "Changes to these terms",
      blocks: [
        "We may update these terms. If a change is important, we will tell you in the app or by email before it takes effect. If you keep using MediDesk after that, you accept the updated terms.",
      ],
    },
    {
      h: "Governing law",
      blocks: [
        "These terms are governed by the laws of Bangladesh. Any dispute will be handled by the courts of Dhaka, Bangladesh.",
      ],
    },
    {
      h: "Contact",
      blocks: ["Questions about these terms? Email {email}."],
    },
  ],
};
