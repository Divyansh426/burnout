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
    email: "millindsankhwar29@gmail.com",
    photo: "/images/postholders/millind-sankhwar.jpg",
  },
  {
    name: "Prakhar Dubey",
    branch: "Mechanical Engineering",
    post: "Student Secretary",
    email: "prakhar81@gmail.com",
    photo: "/images/postholders/prakhar-dubey.jpg",
  },
  {
    name: "Gaurav",
    branch: "Mechanical Engineering",
    post: "Student Treasurer",
    email: "gauravgaurav200356@gmail.com",
    photo: "/images/postholders/gaurav.jpg",
  },
   {
    name: "Divyansh Singh",
    branch: "Civil Engineering",
    post: "Student Co-Treasurer",
    email: "ghemant683@gmail.com",
    photo: "/images/postholders/divyansh.jpeg",
  },
  {
    name: "Hemant Gupta",
    branch: "Civil Engineering",
    post: "Student Publicity Chair",
    email: "ghemant683@gmail.com",
    photo: "/images/postholders/hemant-gupta.jpg",
  },
  {
    name: "Shreyansh Singh Sengar",
    branch: "Mechanical Engineering",
    post: "Student Publicity Chair",
    email: "iamsengar1114@gmail.com",
    photo: "/images/postholders/sengar.jpeg",
  },
  {
    name: "Nashrah",
    branch: "Chemical Engineering",
    post: "Disco Head",
    email: "nashrah181@gmail.com",
    photo: "/images/postholders/nashrah.jpg",
  },
  {
    name: "Aditya Narain Tiwari",
    branch: "ECE - IoT",
    post: "AeroModeling Head",
    email: "suyashiit45@gmail.com",
    photo: "/images/postholders/aditya-narain-tiwari.jpeg",
  },
  {
    name: "Shubh Srivastava",
    branch: "Mechanical Engineering",
    post: "Supra Head",
    email: "shubhsrivastava844@gmail.com",
    photo: "/images/postholders/shubh-srivastava.jpg",
  },
  {
    name: "Anshul Singh",
    branch: "Mechanical Engineering",
    post: "Baja Head",
    email: "anshulsingh6@gmail.com",
    photo: "/images/postholders/anshul-singh.jpg",
  },
  {
    name: "Sakshi Katiyar",
    branch: "Chemical Engineering",
    post: "Sponsorship and Alumni Chair",
    email: "sakshikatiyar75@gmail.com",
    photo: "/images/postholders/sakshi-katiyar.jpg",
  },
  {
    name: "Siddhartha Shukla",
    branch: "Mechanical Engineering",
    post: "Sponsorship and Alumni Chair",
    email: "siddhartha.shukla0401@gmail.com",
    photo: "/images/postholders/siddharth-shukla.png",
  },
  {
    name: "Amit Chaurasiya",
    branch: "Mechanical Engineering",
    post: "Student Membership Chair",
    email: "amitchaurasiya1002@gmail.com",
    photo: "/images/postholders/amit-chaurasiya.jpg",
  },
  {
    name: "Rohit Pandey",
    branch: "Mechanical Engineering",
    post: "Student Membership Chair",
    email: "amitchaurasiya1002@gmail.com",
    photo: "/images/postholders/rohit.jpeg",
  },
  {
    name: "Anju Chaudhary",
    branch: "Mechanical",
    post: "Student Program Chair",
    email: "anjuchaudhary2451100@gmail.com",
    photo: "/images/postholders/anju-chaudhary.jpg",
  },
  {
    name: "Prakriti Srivastava",
    branch: "Civil Engineering",
    post: "Student Program Chair",
    email: "prakritisri0806@gmail.com",
    photo: "/images/postholders/prakritisrivastava.jpg",
  },
  {
    name: "Anil Singh Lodhi",
    branch: "Mechanical Engineering",
    post: "Student Program Chair",
    email: "as4806034@gmail.com",
    photo: "/images/postholders/anil-singh-lodhi.jpg",
  },
];

const FACULTY_EXAMPLES = [
     {
    name: "Sanjay Mishra",
    post: "Head of Department, Mechanical Engineering",
    branch: "SAE Collegiate Club MMMUT",
    photo: "/images/faculty/sanjay-mishra.jpg",
  },
  {
    name: "Dheerandra Singh",
    post: "Faculty Advisor",
    branch: "SAE Collegiate Club MMMUT",
    photo: "/images/faculty/dheerandra-singh.jpg",
  },
  {
    name: "Rabesh Kumar Singh",
    post: "Faculty Advisor",
    branch: "SAE Collegiate Club MMMUT",
    photo: "/images/faculty/rabesh-kumar-singh.jpeg",
  },
 
  
];

const SUBDIVISIONS = ["Disco", "Supra", "Baja", "AeroModeling"];

