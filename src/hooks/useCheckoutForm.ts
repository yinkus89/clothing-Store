import { useState } from 'react';

const useCheckoutForm = () => {
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    country: '',
    zip: '',  // Add 'zip' here
  });

  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expDate: '',
    cvv: ''
  });
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Handle change for form fields
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    if (name in shippingAddress) {
      setShippingAddress((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (name in paymentDetails) {
      setPaymentDetails((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (name === 'paymentMethod') {
      setPaymentMethod(value);
    }
  };

  // Handle checkout form submission
  const handleCheckoutSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Logic to submit the order
    console.log('Order submitted:', { shippingAddress, paymentMethod, paymentDetails });
    setOrderSuccess(true);  // Example of setting success after submitting
  };

  return {
    shippingAddress,
    paymentMethod,
    paymentDetails,
    orderSuccess,
    handleChange,
    handleCheckoutSubmit
  };
};

export default useCheckoutForm;
