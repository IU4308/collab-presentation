import Canvas from "@/components/Canvas";
import SlidesList from "@/components/SlidesList";
import UsersList from "@/components/UsersList";
import { PresentationType, UserType } from "@/definitions";
import axios from "axios";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router"
import CanvasFallback from "@/components/CanvasFallback";
import PresentationDialog from "@/components/PresentationDialog";
import { Button } from "@/components/ui/button";
import { VscDebugStart } from "react-icons/vsc";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";


const apiUrl = import.meta.env.VITE_API_URL 
const socket = io(apiUrl);

export default function Presentation() {
    const presentationId = useParams().presentationId
    const [presentation, setPresentation] = useState<PresentationType | null>(null)
    const [currentSlideId, setCurrentSlideId] = useState('')
    const [currentUser, setCurrentUser] = useState<UserType | null>(null)
    const [username, setUsername] = useState("");
    const [open, setOpen] = useState(true)
    const [isPresentMode, setIsPresentMode] = useState(false);

    const handleUsername = (name: string) => {
        setUsername(name)
    }
    const handleJoin = () => {
        setOpen(false)
        socket.emit("joinPresentation", { presentationId, username });
    };

    const handlePresentMode = () => setIsPresentMode(!isPresentMode)

    const handleSlideSelection = (id: string) => {
        setCurrentSlideId(id)
    }

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
        socket.on('updatePresentation', (updatedPresentation: PresentationType) => {
            setPresentation(updatedPresentation)
        })
        
        return () => {
            socket.off('updatedPresentation')
        }
    }, [presentationId])

    useEffect(() => {
        socket.on('userEvent', (users: UserType[]) => {
            console.log(users)
            const currentUser = users.find((user) => user.username === username && user.presentationId === presentationId);
            if (currentUser) {
                setCurrentUser(currentUser);
            }
        });

        return () => {
            socket.off('userEvent');
        };
    }, [presentationId, username]);
    const slides = presentation?.slides
    const currentSlide = slides?.find(slide => slide.slideId === currentSlideId)
    const role = currentUser?.role
    console.log(role)
    return (
        <main className=" h-screen flex flex-col overflow-x-auto">
            <div className="fixed top-0 left-[200px] py-2 z-50" >
                <Button 
                    variant={'outline'}
                    onClick={handlePresentMode}
                >
                    <VscDebugStart />
                </Button>
            </div>
            {slides?.map((slide, index) => isPresentMode && slide.slideId === currentSlideId &&  (
                <div key={slide.slideId}>
                    <div className="fixed z-50 top-1/2 right-1" >
                        <Button 
                            className="w-2"
                            onClick={() => {
                                if (index < slides.length - 1) {
                                    setCurrentSlideId(slides[index + 1].slideId)
                                } else {
                                    setCurrentSlideId(slides[0].slideId)
                                }
                            }}
                        >
                            <MdNavigateNext  />
                        </Button>
                    </div>
                    <div className="fixed z-50 top-1/2 left-1" >
                        <Button 
                            className="w-2"
                            onClick={() => {
                                if (index > 0) {
                                    setCurrentSlideId(slides[index - 1].slideId)
                                } else {
                                    setCurrentSlideId(slides[slides.length - 1].slideId)
                                }
                            }}    
                        >
                            <MdNavigateBefore />
                        </Button>
                    </div>
                </div>
            ))}
            {open ?
                <PresentationDialog 
                    username={username} 
                    handleUsername={handleUsername}
                    handleJoin={handleJoin} 
                    open={open} 
                    src={currentSlide?.src}
                /> 
                : (
                <section className="flex h-[93%] ">
                    <SlidesList 
                        slides={slides}
                        currentSlideId={currentSlideId}
                        handleSlideSelection={handleSlideSelection}
                        role={role}
                        title={presentation?.title}
                        author={presentation?.creatorId}
                        isPresentMode={isPresentMode}
                    />
                    {currentSlide !== undefined && role ? (
                        <Canvas 
                            {...currentSlide} 
                            role={role}
                        />
                    ) : (
                        <CanvasFallback src={'/blank.jpg'} />
                    )}
                    
                    <UsersList 
                        username={username} 
                        role={role} 
                        isPresentMode={isPresentMode}
                    />
                    
                </section>
            )}
        </main>
    )

}