import { slides } from "@/constants";
import Preview from "../components/Preview";
import Header from "@/components/Header";

export default function Home() {
    const presentations = Array.from({ length: 12 })
    return (
        <main className="min-h-screen py-4 flex flex-col gap-2 items-center">
            <Header />

            <div className="xl:max-w-[1024px] py-8 grid sm:grid-cols-2 xl:grid-cols-3 gap-8 justify-center xl:border-x border-gray-200 sm:px-8">
                {slides.map(slide => (
                    <Preview key={slide.id} {...slide} />
                ))}
            </div>
        </main>
    )

}