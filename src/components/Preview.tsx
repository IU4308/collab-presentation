import { PreviewProps } from "@/definitions"
import { Link } from "react-router"

export default function Preview ({ presentation: p } : PreviewProps) {
    return (
        <Link className="no-underline text-inherit" to={`/presentations/${p?.presentationId}`}>
            <div className=" hover:opacity-50 flex flex-col gap-2">
                <div>
                    <img 
                        src={p?.slides[0].src} 
                        alt={p?.slides[0].alt} 
                        className="border-2 object-cover rounded-md w-[300px] h-[200px] cursor-pointer"
                    />
                </div>
                <div>{p?.title}</div>
                <div className="text-gray-600">{p?.creatorId}</div>
            </div>
        </Link>
    )
}