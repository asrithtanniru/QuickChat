import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { auth } from './config/firebase';
import SignIn from './components/SignIn';
import RoomLobby from './components/RoomLobby';
import ChatRoom from './components/ChatRoom';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  // listening for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (!currentUser) {
        navigate('/signin', { replace: true });
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleCreateRoom = (newRoomId) => {
    setRoomId(newRoomId);
    navigate('/chat');
  };

  const handleJoinRoom = (roomIdToJoin) => {
    setRoomId(roomIdToJoin);
    navigate('/chat');
  };

  const handleLeaveRoom = () => {
    setRoomId('');
    navigate('/join');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/signin"
        element={
          !user ? <SignIn /> : <Navigate to="/join" replace />
        }
      />
      <Route
        path="/join"
        element={
          user ? (
            <RoomLobby
              user={user}
              onCreateRoom={handleCreateRoom}
              onJoinRoom={handleJoinRoom}
            />
          ) : (
            <Navigate to="/signin" replace />
          )
        }
      />
      <Route
        path="/chat"
        element={
          user && roomId ? (
            <ChatRoom
              user={user}
              roomId={roomId}
              onLeaveRoom={handleLeaveRoom}
            />
          ) : (
            <Navigate to={user ? "/join" : "/signin"} replace />
          )
        }
      />
      <Route path="*" element={<Navigate to={user ? "/join" : "/signin"} replace />} />
    </Routes>
  );
}
