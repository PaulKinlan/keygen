import { Head } from "$fresh/runtime.ts";
import Algorithm from "../islands/Algorithm.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Key Gen</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <Algorithm algorithm="HMAC" />
      </div>
    </>
  );
}
