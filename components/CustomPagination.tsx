"use client";

import { useAppDispatch } from "@/store/hook";
import Pagination from "@mui/material/Pagination";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface Props {
  count: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const CustomPagination = ({ count, page, setPage }: Props) => {
  const dispatch = useAppDispatch();

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
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
