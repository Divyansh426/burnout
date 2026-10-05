
import { useState } from "react";
import { trpc } from "@/providers/trpc";
import { PageLayout, PageHeader } from "@/components/PageLayout";
import { Reveal } from "@/components/Reveal";
import { Instagram, Linkedin, Mail, User } from "lucide-react";

type Tab = "postholders" | "faculty";

const POSTHOLDER_EXAMPLES = [
  {
name: "Millind Sankhwar",
branch: "Mechanical Engineering",
post: "Chairperson",
email: "[millindsankhwar29@gmail.com](mailto:millindsankhwar29@gmail.com)",
photo: "/images/postholders/millind-sankhwar.jpg",
},
{
name: "Prakhar Dubey",
branch: "Mechanical Engineering",
post: "Student Secretary",
email: "[prakhar81@gmail.com](mailto:prakhar81@gmail.com)",
photo: "/images/postholders/prakhar-dubey.jpg",
},
{
name: "Gaurav",
branch: "Mechanical Engineering",
post: "Student Treasurer",
email: "[gauravgaurav200356@gmail.com](mailto:gauravgaurav200356@gmail.com)",
photo: "/images/postholders/gaurav.jpg",
},
{
name: "Hemant Gupta",
branch: "Civil Engineering",
post: "Social Media and Publicity Head",
email: "[ghemant683@gmail.com](mailto:ghemant683@gmail.com)",
photo: "/images/postholders/hemant-gupta.jpg",
},
{
name: "Nashrah",
branch: "Chemical Engineering",
post: "Disco Head",
email: "[nashrah181@gmail.com](mailto:nashrah181@gmail.com)",
photo: "/images/postholders/nashrah.jpg",
},
{
name: "Aditya Narain Tiwari",
branch: "ECE - IoT",
post: "AeroModeling Head",
email: "[suyashiit45@gmail.com](mailto:suyashiit45@gmail.com)",
photo: "/images/postholders/aditya-narain-tiwari.jpeg",
},
{
name: "Shubh Srivastava",
branch: "Mechanical Engineering",
post: "Supra Head",
email: "[shubhsrivastava844@gmail.com](mailto:shubhsrivastava844@gmail.com)",
photo: "/images/postholders/shubh-srivastava.jpg",
},
{
name: "Anshul Singh",
branch: "Mechanical Engineering",
post: "Baja Head",
email: "[anshulsingh6@gmail.com](mailto:anshulsingh6@gmail.com)",
photo: "/images/postholders/anshul-singh.jpg",
},
{
name: "Sakshi Katiyar",
branch: "Chemical Engineering",
post: "Sponsorship and Alumni Chair",
email: "[sakshikatiyar75@gmail.com](mailto:sakshikatiyar75@gmail.com)",
photo: "/images/postholders/sakshi-katiyar.jpg",
},
{
name: "Siddhartha Shukla",
branch: "Mechanical Engineering",
post: "Sponsorship and Alumni Chair",
email: "[siddhartha.shukla0401@gmail.com](mailto:siddhartha.shukla0401@gmail.com)",
photo: "/images/postholders/siddharth-shukla.png",
},
{
name: "Amit Chaurasiya",
branch: "Mechanical Engineering",
post: "Student Membership Chair",
email: "[amitchaurasiya1002@gmail.com](mailto:amitchaurasiya1002@gmail.com)",
photo: "/images/postholders/amit-chaurasiya.jpg",
},
{
name: "Anju Chaudhary",
branch: "Mechanical",
post: "Student Program Chair",
email: "[anjuchaudhary2451100@gmail.com](mailto:anjuchaudhary2451100@gmail.com)",
photo: "/images/postholders/anju-chaudhary.jpg",
},
{
name: "Prakriti Srivastava",
branch: "Civil Engineering",
post: "Student Program Chair",
email: "[prakritisri0806@gmail.com](mailto:prakritisri0806@gmail.com)",
photo: "/images/postholders/prakritisrivastava.jpg",
},


{
name: "Anil Singh Lodhi",
branch: "Mechanical Engineering",
post: "Student Program Chair",
email: "[as4806034@gmail.com](mailto:as4806034@gmail.com)",
photo: "/images/postholders/anil-singh-lodhi.jpg",
},
]


const FACULTY_EXAMPLES = [
  {
    name: "Rabesh Kumar Singh",
    post: "Faculty Advisor",
    branch: "SAE MMMUT",
    photo: "/images/faculty/rabesh-kumar-singh.jpeg",
  },
  {
    name: "Sanjay Mishra",
    post: "Faculty Advisor",
    branch: "SAE MMMUT",
    photo: "/images/faculty/sanjay-mishra.jpg",
  },
  {
    name: "Dheerandra Singh",
    post: "Faculty Advisor",
    branch: "SAE MMMUT",
    photo: "/images/faculty/dheerandra-singh.jpg",
  },
];

