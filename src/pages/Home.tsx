import Preview from "../components/Preview";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { PresentationType } from "@/definitions";
// import { io } from "socket.io-client";

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';// const socket = io(apiUrl);

export default function Home() {
    const [presentations, setPresentations] = useState<PresentationType[] | null>(null)

    useEffect(() => {
            const fetchPresentation = async () => {
                try {
                    const response = await axios.get(`${apiUrl}/presentations`)
                    setPresentations(response.data)
                    
                } catch (error) {
                    console.log('Error fetching presentation: ', error)
                }
            };
    
            fetchPresentation();
        }, [])
    
        // useEffect(() => {
        //     socket.on('updatePresentation', (updatedPresentation: PresentationType) => {
        //         setPresentation(updatedPresentation)
        //     })
    
        //     return () => {
        //         socket.off('updatedPresentation')
        //     }
        // }, [])

    return (
        <main className="min-h-screen py-4 flex flex-col gap-2 items-center">
            <Header />

            <div className="xl:max-w-[1024px] py-8 grid sm:grid-cols-2 xl:grid-cols-3 gap-8 justify-center xl:border-x border-gray-200 sm:px-8">
                {presentations?.map(p => (
                    <Preview 
                        key={p.presentationId}  
                        src={p.slides[0].src}
                        alt={p.slides[0].alt}
                    />
                ))}
            </div>
        </main>
    )

}