// "use client";
// import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
// import { Star } from "lucide-react";
// import { Favorite } from "@/app/types/types";
// import { addClimbToFavorites, removeClimbFromFavorites } from "@/lib/actions";

// type FavoriteIconProps = {
//   size?: number;
//   climbId: number;
//   favorites?: Favorite[];
// };

// export default function FavoriteIcon({
//   size = 4,
//   climbId,
//   favorites,
// }: FavoriteIconProps) {
//   // Derive isFavorited directly from props
//   const isFavorited =
//     favorites?.some((fav) => fav.climb_id === climbId) || false;

//   function handleChange() {
//     if (isFavorited) {
//       removeClimbFromFavorites(climbId);
//     } else {
//       addClimbToFavorites(climbId);
//     }
//     // Optionally, you can optimistically update the UI here if needed
//   }

//   return (
//     <Tooltip>
//       <TooltipTrigger>
//         <Star
//           onClick={handleChange}
//           className={`h-${size} w-${size} hover:cursor-pointer`}
//           fill={isFavorited ? "gold" : "none"}
//         />
//       </TooltipTrigger>
//       <TooltipContent>
//         <p>{isFavorited ? "Remove from favorites" : "Add to favorites"}</p>
//       </TooltipContent>
//     </Tooltip>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Star } from "lucide-react";
import { Favorite } from "@/app/types/types";
import { addClimbToFavorites, removeClimbFromFavorites } from "@/lib/actions";

type FavoriteIconProps = {
  size?: number;
  climbId: number;
  favorites?: Favorite[];
};

export default function FavoriteIcon({
  size = 4,
  climbId,
  favorites,
}: FavoriteIconProps) {
  const initialIsFavorited =
    favorites?.some((fav) => fav.climb_id === climbId) || false;
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);

  // Sync local state if favorites prop changes
  useEffect(() => {
    setIsFavorited(initialIsFavorited);
  }, [initialIsFavorited]);

  async function handleChange() {
    setIsFavorited((prev) => {
      const next = !prev;
      if (next) {
        addClimbToFavorites(climbId);
      } else {
        removeClimbFromFavorites(climbId);
      }
      return next;
    });
  }

  return (
    <Tooltip>
      <TooltipTrigger>
        <Star
          onClick={handleChange}
          className={`h-${size} w-${size} hover:cursor-pointer`}
          fill={isFavorited ? "gold" : "none"}
        />
      </TooltipTrigger>
      <TooltipContent>
        <p>{isFavorited ? "Remove from favorites" : "Add to favorites"}</p>
      </TooltipContent>
    </Tooltip>
  );
}
