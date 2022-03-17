import { topicImageUrl } from "@core/config/imgurl";
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

const topicDetailfetcher = async (url: any) => {
  await onClickCategoryList();
  let topicList: any = {};
  await axios
    .post(url, {
      member_idx: 67,
      sector: "topic",
    })
    .then(async res => {
      const TopicContent = res.data.result[0];
      const CurrentTime = new Date();
      const ContentTime = new Date(TopicContent.wr_datetime);
      const elapsedTime = Math.ceil(
        (CurrentTime.getTime() - ContentTime.getTime()) / (1000 * 3600),
      );
      if (TopicContent.file_url) {
        TopicContent.file_full_url =
          (await topicImageUrl) + TopicContent.file_url.slice(2, -2);
      }
      TopicContent.category = await getCategoryName(TopicContent.board);
      TopicContent.bookmark = await false; //추후필요
      TopicContent.create = await elapsedTime;
      topicList = TopicContent;
    });
  return topicList;
};

export const useTopicDetail = (id: any) => {
  const { data: topicDetail, mutate } = useSWR(
    `/api2/topic/${id}`,
    topicDetailfetcher,
    {
      onSuccess: () => {},
    },
  );
  return { topicDetail, mutate };
};
