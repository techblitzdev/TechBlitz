import { CopyIcon } from 'lucide-react'

export default function CopyCode() {
  return (
    <div
      className="relative flex items-center cursor-pointer"
      title="Copy code"
    >
      <CopyIcon size={16} className="text-white" />
    </div>
  )
}
