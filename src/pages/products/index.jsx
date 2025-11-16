import CircularProgress from "@mui/material/CircularProgress";
import { useGetProductsQuery } from "../../lib/api/productsApi";
import { useNavigate } from "react-router-dom";

const products = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, isLoading } = useGetProductsQuery();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <CircularProgress />
      </div>
    );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Products List</h1>
      <ul className="space-y-4 p-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-6">
        {data.map((product) => (
          <div
            key={product._id}
            className="flex flex-col items-center h-[35rem] !m-0"
          >
            <a
              href={`/products/${product._id + "-" + product.slug}`}
              className="hover:scale-105 transition-transform duration-200 ease-in-out"
            >
              <img
                src={product.productImage}
                alt={product.name}
                className="mb-2 rounded-xl max-w-[20rem] max-h-[30rem] object-fit min-w-[15rem] min-h-[24rem]"
              />
            </a>
            <br />
            <li
              key={product._id}
              onClick={() => {
                navigate(`/products/${product._id + "-" + product.slug}`);
              }}
              className="p-4 border border-gray-300 rounded-md hover:shadow-lg transition-shadow duration-200 w-[20rem] h-[8rem] flex flex-col justify-between cursor-pointer"
            >
              <div>
                <a
                  href={`/products/${product._id + "-" + product.slug}`}
                  className="text-lg font-semibold text-blue-600"
                >
                  {product.name}
                </a>
                <p className="text-gray-600">{product.description}</p>
              </div>
              <div></div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default products;
