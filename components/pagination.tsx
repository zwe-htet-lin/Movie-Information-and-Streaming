"use client"

import React from "react"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface PaginationProps {
  count: number
  page?: number
  defaultPage?: number
  siblingCount?: number
  boundaryCount?: number
  size?: "small" | "medium" | "large"
  variant?: "text" | "outlined"
  showFirstButton?: boolean
  showLastButton?: boolean
  hidePrevButton?: boolean
  hideNextButton?: boolean
  disabled?: boolean
  onChange?: (event: React.MouseEvent<HTMLButtonElement>, page: number) => void
  className?: string
}

export function usePagination({
  count,
  page: controlledPage,
  defaultPage = 1,
  siblingCount = 1,
  boundaryCount = 1,
  showFirstButton = false,
  showLastButton = false,
  hidePrevButton = false,
  hideNextButton = false,
}: {
  count: number
  page?: number
  defaultPage?: number
  siblingCount?: number
  boundaryCount?: number
  showFirstButton?: boolean
  showLastButton?: boolean
  hidePrevButton?: boolean
  hideNextButton?: boolean
}) {
  const [internalPage, setInternalPage] = React.useState(defaultPage)
  const page = controlledPage ?? internalPage

  const range = (start: number, end: number) => {
    const length = end - start + 1
    return Array.from({ length }, (_, i) => start + i)
  }

  const startPages = range(1, Math.min(boundaryCount, count))
  const endPages = range(Math.max(count - boundaryCount + 1, boundaryCount + 1), count)

  const siblingsStart = Math.max(
    Math.min(page - siblingCount, count - boundaryCount - siblingCount * 2 - 1),
    boundaryCount + 2,
  )

  const siblingsEnd = Math.min(
    Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
    endPages.length > 0 ? endPages[0] - 2 : count - 1,
  )

  const itemList = [
    ...(showFirstButton ? ["first"] : []),
    ...(hidePrevButton ? [] : ["previous"]),
    ...startPages,

    ...(siblingsStart > boundaryCount + 2
      ? ["start-ellipsis"]
      : boundaryCount + 1 < count - boundaryCount
        ? [boundaryCount + 1]
        : []),

    ...range(siblingsStart, siblingsEnd),

    ...(siblingsEnd < count - boundaryCount - 1
      ? ["end-ellipsis"]
      : count - boundaryCount > boundaryCount
        ? [count - boundaryCount]
        : []),

    ...endPages,
    ...(hideNextButton ? [] : ["next"]),
    ...(showLastButton ? ["last"] : []),
  ]

  const buttonProps = (item: string | number) => {
    if (typeof item === "number") {
      return {
        onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
          setInternalPage(item)
        },
        disabled: false,
        selected: item === page,
        page: item,
      }
    }

    switch (item) {
      case "first":
        return {
          onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
            setInternalPage(1)
          },
          disabled: page === 1,
          page: 1,
        }
      case "previous":
        return {
          onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
            setInternalPage(page - 1)
          },
          disabled: page === 1,
          page: page - 1,
        }
      case "next":
        return {
          onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
            setInternalPage(page + 1)
          },
          disabled: page === count,
          page: page + 1,
        }
      case "last":
        return {
          onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
            setInternalPage(count)
          },
          disabled: page === count,
          page: count,
        }
      default:
        return {
          onClick: () => {},
          disabled: true,
        }
    }
  }

  return {
    items: itemList.map((item) => ({
      ...buttonProps(item),
      type: typeof item === "number" ? "page" : item,
      page: typeof item === "number" ? item : undefined,
    })),
  }
}

export function Pagination({
  count,
  page: controlledPage,
  defaultPage = 1,
  siblingCount = 1,
  boundaryCount = 1,
  size = "medium",
  variant = "text",
  showFirstButton = false,
  showLastButton = false,
  hidePrevButton = false,
  hideNextButton = false,
  disabled = false,
  onChange,
  className,
  ...props
}: PaginationProps) {
  const { items } = usePagination({
    count,
    page: controlledPage,
    defaultPage,
    siblingCount,
    boundaryCount,
    showFirstButton,
    showLastButton,
    hidePrevButton,
    hideNextButton,
  })

  const sizeClasses = {
    small: "h-8 w-8 text-sm",
    medium: "h-9 w-9 text-sm",
    large: "h-10 w-10 text-base",
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "first":
        return <ChevronsLeft className="h-4 w-4" />
      case "previous":
        return <ChevronLeft className="h-4 w-4" />
      case "next":
        return <ChevronRight className="h-4 w-4" />
      case "last":
        return <ChevronsRight className="h-4 w-4" />
      case "start-ellipsis":
      case "end-ellipsis":
        return <MoreHorizontal className="h-4 w-4" />
      default:
        return null
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, item: any) => {
    if (item.onClick && !disabled) {
      item.onClick(event)
      if (onChange && item.page) {
        onChange(event, item.page)
      }
    }
  }

  return (
    <nav
      role="navigation"
      aria-label="pagination navigation"
      className={cn("flex items-center space-x-1", className)}
      {...props}
    >
      {items.map((item, index) => {
        const isEllipsis = item.type === "start-ellipsis" || item.type === "end-ellipsis"
        const isSelected = item.type === "page" && controlledPage ? item.page === controlledPage : false

        if (isEllipsis) {
          return (
            <div
              key={index}
              className={cn("flex items-center justify-center", sizeClasses[size], "text-muted-foreground")}
            >
              <MoreHorizontal className="h-4 w-4" />
            </div>
          )
        }

        return (
          <Button
            key={index}
            variant={variant === "outlined" ? (isSelected ? "default" : "outline") : isSelected ? "default" : "ghost"}
            size="sm"
            className={cn(
              sizeClasses[size],
              "min-w-0",
              isSelected && variant === "text" && "bg-primary text-primary-foreground hover:bg-primary/90",
              disabled && "pointer-events-none opacity-50",
            )}
            disabled={item.disabled || disabled}
            onClick={(event) => handleClick(event, item)}
            aria-label={
              item.type === "page"
                ? `Go to page ${item.page}`
                : item.type === "first"
                  ? "Go to first page"
                  : item.type === "previous"
                    ? "Go to previous page"
                    : item.type === "next"
                      ? "Go to next page"
                      : item.type === "last"
                        ? "Go to last page"
                        : undefined
            }
          >
            {item.type === "page" ? item.page : getIcon(item.type)}
          </Button>
        )
      })}
    </nav>
  )
}
