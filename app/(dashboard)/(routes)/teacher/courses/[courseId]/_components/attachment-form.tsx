"use client"
import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { Attachement, Course } from "@prisma/client";
import axios from "axios";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import * as z from "zod";



interface AttachmentFormProps {
    initialData: Course & { attachments: Attachement[]}
    courseId: string
}

const formSchema = z.object({
    url: z.string().min(1)
})

const AttachmentForm = ({
    initialData,
    courseId
}: AttachmentFormProps) => {
    const [isEditing, setIsEditing] = useState(false)
    
    const toggleEdit = () => setIsEditing((current) => !current)

    const router = useRouter();


    // const form = useForm<z.infer<typeof formSchema>>({
    //     resolver: zodResolver(formSchema),
    //     defaultValues: {
    //         imageUrl: initialData?.imageUrl || ""
    //     }
    // })
    // const { isSubmitting, isValid } = form.formState
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
       try {
           await axios.patch(`/api/courses/${courseId}/attachments`, values);
           toast.success("Course updated");
           toggleEdit()
           router.refresh()
       } catch (error) {
        toast("Something went wrong")
       }
    }

    return (
      
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course attachments

                <Button variant="ghost" onClick={toggleEdit}>
                    {isEditing && (
                        <>Cancel</>
                    )}
                    {!isEditing && (
                        <>
                             <PlusCircle className="h-4 w-4 mr-2" />
                    Add an file
                        </>
                    )}
                   
                   
                </Button>
            </div>

            {!isEditing && (
            <>
           
                {
                    initialData.attachments.length === 0 && (
                        <p className="text-sm mt-2 text-slate-500 italic">
                            No attachments yet
                </p>
                        )}
                    </>
            )}
            {isEditing && (
                <div>
                    <FileUpload
                        endpoint="courseAttachement"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ url: url})
                            }
                        }}
                    />

                    <div className="text-xs text-muted-foreground mt-4">
                       Add anything your student might need to complete the course.
                    </div>

                    </div>
            )}
    </div>
  )
}

export default AttachmentForm