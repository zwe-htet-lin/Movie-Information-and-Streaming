import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

interface Props {
  value: string;
}

const BookmarkBreadcrumb = ({ value }: Props) => {
  const bookmarks = [
    { label: "All", value: "all", href: "/bookmark?page=1" },
    { label: "To Watch", value: "to-watch", href: "/bookmark/to-watch?page=1" },
    { label: "Watching", value: "watching", href: "/bookmark/watching?page=1" },
    { label: "Watched", value: "watched", href: "/bookmark/watched?page=1" },
  ];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {bookmarks.map((bookmark, index) => (
          <div key={bookmark.value} className="flex items-center">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  className={
                    value === bookmark.value
                      ? "text-primary font-bold"
                      : " font-semibold"
                  }
                  href={bookmark.href}
                >
                  {bookmark.label}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index < bookmarks.length - 1 && <BreadcrumbSeparator />}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BookmarkBreadcrumb;
