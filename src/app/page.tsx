import CategorySection from "@/components/sections/CategorySection";
import ProductSection from "@/components/sections/ProductSection";
import ServerUrlSelection from "@/components/sections/ServerUrlSelection";

export default function Home() {
  return (
    <div className="relative w-full m-0 flex justify-center bg-[var(--background)]">
      <main className="relative w-full max-w-screen-xl h-full py-20 px-5 flex flex-col gap-14">
        <ServerUrlSelection/>
        <CategorySection/>
        <ProductSection/>
      </main>
    </div>
  );
}
