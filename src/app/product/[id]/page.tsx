"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Wand2, Sparkles, ArrowLeft, Check } from 'lucide-react';
import Navigation from '@/components/Navigation';
import AnimatedBackground from '@/components/AnimatedBackground';
import VoiceRecorder from '@/components/VoiceRecorder';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCartStore } from '@/lib/store';
import { Badge } from '@/components/ui/badge';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  modelUrl: string;
}

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState('#9333ea');
  const [size, setSize] = useState('medium');
  const [aiPrompt, setAiPrompt] = useState('');
  const [voiceUrl, setVoiceUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`/api/products/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [params.id]);

  const handleAIGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  const handleAddToCart = () => {
    if (!product) return;

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl || `https://source.unsplash.com/400x400/?3d,${product.category}`,
      quantity,
      customization: {
        color,
        size,
        aiPrompt: aiPrompt || undefined,
      },
      voiceFrequencyUrl: voiceUrl || undefined,
    });

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navigation />

      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto">
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Preview */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="overflow-hidden border-2 border-purple-200 dark:border-purple-800 sticky top-24">
                <div className="aspect-square relative bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30">
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${product.imageUrl || `https://source.unsplash.com/800x800/?3d,${product.category}`})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
                      {product.category}
                    </Badge>
                  </div>

                  {/* 3D Model Indicator */}
                  <motion.div
                    className="absolute bottom-4 right-4 bg-white/90 dark:bg-black/90 rounded-full p-3"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-6 h-6 text-purple-600" />
                  </motion.div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                    <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="text-muted-foreground">{product.description}</p>
                </div>
              </Card>
            </motion.div>

            {/* Customization Panel */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Basic Options */}
              <Card className="p-6 space-y-4">
                <h2 className="text-2xl font-bold">Basic Options</h2>
                
                <div className="space-y-2">
                  <Label>Quantity</Label>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="text-center"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Print Color</Label>
                  <div className="flex gap-2">
                    {['#9333ea', '#ec4899', '#3b82f6', '#22c55e', '#f59e0b'].map((c) => (
                      <motion.button
                        key={c}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setColor(c)}
                        className={`w-10 h-10 rounded-full border-4 ${
                          color === c ? 'border-white shadow-lg' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Size</Label>
                  <div className="flex gap-2">
                    {['small', 'medium', 'large'].map((s) => (
                      <Button
                        key={s}
                        variant={size === s ? 'default' : 'outline'}
                        onClick={() => setSize(s)}
                        className={size === s ? 'bg-gradient-to-r from-purple-600 to-pink-600' : ''}
                      >
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
              </Card>

              {/* AI Customization */}
              <Card className="p-6 space-y-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-2 border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-blue-600" />
                  <h3 className="text-xl font-bold">AI Customization</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Describe how you want to customize this model using AI
                </p>
                <Textarea
                  placeholder="E.g., Make it more aggressive with spikes, add tribal patterns, change the stance..."
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
                <Button
                  onClick={handleAIGenerate}
                  disabled={!aiPrompt || isGenerating}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isGenerating ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="mr-2"
                      >
                        <Wand2 className="w-4 h-4" />
                      </motion.div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Generate AI Variant
                    </>
                  )}
                </Button>
              </Card>

              {/* Voice Recorder */}
              <VoiceRecorder onRecordingComplete={setVoiceUrl} />

              {/* Add to Cart */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  className="w-full py-6 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 relative overflow-hidden"
                >
                  <AnimatePresence mode="wait">
                    {addedToCart ? (
                      <motion.div
                        key="added"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center gap-2"
                      >
                        <Check className="w-5 h-5" />
                        Added to Cart!
                      </motion.div>
                    ) : (
                      <motion.div
                        key="add"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center gap-2"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart - ${(product.price * quantity).toFixed(2)}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
