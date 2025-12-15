const AuthImagePattern = ({ title, subtitle }) => {
  // Create staggered animation delays for each box
  const getAnimationDelay = (index) => {
    return `${index * 0.2}s`;
  };

  // Create staggered animation delays for float effect
  const getFloatDelay = (index) => {
    return `${index * 0.15}s`;
  };

  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-sm text-center">
        <div className="grid grid-cols-3 gap-2.5 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
            key={i}
            className="
              aspect-square
              rounded-2xl
              bg-blue-900/40
              border border-blue-400/30
              backdrop-blur-md
              shadow-lg
              transition-all duration-300
              hover:bg-blue-800/50
              hover:border-blue-400/50
              hover:scale-105
              hover:shadow-xl
              cursor-pointer
            "
            style={{
              animation: `pulse-glow 3s ease-in-out infinite, float 4s ease-in-out infinite`,
              animationDelay: `${getAnimationDelay(i)}, ${getFloatDelay(i)}`,
            }}
          />
          
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;