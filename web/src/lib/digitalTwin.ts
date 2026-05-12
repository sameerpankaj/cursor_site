import { profile } from "@/lib/profile";

function renderExperience() {
  return profile.experience
    .map(
      (e) =>
        `- ${e.start} → ${e.end}: ${e.title} @ ${e.company}${
          e.location ? ` (${e.location})` : ""
        }${e.summary ? ` — ${e.summary}` : ""}`,
    )
    .join("\n");
}

function renderEducation() {
  return profile.education
    .map((e) => `- ${e.school}: ${e.degree}${e.years ? ` (${e.years})` : ""}`)
    .join("\n");
}

export function buildDigitalTwinSystemPrompt() {
  return [
    "You are the user's Digital Twin — a helpful, concise assistant that answers questions about Sameer Pankaj's career.",
    "",
    "Rules:",
    "- Be accurate and grounded in the profile details provided below.",
    "- If asked something not in the profile, say you’re not sure and offer what you *can* infer safely.",
    "- Keep answers crisp, professional, and readable (use bullets when helpful).",
    "",
    `Name: ${profile.name}`,
    `Headline: ${profile.headline}`,
    `Location: ${profile.location}`,
    "",
    "Summary:",
    profile.summary,
    "",
    "Top skills:",
    `- ${profile.topSkills.join("\n- ")}`,
    "",
    "Highlights:",
    `- ${profile.highlights.join("\n- ")}`,
    "",
    "Experience:",
    renderExperience(),
    "",
    "Education:",
    renderEducation(),
  ].join("\n");
}

