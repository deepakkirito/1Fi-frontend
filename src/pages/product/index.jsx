import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../../lib/api/productsApi";
import CircularProgress from "@mui/material/CircularProgress";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import { useEffect, useState } from "react";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";

const product = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { id } = useParams();

  const productId = id.split("-")[0];

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, isLoading } = useGetProductQuery(productId);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedVariant, setSelectedVariant] = useState(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedPlan, setSelectedPlan] = useState(null);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [buyNow, setBuyNow] = useState(false);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [orderplaced, setOrderPlaced] = useState(false);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (data) {
      setSelectedVariant(data.variants[0]);
    }
  }, [data]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (buyNow) {
      const timer = setTimeout(() => {
        setBuyNow(false);
        setOrderPlaced(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [buyNow]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (orderplaced) {
      const timer = setTimeout(() => {
        setOrderPlaced(false);
        setBuyNow(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [orderplaced]);

  if (isLoading || selectedVariant === null)
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <CircularProgress />
      </div>
    );

  return (
    <div className="p-8 pt-0">
      <div>
        <a
          href="/products"
          className="flex items-center gap-1 text-black hover:underline p-4"
        >
          <ReplyOutlinedIcon />
          Back to Products
        </a>
      </div>
      <div className="p-8 pt-0">
        <h1 className="text-3xl font-bold mb-0">{data.name}</h1>
        <p className="text-green-600 mb-4">{data.brand}</p>
        <div className="flex flex-col lg:flex-row gap-8">
          <img
            src={selectedVariant?.image || data.productImage}
            alt={data.name}
            className="rounded-xl max-w-[45rem] max-h-[45rem] object-fit"
          />
          <div className="flex flex-col ">
            <h2 className="text-2xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700 mb-4">{data.description}</p>
            <h2 className="text-2xl font-semibold mb-2">Variants</h2>
            <ul className="list-none list-inside mb-4 flex flex-wrap gap-4">
              {data.variants.map((variant, index) => (
                <li
                  key={index}
                  className={`text-gray-700 active:!ring-2 border border-gray-300 rounded-md p-4 ${
                    selectedVariant.image === variant.image
                      ? "!ring-2 ring-blue-500"
                      : ""
                  } cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out`}
                  onClick={() => setSelectedVariant(variant)}
                  style={{
                    background:
                      "linear-gradient(to right, #f0f4f8, #fff, #f0f4f8)",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div>
                    <img
                      src={variant.image}
                      alt={`${data.name} - ${variant.color} - ${variant.storage}`}
                      className="rounded-lg max-w-[15rem] max-h-[20rem] object-fit mb-2"
                    />
                    <div className="flex justify-between">
                      <p>{variant.color}</p>
                      <p>{variant.storage}</p>
                    </div>
                    <p>₹{variant.price}</p>
                  </div>
                </li>
              ))}
            </ul>
            <h2 className="text-2xl font-semibold mb-2">EMI Plans</h2>
            <ul className="list-none list-inside mb-4 flex flex-wrap gap-4">
              {data.emiPlans.map((plans, index) => (
                <li
                  key={index}
                  className={`text-gray-700 active:!ring-2 border border-gray-300 rounded-md p-4 ${
                    selectedPlan === plans ? "!ring-2 ring-blue-500" : ""
                  } cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out`}
                  onClick={() => setSelectedPlan(plans)}
                  style={{
                    background:
                      "linear-gradient(to right, #f0f4f8, #fff, #f0f4f8)",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div>
                    <p>
                      ₹{plans.monthly} for {plans.tenure} months
                    </p>
                    <p className="text-gray-500 text-sm">
                      Interest Rate: {plans.interestRate}%
                    </p>
                    {plans.cashback ? (
                      <p className="text-green-500 text-sm">
                        Cashback: ₹{plans.cashback}
                      </p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-auto">
              {!orderplaced && (
                <button
                  className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center hover:scale-105"
                  disabled={buyNow}
                  onClick={() => setBuyNow(true)}
                >
                  <p>
                    {selectedPlan
                      ? `Buy Now for ₹${selectedPlan.monthly} x ${selectedPlan.tenure} months`
                      : "Buy Now for ₹" + selectedVariant.price}
                  </p>
                  {buyNow ? (
                    <CircularProgress
                      size={20}
                      color="inherit"
                      sx={{ marginLeft: "8px" }}
                    />
                  ) : (
                    <ArrowCircleRightRoundedIcon
                      style={{ marginLeft: "8px" }}
                    />
                  )}
                </button>
              )}
              {orderplaced && (
                <div className="w-full bg-green-100 text-green-800 py-3 rounded-md flex items-center justify-center">
                  <p className="font-medium">
                    Order Placed Successfully! Thank you for your purchase.
                  </p>
                </div>
              )}
              <p className="text-gray-600 mt-2">
                * This is a mock purchase button. No actual transaction will
                occur.
              </p>
            </div>
            <p className="text-gray-500 text-sm mt-4">Product ID: {data._id}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default product;