export default function Team() {
  const [tab, setTab] = useState<Tab>("postholders");

  const { data: members, isLoading } = trpc.content.team.useQuery();

  const filtered = members?.filter((m) => m.groupName === tab) ?? [];

  const staticMembers =
    tab === "postholders" ? POSTHOLDER_EXAMPLES : FACULTY_EXAMPLES;

  return (
    <PageLayout>
      <PageHeader
        kicker="SAE Collegiate Club MMMUT"
        title="The"
        accent="Crew"
        subtitle="Faculty advisors and post holders who keep the SAE engine running at MMMUT Gorakhpur."
      />

      <section className="px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-7xl">
          {/* Tabs */}
          <div className="flex border border-border">
            {(
              [
                ["postholders", "Post Holders"],
                ["faculty", "Faculty"],
              ] as [Tab, string][]
            ).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`font-display h-12 flex-1 text-sm uppercase tracking-[0.14em] transition-colors sm:text-base ${
                  tab === key
                    ? "bg-[#d2ff00] text-[#12140e]"
                    : "bg-[#0c0e09] text-[#b4b8a5] hover:text-[#f4f4ed]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* Loading placeholders */}
            {isLoading &&
              [0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-80 animate-pulse border border-border bg-[#171a10]"
                />
              ))}

            {/* Database members */}
            {filtered.map((m, i) => (
              <Reveal key={m.id} delay={(i % 4) * 80}>
                <article className="group flex h-full flex-col border border-border bg-[#171a10] transition-colors hover:border-[#d2ff00]/50">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#12140e]">
                    {m.photoUrl ? (
                      <img
                        src={m.photoUrl}
                        alt={m.name}
                        loading="lazy"
                        className="h-full w-full object-cover object-[center_20%] grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <User className="h-12 w-12 text-[#6b705c]" />
                      </div>
                    )}

                    <span className="font-display absolute left-3 top-3 max-w-[90%] bg-[#d2ff00] px-2 py-1 text-[11px] uppercase tracking-wide text-[#12140e]">
                      {m.post}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-lg uppercase leading-tight text-[#f4f4ed]">
                      {m.name}
                    </h3>

                    {m.branch && (
                      <p className="mt-1 text-xs uppercase tracking-wider text-[#6b705c]">
                        {m.branch}
                      </p>
                    )}

                    <div className="mt-4 flex items-center gap-2">
                      {m.instagram && m.instagram !== "@" && (
                        <a
                          href={`https://instagram.com/${m.instagram.replace("@", "")}`}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Instagram"
                          className="flex h-9 w-9 items-center justify-center border border-border text-[#b4b8a5] transition-colors hover:border-[#d2ff00] hover:text-[#d2ff00]"
                        >
                          <Instagram className="h-4 w-4" />
                        </a>
                      )}

                      {m.linkedin && (
                        <a
                          href={`https://${m.linkedin.replace(/^https?:\/\//, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="LinkedIn"
                          className="flex h-9 w-9 items-center justify-center border border-border text-[#b4b8a5] transition-colors hover:border-[#d2ff00] hover:text-[#d2ff00]"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      )}

                      {m.email && (
                        <a
                          href={`mailto:${m.email}`}
                          aria-label="Email"
                          className="flex h-9 w-9 items-center justify-center border border-border text-[#b4b8a5] transition-colors hover:border-[#d2ff00] hover:text-[#d2ff00]"
                        >
                          <Mail className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}

            {/* Static post holders and faculty */}
            {staticMembers.map((person, i) => (
              <Reveal key={person.name} delay={(i % 4) * 80}>
                <article className="group flex h-full flex-col border border-dashed border-[#d2ff00]/40 bg-[#171a10] transition-colors hover:border-[#d2ff00]/60">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#12140e]">
                    <img
                      src={person.photo}
                      alt={person.name}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                      className="h-full w-full object-cover object-[center_20%] grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                    />

                    <span className="font-display absolute left-3 top-3 max-w-[90%] bg-[#d2ff00] px-2 py-1 text-[11px] uppercase tracking-wide text-[#12140e]">
                      {person.post}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-lg uppercase leading-tight text-[#f4f4ed]">
                      {person.name}
                    </h3>

                    <p className="mt-1 text-xs uppercase tracking-wider text-[#6b705c]">
                      {person.branch}
                    </p>

                    {"email" in person && (
                      <div className="mt-4 flex items-center gap-2">
                        <a
                          href={`mailto:${person.email}`}
                          aria-label="Email"
                          className="flex h-9 w-9 items-center justify-center border border-border text-[#b4b8a5] transition-colors hover:border-[#d2ff00] hover:text-[#d2ff00]"
                        >
                          <Mail className="h-4 w-4" />
                        </a>
                      </div>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}