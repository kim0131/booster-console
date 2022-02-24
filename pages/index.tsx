import type { NextPage } from "next";
import Button from "@components/elements/button";
import TextField from "@components/elements/text-field";
import { IconAdd } from "@components/icons";
import useToast from "@core/hook/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import ConsoleLayout from "@components/layouts/accounts/consolelayout";

const Home: NextPage = () => {
  const toast = useToast();
  return (
    <>
      <ConsoleLayout title={<>홈</>}></ConsoleLayout>
    </>
  );
};

export default Home;
