export type ProfileExperience = {
  company: string;
  title: string;
  start: string;
  end: string;
  location?: string;
  summary?: string;
};

export type ProfileEducation = {
  school: string;
  degree: string;
  years?: string;
};

export const profile = {
  name: "Sameer Pankaj",
  headline: "Test Manager • Function Owner",
  location: "Munich, Germany",
  summary:
    "I lead integration and function-level testing for automotive programs—bridging requirements, stakeholders, and engineering execution. My work focuses on building confidence in complex vehicle functions through pragmatic test strategy, clean alignment, and reliable delivery across global teams.",
  links: {
    email: "sameer.karnaa@gmail.com",
    linkedin: "https://www.linkedin.com/in/sameer-pankaj-2a750831",
  },
  topSkills: ["Defining Requirements", "Automotive", "Electric Vehicles"],
  highlights: [
    "Function ownership and end-to-end integration testing",
    "Requirements clarity, alignment, and stakeholder coordination",
    "Delivery focus across global, cross-functional teams",
  ],
  experience: [
    {
      company: "Pixida",
      title: "Function Owner",
      start: "May 2023",
      end: "Present",
      location: "Germany",
      summary: "Function Owner for a BMW project.",
    },
    {
      company: "Volkswagen Group China",
      title: "Integration Test Manager",
      start: "Jul 2022",
      end: "Apr 2023",
      location: "Beijing, China",
    },
    {
      company: "BMW Group",
      title: "Function Owner",
      start: "Jul 2021",
      end: "Jul 2022",
      location: "Beijing, China",
    },
    {
      company: "CIeNET Technologies",
      title: "Software Developer / Software Test Engineer",
      start: "Jul 2018",
      end: "Jun 2021",
      location: "Beijing, China",
    },
  ] satisfies ProfileExperience[],
  education: [
    {
      school: "Dalian University of Technology",
      degree: "Masters in Computer Science and Technology",
      years: "2015 – 2018",
    },
    {
      school: "Rajiv Gandhi Prodyogiki Vishwavidyalaya",
      degree: "Bachelor’s in Computer Science and Engineering",
      years: "2007 – 2011",
    },
  ] satisfies ProfileEducation[],
} as const;

