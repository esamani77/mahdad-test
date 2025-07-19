"use client";

import { getStock } from "@/api/stock";
import { useEffect, useState } from "react";

const Stock = () => {
  const [stockData, setStockData] = useState<any>(null);
  useEffect(() => {
    const fetchStockData = async () => {
      const data = await getStock();
      setStockData(data);
    };
    fetchStockData();
  }, []);
  return <div>{JSON.stringify(stockData)}</div>;
};

export default Stock;
