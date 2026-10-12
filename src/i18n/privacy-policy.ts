/**
 * The Privacy Policy shown on /privacy.
 *
 * Text rules: each block is a paragraph, or `{ list: [...] }` for a bullet list.
 * Wrap words in **double asterisks** to make them bold. `{email}` becomes the
 * support email from src/config/site.ts.
 *
 * Have a lawyer who knows Bangladesh law review this before relying on it.
 */
export type LegalBlock = string | { list: string[] };

export interface LegalDocument {
  title: string;
  /** ISO date (YYYY-MM-DD) shown as "Last updated". */
  updated: string;
  /** true shows the yellow "placeholder text" banner above the document. */
  placeholder: boolean;
  /** Optional note shown above the text (used for the Bangla "English only" notice). */
  note: string;
  intro: string[];
  /** Optional highlighted one-paragraph summary under the intro. */
  summary: string;
  sections: { h: string; blocks: LegalBlock[] }[];
}

export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  updated: "2026-10-12",
  placeholder: false,
  note: "",
  intro: [
    "MediDesk is practice management software for doctors, run by Qualixe. This policy explains what information MediDesk collects, why we collect it and how we protect it. It covers the MediDesk desktop app and the services behind it.",
  ],
  summary:
    "**In short:** your patients' records belong to your clinic. We store them so the app can work, we don't sell them, and we don't use them for advertising.",
  sections: [
    {
      h: "Information we collect",
      blocks: [
        "**Account and clinic details.** When you sign up we collect your name, email address and password. Your password is stored only in scrambled (hashed) form, and we can't read it. For your clinic we store its name, phone number, address, city and logo, and the doctor's name, credentials and registration number that you choose to print on prescriptions.",
        "**Records you keep in the app.** MediDesk stores what you and your staff enter:",
        {
          list: [
            "patients: name, phone, email, date of birth, gender, blood group, address, emergency contact, allergies, chronic conditions, medical history and notes",
            "appointments",
            "consultations: vitals, complaints, diagnosis, examination notes and treatment plans",
            "prescriptions and tests",
            "invoices and the payments your patients make to you",
          ],
        },
        "**Subscription payments.** When you pay for MediDesk by bKash we store the transaction ID (TrxID), the number you paid from, the amount and the date. We never see or store your bKash PIN or any card details.",
        "**Technical information.** To keep accounts secure we record when you sign in, the internet address (IP) and the type of device used, and a log of important actions in your clinic, such as changes to settings and subscription. MediDesk contains no advertising and no tracking for marketing.",
      ],
    },
    {
      h: "How we use information",
      blocks: [
        "We use this information only to:",
        {
          list: [
            "run the app for your clinic and keep your records in step between your computers",
            "sign you in, and send the codes that verify your email or reset your password",
            "handle your subscription and check your payments",
            "answer your questions and fix problems when you contact support",
            "keep the service secure, for example by limiting repeated wrong sign-in attempts",
          ],
        },
        "We don't use patient records for advertising, and we don't use them to build profiles of patients.",
      ],
    },
    {
      h: "How we protect patient data",
      blocks: [
        {
          list: [
            "**Encrypted connection.** Everything sent between the app and our servers travels over an encrypted connection (HTTPS).",
            "**Each clinic is separate.** The database itself enforces that a clinic can only reach its own records. One clinic can never see another clinic's patients.",
            "**Access by role.** Inside your clinic, each person sees only what their role allows (owner, doctor, receptionist or staff). Only the owner can change clinic settings and the subscription.",
            "**Protected sign-in.** Passwords are stored hashed. Sign-in attempts and emailed codes are limited to stop guessing. The sign-in kept on your computer is encrypted by Windows.",
            "**The copy on your computer.** So that MediDesk works without internet, it keeps a copy of your clinic's records on each computer where you sign in. That copy is protected by your Windows account. Please use a Windows password, don't share your Windows account, and sign out of MediDesk on computers you no longer use.",
            "**Where data is hosted.** Records are stored on cloud servers provided by Railway. These servers may be located outside Bangladesh.",
          ],
        },
        "No system can be guaranteed to be completely secure. If we learn of a breach that affects your clinic's data, we will tell you.",
      ],
    },
    {
      h: "Sharing and disclosure",
      blocks: [
        "We never sell patient data or account data.",
        "We share information only with the companies that help us run MediDesk, and only as far as they need it to do that work:",
        {
          list: [
            "**Railway:** hosts our servers and the database",
            "**Resend:** delivers our emails, such as verification codes (it receives your email address)",
            "**Vercel:** hosts the internal tool our team uses to manage subscriptions",
            "**bKash:** you pay us through bKash directly; we receive only the transaction details listed above",
          ],
        },
        "Our own team can see your account, clinic and subscription details in order to manage your subscription. We open a clinic's patient records only when you ask us for help that needs it, or when it is necessary to keep the service working and backed up.",
        "We may disclose information if the law requires it.",
      ],
    },
    {
      h: "Data retention and deletion",
      blocks: [
        {
          list: [
            "While you use MediDesk, we keep your clinic's records so they are available to you.",
            "If your subscription ends, your records are not deleted. They stay available to read, and you can add or change records again once you renew.",
            "Records you delete in the app are removed from your screens. Copies may remain in our backups for a limited time.",
            "**Getting your data out.** You can print or save prescriptions and invoices as PDF, and export reports to Excel. For a full copy of your clinic's records, email us.",
            "**Deleting your clinic.** Email us from the clinic owner's address and we will delete your clinic's records from our servers within 30 days. Copies in backups are removed as those backups expire. The copy stored on your own computers stays there until you uninstall MediDesk or delete its data folder.",
          ],
        },
        "As a clinic you are responsible for your patients' records, including keeping them for as long as medical regulations require.",
      ],
    },
    {
      h: "Contact",
      blocks: ["Questions about privacy, or a request to export or delete your data? Email {email}."],
    },
  ],
};
