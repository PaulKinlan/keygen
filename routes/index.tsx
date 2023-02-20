import { Head } from "$fresh/runtime.ts";
import Algorithm from "../islands/Algorithm.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Key Gen</title>
      </Head>
      <div class="grid h-screen w-screen place-content-center">
        <Algorithm algorithm="HMAC" />
      </div>
    </>
  );
}
