import { PresentationType } from "@/definitions";
import Preview from "./Preview";

export default function GridView({ presentations } : { presentations: PresentationType [] }) {
    return (
        <div className="xl:max-w-[1024px] py-8 grid sm:grid-cols-2 xl:grid-cols-3 gap-8 justify-center xl:border-x border-gray-200 sm:px-8">
            {presentations?.map(presentation => (
                <Preview 
                    key={presentation.presentationId}
                    presentation={presentation}  
                />
            ))}
        </div>
    )
}