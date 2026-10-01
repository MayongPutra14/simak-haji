import CreateEvent from '../../../components/admin/events/CreateEvent';

export default function CreateEventFragment({ onSubmit }) {
  return (
    <>

      <CreateEvent onSubmit={onSubmit} />
    </>
  );
}
