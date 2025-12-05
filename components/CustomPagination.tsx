"use client";

import Pagination from "@mui/material/Pagination";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";

interface Props {
  endpoint: string;
  path?: string;
  query?: string;
  page: number;
  count: number;
}

const CustomPagination = ({ endpoint, path, query, page, count }: Props) => {
  const router = useRouter();

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event: ChangeEvent<unknown>, page: number) => {
    router.push(
      `/${endpoint}${path ? `/${path}` : ""}?${
        endpoint === "search" ? `query=${query}&` : ""
      }page=${page}`
    );
  };

  return (
    <Pagination
      onChange={handleChange}
      size={sm ? "small" : "medium"}
      siblingCount={sm ? 0 : 1}
      count={count}
      page={page}
      showFirstButton
      showLastButton
      sx={{
        "& .MuiPaginationItem-root": {
          color: "white",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.2)",
          },
        },
        "& .MuiPaginationItem-root.Mui-selected": {
          backgroundColor: "#18C1DB",
          color: "black",
          transition: "opacity 0.3s ease",
          "&:hover": {
            opacity: 0.75,
            backgroundColor: "#18C1DB",
          },
        },
        "& .MuiPaginationItem-ellipsis": {
          color: "white",
          pointerEvents: "none",
        },
      }}
    />
  );
};

export default CustomPagination;
