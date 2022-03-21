/* eslint-disable react-hooks/exhaustive-deps */
import { Body1, Body2, Header4 } from "@components/elements/types";
import { NextPage } from "next";
import ConsoleLayout from "@components/layouts/accounts/consolelayout";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Card from "@components/homednd";
import Dnd from "@components/homednd";
import styled from "@emotion/styled";
import { useCallback, useState } from "react";
import update from "immutability-helper";
const data = [
  {
    idx: 1,
    bo_subject: "하하",
    bo_table: "하하",
    sector: "하하",
  },
];

const Style = {
  Container: styled.div`
    display: flex;
    gap: 0.5rem;
    min-height: 40rem;
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
  Banner2: styled.div`
    flex: 2;
    width: 100%;
    min-height: 10rem;
    background-color: gray;
    display: flex;
    flex-wrap: wrap;
    padding: 1rem;
    gap: 1rem;
    align-items: center;
    justify-content: center;
  `,
};

const AdsEdit: NextPage = () => {
  const [banners, setBanners] = useState([
    { id: 1, title: "1번" },
    { id: 2, title: "2번" },
    { id: 3, title: "3번" },
  ]);

  const [banners2, setBanners2] = useState([
    { id: 1, title: "1번" },
    { id: 2, title: "2번" },
    { id: 3, title: "3번" },
    { id: 4, title: "4번" },
    { id: 5, title: "5번" },
    { id: 6, title: "6번" },
    { id: 8, title: "4번" },
    { id: 9, title: "5번" },
    { id: 10, title: "6번" },
    { id: 11, title: "4번" },
    { id: 12, title: "5번" },
    { id: 13, title: "6번" },
    { id: 14, title: "4번" },
    { id: 15, title: "5번" },
    { id: 16, title: "6번" },
  ]);

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

  const moveCard2 = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = banners2[dragIndex];
      setBanners2(
        update(banners2, {
          $splice: [
            [dragIndex, 1], // Delete
            [hoverIndex, 0, dragCard], // Add
          ],
        }),
      );
    },
    [banners2],
  );
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
                <Style.Banner1>
                  {banners.map((item, index) => (
                    <Dnd
                      index={index}
                      id={item.id}
                      title={item.title}
                      moveCard={moveCard}
                      key={item.id}
                    />
                  ))}
                </Style.Banner1>
              </Style.Container>
            </DndProvider>
          </>
        }
      />
    </>
  );
};

export default AdsEdit;
