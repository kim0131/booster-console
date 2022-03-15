/* eslint-disable react-hooks/rules-of-hooks */
import { businessImageUrl } from "@core/config/imgurl";
import axios from "axios";
import useSWR from "swr";

export const CategorySelectfetcher = async (url: string) => {
  const sector = url.slice(15);
  let CategoryList: any = [];
  await axios.get("/api2/category").then(async res => {
    let list = res.data.result;
    list.map((item: any, idx: any) => {
      if (item.sector == sector) {
        CategoryList.push({
          value: list[idx].idx,
          label: list[idx].bo_subject,
        });
      }
    });
  });

  return CategoryList;
};

const useCategorySelect = (sector: string) => {
  const { data: categorySelect } = useSWR(
    `/api2/category/${sector}`,
    CategorySelectfetcher,
  );

  return { categorySelect };
};

export default useCategorySelect;
