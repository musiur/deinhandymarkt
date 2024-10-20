"use client";

import { TComboOptions } from "@/app/_utils/components/search";
import { GetCategories } from "@/app/dashboard/categories/_utils/actions/actions";
import { ProductComboBox } from "@/components/ui/products-combobox";
import { ActionResponseHandler } from "@/lib/error";
import Link from "next/link";
import { useEffect, useState } from "react";
import ClickLink from "./click-link";
import { useRouter } from "next/navigation";

const SearchHero = ({ searchParams }: { searchParams: any }) => {
  const router = useRouter();
  const [categories, setCategories] =
    useState<TComboOptions[]>(defaultCategories);
  const [selectedProduct, setSelectedProduct] = useState(
    searchParams?.tags || ""
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams?.category || ""
  );
  const [searchtext, setSearchText] = useState(searchParams?.search || "");
  const [searchDisable, setSearchDisable] = useState(true);

  const FetchCategories = async () => {
    const response = await GetCategories();
    ActionResponseHandler(response, "Fetching categories", true);
    if (response.success) {
      const tempArr: TComboOptions[] = [];
      response.data.categories.map(
        (category: { name: string; slug: string }) => {
          tempArr.push({
            label: category.name,
            value: category.slug,
          });
        }
      );
      setCategories(tempArr);
    }
  };

  useEffect(() => {
    FetchCategories();
  }, []);

  return (
    <section>
      <div className="container flex gap-[40px] px-0">
        <div className="bg-white rounded-[8px] px-[12px] py-[40px] md:p-[40px] w-full grid grid-cols-1 items-center justify-center gap-[40px]">
          <div className="flex flex-col items-center justify-center gap-[16px]">
            <h1 className="text-[16px] md:text-[24px] text-center">
              Search result for:&nbsp;
              <span className="text-[16px] md:text-[24px] font-semibold">
                {searchtext}
              </span>
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:flex sm:flex-row items-center justify-center w-full gap-[12px] sm:gap-[0px]">
            <input
              className="rounded-l-[8px] rounded-r-[8px] sm:rounded-r-[0px] bg-muted px-[16px] py-[8px] leading-[19px] flex-1 text-[14px] md:text-[16px] w-full border border-r sm:border-r-0 border-dark_gray"
              placeholder="Enter product name"
              onChange={(e) => {
                setSearchText(e.target.value);
                searchDisable && e.target.value && setSearchDisable(false);
              }}
              defaultValue={searchtext}
            />
            <div>
              {searchDisable ? (
                <div
                  className="inline-flex justify-center items-center rounded-r-[8px] rounded-l-[8px] sm:rounded-l-[0px] w-full sm:w-auto flex-1 sm:flex-none border border-secondary px-[16px] pt-[4px] py-[5px] text-[14px] md:text-[16px] bg-secondary text-white text-center active:scale-[98%]"
                  onClick={() => {
                    const query = {
                      pathname: "/search",
                      query: {
                        search: searchtext || "",
                        category: selectedCategory || "",
                        tags: selectedProduct?.replaceAll("_", " ") || "",
                      },
                    }
                    router.push(
                      `/search?search=${searchtext}&category=${selectedCategory}&tags=${
                        selectedProduct?.replaceAll("_", " ") || ""
                      }`
                    );
                  }}
                  role="button"
                >
                  Search
                </div>
              ) : (
                <ClickLink>
                  <div
                    className="inline-flex justify-center items-center rounded-r-[8px] rounded-l-[8px] sm:rounded-l-[0px] w-full sm:w-auto flex-1 sm:flex-none border border-secondary px-[16px] pt-[4px] py-[5px] text-[14px] md:text-[16px] bg-secondary text-white text-center active:scale-[98%]"
                    onClick={() => {
                      // const query ={
                      //   pathname: "/search",
                      //   query: {
                      //     search: searchtext || "",
                      //     category: selectedCategory || "",
                      //     tags: selectedProduct?.replaceAll("_", " ") || "",
                      //   },
                      // }
                      router.push(
                        `/search?search=${searchtext}&category=${selectedCategory}&tags=${
                          selectedProduct?.replaceAll("_", " ") || ""
                        }`
                      );
                    }}
                    role="button"
                  >
                    Search
                  </div>
                </ClickLink>
              )}
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-[12px] sm:gap-[20px]">
            <ProductComboBox
              placeholder="Select a product..."
              options={products}
              name="products"
              onChange={(e: any) => {
                setSelectedProduct(e.target.value);
              }}
              defaultValue={selectedProduct.replaceAll(" ", "_")}
            />
            <ProductComboBox
              placeholder="Select a category..."
              options={categories}
              name="category"
              onChange={(e: any) => {
                setSelectedCategory(e.target.value);
              }}
              defaultValue={selectedCategory}
            />
          </div>
        </div>
        <div className="min-w-[334px] min-h-[310px] bg-[url('/images/home/iphones.png')] bg-cover bg-center hidden lg:block rounded-[8px]"></div>
      </div>
    </section>
  );
};

export default SearchHero;

const products: TComboOptions[] = [
  {
    value: "iphone_15_pro_max",
    label: "iPhone 15 Pro Max",
  },
  {
    value: "iphone_15_pro",
    label: "iPhone 15 Pro",
  },
  {
    value: "iphone_15_plus",
    label: "iPhone 15 plus",
  },
  {
    value: "iphone_15",
    label: "iPhone 15",
  },
  {
    value: "iphone_14_pro_max",
    label: "iPhone 14 Pro Max",
  },
  {
    value: "iphone_14_pro",
    label: "iPhone 14 Pro",
  },
  {
    value: "iphone_14",
    label: "iPhone 14",
  },
  {
    value: "iphone_12_pro",
    label: "iPhone 14 Pro",
  },
  {
    value: "iphone_12",
    label: "iPhone 12",
  },
];

const defaultCategories: TComboOptions[] = [
  {
    value: "iphone_15_pro_max",
    label: "iPhone 15 Pro Max",
  },
  {
    value: "iphone_15_pro",
    label: "iPhone 15 Pro",
  },
  {
    value: "iphone_14_pro",
    label: "iPhone 14 Pro",
  },
];
