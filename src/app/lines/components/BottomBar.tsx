"use client";

import Link from "next/link";

const ACTS = [
  { name: "Emergence", index: 1 },
  { name: "Blossom", index: 2 },
  { name: "Hubris", index: 3 },
  { name: "Embrace", index: 4 },
];

const TOTAL_LINES = 16;

export default function BottomBar({
  lineId,
  lineAct,
}: {
  lineId: string;
  lineAct: number;
}) {
  const currentLine = parseInt(lineId, 10);

  return (
    <div className="relative w-full px-10 py-6 text-xs text-white -mt-6">
      <div className="relative w-full">
        <div className="relative h-10">
          {/* Baseline */}
          <div className="absolute inset-x-0 top-1/2 h-px bg-white/30" />

          {/* Grid of ticks + numbers */}
          <div className="absolute inset-0 grid grid-cols-16">
            {Array.from({ length: TOTAL_LINES }, (_, i) => {
              const num = i + 1;
              const isActive = num === currentLine;

              return (
                <Link
                  key={num}
                  href={`/lines/${num}`}
                  className="flex flex-col items-center justify-start h-full group cursor-pointer"
                >
                  {/* Tick */}
                  <div
                    className={`mt-2 w-px h-6 origin-center transition-all duration-300 
                      ${
                        isActive
                          ? "bg-white rotate-90" // ACTIVE: always rotated 90°
                          : "bg-white/30 group-hover:bg-white/60 group-hover:rotate-90" // INACTIVE: rotate on hover
                      }
                    `}
                  />

                  {/* Number */}
                  <p
                    className={`mt-1 transition-colors duration-200 
                      ${
                        isActive
                          ? "text-white"
                          : "text-white/40 group-hover:text-white/70"
                      }
                    `}
                  >
                    {num}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Act labels */}
        <div className="absolute -top-5 inset-x-0 grid grid-cols-16 text-[11px] uppercase tracking-[0.2em]">
          {ACTS.map((act) => (
            <div key={act.name} className="col-span-4 flex justify-center">
              <p
                className={
                  lineAct === act.index ? "text-white" : "text-white/40"
                }
              >
                {act.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
