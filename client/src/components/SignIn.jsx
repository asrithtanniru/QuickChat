import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function SignIn() {
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-96 bg-base-100 shadow-2xl">
        <div className="card-body text-center">
          <h1 className="card-title text-4xl font-bold justify-center mb-2">QuickChat</h1>
          <p className="text-base-content/70 mb-4">Sign in to start chatting with anyone!</p>
          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline gap-2"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
