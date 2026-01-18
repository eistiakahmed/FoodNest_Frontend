'use client';

import { useState } from 'react';

export default function AddItemForm() {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    discountPrice: '',
    category: '',
    cuisine: '',
    image: '',
    images: [''],
    isAvailable: true,
    isVeg: false,
    calories: '',
    preparationTime: '',
    rating: '',
    totalReviews: '',
    spiceLevel: 'Low',
    ingredients: [''],
    portionSize: 'Regular',
    restaurantId: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      price: Number(formData.price),
      discountPrice: Number(formData.discountPrice),
      calories: Number(formData.calories),
      preparationTime: Number(formData.preparationTime),
      rating: Number(formData.rating),
      totalReviews: Number(formData.totalReviews),
      createdAt: new Date().toLocaleDateString('en-GB'),
    };

    console.log(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <input name="name" placeholder="Food Name" onChange={handleChange} />
      <input name="slug" placeholder="Slug" onChange={handleChange} />

      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
      />

      <input
        name="price"
        type="number"
        placeholder="Price"
        onChange={handleChange}
      />
      <input
        name="discountPrice"
        type="number"
        placeholder="Discount Price"
        onChange={handleChange}
      />

      <input name="category" placeholder="Category" onChange={handleChange} />
      <input name="cuisine" placeholder="Cuisine" onChange={handleChange} />

      <input
        name="image"
        placeholder="Main Image URL"
        onChange={handleChange}
      />

      <label>
        <input
          type="checkbox"
          name="isAvailable"
          checked={formData.isAvailable}
          onChange={handleChange}
        />
        Available
      </label>

      <label>
        <input
          type="checkbox"
          name="isVeg"
          checked={formData.isVeg}
          onChange={handleChange}
        />
        Veg
      </label>

      <button type="submit">Save Item</button>
    </form>
  );
}
