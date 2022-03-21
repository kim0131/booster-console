import axios from "axios";
import useSWR from "swr";

const homeDetailFetcher = async (proms: any) => {
  let result: any = {};
  await axios.get(`/api2/home/main/detail/${proms.id}`).then(res => {
    result = res.data.result;
  });

  return result;
};

const homeListFetcher = async () => {
  let result: any = [];
  await axios.get("/api2/home/main").then(res => {
    const homeList = res.data.result;
    homeList.map((item: any, idx: number) => {
      result.push({
        background_color: item.background_color,
        id: item.idx,
        image_url: item.image_url,
        posting_date: item.posting_date,
        posting_exitdate: item.posting_exitdate,
        subtitle: item.subtitle,
        title: item.title,
        url: item.url,

        priority: item.priority,
      });
    });
  });
  result = result.sort(function (a: any, b: any) {
    return a.priority - b.priority;
  });
  return result;
};
export const useHomeDetail = (id: any) => {
  const { data: homeDetail } = useSWR(
    { url: `/api2/home/main/detail`, id: id },
    homeDetailFetcher,
  );
  return { homeDetail };
};

const useHomeList = () => {
  const { data: homeList, mutate: homeListMutate } = useSWR(
    `/api2/home/main/list`,
    homeListFetcher,
  );
  return { homeList, homeListMutate };
};

export default useHomeList;
