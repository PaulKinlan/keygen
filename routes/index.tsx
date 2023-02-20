import { Head } from "$fresh/runtime.ts";
import Header from "../components/Header.tsx";
import { Heading1 } from "../ui/components/general/Headings.tsx";
import Algorithm from "../islands/Algorithm.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Key Gen</title>
      </Head>
      <Header></Header>
      <div class="grid w-screen place-content-center">
        <Heading1>Key Gen</Heading1>
        <Algorithm algorithm="HMAC" />
      </div>
    </>
  );
}
