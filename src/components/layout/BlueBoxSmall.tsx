interface Props {
  children: React.ReactNode;
  hero?: string;
}

export default function BlueBoxSmall({ children, hero }: Props) {
  return (
    <div className="relative z-10 bg-blue-500 text-white px-5 py-2 sm:px-8 sm:py-3 md:px-16 md:py-7 lg:px-20 lg:py-12 xl:px-60 xl:py-14 2xl:px-72 2xl:py-24">
      {hero && (
        <img
          className="absolute mix-blend-overlay opacity-20 z-20 inset-0 h-full w-full object-cover display"
          src={hero}
          alt=""
        ></img>
      )}
      <div className="w-full z-30 text-center">{children}</div>
    </div>
  );
}
