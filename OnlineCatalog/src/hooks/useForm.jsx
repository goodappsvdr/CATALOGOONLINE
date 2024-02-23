import { useState } from "react";

export const useForm = (initialObj = {}) => {
  const [form, setForm] = useState(initialObj);

  const changed = ({ target }) => {
    const { name, value } = target;
    // los [] son para darle el nombre a la propiedad
    setForm({
      ...form,
      [name]: value,
    });
  };
  const formToFormData = (objeto) => {
    const formData = new FormData();
    for (let key in objeto) {
      if (objeto.hasOwnProperty(key)) {
        formData.append(key, objeto[key]);
      }
    }
    return formData;
  };

  return {
    form,
    changed,
    formToFormData,
  };
};
