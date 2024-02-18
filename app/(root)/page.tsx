import { Collection } from "@/components/shared/Collection";
import { navLinks } from "@/constant";
import { getAllImages } from "@/lib/actions/image.action";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Home = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || "";

  const results = await getAllImages({
    page,
    searchQuery,
  });

  const images = results ? results.data : [];
  const totalPage = results ? results.totalPage : 1;
  const savedImages = results ? results.savedImages : [];
  return (
    <>
      <section className="home">
        <h1 className="home-heading">
          Unleash Your Creative Vision with Imaginify
        </h1>

        <ul className="flex-center w-full gap-20">
          {navLinks.slice(1, 5).map((navLink, index) => (
            <Link
              key={index}
              href={navLink.route}
              className="flex-center flex-col gap-2"
            >
              <li className="flex-center w-fit rounded-full bg-white p-4">
                <Image
                  src={navLink.icon}
                  width={24}
                  height={24}
                  alt={navLink.label}
                  className="object-contain"
                />
              </li>
              <p className="p-14-medium text-center text-white">
                {navLink.label}
              </p>
            </Link>
          ))}
        </ul>
      </section>
      <section className="sm:mt-12">
        <Collection
          images={images}
          page={page}
          hasSearch={true}
          totalPages={totalPage}
        />
      </section>
    </>
  );
};

export default Home;
