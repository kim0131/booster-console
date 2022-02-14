import type { NextPage } from "next";
import Button from "@components/elements/button";
import TextField from "@components/elements/text-field";
import { IconAdd } from "@components/icons";
import useToast from "@core/hook/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status != "authenticated") {
    router.push("/login");
  }
  const toast = useToast();
  return <>관리자페이지입니다</>;
};

export default Home;
