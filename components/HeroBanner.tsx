import Image from "next/image";

export default function HeroBanner() {
  return (
    <div className="relative w-full h-110 flex items-center justify-center bg-brand-600 overflow-hidden">
      <Image
        // src="/background.jpeg"
        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/ui-images/background.JPEG`}
        alt="Climbing Adventures"
        fill
        className="object-cover"
        priority
      />
      {/* Overlay for better readability */}
      {/* <div className="absolute inset-0 bg-black/20" />
      <h1 className="absolute text-white text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-extrabold left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-lg">
        BYRON CLIMBS
      </h1> */}
    </div>
  );
}
