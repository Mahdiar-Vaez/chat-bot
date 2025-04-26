import SideBar from './components/SideBar';
import ChatView from './components/ChatView';
import { useEffect, useState } from 'react';
import Modal from './components/Modal';
import Setting from './components/Setting';
import { ChatContextProvider } from './context/chatContext';

const LS_KEY = 'gpt_chats';

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);

  // conversations: [{id, title, messages: []}]
  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem(LS_KEY);
    return saved
      ? JSON.parse(saved)
      : [{ id: 1, title: 'New Chat', messages: [] }];
  });
  const [currentConvId, setCurrentConvId] = useState(
    conversations[0]?.id || 1
  );

  // ذخیره در localStorage
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(conversations));
  }, [conversations]);

  // افزودن چت جدید
  const addConversation = () => {
    const newId = Date.now();
    setConversations([
      ...conversations,
      { id: newId, title: `Chat ${conversations.length + 1}`, messages: [] }
    ]);
    setCurrentConvId(newId);
  };

  // تغییر عنوان چت
  const renameConversation = (id, newTitle) => {
    setConversations(convs =>
      convs.map(c => (c.id === id ? { ...c, title: newTitle } : c))
    );
  };

  // حذف یک چت
  const deleteConversation = (id) => {
    let newConvs = conversations.filter(c => c.id !== id);
    if (newConvs.length === 0) {
      newConvs = [{ id: Date.now(), title: 'New Chat', messages: [] }];
    }
    setConversations(newConvs);
    setCurrentConvId(newConvs[0].id);
  };

  return (
    <>
      <ChatContextProvider>
        <Modal title='Setting' modalOpen={modalOpen} setModalOpen={setModalOpen}>
          <Setting modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </Modal>
        <div className='flex transition duration-500 ease-in-out'>
          <SideBar
            conversations={conversations}
            currentConvId={currentConvId}
            setCurrentConvId={setCurrentConvId}
            addConversation={addConversation}
            renameConversation={renameConversation}
            deleteConversation={deleteConversation}
          />
          <ChatView
            conversations={conversations}
            setConversations={setConversations}
            currentConvId={currentConvId}
          />
        </div>
      </ChatContextProvider>
    </>
  );
};

export default App;