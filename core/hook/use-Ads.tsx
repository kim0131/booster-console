import axios from "axios";
import useSWR from "swr";

const adsDetailFetcher = async (proms: any) => {
  let result: any = {};
  await axios.get(`/api2/home/adbanner/detail/${proms.id}`).then(res => {
    const item = res.data.result;
    result = {
      id: item.idx,
      image_url: item.image_url,
      posting_date: item.posting_date,
      posting_exitdate: item.posting_exitdate,
      title: item.title,
      url: item.url,
      priority: item.priority,
    };
  });

  return result;
};

const adsListFetcher = async () => {
  let result: any = [];
  await axios.get("/api2/home/adbanner").then(res => {
    const homeList = res.data.result;
    homeList.map((item: any, idx: number) => {
      result.push({
        id: item.idx,
        image_url: item.image_url,
        posting_date: item.posting_date,
        posting_exitdate: item.posting_exitdate,
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
export const useAdsDetail = (id: any) => {
  const { data: AdsDetail } = useSWR(
    { url: `/api2/home/ads/detail`, id: id },
    adsDetailFetcher,
  );
  return { AdsDetail };
};

const useAdsList = () => {
  const { data: adsList } = useSWR(`/api2/home/ads/list`, adsListFetcher);
  return { adsList };
};

export default useAdsList;
