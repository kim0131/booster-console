/* eslint-disable react-hooks/rules-of-hooks */
import { getUserCertify } from "@core/config/businesscertify";
import { businessImageUrl } from "@core/config/imgurl";
import axios from "axios";
import useSWR from "swr";

const userListFetcher = async (url: string) => {
  let result: any = [];
  await axios.get(url).then(async res => {
    let list = res.data.result;

    list.map(async (item: any, idx: any) => {
      let stand = list[idx].mb_business_certify.toString().slice(0, 1);
      result.push({
        info: list[idx],
        idx: list[idx].idx,
        category: getUserCertify(stand),
        board: stand,
        mb_id: list[idx].mb_id,
        mb_email: list[idx].mb_email,
        datetime: list[idx].mb_datetime.slice(0, 10),
        update: list[idx].mb_update.slice(0, 10),
        business: list[idx].mb_business_num,
        mb_ph: list[idx].mb_ph,
      });
    });
  });
  return result;
};

const useUserList = () => {
  const { data: userList } = useSWR(`/api2/user/list`, userListFetcher, {
    refreshInterval: 1000,
  });

  return { userList };
};

export default useUserList;
