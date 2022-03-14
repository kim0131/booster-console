import { insightImageUrl, topicImageUrl } from "@core/config/imgurl";
import axios from "axios";
import useSWR from "swr";
let category: any = [];

const onClickCategoryList = async () => {
  await axios.get("/api2/category").then((res: any) => {
    let list = res.data.result;
    list.map((item: any, idx: any) => {
      category.push({
        value: list[idx].idx,
        label: list[idx].bo_subject,
      });
    });
  });
};
const getCategoryName = (idx: any) => {
  for (let i = 0; i < category.length; i++) {
    if (category[i].value == idx) {
      return category[i].label;
    }
  }
};

const insightDetailfetcher = async (url: any) => {
  await onClickCategoryList();
  let insightDetail: any = {};
  await axios.get(url).then(async res => {
    const insightContent = res.data[0];
    const CurrentTime = new Date();
    const ContentTime = new Date(insightContent.wr_datetime);
    const elapsedTime = Math.ceil(
      (CurrentTime.getTime() - ContentTime.getTime()) / (1000 * 3600),
    );
    if (insightContent.file_url) {
      insightContent.file_full_url =
        insightImageUrl + insightContent.file_url.slice(2, -2);
    }
    insightContent.category = await getCategoryName(insightContent.board);
    insightContent.bookmark = await false; //추후필요
    insightContent.create = await elapsedTime;
    insightDetail = insightContent;
  });
  return insightDetail;
};

export const useInsightDetail = (id: any) => {
  const { data: insightDetail, mutate } = useSWR(
    `/api2/insight/list/${id}`,
    insightDetailfetcher,
  );

  return { insightDetail, mutate };
};
