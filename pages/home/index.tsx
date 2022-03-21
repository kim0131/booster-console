/* eslint-disable react-hooks/exhaustive-deps */
import { Body1, Body2, Header4 } from "@components/elements/types";
import { NextPage } from "next";
import ConsoleLayout from "@components/layouts/accounts/consolelayout";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Dnd from "@components/homednd";
import styled from "@emotion/styled";
import React, { useCallback, useEffect, useState } from "react";
import update from "immutability-helper";
import Button from "@components/elements/button";
import useHomeList from "@core/hook/use-home";
import axios from "axios";
import { useRouter } from "next/router";

const FlexBox = styled.div`
  display: flex;
  gap: 1rem;
`;
const tableHead = [
  {
    id: 1,
    content: "button",
    size: "5%",
  },
  {
    id: 2,
    content: "제목",
    size: "20%",
  },
  {
    id: 3,
    content: "소제목",
    size: "60%",
  },
  {
    id: 4,
    content: " + /-",
    size: "15%",
  },
];
interface IStyleThead {
  size?: any;
}
const Style = {
  Container: styled.div`
    display: flex;
    gap: 0.5rem;
    /* min-height: 40rem; */
  `,
  Table: styled.table`
    width: 100%;
    border-top: 1px solid #444444;
    border-collapse: collapse;
  `,
  Thead: styled.thead``,
  Th: styled.th<IStyleThead>`
    border-bottom: 1px solid #444444;
    width: ${props => (props.size ? props.size : "")};
  `,
  Tbody: styled.tbody``,
  Tr: styled.tr``,
  Td: styled.td`
    border-bottom: 1px solid #444444;
    padding: 10px;
    text-align: center;
  `,
  Banner1: styled.div`
    flex: 1;
    width: 100%;
    min-height: 10rem;
    background-color: lightgray;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
};

const HomeEdit: NextPage = () => {
  const router = useRouter();
  const { homeList } = useHomeList();
  const [banners, setBanners] = useState<any>();
  useEffect(() => {
    if (homeList) {
      setBanners(homeList);
    } else {
    }
  }, [homeList]);

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = banners[dragIndex];
      setBanners(
        update(banners, {
          $splice: [
            [dragIndex, 1], // Delete
            [hoverIndex, 0, dragCard], // Add
          ],
        }),
      );
    },
    [banners],
  );
  const onClinkHomeDelete = async (id: any, iamge_url: any) => {
    // await axios
    //   .post(`/api2/topic/upload/delete/${id}`, {
    //     file_url: iamge_url,
    //   })
    //   .then(() => {});
    await axios.post(`/api2/home/main/delete/${id}`).then(() => {});
    alert("삭제되었습니다.");
    router.push("/home");
  };

  const onClickSearch = () => {
    banners.map(async (item: any, idx: any) => {
      await axios.post(`/api2/home/main/update/${item.id}`, {
        title: item.title,
        subtitle: item.subtitle,
        posting_date: item.posting_date,
        posting_exitdate: item.posting_exitdate,
        image_url: item.image_url,
        background_color: item.background_color,
        url: item.url,
        priority: idx,
      });
    });
    alert("변경되었습니다.");
  };
  const onClickRouter = (id: any) => {
    router.push(`/home/update?id=${id}`);
  };

  return (
    <>
      <ConsoleLayout
        title={
          <>
            <Header4>메인 베너 편집</Header4>
            <Body1>
              메인 배너는 최대 9개까지 등록할 수 있습니다. Drag&Drop 으로
              노출순서를 설정할 수 있습니다.
            </Body1>
          </>
        }
        section3={
          <>
            <DndProvider backend={HTML5Backend}>
              <Style.Container>
                <Style.Table>
                  <Style.Thead>
                    <Style.Tr>
                      {tableHead.map(content => {
                        return (
                          <React.Fragment key={content.id}>
                            <Style.Th size={content.size}>
                              {content.content}
                            </Style.Th>
                          </React.Fragment>
                        );
                      })}
                    </Style.Tr>
                  </Style.Thead>
                  <Style.Tbody>
                    {banners &&
                      banners.map((item: any, index: any) => (
                        <Dnd
                          index={index}
                          id={item.id}
                          title={item.title}
                          moveCard={moveCard}
                          key={item.id}
                        >
                          <Style.Td>
                            <Button />
                          </Style.Td>
                          <Style.Td>{item.title}</Style.Td>
                          <Style.Td>{item.subtitle}</Style.Td>
                          <Style.Td>
                            <FlexBox>
                              <Button onClick={() => onClickRouter(item.id)}>
                                수정
                              </Button>
                              <Button
                                onClick={() =>
                                  onClinkHomeDelete(item.id, item.image_url)
                                }
                              >
                                삭제
                              </Button>
                            </FlexBox>
                          </Style.Td>
                        </Dnd>
                      ))}
                  </Style.Tbody>
                </Style.Table>
              </Style.Container>
            </DndProvider>

            <Button onClick={onClickSearch}>변경된 순서 적용하기</Button>
            <Button
              onClick={() => {
                router.push("/home/create");
              }}
            >
              등록하기
            </Button>
          </>
        }
      />
    </>
  );
};

export default HomeEdit;
