import React, { useRef } from "react";

import styled from "@emotion/styled";
import { DragSourceMonitor, useDrag, useDrop } from "react-dnd";

const Wrapper = styled.tr<any>`
  opacity: ${props => (props.isDragging ? 0 : 1)};
  width: 100%;
  height: 2rem;
`;

const ItemTypes = {
  CARD: "card",
};

const Dnd = ({ id, title, index, moveCard, children }: any) => {
  const ref = useRef<any>(null);

  const [, drop] = useDrop({
    // (*)
    accept: ItemTypes.CARD,
    hover(item: any, monitor: any) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      let hoverBoundingRect = ref.current.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: () => {
      return { id, index };
    },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref)); // (*)

  return (
    <Wrapper ref={ref} isDragging={isDragging}>
      {children}
    </Wrapper>
  );
};

export default Dnd;
