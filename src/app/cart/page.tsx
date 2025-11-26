"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import Navigation from '@/components/Navigation';
import AnimatedBackground from '@/components/AnimatedBackground';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/lib/store';

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    if (!email || items.length === 0) return;

    setIsProcessing(true);

    try {
      const orderItems = items.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        customizationData: item.customization,
        voiceFrequencyUrl: item.voiceFrequencyUrl,
      }));

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: email,
          items: orderItems,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/order-confirmation?orderId=${data.order.id}`);
      } else {
        alert('Failed to create order. Please try again.');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen relative">
        <AnimatedBackground />
        <Navigation />
        
        <div className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <ShoppingBag className="w-24 h-24 text-muted-foreground mx-auto" />
              <h1 className="text-4xl font-bold">Your Cart is Empty</h1>
              <p className="text-muted-foreground text-lg">
                Looks like you haven't added any 3D models yet
              </p>
              <Button
                size="lg"
                onClick={() => router.push('/')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Start Shopping
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navigation />

      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold mb-2">Shopping Cart</h1>
            <p className="text-muted-foreground">{items.length} items in your cart</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence mode="popLayout">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    transition={{ delay: index * 0.1 }}
                    layout
                  >
                    <Card className="p-4 border-2 border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 transition-colors">
                      <div className="flex gap-4">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="w-24 h-24 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex-shrink-0 overflow-hidden"
                        >
                          <div
                            className="w-full h-full"
                            style={{
                              backgroundImage: `url(${item.imageUrl})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                            }}
                          />
                        </motion.div>

                        <div className="flex-1 space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-lg">{item.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                ${item.price.toFixed(2)} each
                              </p>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.1, rotate: 90 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeItem(item.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="w-5 h-5" />
                            </motion.button>
                          </div>

                          {item.customization && (
                            <div className="flex flex-wrap gap-2 text-xs">
                              {item.customization.color && (
                                <span className="px-2 py-1 bg-muted rounded">
                                  Color: <span style={{ color: item.customization.color }}>●</span>
                                </span>
                              )}
                              {item.customization.size && (
                                <span className="px-2 py-1 bg-muted rounded">
                                  Size: {item.customization.size}
                                </span>
                              )}
                              {item.customization.aiPrompt && (
                                <span className="px-2 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded">
                                  AI Custom
                                </span>
                              )}
                              {item.voiceFrequencyUrl && (
                                <span className="px-2 py-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded">
                                  Voice Added
                                </span>
                              )}
                            </div>
                          )}

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="w-12 text-center font-bold">{item.quantity}</span>
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                            <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <Card className="p-6 space-y-6 sticky top-24 border-2 border-purple-200 dark:border-purple-800">
                <h2 className="text-2xl font-bold">Order Summary</h2>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-bold">${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-bold">FREE</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg">
                    <span className="font-bold">Total</span>
                    <span className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    onClick={handleCheckout}
                    disabled={!email || isProcessing}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    {isProcessing ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <>
                        Proceed to Checkout
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </motion.div>

                <p className="text-xs text-muted-foreground text-center">
                  Secure checkout • Free shipping on all orders
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
