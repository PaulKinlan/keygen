import { Head } from "$fresh/runtime.ts";
import Header from "../components/Header.tsx";
import Hero from "../components/Hero.tsx";
import Algorithm from "../islands/Algorithm.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Key Gen</title>
      </Head>
      <Header></Header>
      <div class="grid h-screen w-screen place-content-center">
        <Hero></Hero>
        <Algorithm algorithm="HMAC" />
      </div>
    </>
  );
}
