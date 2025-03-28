import { CiImageOn } from "react-icons/ci";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useState } from "react";
import { templates } from "@/constants";
import axios from "axios";
import { useParams } from "react-router";

const apiUrl = import.meta.env.VITE_API_URL 
export default function ChooseTemplate({ slideId } : { slideId: string }) {
    const presentationId = useParams().presentationId
    const [template, setTemplate] = useState('/blank.jpg')

    const handleChooseTemplate = async (value: string) => {
        try {
            await axios.put(`${apiUrl}/presentations/${presentationId}/slides/${slideId}`, { template: value });
        } catch (error) {
            console.error("Error choosing template:", error);
        }
    };

    console.log(template)
    return (
        <div className="relative col-span-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant={'outline'}
                        className="w-full"
                    >
                        <CiImageOn />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[350px] absolute top-[-40px] left-2" align="end">
                <DropdownMenuLabel>Choose background image</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={template} onValueChange={setTemplate}>
                    {templates.map(t => (
                        <DropdownMenuRadioItem  
                            key={t.src} 
                            value={t.src} 
                            className=""
                            onClick={() => handleChooseTemplate(t.src)}
                        >
                            
                            <img 
                                src={t.src} 
                                // src='/slide5.jpg'
                                alt={t.alt} 
                                className="relative z-20 object-contaon h-[100%] w-[100%] border" 
                            />
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}