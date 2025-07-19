"use client";

import { useAtom } from "jotai";

import {
  selectedCustomersAtom,
  products,
  customers,
  usersInfoAtom,
} from "@/store/ecommerce";
import {
  useAddToCard,
  useGetUserInfo,
  useGetUserPurchases,
  useRemoveFromCard,
  useReduceItemFromCard,
  useSubmitPurchase,
  useGetSuggestions,
} from "@/api/ecommerce";

const Ecommerce = () => {
  const [selectedCustomer, setSelectedCustomer] = useAtom(
    selectedCustomersAtom
  );
  const { data: userPurchases } = useGetUserPurchases(selectedCustomer!);
  const { data: userInfo } = useGetUserInfo(selectedCustomer);
  const { data: suggestions } = useGetSuggestions(selectedCustomer!);
  const { mutate: addToCard } = useAddToCard();
  const { mutate: removeFromCard } = useRemoveFromCard();
  const { mutate: reduceItemFromCard } = useReduceItemFromCard();
  const { mutate: submitPurchase } = useSubmitPurchase();

  return (
    <section className="flex flex-col gap-4">
      <section className="flex flex-wrap">
        <h4 className="w-full">users:</h4>
        <div className="w-1/2 flex flex-col gap-2">
          {customers.map((customer) => {
            return (
              <p
                className={`border ${
                  selectedCustomer === customer.id ? "bg-blue-500" : ""
                }`}
                onClick={() => {
                  setSelectedCustomer(customer.id);
                }}
                key={customer.id}
              >
                {customer.name}
              </p>
            );
          })}
        </div>
        <h4 className="w-full">user card:</h4>
        <div className="w-1/2 flex flex-col gap-2">
          {userInfo?.activeCard.map((item) => {
            return (
              <p key={item + Math.random()}>
                {products.find((product) => product.id === item)?.name}
              </p>
            );
          })}
        </div>
      </section>
      <section>
        <h4 className="mt-6">products:</h4>
        <div>
          {products.map((product) => {
            return (
              <div className="border" key={product.id}>
                {product.name}
                <button
                  className="border mx-1"
                  onClick={() => {
                    addToCard({
                      productId: product.id,
                      userId: selectedCustomer!,
                    });
                  }}
                >
                  add
                </button>
                <button
                  className="border  mx-1 disabled:opacity-50"
                  disabled={
                    userInfo?.activeCard.filter((item) => item === product.id)
                      .length === 0
                  }
                  onClick={() =>
                    removeFromCard({
                      productId: product.id,
                      userId: selectedCustomer!,
                    })
                  }
                >
                  remove
                </button>
                <button
                  className="border mx-1 disabled:opacity-50"
                  disabled={
                    userInfo?.activeCard.filter((item) => item === product.id)
                      .length === 0
                  }
                  onClick={() =>
                    reduceItemFromCard({
                      productId: product.id,
                      userId: selectedCustomer!,
                    })
                  }
                >
                  reduce
                </button>
              </div>
            );
          })}
        </div>
      </section>
      {suggestions && (
        <section>
          <h4>suggestions:</h4>
          <div>
            <p>{suggestions.name}</p>
          </div>
        </section>
      )}
      <button onClick={() => submitPurchase({ userId: selectedCustomer! })}>
        purchase
      </button>

      <section>
        <h4>purchases:</h4>
        <div>
          {userPurchases?.map((purchase) => {
            return (
              <p key={purchase.id}>
                {purchase.date}:{" "}
                {products.find((el) => el.id === purchase.productId)?.name}
              </p>
            );
          })}
        </div>
      </section>
    </section>
  );
};

export default Ecommerce;
