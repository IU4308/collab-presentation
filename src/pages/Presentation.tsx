import Canvas from "@/components/Canvas";
import SlidesList from "@/components/SlidesList";
import UsersList from "@/components/UsersList";
import { PresentationType } from "@/definitions";
import axios from "axios";
import { useEffect, useState } from "react";

import { io } from "socket.io-client";
import { useParams } from "react-router"

const apiUrl = import.meta.env.VITE_API_URL 
const socket = io(apiUrl);

export default function Presentation() {
    const presentationId = useParams().presentationId
    const [presentation, setPresentation] = useState<PresentationType | null>(null)
    const [currentSlideId, setCurrentSlideId] = useState('')

    const handleSlideSelection = (id: string) => {
        setCurrentSlideId(id)
    }

    // if (presentation !== null) {
    //     handleSlideSelection(presentation?.slides[0].slideId)
    // }
    
    useEffect(() => {
        const fetchPresentation = async () => {
            try {
                const response = await axios.get(`${apiUrl}/presentations/${presentationId}`)
                const fetchedPresentation = response.data;
                setPresentation(response.data)
                
                if (fetchedPresentation.slides) {
                    setCurrentSlideId(fetchedPresentation.slides[0].slideId);
                }
            } catch (error) {
                console.log('Error fetching presentation: ', error)
            }
        };

        fetchPresentation();
    }, [presentationId])

    useEffect(() => {
        socket.on('updatePresentation', (updatedPresentation: PresentationType) => {
            setPresentation(updatedPresentation)
        })

        return () => {
            socket.off('updatedPresentation')
        }
    }, [])

    
    const slides = presentation?.slides
    
    const currentSlide = slides?.find(slide => slide.slideId === currentSlideId)

    // console.log(currentSlide)

    return (
        <main className=" h-screen flex flex-col overflow-x-auto">
            <section className="flex h-[93%]">
                <SlidesList 
                    slides={slides}
                    currentSlideId={currentSlideId}
                    handleSlideSelection={handleSlideSelection}
                />
                {currentSlide !== undefined ? (
                    <Canvas 
                        {...currentSlide} 
                        
                    />
                ) : (
                    <div></div>
                )}
                <UsersList />
            </section>
        </main>
    )

}