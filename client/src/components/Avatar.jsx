export default function Avatar({ photoURL, displayName, size = 'md' }) {
  const sizeClass = size === 'sm' ? 'w-8' : size === 'lg' ? 'w-12' : 'w-10';

  return (
    <div className={`avatar ${!photoURL ? 'placeholder' : ''}`}>
      <div className={`${sizeClass} rounded-full ${!photoURL ? 'bg-primary text-primary-content' : ''}`}>
        {photoURL ? (
          <img 
            src={photoURL} 
            alt={displayName}
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.classList.add('bg-primary', 'text-primary-content');
              e.target.parentElement.innerHTML = `<span>${displayName?.[0]?.toUpperCase()}</span>`;
            }}
          />
        ) : (
          <span>{displayName?.[0]?.toUpperCase()}</span>
        )}
      </div>
    </div>
  );
}
