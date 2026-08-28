import { MdOutlineSearch as IconSearch } from 'react-icons/md';

const SeacrhInput = ({ placeHolder, searchQuery, onChange }) => {
  return (
    <div className="relative flex-1">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
        <IconSearch className="w-5 h-5" />
      </div>
      <input
        type="text"
        placeholder={placeHolder}
        value={searchQuery}
        onChange={onChange}
        className="w-full pl-10 py-2.5 px-4 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sea-green-600 focus:ring-1 focus:ring-teal-600 transition-colors"
      />
    </div>
  );
};

export default SeacrhInput;
