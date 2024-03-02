import Navbar from "@/components/layout/Navbar";

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <div className="bg-gray-900 p-2 px-6 text-gray-400">
      <div className="bg-gray-900 p-2 px-6 text-gray-400">
        <Navbar />
      </div>
      <div className="flex-grow font-light">{children}</div>
      <div className="bg-gray-800 p-3"></div>
    </div>
  );
}
