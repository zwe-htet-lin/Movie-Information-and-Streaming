import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCredits, usePersonDetails } from "@/hooks/useTMDB";
import { useMemo } from "react";
import CreditCard from "./CreditCard";
import CreditSkeleton from "./CreditSkeleton";

interface Props {
  tmdbId: number;
}

const Credit = ({ tmdbId }: Props) => {
  const { data: credits, isLoading: creditLoading } = useCredits(
    tmdbId,
    "cast",
  );
  const { data: crews, isLoading: crewLoading } = useCredits(tmdbId, "crew");
  const { data: person, isLoading } = usePersonDetails(tmdbId);

  const filteredCredits = useMemo(() => {
    if (!credits) return [];

    return credits
      .filter((item) => item.release_date || item.first_air_date)
      .sort((a, b) => {
        const dateA = new Date(
          a.release_date || a.first_air_date || 0,
        ).getTime();
        const dateB = new Date(
          b.release_date || b.first_air_date || 0,
        ).getTime();
        return dateB - dateA;
      });
  }, [credits]);

  const filteredCrews = useMemo(() => {
    if (!crews) return [];

    return crews
      .filter((item) => item.release_date || item.first_air_date)
      .sort((a, b) => {
        const dateA = new Date(
          a.release_date || a.first_air_date || 0,
        ).getTime();
        const dateB = new Date(
          b.release_date || b.first_air_date || 0,
        ).getTime();
        return dateB - dateA;
      });
  }, [crews]);

  const groupedDepartments = useMemo(() => {
    if (!filteredCrews && !filteredCredits) return [];

    const map = new Map<string, any[]>();

    if (filteredCredits?.length) {
      map.set("Acting", filteredCredits);
    }

    filteredCrews?.forEach((crew) => {
      if (!map.has(crew.department)) {
        map.set(crew.department, []);
      }
      map.get(crew.department)?.push(crew);
    });

    let departmentsArray = Array.from(map.entries()).map(
      ([department, items]) => ({
        department,
        items,
      }),
    );

    if (person?.known_for_department) {
      departmentsArray = departmentsArray.sort((a, b) => {
        if (a.department === person.known_for_department) return -1;
        if (b.department === person.known_for_department) return 1;
        return 0;
      });
    }

    return departmentsArray;
  }, [filteredCrews, filteredCredits, person]);

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-10 md:px-10">
      <div className="group flex w-fit items-center space-x-2">
        <div className="bg-primary h-6 w-1 rounded sm:h-7"></div>
        <h2 className="text-xl font-bold sm:text-2xl">CREDITS</h2>
      </div>
      {creditLoading || crewLoading || isLoading ? (
        <CreditSkeleton />
      ) : (
        <Accordion
          type="single"
          collapsible
          defaultValue={person?.known_for_department?.toLowerCase()}
        >
          {groupedDepartments.map(({ department, items }) => (
            <AccordionItem key={department} value={department.toLowerCase()}>
              <AccordionTrigger>{department}</AccordionTrigger>
              <AccordionContent>
                {items.map((item, index) => (
                  <div key={item.credit_id}>
                    <CreditCard credit={item} key={index} />
                    {index !== items.length - 1 && (
                      <div className="my-2 border-b border-b-neutral-700"></div>
                    )}
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </section>
  );
};

export default Credit;
