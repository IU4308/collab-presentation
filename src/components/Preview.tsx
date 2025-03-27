import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { PreviewProps } from "@/definitions"
import { Link, useNavigate } from "react-router"
import { io } from "socket.io-client"
import { useState } from "react"

export default function Preview ({ src, alt, id } : PreviewProps) {
    // console.log(socket.id)
    // const [username, setUsername] = useState("")
    // const navigate = useNavigate();

    // const handleJoin = () => {
    //     socket.emit("joinPresentation", { presentationId: id, username });
    //     navigate(`/presentations/${id}`);
    // };

    return (
        <Link className="no-underline text-inherit" to={`/presentations/${id}`}>
            <div className=" hover:opacity-50 flex flex-col gap-2">
                <div>
                    <img 
                        src={src} 
                        alt={alt} 
                        className="border-2 object-cover rounded-md w-[300px] h-[200px] cursor-pointer"
                    />
                </div>
                <div>Title</div>
                <div className="text-gray-600">by Author</div>
            </div>
        </Link>
        // <Dialog>
        //     <DialogTrigger>
        //         <div className=" hover:opacity-50 flex flex-col gap-2">
        //             <div>
        //                 <img 
        //                     src={src} 
        //                     alt={alt} 
        //                     className="border-2 object-cover rounded-md w-[300px] h-[200px] cursor-pointer"
        //                 />
        //             </div>
        //             <div>Title</div>
        //             <div className="text-gray-600">by Author</div>
        //         </div>
        //     </DialogTrigger>
        //     <DialogContent className="sm:max-w-[425px]">
        //         <DialogHeader>
        //             <DialogTitle>Join the presentation</DialogTitle>
        //             <DialogDescription>Specify your username.</DialogDescription>
        //         </DialogHeader>
        //         <div className="grid gap-4 py-4">
        //             <div className="grid grid-cols-4 items-center gap-4">
        //                 <Label htmlFor="username" className="text-right">username</Label>
        //                 <Input 
        //                     id="username"
        //                     className="col-span-3" 
        //                     value={username}
        //                     onChange={(e) => setUsername(e.target.value)} 
        //                 />
        //             </div>
        //         </div>
        //         <DialogFooter>
        //             <Button 
        //                 onClick={handleJoin}
        //                 type="button" 
        //                 className="w-full cursor-pointer"
        //             >
        //                 Join
        //             </Button>
        //         </DialogFooter>
        //     </DialogContent>
        // </Dialog>
    )
}