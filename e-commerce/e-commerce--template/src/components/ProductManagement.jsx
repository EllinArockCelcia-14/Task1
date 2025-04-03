// src/components/ProductManagement.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newProduct, setNewProduct] = useState({ title: '', price: '' });
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Add a new product
  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://fakestoreapi.com/products', newProduct);
      setProducts([...products, response.data]);
      setNewProduct({ title: '', price: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  // Update a product
  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://fakestoreapi.com/products/${editingProduct.id}`, editingProduct);
      setProducts(products.map(product => (product.id === editingProduct.id ? response.data : product)));
      setEditingProduct(null);
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete a product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`);
      setProducts(products.filter(product => product.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, [name]: value });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  // Start editing a product
  const startEditing = (product) => {
    setEditingProduct(product);
  };

  // Render loading, error, and product list
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (products.length === 0) return <div>No products available.</div>;

  return (
    <div>
      <h1>Product Management</h1>

      <form onSubmit={editingProduct ? updateProduct : addProduct}>
        <input
          type="text"
          name="title"
          placeholder="Product Name"
          value={editingProduct ? editingProduct.title : newProduct.title}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Product Price"
          value={editingProduct ? editingProduct.price : newProduct.price}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{editingProduct ? 'Update Product' : 'Add Product'}</button>
        {editingProduct && <button onClick={() => setEditingProduct(null)}>Cancel</button>}
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td>
                <button onClick={() => startEditing(product)}>Edit</button>
                <button onClick={() => deleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement;