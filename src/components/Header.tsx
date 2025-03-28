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
import { CiSquarePlus } from "react-icons/ci"
import { useState } from "react"
import axios from "axios"

const apiUrl = import.meta.env.VITE_API_URL 
export default function Header() {
    const [username, setUsername] = useState("");
    const [title, setTitle] = useState("");
    const [open, setOpen] = useState(false)

    const handleCreatePresentation = async () => {
        try {
            const newPresentation = {
                username,
                title,
            };
            const response = await axios.post(`${apiUrl}/presentations`, newPresentation);
            console.log("Presentation created:", response.data);
            setUsername("");
            setTitle("");
            setOpen(false);
        } catch (error) {
            console.error("Error creating presentation:", error);
        }
    };

    return (
        <div className="">
            <Dialog open={open} onOpenChange={setOpen} >
                <DialogTrigger asChild>
                    <Button className="cursor-pointer" variant="outline">
                        <CiSquarePlus className="text-4xl" />
                        Create new presentation
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create new presentation</DialogTitle>
                        <DialogDescription>Specify your username and title of the presentation</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">Username</Label>
                            <Input 
                                id="username" 
                                className="col-span-3" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} 
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">Title</Label>
                            <Input 
                                id="title" 
                                className="col-span-3"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)} 
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button 
                            className="cursor-pointer" 
                            type="button" 
                            onClick={handleCreatePresentation}
                        >
                            Create
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}