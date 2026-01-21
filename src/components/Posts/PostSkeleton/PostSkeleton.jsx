import { Card, Skeleton } from "@heroui/react";

export default function PostSkeleton() {
  return (
    <Card
      className="space-y-5 p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
      radius="lg"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <Skeleton className="flex rounded-full w-12 h-12 dark:bg-gray-700" />
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-4 w-2/5 rounded-lg dark:bg-gray-700" />
          <Skeleton className="h-3 w-3/5 rounded-lg dark:bg-gray-700" />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <Skeleton className="h-3 w-full rounded-lg dark:bg-gray-700" />
        <Skeleton className="h-3 w-4/5 rounded-lg dark:bg-gray-700" />
      </div>

      {/* Image */}
      <Skeleton className="rounded-2xl dark:bg-gray-700">
        <div className="h-64 rounded-2xl bg-default-300 dark:bg-gray-700" />
      </Skeleton>

      {/* Actions */}
      <div className="flex gap-4">
        <Skeleton className="h-10 w-20 rounded-lg dark:bg-gray-700" />
        <Skeleton className="h-10 w-20 rounded-lg dark:bg-gray-700" />
        <Skeleton className="h-10 w-20 rounded-lg dark:bg-gray-700" />
      </div>
    </Card>
  );
}