import { useState, useEffect, useRef } from 'react';
import { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import Avatar from './Avatar';

export default function ChatRoom({ user, roomId, onLeaveRoom }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [toast, setToast] = useState(null);
  const messagesEndRef = useRef(null);

  // Listen for messages in the current room
  useEffect(() => {
    if (!roomId) return;

    const q = query(
      collection(db, 'messages'),
      where('roomId', '==', roomId),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = [];
      snapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() });
      });
      setMessages(msgs);
    }, (error) => {
      console.error('Error listening to messages:', error);
      if (error.code === 'failed-precondition') {
        console.error('Firestore index required. Check the error message for the link to create it.');
      }
    });

    return () => unsubscribe();
  }, [roomId]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await addDoc(collection(db, 'messages'), {
        text: newMessage,
        roomId: roomId,
        userId: user.uid,
        userName: user.displayName,
        userPhoto: user.photoURL,
        timestamp: serverTimestamp()
      });
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    setToast({ type: 'success', message: 'Room ID copied!' });
    setTimeout(() => setToast(null), 2000);
  };

  const handleLeaveRoom = () => {
    setToast({ type: 'info', message: 'Leaving the room...' });
    setTimeout(() => {
      setToast(null);
      onLeaveRoom();
    }, 1200);
  };

  return (
    <div className="h-screen bg-base-200 flex flex-col">
      <div className="navbar bg-base-100 shadow-md">
        <div className="flex-1 flex items-center gap-3">
          <Avatar photoURL={user.photoURL} displayName={user.displayName} size="md" />
          <div className="font-semibold">{user.displayName}</div>
        </div>
        <div className="flex-none flex items-center gap-3">
          <div className="badge badge-ghost badge-sm">Room: {roomId}</div>
          <button
            onClick={copyRoomId}
            className="btn btn-success btn-sm border border-black"
          >
            Copy ID
          </button>
          <button
            onClick={handleLeaveRoom}
            className="btn btn-error btn-sm border border-black"
          >
            Leave
          </button>
        </div>
      </div>

      {/* Toast notification */}
      {toast && (
        <div className="toast toast-end toast-middle z-50">
          <div className={`alert ${toast.type === 'success' ? 'alert-success' : toast.type === 'info' ? 'alert-info' : ''} text-white`}>
            <span>{toast.message}</span>
          </div>
        </div>
      )}
      {/* body(messages) */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="hero min-h-full">
            <div className="hero-content text-center">
              <div className="max-w-md">
                <h1 className="text-2xl font-bold">No messages yet!</h1>
                <p className="py-4">Share the room ID with your friend to start chatting.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat ${msg.userId === user.uid ? 'chat-end' : 'chat-start'}`}>
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    {msg.userPhoto ? (
                      <img 
                        src={msg.userPhoto} 
                        alt={msg.userName}
                        referrerPolicy="no-referrer"
                        crossOrigin="anonymous"
                        onError={(e) => {
                          const fallback = document.createElement('div');
                          fallback.className = 'w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold';
                          fallback.textContent = msg.userName?.[0]?.toUpperCase();
                          e.target.parentElement.replaceChild(fallback, e.target);
                        }}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold">
                        {msg.userName?.[0]?.toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>
                <div className="chat-header opacity-50 mb-1">
                  {msg.userName}
                </div>
                <div className={`chat-bubble ${msg.userId === user.uid ? 'chat-bubble-primary' : ''}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <form onSubmit={sendMessage} className="bg-base-100 p-4 border-t border-base-300">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="input input-bordered flex-1"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="btn btn-primary"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
