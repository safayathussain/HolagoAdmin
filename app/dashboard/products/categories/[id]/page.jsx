"use client";
import SingleCtgPage from "@/components/dashboard/categoriespage/SingleCtgPage";
import { useEffect, useState } from "react";

export default function DynamicPage({ params }) {
  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
  const id = params.id;

  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`${API_ENDPOINT}/category/getCategoryById/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }, []);

  return (
    <main className="w-full my-5">
      <SingleCtgPage category={data?.category} />
    </main>
  );
}
