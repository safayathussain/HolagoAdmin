export default function OrderButton({ title }) {
  return (
    <button className="bg-gray-100 text-gray-500 px-3 py-2 text-md rounded-md hover:bg-black hover:text-white duration-700 shadow-md">
      {title}
    </button>
  );
}
