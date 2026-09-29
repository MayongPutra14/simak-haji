import {
  MdOutlineDeleteOutline as IconDelete,
  MdOutlineRemoveRedEye as IconView,
} from 'react-icons/md';
import { FaRegEdit as IconEdit } from 'react-icons/fa';
import ButtonsActionTable from '../../components/ui/global/ButtonsActionTable';
import { formatDateIndonesia } from '../../utils/helpers/dateConversion';

export const ListAdminEventColumns = ({ onDelete, onViewDetail, onEdit }) => [
  {
    key: 'eventName',
    header: 'Nama Event',
    isSticky: true,
    render: (event) => (
      <div className="flex items-center gap-3 min-w-32">
        <span className="font-medium text-slate-900">{event.eventName}</span>
      </div>
    ),
  },
  {
    key: 'venue',
    header: 'Lokasi / Tempat',
    className: 'text-slate-600 whitespace-nowrap',
    render: (event) => event.venue || '-',
  },
  {
    key: 'speaker',
    header: 'Pembicara',
    className: 'text-slate-600 whitespace-nowrap',
    render: (event) => event.speaker || '-',
  },
  {
    key: 'date',
    header: 'Tanggal',
    className: 'text-slate-600 whitespace-nowrap',
    render: (event) => formatDateIndonesia(event.eventTime) || '-',
  },
  {
    key: 'eventType',
    header: 'Jenis Event',
    className: 'whitespace-nowrap',
    render: (event) =>
      event.eventType === 'umum' ? (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Umum
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200/60">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          Khusus
        </span>
      ),
  },
  {
    key: 'actions',
    header: 'Aksi',
    align: 'center',
    className: 'whitespace-nowrap',
    render: (event) => (
      <div className="flex items-center justify-center gap-1">
        <ButtonsActionTable
          variant="default"
          title="Lihat detail"
          onClick={() => onViewDetail(event)}
          icon={<IconView className="w-5 h-5" />}
        />

        <ButtonsActionTable
          variant="teal"
          title="Edit data"
          onClick={() => onEdit(event)}
          icon={<IconEdit className="w-4 h-4" />}
        />

        <ButtonsActionTable
          variant="rose"
          title="Delete data"
          onClick={() => onDelete(event)}
          icon={<IconDelete className="w-5 h-5" />}
        />
      </div>
    ),
  },
];
