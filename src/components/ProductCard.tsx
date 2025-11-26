"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  index: number;
}

export default function ProductCard({ id, name, price, category, imageUrl, index }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -20 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.23, 1, 0.32, 1],
      }}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        z: 50,
        transition: { duration: 0.3 },
      }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <Link href={`/product/${id}`}>
        <Card className="overflow-hidden border-2 border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/50 group cursor-pointer">
          <div className="relative overflow-hidden aspect-square bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30">
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute top-3 right-3">
              <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
                {category}
              </Badge>
            </div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
              initial={false}
            >
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-white">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Click to customize</span>
              </div>
            </motion.div>
          </div>

          <div className="p-4 space-y-2">
            <h3 className="font-bold text-lg line-clamp-1 group-hover:text-purple-600 transition-colors">
              {name}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ${price.toFixed(2)}
              </span>
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles className="w-5 h-5 text-purple-600" />
              </motion.div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
