import { MdComputer } from 'react-icons/md';

const Thinking = () => {
  return (
    <div className='flex items-end mt-4'>
      <div className='avatar'>
        <div className=' border rounded-full'>
          <MdComputer className='md:w-6 w-3 h-full m-auto' />
        </div>
      </div>
      <div className='chat chat-start '>
        <div className='chat-bubble animate-pulse'>در حال فکر کردن...</div>
      </div>
    </div>
  );
};

export default Thinking;
