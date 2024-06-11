import React, { useState, useEffect } from 'react';
import * as yup from 'yup';

// 👇 Here are the validation errors you will use with Yup.
const validationErrors = {
  fullNameTooShort: 'full name must be at least 3 characters',
  fullNameTooLong: 'full name must be at most 20 characters',
  sizeIncorrect: 'size must be S or M or L'
};

// 👇 Here you will create your schema.
const schema = yup.object().shape({
  fullName: yup.string().trim().min(3, validationErrors.fullNameTooShort).max(20, validationErrors.fullNameTooLong).required(),
  size: yup.string().matches(/^(S|M|L)$/, validationErrors.sizeIncorrect).required(),
  toppings: yup.array().of(yup.string())
});
// 👇 This array could help you construct your checkboxes using .map in the JSX.

const toppings = [
  { topping_id: '1', text: 'Pepperoni' },
  { topping_id: '2', text: 'Green Peppers' },
  { topping_id: '3', text: 'Pineapple' },
  { topping_id: '4', text: 'Mushrooms' },
  { topping_id: '5', text: 'Ham' },
];

export default function Form() {
  const [formValues, setFormValues] = useState({
    fullName: '',
    size: '',
    toppings: []
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    schema.isValid(formValues).then(valid => setIsFormValid(valid));
  }, [formValues]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormValues(prevValues => ({
        ...prevValues,
        toppings: checked ? [...prevValues.toppings, value] : prevValues.toppings.filter(topping => topping !== value)
      }));
    } else {
      setFormValues(prevValues => ({
        ...prevValues,
        [name]: value
      }));
    }

    yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        setFormErrors(prevErrors => ({
          ...prevErrors,
          [name]: ''
        }));
      })
      .catch(err => {
        setFormErrors(prevErrors => ({
          ...prevErrors,
          [name]: err.errors[0]
        }));
      });
  };

const sizes = {'S': 'small', 'M': "medium", 'L': 'large'};

  const handleSubmit = e => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    setFormErrors({});
    console.log('formValues', formValues)
    schema
      .validate(formValues, { abortEarly: false })
      .then(() => {
        // Simulate a successful submission

        setTimeout(() => {
          setSuccessMessage(`Thank you for your order, ${formValues.fullName}! Your ${sizes[formValues.size]} pizza with ${formValues.toppings.length ? `${formValues.toppings.length} topping${formValues.toppings.length >1 ? 's' : ''}`: 'no toppings'} is on its way!`);
          setFormValues({
            fullName: '',
            size: '',
            toppings: []
          });
          setIsSubmitting(false);
        });
      })
      .catch(err => {
        setIsSubmitting(false);
        setFormErrors(
          err.inner.reduce((acc, currentErr) => {
            return {
              ...acc,
              [currentErr.path]: currentErr.message
            };
          }, {})
        );
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Order Your Pizza</h2>
      {successMessage && <div className='success'>{successMessage}</div>}
      {Object.keys(formErrors).length > 0 && !isSubmitting && <div className='failure'>Something went wrong</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            placeholder="Type full name"
            id="fullName"
            name="fullName"
            type="text"
            value={formValues.fullName}
            onChange={handleChange}
          />
        </div>
        {formErrors.fullName && <div className='error'>{formErrors.fullName}</div>}
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select id="size" name="size" value={formValues.size} onChange={handleChange}>
            <option value="">----Choose Size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
        {formErrors.size && <div className='error'>{formErrors.size}</div>}
      </div>

      <div className="input-group">
        {toppings.map(topping => (
          <label key={topping.topping_id}>
            <input
              name="toppings"
              type="checkbox"
              value={topping.text}
              checked={formValues.toppings.includes(topping.text)}
              onChange={handleChange}
            />
            {topping.text}<br />
          </label>
        ))}
      </div>

      <input type="submit" disabled={!isFormValid || isSubmitting} value="Submit" />
    </form>
  );
}