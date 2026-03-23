const Card = () => {
  return (
    <div className="max-w-sm rounded-xl shadow-lg bg-white p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        Tailwind Card
      </h2>

      <p className="text-gray-600 mb-4">
        This is a simple card component styled using Tailwind CSS utility classes.
      </p>

      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
        Learn More
      </button>
    </div>
  );
};

export default Card;
