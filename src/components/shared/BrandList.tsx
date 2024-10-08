'use client';

import { getBrands } from '@/lib/actions/brand.actions';
import { Brand } from '@prisma/client';
import { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import BrandCard from './ClientCard';

const BrandList = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brands = await getBrands();
        setBrands(brands || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  const SkeletonLoader = () => (
    <CarouselContent className="-ml-2 md:-ml-4">
      {[...Array(6)].map((_, index) => (
        <CarouselItem
          key={index}
          className="pl-2 md:basis-1/2 md:pl-4 lg:basis-1/3"
        >
          <div className="flex h-36 animate-pulse flex-col items-center justify-center rounded-lg bg-gray-200 p-4" />
        </CarouselItem>
      ))}
    </CarouselContent>
  );

  return (
    <section className="container my-6">
      <h1 className="text-xl font-semibold">برانداتي</h1>

      <div className="m-auto mt-6 max-w-7xl">
        <Carousel autoScroll={true}>
          {loading ? (
            <SkeletonLoader />
          ) : (
            <CarouselContent className="-ml-2 md:-ml-4">
              {brands?.map((brand, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:basis-1/2 md:pl-4 lg:basis-1/3"
                >
                  <BrandCard name={brand.name} imageUrl={brand.imageUrl} />
                </CarouselItem>
              ))}
            </CarouselContent>
          )}
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default BrandList;
