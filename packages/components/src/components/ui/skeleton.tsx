import { cn } from "../../lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("bm-animate-pulse bm-rounded-md bm-bg-primary/10", className)}
      {...props}
    />
  )
}

export { Skeleton }
