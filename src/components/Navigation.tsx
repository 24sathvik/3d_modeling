"use client";

import Link from 'next/link';
import { ShoppingCart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/lib/store';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function Navigation() {
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-8 h-8 text-purple-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                3D Print Hub
              </span>
            </motion.div>
          </Link>

          <div className="flex items-center gap-6">
            <Link href="/">
              <Button variant="ghost" className="hover:bg-purple-100 dark:hover:bg-purple-900">
                Home
              </Button>
            </Link>
            <Link href="/cart">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-pink-600 hover:bg-pink-700">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
