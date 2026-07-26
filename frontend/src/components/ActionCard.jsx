export default function ActionCard({
  title,
  color,
  icon,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`${color}
      text-white
      rounded-3xl
      p-8
      cursor-pointer
      shadow-lg
      transition-all
      duration-300
      hover:-translate-y-2
      hover:shadow-2xl`}
    >
      <div className="text-5xl mb-6">
        {icon}
      </div>

      <h2 className="text-2xl font-semibold">
        {title}
      </h2>
    </div>
  );
}