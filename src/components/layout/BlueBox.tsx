import Image from "next/image";
import { StaticImageData } from "next/image";

interface Props {
  children: React.ReactNode;
  hero?: StaticImageData;
}

export default function BlueBox({ children, hero }: Props) {
  return (
    <div className="relative z-10 bg-blue-500 text-white px-5 py-3 sm:px-8 sm:py-5 md:px-16 md:py-10 lg:px-20 lg:py-16 xl:px-60 xl:py-20 2xl:px-72 2xl:py-32 flex-shrink">
      {hero && (
        <Image
          className="absolute mix-blend-overlay opacity-20 z-20 inset-0 h-full w-full object-cover display"
          src={hero.src}
          fill={true}
          alt=""
        />
      )}
      <div className="w-full z-30 md:w-4/5 lg:w-2/3 xl:w-1/2">{children}</div>
    </div>
  );
}
