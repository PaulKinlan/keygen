import { Head } from "$fresh/runtime.ts";
import Header from "../components/Header.tsx";
import Hero from "../components/Hero.tsx";
import Algorithm from "../islands/Algorithm.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>About Key Gen</title>
      </Head>
      <Header></Header>
      
      <div class="mx-8 px-8">
        <Hero class="grid"></Hero>
      </div>
    </>
  );
}
