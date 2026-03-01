import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About Byron",
  description:
    "Discover the climbing journey of Byron, a passionate climber who started at 38. Learn about his experiences, favorite crags in Kelowna, and his transition from bouldering to sport climbing.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">About Byron</h1>

      <div className="prose prose-lg max-w-none">
        <div className="mb-8">
          <div className="w-full h-74 md:h-110 sm:h-100 rounded-lg flex items-center justify-center mb-4">
            <Image
              // src="/Background-2.JPEG"
              src="https://qrlzxwxpceqrycynoyzh.supabase.co/storage/v1/object/public/ui-images/Background-2.JPEG"
              alt="Byron climbing"
              width={800}
              height={600}
              className="rounded-lg object-cover"
              style={{ width: "auto", height: "auto" }}
            />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">My Climbing Journey</h2>
        <p className="mb-4">
          I started climbing at 38, which some might consider a late start in a
          sport often dominated by younger athletes. But that &quot;late
          start&quot; has given me a unique perspective on climbing - one that
          values patience, celebrates incremental progress, and proves that age
          is just a number when it comes to pursuing your passions.
        </p>

        <p className="mb-4">
          For the past 7 years, climbing has been my obsession. What began as
          curiosity has evolved into a lifestyle that shapes how I spend my
          weekends, who I connect with, and how I challenge myself both
          physically and mentally.
        </p>

        <h2 className="text-2xl font-bold mb-4 mt-8">My Home Crags</h2>
        <p className="mb-4">
          I&apos;m based in Kelowna, BC, and I couldn&apos;t ask for a better
          climbing playground. The Okanagan has become my outdoor classroom,
          with the Boulderfields and Cougar Canyon serving as my primary
          training grounds. These areas have taught me everything from basic
          technique to reading rock and pushing my limits on challenging
          problems.
        </p>

        <div className="mb-8 mt-8">
          {/* Add your second photo here - maybe at a crag */}
          <div className="w-full h-90 md:h-130 sm:h-120 rounded-lg flex items-center justify-center mb-4">
            <Image
              // src="/Background-1.jpg"
              src="https://qrlzxwxpceqrycynoyzh.supabase.co/storage/v1/object/public/ui-images/Background-1.JPG"
              alt="Climbing in Kelowna"
              width={800}
              height={600}
              className="rounded-lg object-cover"
              style={{ width: "auto", height: "auto" }}
            />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">From Bouldering to Sport</h2>
        <p className="mb-4">
          Bouldering has been my primary focus since I started. There&apos;s
          something pure about it – just you, the rock, and a crash pad. No
          ropes, no partners needed, just problem-solving in its rawest form.
          But lately, I&apos;ve felt the pull toward sport climbing. The
          endurance component, the exposure, and the technical rope work
          represent a new frontier I&apos;m eager to explore.
        </p>

        <p className="mb-4">
          This transition is exactly the kind of journey I want to share through
          this blog. The struggles, the breakthroughs, the gear decisions, and
          everything in between.
        </p>

        <h2 className="text-2xl font-bold mb-4 mt-8">Why This Blog?</h2>
        <p className="mb-4">
          I created this blog because I wish I&apos;d had a resource like this
          when I started. Someone who could speak to the experience of coming to
          climbing later in life, navigating the learning curve without the
          fearlessness of youth, and building strength and technique from
          scratch as an adult.
        </p>

        <p className="mb-4">
          Whether you&apos;re thinking about trying climbing for the first time
          at 30, 40, 50, or beyond, or you&apos;re an experienced climber
          curious about the Okanagan scene, I hope you&apos;ll find something
          valuable here. My goal is to share honest insights, practical tips,
          local beta, and maybe inspire a few people to start their own climbing
          journey – regardless of age.
        </p>

        <h2 className="text-2xl font-bold mb-4 mt-8">Let&apos;s Connect</h2>
        <p className="mb-4">
          Climbing is as much about community as it is about personal
          achievement. If you&apos;re in the Kelowna area and want to share
          beta, meet up for a session, or just talk climbing over coffee,
          I&apos;d love to hear from you. Feel free to reach out through the{" "}
          <Link href="/contact" className="text-blue-500 underline">
            contact page
          </Link>{" "}
          or catch me at the Boulderfields on a typical weekend!
        </p>
      </div>
    </div>
  );
}
