"use client"

import { ComfirmModal } from "@/components/modals/comfirm-modal";
import { Button } from "@/components/ui/button";
import { useConfetti } from "@/hooks/use-confetti-store";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ActionsProps {
    disabled: boolean;
    courseId: string;
    isPublished: boolean;
}

const Actions = ({
    disabled,
    courseId,
    isPublished
}: ActionsProps) => {
  const router = useRouter();
  const confetti = useConfetti()
  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast.success("Course Unpublished");
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`)
        toast.success("Course Published");
        confetti.onOpen()
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
      await axios.delete(`/api/courses/${courseId}`);

      toast.success("Course deleted");
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

export default Actions