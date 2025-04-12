import type React from "react"
import "../../styles/spinner.scss"

type SpinnerProps = React.HTMLAttributes<HTMLDivElement>

export function Spinner({ className, ...props }: SpinnerProps) {
  return <div className={`spinner ${className || ""}`} {...props} />
}
