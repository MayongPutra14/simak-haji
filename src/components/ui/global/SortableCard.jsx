import { useSortable } from '@dnd-kit/react/sortable';
import { TbGripVertical as IconGripVertical } from 'react-icons/tb';
export function SortableCard({ id, index, children, className }) {
  // initialize sortable hook from new dnd-kit react package
  const { ref, handleProps, isDragging } = useSortable({
    id,
    index,
  });

  return (
    <div
      ref={ref}
      className={`relative transition-opacity ${isDragging ? 'opacity-50 z-50' : 'opacity-100'} ${className}`}
    >
      {/* drag handle icon */}
      <button
        type="button"
        {...handleProps}
        className="absolute top-4 right-4 p-2 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 z-10 touch-none"
        title="drag to reorder"
      >
        {/* grip icon svg */}
        <IconGripVertical className="w-6 h-6" />
      </button>

      {/* card inner content */}
      {children}
    </div>
  );
}
