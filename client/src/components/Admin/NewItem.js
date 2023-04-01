import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PRODUCT } from '../../utils/mutations';
import { QUERY_CATEGORIES } from '../../utils/queries';
import Axios from 'axios';

const NewItem = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [postImageSelected, setPostImageSelected] = useState('');

  const [formState, setFormState] = useState({ name: '', description: '', image: '', price: 0.0, quantity: 1, size: '' });

  const [addProduct, { error: errorAddProduct }] = useMutation(ADD_PRODUCT);
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);
  // console.log(categoryData);
  // Submit form to add a new post for a trip
  const handleAddProduct = async (event) => {
    event.preventDefault();

    // let imageUrl = '';
    // If user selected image file from computer, post to cloudinary, retrieve URL
    if (postImageSelected) {
      const formData = new FormData();
      formData.append('file', postImageSelected);
      formData.append('upload_preset', 'shirt-shop');

      try {
        // const response = await Axios.post('https://api.cloudinary.com/v1_1/dlvmcylti/image/upload', formData);
        // formState.image = response.data.url;
        formState.image = 'http://res.cloudinary.com/dlvmcylti/image/upload/v1680292099/qjkacf8vzgyxsoq2wane.webp';
      } catch (err) {
        console.log('Error uploading image:', err.message);
        return;
      }
    }

    try {
      const { data } = addProduct({
        variables: { ...formState },
      });
      // window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <form onSubmit={handleAddProduct}>
      <label htmlFor="name">Name:</label>
      <input type="text" name="name" value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} />
      <div>
        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" value={formState.description} required onChange={(e) => setFormState({ ...formState, description: e.target.value })} />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input type="number" id="price" name="price" min="0" step="0.01" value={formState.price} required onChange={(e) => setFormState({ ...formState, price: e.target.value })} />
      </div>
      <div>
        <label htmlFor="name">Size:</label>
        <input type="text" id="size" name="size" value={formState.size} onChange={(e) => setFormState({ ...formState, size: e.target.value })} />
      </div>
      <div>
        <label htmlFor="name">Quantity:</label>
        <input type="number" id="quantity" name="quantity" min="1" step="1" value={formState.quantity} required onChange={(e) => setFormState({ ...formState, quantity: e.target.value })} />
      </div>
      <div>
        <label>Category:</label>
        <select name="category" defaultValue="DEFAULT">
          <option value="DEFAULT" disabled>
            Select a category
          </option>
          {categoryData &&
            categoryData.categories &&
            categoryData.categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input type="file" id="image" accept="image/*" onChange={(event) => setPostImageSelected(event.target.files[0])} />
      </div>
      {/* <div>{imageUrl && <img src={imageUrl} alt="Product" style={{ maxWidth: '100%' }} />}</div> */}
      <div>
        <button type="submit" className="bg-primary-200/30 rounded-md p-2">
          Add Product
        </button>
      </div>
    </form>
  );
};

export default NewItem;
