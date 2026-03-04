const CreditSkeleton = () => {
  return (
    <div className="mt-5 space-y-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div className="h-7 w-full rounded bg-neutral-500" key={i}/>
      ))}
    </div>
  );
};

export default CreditSkeleton;
