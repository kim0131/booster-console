import { useCallback, useEffect } from "react";
import useSWR from "swr";

const useDesktop = () => {
  const { data: isDesktop, mutate } = useSWR("desktop");

  const updateDesktop = useCallback(e => {
    if (e.matches) {
      mutate(true);
    } else {
      mutate(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    media.addEventListener("change", e => updateDesktop(e));

    if (media.matches) {
      mutate(true);
    } else {
      mutate(false);
    }

    return () => media.removeEventListener("change", e => updateDesktop(e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isDesktop,
  };
};

export default useDesktop;
