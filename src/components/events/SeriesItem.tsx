import { Series } from "@/utilities/types";

interface Props {
  series: Series;
}

export default function SeriesItem({ series }: Props) {
  return (
    <div className="p-3 bg-blue-400">
      <div className="text-blue-100 text-xl font-semibold">{series.name}</div>
      <div className="text-blue-200">{series.description}</div>
    </div>
  );
}
