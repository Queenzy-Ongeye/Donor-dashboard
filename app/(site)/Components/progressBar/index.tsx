"use client";
import { useEffect, useState } from "react";

interface IProgress {
  totalSupported?: number | any;
  totalCount?: number | any;
  supportedText?: string;
  remainingText?: string;
}

const ProgressBar = ({
  totalSupported,
  totalCount,
  remainingText,
}: IProgress) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const percentage = (totalSupported / totalCount) * 100;
      setProgress(percentage);
    };

    calculateProgress(); // Initial calculation

    const handleResize = () => {
      // Recalculate on window resize (in case of dynamic content changes)
      calculateProgress();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [totalSupported, totalCount]);

  return (
    <div className="w-full">
      <div className="relative mb-2">
        <div className="flex items-center justify-between">
          <div>
            {/* <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-emerald-600 bg-emerald-200">
              {totalSupported}
            </span> */}
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-emerald-600">
              {remainingText} : {totalCount}
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mt-2 mb-4 text-xs flex rounded bg-emerald-200">
          <div
            style={{ width: `${progress}%` }}
            className="h-full rounded bg-emerald-500 transition-all"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
