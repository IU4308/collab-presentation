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
import CanvasFallback from "./CanvasFallback"
import { Input } from "./ui/input";

export default function PresentationDialog ({ 
    open, 
    username, 
    handleUsername,
    handleJoin,
    src
} : { 
    open: boolean;
    username: string;
    handleUsername: (name: string) => void;
    handleJoin: () => void;
    src: string | undefined
}) {
    return (
        <Dialog open={open} >
                <DialogTrigger className="flex h-[93%]">
                    <CanvasFallback src={src} />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Join the presentation</DialogTitle>
                        <DialogDescription>Specify your username.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">username</Label>
                            <Input 
                                id="username"
                                className="col-span-3" 
                                value={username}
                                onChange={(e) => handleUsername(e.target.value)} 
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button 
                            onClick={handleJoin}
                            type="button" 
                            className="w-full cursor-pointer"
                        >
                            Join
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
    )
}