import { PresentationType } from "@/definitions";
import { Link } from "react-router";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"


export default function TablieView ({ presentations } : { presentations: PresentationType [] }) {
    return (
        <>
            <Table className="min-w-md max-w-[1024px] mx-auto overflow-auto ">
                {/* <TableCaption >A list of all presentations.</TableCaption> */}
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[200px]">Preview</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="">
                    {presentations?.map(p => (
                        <TableRow className="w-xl" key={p.presentationId}>
                                <TableCell className="font-medium">
                                    <Link className="no-underline text-inherit py-10" to={`/presentations/${p?.presentationId}`}>
                                        <img 
                                            src={p?.slides[0].src} 
                                            alt={p?.slides[0].alt} 
                                            className="border-2 object-cover rounded-md w-[200px] h-[100px] cursor-pointer"
                                        />
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Link className="no-underline text-inherit block py-10" to={`/presentations/${p?.presentationId}`}>
                                        {p?.title}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Link className="no-underline text-inherit block py-10" to={`/presentations/${p?.presentationId}`}>
                                        {p?.creatorId}
                                    </Link>
                                </TableCell>
                            </TableRow>
                    ))}
                </TableBody>
            </Table>
            {/* {presentations?.map(p => (
                <Link className="no-underline text-inherit" to={`/presentations/${p?.presentationId}`}>
                    <div className="min-w-md overflow-x-auto xl:max-w-[1024px] py-8 grid grid-cols-3 gap-8 justify-center xl:border-x border-gray-200 sm:px-8">
                        <div>
                            <img 
                                src={p?.slides[0].src} 
                                alt={p?.slides[0].alt} 
                                className="border-2 object-cover rounded-md w-[300px] h-[200px] cursor-pointer"
                            />
                        </div>
                        <div>{p?.title}</div>
                        <div className="text-gray-600">{p?.creatorId}</div>
                    </div>
                </Link>
            ))} */}
        </>
    )
}