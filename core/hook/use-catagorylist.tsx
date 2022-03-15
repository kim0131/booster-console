/* eslint-disable react-hooks/rules-of-hooks */
import { businessImageUrl } from "@core/config/imgurl";
import axios from "axios";
import useSWR from "swr";

const categoryFetcher = async (url: string) => {
  let result: any = [];
  await axios.get("/api2/category").then((res: any) => {
    const list = res.data.result;
    list.map((item: any, idx: any) => {
      if (!list[idx].wr_view) {
        list[idx].wr_view = 0;
      }
      if (!list[idx].wr_good) {
        list[idx].wr_good = 0;
      }
      result.push({
        idx: list[idx].idx,
        bo_table: list[idx].bo_table,
        bo_subject: list[idx].bo_subject,
        num_board: list[idx].board,
        num_view: list[idx].wr_view,
        num_good: list[idx].wr_good,
        sector: list[idx].sector,
        edit_subject: "수정 및 삭제하기",
      });
    });
  });
  return result;
};

const useCategoryList = () => {
  const { data: categoryList } = useSWR(
    `/api2/category/list`,
    categoryFetcher,
    {
      refreshInterval: 1000,
    },
  );

  return { categoryList };
};

export default useCategoryList;
