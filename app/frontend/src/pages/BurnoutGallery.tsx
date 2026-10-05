import { Link } from "react-router";
import { ArrowLeft, Images } from "lucide-react";
import { PageLayout, PageHeader } from "@/components/PageLayout";
import { Reveal } from "@/components/Reveal";

const GALLERY_IMAGES = [
  "/images/burnout-gallery/b1.JPG",
  "/images/burnout-gallery/b2.JPG",
  "/images/burnout-gallery/b3.JPG",
  "/images/burnout-gallery/b4.JPG",
  "/images/burnout-gallery/b5.JPG",
  "/images/burnout-gallery/b6.JPG",
  "/images/burnout-gallery/b7.JPG",
  "/images/burnout-gallery/b8.JPG",
  "/images/burnout-gallery/b9.JPG",
  "/images/burnout-gallery/b10.JPG",
  "/images/burnout-gallery/b11.JPG",
  "/images/burnout-gallery/b12.JPG",
  "/images/burnout-gallery/b13.JPG",
  "/images/burnout-gallery/b14.JPG",
  "/images/burnout-gallery/b15.JPG",
  "/images/burnout-gallery/b16.JPG",
  "/images/burnout-gallery/b17.JPG",
];

export default function BurnoutGallery() {
  return (
    <PageLayout>
      <PageHeader
        kicker="BURNOUT · SAE MMMUT"
        title="BURNOUT"
        accent="Gallery"
        subtitle="Highlights from the previous BURNOUT event by SAE Collegiate Club MMMUT."
      />

      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between gap-4">
            <Link
              to="/events"
              className="inline-flex items-center gap-2 border border-border px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#b4b8a5] transition-colors hover:border-[#d2ff00] hover:text-[#d2ff00]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Events
            </Link>

            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#6b705c]">
              <Images className="h-4 w-4" />
              BURNOUT Memories
            </div>
          </div>

          {GALLERY_IMAGES.length > 0 ? (
            <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
              {GALLERY_IMAGES.map((src, index) => (
                <Reveal key={src} delay={(index % 3) * 60}>
                  <div className="mb-5 break-inside-avoid overflow-hidden border border-border bg-[#171a10]">
                    <img
                      src={src}
                      alt={`BURNOUT gallery photo ${index + 1}`}
                      loading="lazy"
                      className="h-auto w-full transition-transform duration-500 hover:scale-[1.02]"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="flex min-h-80 items-center justify-center border border-dashed border-border bg-[#0c0e09] px-6 text-center">
              <div>
                <Images className="mx-auto h-10 w-10 text-[#6b705c]" />

                <p className="mt-4 font-display text-xl uppercase text-[#f4f4ed]">
                  Gallery images coming soon
                </p>

                <p className="mt-2 text-sm text-[#6b705c]">
                  Add the BURNOUT gallery images to the gallery image folder.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}