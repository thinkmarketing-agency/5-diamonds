import Image from "next/image";
import type { Metadata } from "next";
import { Intro, Callout } from "@/components/ranch/shared";
import { brand } from "@/lib/ranch/content";
export const metadata: Metadata = {
  title: "Our Ranch",
  description:
    "Get to know the people, cattle, hay and Oregon ranches behind 5 Diamonds Ranches. Beef • Hay • Family.",
  alternates: { canonical: "/our-ranch" },
};
const stories = [
  {
    title: "The people behind the brand",
    copy: "Our family story is coming soon. We look forward to introducing the people who care for the cattle and keep the ranches moving.",
  },
  {
    title: "More than one place. Oregon roots.",
    copy: "5 Diamonds operates multiple ranches in Oregon. Ranch locations and the story of each place will be added here.",
  },
  {
    title: "Cattle, through the seasons",
    copy: "A closer look at life with the cattle is coming soon, with the ranch team’s own words and photographs.",
  },
  {
    title: "Hay is part of the story",
    copy: "Beef • Hay • Family. Details of the hay operation, available products and seasonal inquiries will be shared here.",
  },
  {
    title: "The story so far",
    copy: "Our ranch history is being gathered. This space will hold the milestones and memories that shaped 5 Diamonds.",
  },
  {
    title: "Why a direct connection matters",
    copy: "Buying directly from a ranch makes space for questions and conversation. We’ll share the family’s own reasons for bringing Oregon beef to your table.",
  },
];
export default function RanchPage() {
  return (
    <main id="main">
      <Intro eyebrow="Beef • Hay • Family" title="Our roots are in Oregon.">
        <p>
          People, land and the everyday work of ranch life. This is where we’ll
          share the story behind 5 Diamonds Ranches.
        </p>
      </Intro>
      <div className="wrap">
        <Image
          unoptimized
          width={1774}
          height={887}
          className="widePhoto"
          src={brand.image}
          alt="Cattle in Oregon pasture with mountains in the distance"
        />
      </div>
      <section className="section wrap storyGrid">
        {stories.map((s) => (
          <article key={s.title}>
            <h2>{s.title}</h2>
            <p>{s.copy}</p>
          </article>
        ))}
      </section>
      <Callout />
    </main>
  );
}
