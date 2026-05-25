import DragonCard from "./DragonCard";
import type { Dragon } from "../types";

type Props = {
  dragons: Dragon[];
};

export default function DragonList({dragons}: Props) {
  return (
    <div className="grid md:grid-cols-4 gap-3">
      {dragons.map((dragon) => (
        <DragonCard
          key={dragon.id}
          dragon={dragon}
        />
      ))}
    </div>
  );
}