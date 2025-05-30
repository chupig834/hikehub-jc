export default function DefaultProfileIcon({ name, size }) {
  return (
    <div className={`inline-block w-[${size}px] h-[${size}px] bg-slate-400 flex items-center justify-center text-white text-[${size}px] font-bold uppercase`}>
      {name.charAt(0)}
    </div>
  )
}