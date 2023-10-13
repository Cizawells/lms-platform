"use client";

import { Chapter } from "@prisma/client";
import { useEffect, useState } from "react";

interface ChaptersListProps {
    items: Chapter[];
    onReorder: (updateData: { id: string, position: number }[]) => void;
    onEdit: (id: string) => void;
}

const ChaptersList = ({
    items,
    onReorder,
    onEdit
}: ChaptersListProps) => {

    const [isMounted, setisMounted] = useState(false)
    const [chapters, setChapters] = useState(items)

    useEffect(() => {
        setisMounted(true);
    }, [])

    useEffect(() => {

    }, [])

    if (!isMounted) {
        return null
    }
  return (
    <div>ChaptersList</div>
  )
}

export default ChaptersList