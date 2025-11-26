import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';

export const products = sqliteTable('products', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description'),
  price: real('price').notNull(),
  category: text('category').notNull(),
  imageUrl: text('image_url'),
  modelUrl: text('model_url'),
  createdAt: text('created_at').notNull(),
});

export const orders = sqliteTable('orders', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userEmail: text('user_email').notNull(),
  totalAmount: real('total_amount').notNull(),
  status: text('status').notNull().default('pending'),
  createdAt: text('created_at').notNull(),
});

export const orderItems = sqliteTable('order_items', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  orderId: integer('order_id').references(() => orders.id).notNull(),
  productId: integer('product_id').references(() => products.id).notNull(),
  quantity: integer('quantity').notNull(),
  customizationData: text('customization_data', { mode: 'json' }),
  voiceFrequencyUrl: text('voice_frequency_url'),
});