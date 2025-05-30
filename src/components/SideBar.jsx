import { useState, useEffect } from 'react';
import {
  MdClose,
  MdMenu,
  MdOutlineCoffee,
  MdOutlineVpnKey,
  MdDelete,
} from 'react-icons/md';
import { AiOutlineGithub } from 'react-icons/ai';
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
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  function handleResize() {
    // Prevent sidebar from closing while editing
    if (editingId !== null) return;
    window.innerWidth <= 720 ? setOpen(false) : setOpen(true);
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [editingId]);

  // Overlay for closing sidebar on outside click
  const showOverlay = open && editingId === null && window.innerWidth <= 720;

  return (
    <>
      {showOverlay && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-30"
          onClick={() => setOpen(false)}
        />
      )}
      <section
        className={`fixed bg-neutral md:static md:w-[25svw] w-[60svw] z-50 flex flex-col items-center gap-y-4 h-screen p-2 justify-between shadow-md transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header section */}
        <div className="flex relative top-1 items-center justify-between w-full px-2 mx-auto">
          {/* Logo and title */}
          <div
            className={`${
              !open && 'scale-0 hidden'
            } flex flex-row items-center gap-2 mx-auto w-full`}
          >
            <img src={bot} alt="logo" className="w-6 h-6" />
            <h1 className={`${!open && 'scale-0 hidden'}`}>چت بات</h1>
          </div>

          <div
            className={`mx-auto btn md:hidden  btn-square btn-ghost ${
              editingId !== null ? 'pointer-events-none opacity-50' : ''
            }`}
            onClick={() => {
              if (editingId === null) setOpen(!open);
            }}
            title={editingId !== null ? 'در حال ویرایش عنوان' : ''}
          >
            {open ? <MdClose size={15} /> : <MdMenu size={15} />}
          </div>
        </div>

        {/* List of conversations */}
        <ul
          className={`${
            open ? 'w-full' : 'hidden'
          } flex flex-col gap-4 menu rounded-box`}
        >
          {/* Button to add a new conversation */}
          <li>
            <a className="btn btn-primary w-full mb-2" onClick={addConversation}>
              + چت جدید
            </a>
          </li>

          {/* Render each conversation */}
          {conversations.map((conv) => (
            <li key={conv.id}>
              {editingId === conv.id ? (
                // Form for renaming a conversation
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    renameConversation(conv.id, editTitle || conv.title); // Rename the conversation
                    setEditingId(null); // Exit editing mode
                  }}
                >
                  <input
                    className="input input-bordered w-full"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)} // Update the title
                    autoFocus
                    onBlur={() => setEditingId(null)} // Exit editing mode on blur
                  />
                </form>
              ) : (
                // Display the conversation title
                <div
                  className={`flex items-center justify-between px-2 py-1 rounded cursor-pointer ${
                    conv.id === currentConvId
                      ? 'bg-primary text-primary-content' // Highlight the selected conversation
                      : ''
                  }`}
                  onClick={() => {
                    setCurrentConvId(conv.id); // Set the current conversation
                  }}
                >
                  <span className="truncate">{conv.title}</span>
                  <div className="flex items-center gap-1">
                    {/* Button to edit the conversation */}
                    <button
                      className="btn btn-xs btn-ghost"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the parent click
                        setEditingId(conv.id); // Enter editing mode
                        setEditTitle(conv.title); // Set the current title
                      }}
                      title="تغییر نام"
                      disabled={editingId !== null} // Disable while editing
                    >
                      ✏️
                    </button>

                    {/* Button to delete the conversation */}
                    <button
                      className="btn btn-xs btn-ghost"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the parent click
                        deleteConversation(conv.id); // Delete the conversation
                      }}
                      title="حذف"
                      disabled={editingId !== null} // Disable while editing
                    >
                      <MdDelete size={15} />
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Footer section */}
        <ul className="w-full gap-1 menu rounded-box">
          {/* Theme toggle button */}
          <li>
            <ToggleTheme open={open} />
          </li>

          {/* Support link */}
          <li>
            <a
              href="https://mahdiar-vaez.vercel.app/"
              rel="noreferrer"
              target="_blank"
            >
              <MdOutlineCoffee size={15} />
              <p>حمایت از پروژه</p>
            </a>
          </li>

          {/* GitHub link */}
          <li>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://github.com/Mahdiar-Vaez/chat-bot"
            >
              <AiOutlineGithub size={15} />
              <p>گیت‌هاب</p>
            </a>
          </li>
        </ul>
      </section>

      {/* Floating button to open the sidebar when closed */}
     
        <MdMenu
          className={`${!open?"fixed":"hidden"} md:hidden text-gray-400 hover:bg-gray-500 cursor-pointer transition-all duration-300 left-0 top-0 z-50`} 
          onClick={() => setOpen(!open)} // Open the sidebar
          size={32}
        />
      
    </>
  );
};

export default SideBar;