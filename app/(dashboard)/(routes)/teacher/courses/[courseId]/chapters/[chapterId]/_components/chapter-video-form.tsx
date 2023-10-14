"use client"
import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Chapter, MuxData } from "@prisma/client";
import axios from "axios";
import { ImageIcon, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";



interface ChapterVideoProps {
    initialData: Chapter & { muxData: MuxData | null}
    courseId: string,
    chapterId: string
}

const formSchema = z.object({
    videoUrl: z.string().min(1)
})

const ChapterVideo = ({
    initialData,
    courseId,
    chapterId
}: ChapterVideoProps) => {
    const [isEditing, setIsEditing] = useState(false)
    
    const toggleEdit = () => setIsEditing((current) => !current)

    const router = useRouter();


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            videoUrl: initialData?.videoUrl || ""
        }
    })
    const { isSubmitting, isValid } = form.formState
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
       try {
           await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
           toast.success("Chapter updated");
           toggleEdit()
           router.refresh()
       } catch (error) {
        toast("Something went wrong")
       }
    }

    return (
      
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course image

                <Button variant="ghost" onClick={toggleEdit}>
                    {isEditing && (
                        <>Cancel</>
                    )}
                    {!isEditing && !initialData.videoUrl && (
                        <>
                             <PlusCircle className="h-4 w-4 mr-2" />
                    Add an image
                        </>
                    )}
                    {!isEditing && initialData.videoUrl && (
                        <>
                             <PlusCircle className="h-4 w-4 mr-2" />
                    Edit image
                        </>
                    )}
                   
                </Button>
            </div>

            {!isEditing && (
                !initialData.videoUrl ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                        <ImageIcon className="h-10 w-10 text-slate-500"/>
                    </div>
               ) : (
                        <div className="relative aspect-video m-2">
                            <Image
                                alt="Upload"
                                fill
                                className="object-cover rounded-md"
                                src={initialData.videoUrl}
                            />
                            </div>
            )
            )}
            {isEditing && (
                <div>
                    <FileUpload
                        endpoint="courseImage"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ videoUrl: url})
                            }
                        }}
                    />

                    <div className="text-xs text-muted-foreground mt-4">
                        16:9 aspect ratio recommended
                    </div>

                    </div>
            )}
    </div>
  )
}

export default ChapterVideo