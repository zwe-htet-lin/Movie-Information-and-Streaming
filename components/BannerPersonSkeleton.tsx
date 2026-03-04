const BannerPersonSkeleton = () => {
  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-5 py-10 pt-25 md:px-10">
        <div className="flex animate-pulse flex-col items-center gap-3 md:flex-row md:items-start md:gap-5">
          <div className="h-[200px] w-[200px] shrink-0 rounded-lg bg-neutral-500 md:h-[465px] md:w-[300px]" />

          <div className="w-full">
            <div className="mx-auto h-8 w-2/3 rounded-full bg-neutral-500 md:mx-0 md:h-10 md:w-1/2" />

            <div className="mt-3 flex justify-center space-x-2 md:hidden">
              <div className="h-5 w-5 rounded-full bg-neutral-500" />
              <div className="h-5 w-5 rounded-full bg-neutral-500" />
              <div className="h-5 w-5 rounded-full bg-neutral-500" />
            </div>

            <div className="flex flex-col-reverse md:flex-col">
              <div className="mt-8 md:mt-6">
                <div className="mb-2 h-5 w-32 rounded-full bg-neutral-500" />
                <div className="space-y-3">
                  <div className="h-4 w-full rounded-full bg-neutral-500" />
                  <div className="h-4 w-full rounded-full bg-neutral-500" />
                  <div className="h-4 w-5/6 rounded-full bg-neutral-500" />
                  <div className="h-4 w-4/6 rounded-full bg-neutral-500" />
                </div>
              </div>

              <div className="mt-8 md:mt-6">
                <div className="mb-2 h-5 w-40 rounded-full bg-neutral-500" />
                <div className="grid grid-cols-2 gap-5">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="space-y-3">
                      <div className="h-4 w-24 rounded-full bg-neutral-500" />
                      <div className="h-4 w-32 rounded-full bg-neutral-500" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BannerPersonSkeleton;
