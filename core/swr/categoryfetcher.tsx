import axios from "axios";

export const CategorySelectfetcher = async (url: string) => {
  let CategoryList: any = [];
  await axios.get(url).then(async res => {
    let list = res.data.result;
    list.map((item: any, idx: any) => {
      CategoryList.push({
        value: list[idx].idx,
        label: list[idx].bo_subject,
      });
    });
  });

  return CategoryList;
};
