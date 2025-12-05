interface CircleRatingProps {
  value: number;
}

export const CircleRating = ({ value }: CircleRatingProps) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  const percentage = value / 10;
  const strokeDashoffset = circumference * (1 - percentage);

  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#1f2937"
          strokeWidth="10"
          fill="none"
        />
      </svg>

      <svg
        className="w-full h-full absolute top-0 left-0 rotate-[-90deg]"
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#22d3ee"
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>

      <div className="absolute text-2xl font-bold text-cyan-400">{value}</div>
    </div>
  );
};
