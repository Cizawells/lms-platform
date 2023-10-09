"use client"
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";



interface TitleFormProps {
    initialData: {
        title: string;
    };
    courseId: string
}

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required",
    })
})

const TitleForm = ({
    initialData,
    courseId
}: TitleFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    })
    const { isSubmitting, isValid } = form.formState
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
    }

    return (
      
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course title

                <Button variant="ghost">
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit title
                </Button>
            </div>
    </div>
  )
}

export default TitleForm