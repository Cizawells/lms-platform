"use client"

import { ComfirmModal } from "@/components/modals/comfirm-modal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ChapterActionsProps {
    disabled: boolean;
    courseId: string;
    chapterId: string;
    isPublished: boolean;
}

const ChapterActions = ({
    disabled,
    courseId,
    chapterId,
    isPublished
}: ChapterActionsProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/unpublish`);
        toast.success("Chapter Unpublished");
      } else {
        await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/publish`)
        toast.success("Chapter Published");
      }

      router.refresh()
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }
  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);

      toast.success("Chapter deleted");
      router.refresh();
      router.push(`/teacher/courses/${courseId}`)
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }
  return (
      <div className="flex items-center gap-x-2">
          <Button
              onClick={onClick}
              disabled={disabled}
              variant="outline"
            size="sm">
              {isPublished ? "Unpublsh" : "Publish"}
          </Button>
      <ComfirmModal onComfirm={onDelete}>

          <Button size="sm" disabled={isLoading}>
              <Trash />
          </Button>
      </ComfirmModal>
    </div>
  )
}

export default ChapterActions