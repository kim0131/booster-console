import axios from "axios";
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

export const Topicfetcher = async (url: string) => {
  await onClickCategoryList();
  let result: any = [];
  await axios.get(url).then(async res => {
    const topic = res.data.result;
    topic.map(async (item: any, idx: any) => {
      result.push({
        idx: item.idx,
        category: await getCategoryName(item.board),
        wr_subject: item.wr_subject,
        mb_name: item.mb_name,
        datetime: item.wr_datetime.slice(0, 10),
        // update: item.wr_update.slice(0, 10),
        update: "",
        view: item.wr_view,
        like: item.wr_good,
        comment: item.commentCnt,
      });
    });
  });
  return result;
};
