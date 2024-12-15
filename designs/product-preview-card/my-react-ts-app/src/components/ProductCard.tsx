const ProductCard = () => {
  return (
    <div className="bg-neutral-cream flex items-center justify-center min-h-screen">
      <div className="bg-neutral-white max-w-sm rounded-lg shadow-lg p-4">
        <img
          src="/src/assets/image-product-mobile.jpg"
          alt="Perfume"
          className="rounded-t-lg"
        />
        <div className="p-4">
          <h2 className="text-neutral-dark-grayish-blue text-sm tracking-wide">
            PERFUME
          </h2>
          <h1 className="text-neutral-very-dark-blue font-fraunces text-2xl font-bold mt-2">
            Gabrielle Essence Eau De Parfum
          </h1>
          <p className="text-neutral-dark-grayish-blue text-sm mt-2">
            A floral, solar and voluptuous interpretation composed by Olivier
            Polge, Perfumer-Creator for the House of CHANEL.
          </p>
          <div className="flex items-center justify-between mt-4">
            <span className="text-primary-cyan text-3xl font-bold">
              $149.99
            </span>
            <span className="text-neutral-dark-grayish-blue line-through">
              $169.99
            </span>
          </div>
          <button className="bg-primary-cyan text-white w-full py-2 mt-4 rounded-lg flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h18M3 9h18M9 15h6m-3 6v-6m-3 0v6m3-18v6m3 0v6m-3-6h3"
              />
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
