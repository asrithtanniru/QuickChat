import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import Avatar from './Avatar';

export default function RoomLobby({ user, onCreateRoom, onJoinRoom }) {
  const [roomIdInput, setRoomIdInput] = useState('');

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const generateRoomId = () => {
    const adjectives = ['happy', 'sunny', 'blue', 'quick', 'brave', 'calm', 'bright'];
    const nouns = ['tiger', 'river', 'mountain', 'cloud', 'forest', 'ocean', 'star'];
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const num = Math.floor(Math.random() * 100);
    return `${adj}-${noun}-${num}`;
  };

  const handleCreateRoom = () => {
    const newRoomId = generateRoomId();
    onCreateRoom(newRoomId);
  };

  const handleJoinRoom = () => {
    if (roomIdInput.trim()) {
      onJoinRoom(roomIdInput);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-96 bg-base-100 shadow-2xl">
        <div className="card-body">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Avatar photoURL={user.photoURL} displayName={user.displayName} size="md" />
              <span className="font-semibold">{user.displayName}</span>
            </div>
            <button onClick={handleSignOut} className="btn btn-ghost btn-sm border-1 border-gray-300">
              Sign out
            </button>
          </div>

          <h2 className="card-title text-2xl justify-center mb-4">Join or Create Room</h2>

          <div className="space-y-4">
            <button
              onClick={handleCreateRoom}
              className="btn btn-primary w-full"
            >
              Create New Room
            </button>

            <div className="divider">OR</div>

            <div className="form-control gap-2 ">
              <input
                type="text"
                placeholder="Enter Room ID"
                value={roomIdInput}
                onChange={(e) => setRoomIdInput(e.target.value)}
                className="input input-bordered w-full mb-5"
              />
              <button
                onClick={handleJoinRoom}
                disabled={!roomIdInput.trim()}
                className="btn btn-secondary w-full"
              >
                Join Room
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
