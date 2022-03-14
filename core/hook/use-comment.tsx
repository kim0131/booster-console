import { topicImageUrl } from "@core/config/imgurl";
import axios from "axios";
import useSWR from "swr";

const getCommentIsReply = async (idx: string | number) => {
  const reply = await axios.get(`/api2/topic/reply/${idx}`);
  if (reply.data.result.length) {
    const result: any = [];
    reply.data.result.map((item: any, idx: any) => {
      result.push({
        idx: item.idx,
        wr_is_comment: item.wr_is_comment,
        wr_is_comment2: item.wr_is_comment2,
        wr_content: item.wr_content,
        mb_name: item.mb_name,
        wr_view: item.wr_view,
        wr_good: item.wr_good,
      });
    });
    return result;
  } else {
    return [];
  }
};

const topicComment = async (url: string) => {
  let result: any = [];
  let result2: any = [];
  await axios.get(url).then(async res => {
    const CurrentTime = new Date();
    const comment = res.data.result;
    for (const item of comment) {
      let ContentTime = new Date(item.wr_datetime);
      ContentTime.setHours(ContentTime.getHours() - 9);
      const elapsedTime = Math.ceil(
        (CurrentTime.getTime() - ContentTime.getTime()) / (1000 * 3600),
      );
      const replyCount = await axios.get(`/api2/topic/replycount/${item.idx}`);

      result.push(
        await {
          idx: item.idx,
          wr_is_comment: item.wr_is_comment,
          wr_is_comment2: item.wr_is_comment2,
          wr_content: item.wr_content,
          mb_name: item.mb_name,
          wr_view: item.wr_view,
          wr_good: item.wr_good,
          wr_create: elapsedTime,
          replycount: replyCount.data.result.length,
          wr_reply: await getCommentIsReply(item.idx),
        },
      );
    }
  });
  for (const item of result) {
    result2.push(item);
    if (item.wr_reply.length > 0) {
      for (const v of item.wr_reply) {
        result2.push(v);
      }
    }
  }
  return result2;
};
export const useTopicComment = (id: any) => {
  const { data: commentsList, mutate } = useSWR(
    `/api2/topic/comment/${id}`,
    topicComment,
  );
  return { commentsList, mutate };
};
