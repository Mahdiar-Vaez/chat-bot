import { useState, useEffect } from 'react';
import {
  MdClose,
  MdMenu,
  MdOutlineCoffee,
  MdOutlineVpnKey,
  MdDelete,
} from 'react-icons/md';
import { AiOutlineGithub } from 'react-icons/ai';
import { ChatContext } from '../context/chatContext';
import bot from '../assets/logo.svg';
import ToggleTheme from './ToggleTheme';

const SideBar = ({
  conversations = [],
  currentConvId,
  setCurrentConvId,
  addConversation,
  renameConversation,
  deleteConversation,
}) => {
  const [open, setOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  function handleResize() {
    window.innerWidth <= 720 ? setOpen(false) : setOpen(true);
  }

  useEffect(() => {
    window.addEventListener('resize',handleResize)
    return ()=>{
      window.removeEventListener('resize',handleResize)
    }
  }, []);
  

  return (
    <>
      {open ? (
        <section
          className={`${
            open ? 'fixed' : 'relative '
          } bg-neutral md:static md:w-[25svw] w-[60svw]  z-50 flex transition-transform flex-col items-center gap-y-4 h-screen p-2 justify-between duration-100 shadow-md`}>
          <div className='flex relative top-1 items-center justify-between w-full px-2 mx-auto'>
            <div
              className={` ${
                !open && 'scale-0 hidden'
              } flex flex-row items-center gap-2 mx-auto w-full`}>
              <img src={bot} alt='logo' className='w-6 h-6' />
              <h1 className={` ${!open && 'scale-0 hidden'}`}>چت بات </h1>
            </div>
            <div
              className='mx-auto btn btn-square btn-ghost'
              onClick={() => setOpen(!open)}>
              {open ? <MdClose size={15} /> : <MdMenu size={15} />}
            </div>
          </div>

          {/* لیست چت‌ها */}
          <ul className={`${open ? 'w-full' : 'hidden'} flex flex-col gap-4 menu rounded-box`}>
            <li>
              <a className='btn btn-primary w-full mb-2' onClick={addConversation}>
                + چت جدید
              </a>
            </li>
            {conversations.map((conv) => (
              <li key={conv.id}>
                {editingId === conv.id ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      renameConversation(conv.id, editTitle || conv.title);
                      setEditingId(null);
                    }}>
                    <input
                      className='input input-bordered w-full'
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      autoFocus
                      onBlur={() => setEditingId(null)}
                    />
                  </form>
                ) : (
                  <div
                    className={`flex items-center justify-between px-2 py-1 rounded cursor-pointer ${
                      conv.id === currentConvId ? 'bg-primary text-primary-content' : ''
                    }`}
                    onClick={() => {
                      setCurrentConvId(conv.id);
                    }}>
                    <span className='truncate'>{conv.title}</span>
                    <div className='flex items-center gap-1'>
                      <button
                        className='btn btn-xs btn-ghost'
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingId(conv.id);
                          setEditTitle(conv.title);
                        }}
                        title='تغییر نام'>
                        ✏️
                      </button>
                      <button
                        className='btn btn-xs btn-ghost'
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteConversation(conv.id);
                        }}
                        title='حذف'>
                        <MdDelete size={15} />
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* دکمه‌های قبلی سایدبار بدون تغییر */}
          <ul className=' w-full gap-1 menu rounded-box'>
            <li>
              <ToggleTheme open={open} />
            </li>
            <li>
              <a
                href='https://www.buymeacoffee.com/eyuel'
                rel='noreferrer'
                target='_blank'>
                <MdOutlineCoffee size={15} />
                <p>حمایت از پروژه</p>
              </a>
            </li>
            <li>
              <a
                rel='noreferrer'
                target='_blank'
                href='https://github.com/EyuCoder/chatgpt-clone'>
                <AiOutlineGithub size={15} />
                <p>گیت‌هاب</p>
              </a>
            </li>
       
          </ul>
        </section>
      ) : (
        <MdMenu
          className='fixed bg-gray-700 text-gray-500 hover:bg-gray-600 cursor-pointer transition-all duration-300 rounded-lg left-1 top-1 z-50'
          onClick={() => setOpen(!open)}
          size={32}
        />
      )}
    </>
  );
};

export default SideBar;