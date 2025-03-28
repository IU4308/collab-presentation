import Header from "@/components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { PresentationType } from "@/definitions";
import { io } from "socket.io-client";
import GridView from "@/components/GridView";
import TablieView from "@/components/TableView";
import { Button } from "@/components/ui/button";
import { CiViewTable } from "react-icons/ci";
import { IoGridOutline } from "react-icons/io5";
import ClipLoader from "react-spinners/ClipLoader";

const apiUrl = import.meta.env.VITE_API_URL 
const socket = io(apiUrl);

export default function Home() {
    const [presentations, setPresentations] = useState<PresentationType[] | null>(null)
    const [isGallery, setIsGallery] = useState(false)
    const [isLoading, setIsLoading] = useState(false); 

    const handleView = () => setIsGallery(!isGallery)
    useEffect(() => {
            const fetchPresentation = async () => {
                setIsLoading(true); 

                try {
                    const response = await axios.get(`${apiUrl}/presentations`)
                    setPresentations(response.data)
                    
                } catch (error) {
                    console.log('Error fetching presentation: ', error)
                } finally {
                    setIsLoading(false); 
                }
            };
    
            fetchPresentation();
        }, [])
        useEffect(() => {
            socket.on('newPresentation', (newPresentation: PresentationType) => {
                setIsLoading(true);
                if (presentations !== null) {
                    setPresentations((prevPresentations) => prevPresentations ? [...prevPresentations, newPresentation] : [newPresentation])
                }
                setIsLoading(false);
            })
    
            return () => {
                socket.off('newPresentation')
            }
    }, [presentations])

    return (
        <main className="min-h-screen py-4 flex flex-col items-center gap-2 max-w-[1024px] mx-auto">
            <Header />
            <div className="w-full px-2 flex justify-between">
                <span className="text-2xl">All presentations</span>
                <Button 
                    variant={'outline'}
                    onClick={handleView}
                    >
                    {isGallery ? <CiViewTable /> : <IoGridOutline />}
                </Button>
            </div>
            {isLoading && <ClipLoader color={'black'}/>}
            {presentations !== null && (
                <>
                    {isGallery ? (
                        <GridView presentations={presentations} />
                    ) : (
                        <TablieView presentations={presentations} />
                    )}
                </>
            )}
        </main>
    )

}