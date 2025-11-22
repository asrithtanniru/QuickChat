import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import SignIn from './components/SignIn';
import RoomLobby from './components/RoomLobby';
import ChatRoom from './components/ChatRoom';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [roomId, setRoomId] = useState('');
  const [inRoom, setInRoom] = useState(false);

  // listening for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleCreateRoom = (newRoomId) => {
    setRoomId(newRoomId);
    setInRoom(true);
  };

  const handleJoinRoom = (roomIdToJoin) => {
    setRoomId(roomIdToJoin);
    setInRoom(true);
  };

  const handleLeaveRoom = () => {
    setInRoom(false);
    setRoomId('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  // Not signed in
  if (!user) {
    return <SignIn />;
  }

  // Signed in but not in a room
  if (!inRoom) {
    return (
      <RoomLobby 
        user={user} 
        onCreateRoom={handleCreateRoom} 
        onJoinRoom={handleJoinRoom} 
      />
    );
  }

  // In a chat room
  return (
    <ChatRoom 
      user={user} 
      roomId={roomId} 
      onLeaveRoom={handleLeaveRoom} 
    />
  );
}