export default function About() {
  const [tab, setTab] = useState<Tab>("postholders");

  const { data: members, isLoading } = trpc.content.team.useQuery();

  const filtered = members?.filter((m) => m.groupName === tab) ?? [];

  const staticMembers =
    tab === "postholders" ? POSTHOLDER_EXAMPLES : FACULTY_EXAMPLES;

  return (
    <PageLayout>
      <PageHeader
        kicker="SAE Collegiate Club MMMUT"
        title="About"
        accent="Us"
        subtitle="The SAE Collegiate Club at MMMUT brings together students, faculty, and automotive enthusiasts through engineering, teamwork, and motorsport."
      />

      {/* SAE INTRODUCTION */}
      <section className="px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 border border-border bg-[#171a10] p-6 sm:p-8 lg:grid-cols-[1.3fr_0.7fr]">
            <div>
              <p className="font-display text-xs uppercase tracking-[0.18em] text-[#d2ff00]">
                SAE MMMUT
              </p>

              <h2 className="mt-3 font-display text-3xl uppercase text-[#f4f4ed] sm:text-4xl">
                Engineering beyond the classroom
              </h2>

              <p className="mt-5 leading-7 text-[#b4b8a5]">
                The SAE Collegiate Club at MMMUT Gorakhpur is where classroom
                theory meets practical engineering, teamwork, and automotive
                activities.
              </p>

              <p className="mt-4 leading-7 text-[#b4b8a5]">
                The club provides students with opportunities to learn,
                collaborate, build, compete, and take part in technical and
                automotive-focused activities.
              </p>
            </div>

            <div className="flex items-center justify-center border border-border bg-[#0c0e09] p-8">
              <img
                src="/images/sae-logo.png"
                alt="SAE MMMUT"
                className="max-h-40 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

    {/* SAE SUBDIVISIONS */}
<section className="px-4 pb-14 sm:px-6">
  <div className="mx-auto max-w-5xl">
    <div className="mb-8">
      <p className="font-display text-xs uppercase tracking-[0.18em] text-[#d2ff00]">
        SAE MMMUT
      </p>

      <h2 className="mt-3 font-display text-3xl uppercase text-[#f4f4ed] sm:text-4xl">
        Our Subdivisions
      </h2>

      <p className="mt-4 max-w-2xl leading-7 text-[#b4b8a5]">
        SAE Collegiate Club MMMUT brings together students through its
        technical and automotive-focused subdivisions.
      </p>
    </div>

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {SUBDIVISIONS.map((subdivision) => {
        const logoMap: Record<string, string> = {
          Disco: "/images/subdivisions/disco.jpeg",
          Supra: "/images/subdivisions/supra.jpeg",
          Baja: "/images/subdivisions/baja.jpeg",
          AeroModeling: "/images/subdivisions/aeromodeling.jpeg",
        };

        return (
          <div
            key={subdivision}
            className="border border-border bg-[#171a10] p-5"
          >
            <div className="flex aspect-square items-center justify-center overflow-hidden border border-border bg-[#0c0e09]">
              <img
                src={logoMap[subdivision]}
                alt={`${subdivision} subdivision logo`}
                className="h-full w-full object-contain p-4"
              />
            </div>

            <h3 className="mt-5 font-display text-xl uppercase text-[#f4f4ed]">
              {subdivision}
            </h3>
          </div>
        );
      })}
    </div>
  </div>
</section>

      {/* FACULTY & TEAM */}
      <section className="px-4 pb-14 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <PageHeader
            kicker="SAE MMMUT"
            title="Faculty &"
            accent="Team"
            subtitle="Faculty advisors and post holders who keep the SAE engine running at MMMUT Gorakhpur."
          />

          <div className="mt-8 flex border border-border">
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
            {isLoading &&
              [0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-80 animate-pulse border border-border bg-[#171a10]"
                />
              ))}

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
                          href={`https://instagram.com/${m.instagram.replace(
                            "@",
                            ""
                          )}`}
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
                          href={`https://${m.linkedin.replace(
                            /^https?:\/\//,
                            ""
                          )}`}
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

                    {"email" in person && person.email && (
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

      {/* SAE INSTAGRAM */}
      <section className="border-y border-border px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="border border-border bg-[#171a10] p-6 sm:p-8">
            <p className="font-display text-xs uppercase tracking-[0.18em] text-[#d2ff00]">
              SAE MMMUT
            </p>

            <h2 className="mt-3 font-display text-3xl uppercase text-[#f4f4ed]">
              Connect with SAE
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-[#b4b8a5]">
              Follow the SAE Collegiate Club MMMUT for club activities,
              announcements, technical work, and upcoming events.
            </p>

            <a
              href="https://www.instagram.com/sae_collegiate_club_mmmut?stkn=MXcxeTR4Mjl0ODllcw=="
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 border border-[#d2ff00]/50 px-5 py-3 text-sm font-bold uppercase tracking-wider text-[#d2ff00] transition-colors hover:bg-[#d2ff00] hover:text-[#12140e]"
            >
              <Instagram className="h-4 w-4" />
              SAE Instagram
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}