import { insightImageUrl } from "@core/config/imgurl";
import axios, { AxiosError } from "axios";
import { useRef, useState, useMemo, useEffect } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const QuillEditor = ({ content, onChange }: any) => {
  const QuillRef = useRef<ReactQuill>();

  // 이미지를 업로드 하기 위한 함수
  const imageHandler = () => {
    // 파일을 업로드 하기 위한 input 태그 생성
    const input = document.createElement("input");
    const formData = new FormData();
    let url = "";

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    // 파일이 input 태그에 담기면 실행 될 함수
    input.onchange = async () => {
      const file = input.files;
      if (file !== null) {
        formData.append("image", file[0]);

        // 저의 경우 파일 이미지를 서버에 저장했기 때문에
        // 백엔드 개발자분과 통신을 통해 이미지를 저장하고 불러왔습니다.
        try {
          let url = "";
          const res = await axios
            .post(`/api2/insight/upload/2`, formData)
            .then(async res => {
              console.log();
              url = insightImageUrl + res.data.result.file_url.slice(2, -2);
            });

          // 백엔드 개발자 분이 통신 성공시에 보내주는 이미지 url을 변수에 담는다.

          // 커서의 위치를 알고 해당 위치에 이미지 태그를 넣어주는 코드
          // 해당 DOM의 데이터가 필요하기에 useRef를 사용한다.
          const range = QuillRef.current?.getEditor().getSelection()?.index;
          if (range !== null && range !== undefined) {
            let quill = QuillRef.current?.getEditor();

            quill?.setSelection(range, 1);

            quill?.clipboard.dangerouslyPasteHTML(
              range,
              `<img src=${url} alt="" />`,
            );
          }

          return { success: true };
        } catch (error) {
          const err = error as AxiosError;
          return { ...err.response, success: false };
        }
      }
    };
  };

  // quill에서 사용할 모듈을 설정하는 코드 입니다.
  // 원하는 설정을 사용하면 되는데, 저는 아래와 같이 사용했습니다.
  // useMemo를 사용하지 않으면, 키를 입력할 때마다, imageHandler 때문에 focus가 계속 풀리게 됩니다.
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ size: ["small", false, "large", "huge"] }, { color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { align: [] },
          ],
          ["image", "video"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    [],
  );

  return (
    <>
      <ReactQuill
        ref={element => {
          if (element !== null) {
            QuillRef.current = element;
          }
        }}
        value={content}
        onChange={onChange}
        modules={modules}
        theme="snow"
        placeholder="내용을 입력해주세요."
      />
    </>
  );
};