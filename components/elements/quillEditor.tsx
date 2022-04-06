import { insightImageUrl } from "@core/config/imgurl";
import axios, { AxiosError } from "axios";
import { useRef, useState, useMemo, useEffect } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const QuillEditor = ({ content, onChange }: any) => {
  let ReactQuill =
    typeof window === "object" ? require("react-quill") : () => false;
  const QuillRef = useRef<any>();

  // 이미지를 업로드 하기 위한 함수
  const imageHandler = () => {
    const input = document.createElement("input");
    const formData = new FormData();
    let url = "";

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files;
      if (file !== null) {
        formData.append("image", file[0]);

        try {
          const res = await axios
            .post(`/api2/upload/insight`, formData)
            .then(async res => {
              url = insightImageUrl + res.data.result.file_url;
            });
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
        ref={(element: any) => {
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
