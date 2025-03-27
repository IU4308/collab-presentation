
export default function CanvasFallback({ src }: { src: string | undefined }) {
    return (
        <div  className="relative z-40 min-w-[1024px] w-full h-[calc(100%+45px)] overflow-clip ">
            <img 
                src={src} 
                alt={'blank'} 
                className="relative z-20 object-cover h-[100%] w-[100%] cursor-pointer" 
            />

        </div>
    )
}