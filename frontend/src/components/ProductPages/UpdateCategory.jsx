import { useEffect } from 'react';
import CustomModal from '../ui/CustomModal';
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../api/axiosInstance';

export default function UpdateCategory({
  show,
  category,
  onClose,
  setCategories,
}) {

  // react hook form
  const { register, handleSubmit, reset } = useForm();

  // fill old data
  useEffect(() => {

    if (category) {
      reset({
        name: category.name,
      });
    }

  }, [category, reset]);

  // update category
  const onSubmit = async (data) => {

    try {

      // form data
      const formData = new FormData();

      formData.append('name', data.name);

      // image
      if (data.image && data.image[0]) {
        formData.append('image', data.image[0]);
      }

      // api request
      await axiosInstance.put(
        `/category/${category._id}`,
        formData
      );

      // update ui
      setCategories((prevCategories) =>
        prevCategories.map((c) =>
          c._id === category._id
            ? {
                ...c,
                ...data,
              }
            : c
        )
      );

      // close modal
      onClose();

    } catch (err) {
      console.log(err);
    }
  };

  return (

    <CustomModal
      show={show}
      onClose={onClose}
      title="Update Category"
    >

      <form onSubmit={handleSubmit(onSubmit)}>

        {/* category name */}
        <input
          className="form-control mb-3"
          placeholder="Category Name"
          {...register('name')}
        />

        {/* image */}
        <input
          type="file"
          className="form-control mb-3"
          {...register('image')}
        />

        {/* submit */}
        <button className="btn btn-primary w-100">
          Update Category
        </button>

      </form>

    </CustomModal>
  );
}