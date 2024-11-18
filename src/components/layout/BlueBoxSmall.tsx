import Image from "next/image";
import { StaticImageData } from "next/image";

interface Props {
  children: React.ReactNode;
  hero?: StaticImageData;
}

export default function BlueBoxSmall({ children, hero }: Props) {
  return (
    <div className="relative z-10 bg-blue-500 text-white px-5 py-2 sm:px-8 sm:py-3 md:px-16 md:py-7 lg:px-20 lg:py-12 xl:px-60 xl:py-14 2xl:px-72 2xl:py-24 flex-shrink">
      {hero && (
        <Image
          className="absolute mix-blend-overlay opacity-20 z-20 inset-0 h-full w-full object-cover display"
          src={hero}
          alt=""
        />
      )}
      <div className="w-full z-30 text-center">{children}</div>
    </div>
  );
}
