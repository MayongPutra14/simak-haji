export default function NotFoundData({ message }) {
  return (
    <div className="mx-auto  bg-slate-50 w-full py-10 md:max-w-md rounded-2xl shadow-md">
      <p className="text-center text-slate-500 ">{message}</p>
    </div>
  );
}
