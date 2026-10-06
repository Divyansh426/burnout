import { PageLayout, PageHeader } from "@/components/PageLayout";
import { Reveal } from "@/components/Reveal";
import { Instagram, Linkedin } from "lucide-react";

export default function Creators() {
  const creator = {
    name: "Divyansh Mishra",
    post: "Development Lead",
    photoUrl: "/images/divyansh.jpg",
    instagram:
      "https://www.instagram.com/theodoredivyansh?stkn=MXYzMXBjbzZicnAybQ==",
    linkedin: "www.linkedin.com/in/divyanshmishra426",
  };

  const coreMembers = [
  {
    name: "Atul Dubey",
    photoUrl: "/images/atul.jpeg",
  },
  {
    name: "Ansh Mishra",
    photoUrl: "/images/ansh.jpeg",
  },
  {
    name: "Navneet Yadav",
    photoUrl: "/images/navneet.jpeg",
  },
  {
    name: "Jagriti Yadav",
    photoUrl: "/images/jagriti.jpeg",
  },
  {
    name: "Vartika Singh",
    photoUrl: "/images/vartika.jpeg",
  },
  {
    name: "Rudra Pratap Singh",
    photoUrl: "/images/rudra.jpeg",
  },
  {
    name: "Shweta Singh",
    photoUrl: "/images/shweta.jpeg",
  },
];

  return (
    <PageLayout>
      <PageHeader
        kicker="Behind the Build"
        title="Site"
        accent="Creator"
        subtitle="The person behind the digital experience of BURNOUT."
      />

      {/* Creator */}
      <section className="px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-sm">
            <Reveal>
              <article className="group flex h-full flex-col border border-border bg-[#171a10] transition-colors hover:border-[#d2ff00]/50">
                <div className="relative aspect-square overflow-hidden bg-[#12140e]">
                  <img
                    src={creator.photoUrl}
                    alt={creator.name}
                    className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg uppercase leading-tight text-[#f4f4ed]">
                    {creator.name}
                  </h3>

                  <p className="mt-1 text-xs uppercase tracking-wider text-[#d2ff00]">
                    {creator.post}
                  </p>

                  <div className="mt-4 flex items-center gap-2">
                    <a
                      href={creator.instagram}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Instagram"
                      className="flex h-9 w-9 items-center justify-center border border-border text-[#b4b8a5] transition-colors hover:border-[#d2ff00] hover:text-[#d2ff00]"
                    >
                      <Instagram className="h-4 w-4" />
                    </a>

                    <a
                      href={
                        creator.linkedin.startsWith("http")
                          ? `https://${creator.linkedin}`
                          : `https://${creator.linkedin}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                      className="flex h-9 w-9 items-center justify-center border border-border text-[#b4b8a5] transition-colors hover:border-[#d2ff00] hover:text-[#d2ff00]"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Core Members */}
<section className="px-4 pb-20 sm:px-6">
  <div className="mx-auto max-w-7xl">
    <Reveal>
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-[#d2ff00]">
          The Team
        </p>

        <h2 className="mt-2 font-display text-3xl uppercase text-[#f4f4ed] sm:text-4xl">
          Core Members
        </h2>
      </div>
    </Reveal>

    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {coreMembers.map((member) => (
        <Reveal key={member.name}>
          <article className="group flex h-full flex-col border border-border bg-[#171a10] transition-colors hover:border-[#d2ff00]/50">
            
            {/* Member Photo */}
            <div className="relative aspect-square overflow-hidden bg-[#12140e]">
              <img
                src={member.photoUrl}
                alt={member.name}
                className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
              />
            </div>

            {/* Member Name */}
            <div className="flex flex-1 items-center p-5">
              <h3 className="font-display text-lg uppercase leading-tight text-[#f4f4ed] transition-colors group-hover:text-[#d2ff00]">
                {member.name}
              </h3>
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