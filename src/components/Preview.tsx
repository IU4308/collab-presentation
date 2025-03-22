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


export default function Preview () {
    return (
        <Dialog>
            <DialogTrigger>
                <div className=" hover:opacity-50 flex flex-col gap-2">
                    <div>
                        <img 
                            src="/image.jpg" 
                            alt="img" 
                            className="object-cover rounded-md"
                        />
                    </div>
                    <div>Title</div>
                    <div className="text-gray-600">by Author</div>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Enter the presentation</DialogTitle>
                    <DialogDescription>Specify your nickname.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Nickname</Label>
                        <Input id="name" value="" className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Enter</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}