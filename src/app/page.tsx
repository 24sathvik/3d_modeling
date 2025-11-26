"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Wand2, Volume2 } from 'lucide-react';
import Navigation from '@/components/Navigation';
import AnimatedBackground from '@/components/AnimatedBackground';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  modelUrl: string;
  createdAt: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="text-center space-y-6 max-w-4xl mx-auto"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-block"
            >
              <Sparkles className="w-16 h-16 text-purple-600 mx-auto" />
            </motion.div>

            <h1 className="text-6xl md:text-7xl font-black">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                3D Print Your Dreams
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create custom 3D printed toys and models with AI-powered customization
              and voice frequency integration. Your imagination, our technology.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg rounded-full">
                  <Wand2 className="w-5 h-5 mr-2" />
                  Explore Models
                </Button>
              </motion.div>
            </div>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-3 pt-8"
            >
              {[
                { icon: Wand2, text: 'AI Customization' },
                { icon: Volume2, text: 'Voice Frequency' },
                { icon: Zap, text: 'Instant 3D Preview' },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full flex items-center gap-2 border-2 border-purple-200 dark:border-purple-800"
                >
                  <feature.icon className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Featured <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Models</span>
            </h2>
            <p className="text-muted-foreground">
              Discover our collection of customizable 3D printing models
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-80 bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  category={product.category}
                  imageUrl={product.imageUrl || `https://source.unsplash.com/400x400/?3d,${product.category}`}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-20">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
            
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-4">Ready to Create?</h2>
              <p className="text-xl mb-8 opacity-90">
                Start customizing your 3D models with AI and voice technology
              </p>
              <Button size="lg" variant="secondary" className="px-8 py-6 text-lg rounded-full">
                Get Started Now
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}