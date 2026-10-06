// Shared event knowledge — used by the AI assistant system prompt and the frontend.
export const EVENT_INFO = {
  eventName: "BURNOUT",
  organiser: "SAE Collegiate Club MMMUT (Society of Automotive Engineers)",
  university: "Madan Mohan Malviya University of Technology, Gorakhpur",
  tagline: "RC racing. Engineering. Glory.",
  divisions: ["BAJA SAE", "SUPRA SAE", "AERO DESIGN"],
  teamSize: "2–5 members (1 leader + up to 4 members)",
scoring: {
  prefinalRace: "Max 100 pts (1st 100, 2nd 75, 3rd 55, 4th 35)",
  finalRace: "Max 75 pts (1st 75, 2nd 60, 3rd 45, 4th 30, 5th 20 if five finalists)",
  durability: "Max 50 pts (50 first attempt, 35 second attempt)",
  manoeuvrability: "Max 50 pts (50 first attempt, 40 second attempt)",
  technical: "Max 40 pts (25 first attempt or 20 second attempt, +15 innovation bonus)",
  mixedTeamBonus: "0 or 10 pts",
  total: "Max 315 pts, plus 10 pts mixed-team bonus (325 with bonus)",
},
} as const;

export const EVENT_KNOWLEDGE = `
EVENT: BURNOUT — the flagship RC car racing event organised by the SAE Collegiate Club of
Madan Mohan Malviya University of Technology (MMMUT), Gorakhpur.

ABOUT SAE MMMUT: The Society of Automotive Engineers (SAE) Collegiate Club at MMMUT runs three
competitive divisions: BAJA SAE (off-road buggy), SUPRA SAE (formula-style car) and AERO DESIGN
(RC aircraft). BURNOUT is their RC racing showdown.

REGISTRATION: Teams register on the website after signing in. A team has 2–5 members:
one team leader (name, roll number, branch, 10-digit phone required) plus up to 4 members.
Registration requires paying the registration fee via UPI/bank transfer (details and QR code are
shown on the registration page) and uploading the payment screenshot with the transaction reference.
Admins review every registration; status can be Pending, Verified or Rejected and is visible in
"My Registration".

SCORING (max 325 points):
- Pre-Final Race: max 40 pts (25 race points + 15 bonus)
- Final Race: max 100 pts
- Durability Test: max 75 pts
- Manoeuvrability Test: max 50 pts
- Technical Evaluation: max 50 pts
- Mixed Team Bonus: 0 or 10 pts
The live leaderboard on the website shows every team's breakdown and rank.

SITE SECTIONS: Home (hero, hot events, schedule, points scheme), Events (all hot events with
posters and Instagram reels), Leaderboard (live rankings), Team (faculty advisors & post holders),
Creators (website team), Sponsors, and an Admin portal for organisers.

LEADERSHIP: ChairPerson — Abhinav Pratap Singh; Vice-Chairpersons — Ansh Shukla, Ayush Kumar Singh;
Treasurer — Ashutosh Pandey. Faculty advisors: Dr. Dheerandra Singh and Dr. Rabesh Kumar Singh
(Assistant Professors), headed by Dr. Sanjay Mishra (Professor & Head, Mechanical Engineering).
`;
