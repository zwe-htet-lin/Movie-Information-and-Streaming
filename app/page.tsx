import Banner from "@/components/Banner";
import ComingSoon from "@/components/ComingSoon";
import Streaming from "@/components/Streaming";
import Trending from "@/components/Trending";

export default function Home() {
  return (
    <>
      <Banner />
      <Trending />
      <ComingSoon />
      <Streaming />
    </>
  );
}
